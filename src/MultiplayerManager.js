import { io } from 'socket.io-client';
import { debugLog } from './debug.js';

export class MultiplayerManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.roomId = null;
    this.playerId = null;
    this.isHost = false;
    this.opponentData = null;
    // Token z create-room/join-room (patrz rejoin-room w server.js) -
    // pozwala automatycznie wrócić do TEGO SAMEGO pokoju po zerwaniu
    // połączenia, zamiast kończyć mecz przy pierwszym zaniku wifi. Patrz
    // _attemptRejoin() niżej.
    this.reconnectToken = null;
    this._hasConnectedOnce = false;
    
    this.onPlayerJoined = null;
    this.onPlayerLeft = null;
    this.onGameStateUpdate = null;
    this.onPlayerInput = null;
    this.onGameStart = null;
    this.onGameEnd = null;
    this.onError = null;
    // Reconnect (patrz duży komentarz w connect() i _attemptRejoin()):
    this.onConnectionLost = null;      // straciliśmy połączenie, próbujemy wrócić
    this.onReconnected = null;         // wróciliśmy do TEGO SAMEGO pokoju
    this.onReconnectFailed = null;     // okno na powrót minęło - trzeba potraktować jak opuszczenie pokoju
    this.onOpponentDisconnected = null; // przeciwnik ma problem z siecią (jeszcze nie koniec meczu)
    this.onOpponentReconnected = null;  // przeciwnik wrócił
  }

  // Połącz z serwerem
  connect(serverUrl = 'http://localhost:3000') {
    return new Promise((resolve, reject) => {
      this.socket = io(serverUrl);
      // Promise zwrócone przez connect() rozstrzyga się TYLKO przy
      // pierwszym połączeniu (settled=true po pierwszym resolve/reject).
      // socket.io samo, automatycznie próbuje odtworzyć transport po
      // zerwaniu (domyślne 'reconnection: true') - takie KOLEJNE 'connect'
      // nie powinno ponownie rozstrzygać już dawno rozstrzygniętego
      // Promise; zamiast tego leci do _attemptRejoin() (patrz niżej).
      let settled = false;
      
      this.socket.on('connect', () => {
        this.isConnected = true;
        this.playerId = this.socket.id;
        debugLog('Connected to server:', this.playerId);

        if (!settled) {
          settled = true;
          this._hasConnectedOnce = true;
          resolve();
          return;
        }

        // Nowy socket.id (stary już nieaktualny) po automatycznym
        // odtworzeniu transportu przez socket.io - jeśli byliśmy w trakcie
        // gry w pokoju, spróbuj "przedstawić się" serwerowi ponownie
        // tokenem, zamiast zostawiać grę w martwym punkcie.
        this._attemptRejoin();
      });
      
      this.socket.on('disconnect', (reason) => {
        this.isConnected = false;
        debugLog('Disconnected from server:', reason);
        // io server disconnect / io client disconnect = rozłączenie
        // ZAMIERZONE (np. nasze własne this.socket.disconnect() w
        // disconnect() poniżej) - socket.io nie będzie nawet próbować
        // odtworzyć transportu, więc nie ma co zapowiadać "łączę się z
        // powrotem". Każdy inny powód (transport close/error, ping
        // timeout) to prawdopodobnie chwilowy zanik sieci, po którym
        // socket.io samo spróbuje wrócić.
        if (reason !== 'io server disconnect' && reason !== 'io client disconnect') {
          if (this.onConnectionLost) this.onConnectionLost(reason);
        }
      });
      
      this.socket.on('player-joined', (data) => {
        this.opponentData = data;
        if (this.onPlayerJoined) this.onPlayerJoined(data);
      });
      
      this.socket.on('player-left', () => {
        this.opponentData = null;
        if (this.onPlayerLeft) this.onPlayerLeft();
      });

      // Miękkie sygnały karencji na reconnect (patrz server.js -
      // RECONNECT_GRACE_MS) - NIE oznaczają zakończenia meczu, tylko
      // chwilowy status do pokazania graczowi.
      this.socket.on('opponent-disconnected', () => {
        if (this.onOpponentDisconnected) this.onOpponentDisconnected();
      });

      this.socket.on('opponent-reconnected', () => {
        if (this.onOpponentReconnected) this.onOpponentReconnected();
      });
      
      this.socket.on('game-state-update', (data) => {
        if (this.onGameStateUpdate) this.onGameStateUpdate(data);
      });
      
      this.socket.on('player-input', (data) => {
        if (this.onPlayerInput) this.onPlayerInput(data);
      });
      
      this.socket.on('game-start', () => {
        if (this.onGameStart) this.onGameStart();
      });
      
      this.socket.on('game-end', (data) => {
        if (this.onGameEnd) this.onGameEnd(data);
      });
      
      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
        if (this.onError) this.onError(error);
        if (!settled) {
          settled = true;
          reject(error);
        }
      });

      // 'connect_error' (nie 'error') to zdarzenie emitowane przez klienta
      // socket.io, gdy pierwsze połączenie się nie powiedzie (np. serwer
      // nieosiągalny). Bez tego listenera Promise z connect() nigdy by się
      // nie rozstrzygnął w takim przypadku - UI lobby wisiałby wiecznie na
      // "Łączenie z serwerem..." bez żadnej informacji dla gracza. Po
      // pierwszym połączeniu kolejne connect_error to już nieudane próby
      // AUTOMATYCZNEGO reconnectu socket.io w tle - Promise jest już dawno
      // rozstrzygnięte (settled), więc tu tylko logujemy/informujemy przez
      // onError, bez ponownego reject().
      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error.message);
        if (this.onError) this.onError(error);
        if (!settled) {
          settled = true;
          reject(error);
        }
      });
    });
  }

  // Wywoływane automatycznie po KOLEJNYM (nie pierwszym) 'connect' - patrz
  // connect() wyżej. Jeśli byliśmy w pokoju i mamy zapamiętany token,
  // próbujemy wrócić do TEGO SAMEGO pokoju zamiast zostawiać grę martwą.
  // Bez tego każdy krótki zanik wifi w trakcie meczu kończyłby się tak,
  // jakby przeciwnik (albo my sami, z punktu widzenia drugiej strony)
  // porzucili grę na dobre.
  _attemptRejoin() {
    if (!this.roomId || !this.reconnectToken) return;

    this.socket.emit('rejoin-room', { roomId: this.roomId, token: this.reconnectToken }, (response) => {
      if (response && response.success) {
        this.isHost = response.isHost;
        debugLog('Rejoined room after reconnect:', this.roomId);
        if (this.onReconnected) this.onReconnected();
      } else {
        debugLog('Rejoin failed:', response && response.error);
        // Okno na powrót minęło po stronie serwera (albo pokój już nie
        // istnieje) - nie ma już do czego wracać, trzeba to potraktować
        // jak prawdziwe opuszczenie pokoju.
        this.roomId = null;
        this.isHost = false;
        this.reconnectToken = null;
        if (this.onReconnectFailed) this.onReconnectFailed();
      }
    });
  }

  // Utwórz pokój
  createRoom() {
    return new Promise((resolve) => {
      this.socket.emit('create-room', {}, (response) => {
        this.roomId = response.roomId;
        this.isHost = true;
        this.reconnectToken = response.token;
        debugLog('Room created:', this.roomId);
        resolve(response);
      });
    });
  }

  // Dołącz do pokoju
  joinRoom(roomId) {
    return new Promise((resolve, reject) => {
      this.socket.emit('join-room', { roomId }, (response) => {
        if (response.success) {
          this.roomId = roomId;
          this.isHost = false;
          this.reconnectToken = response.token;
          debugLog('Joined room:', this.roomId);
          resolve(response);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }

  // Wyślij input gracza
  sendInput(action, data = {}) {
    if (!this.isConnected || !this.roomId) return;
    
    this.socket.emit('player-input', {
      roomId: this.roomId,
      action,
      data,
      timestamp: performance.now()
    });
  }

  // Wyślij stan gry - okresowa, WŁASNA pozycja/kierunek do korekty dryfu
  // po stronie przeciwnika (patrz Game.js#update / RemotePlayer.js
  // #applyRemoteState). Obie strony wywołują to, nie tylko host - server.js
  // od tej wersji przekazuje to dalej niezależnie od roli nadawcy.
  sendGameState(gameState) {
    if (!this.isConnected || !this.roomId) return;
    
    this.socket.emit('game-state-update', {
      roomId: this.roomId,
      gameState
    });
  }

  // Rozpocznij grę (tylko host)
  startGame() {
    if (!this.isHost) return;
    
    this.socket.emit('start-game', {
      roomId: this.roomId
    });
  }

  // Zakończ grę
  endGame(winner) {
    this.socket.emit('game-end', {
      roomId: this.roomId,
      winner
    });
  }

  // Opuść pokój
  leaveRoom() {
    if (!this.roomId) return;
    
    this.socket.emit('leave-room', {
      roomId: this.roomId
    });
    
    this.roomId = null;
    this.isHost = false;
    this.opponentData = null;
    this.reconnectToken = null;
  }

  // Rozłącz
  disconnect() {
    if (this.socket) {
      this.leaveRoom();
      this.socket.disconnect();
    }
  }
}

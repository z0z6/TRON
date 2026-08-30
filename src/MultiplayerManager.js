import { io } from 'socket.io-client';

export class MultiplayerManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.roomId = null;
    this.playerId = null;
    this.isHost = false;
    this.opponentData = null;
    
    this.onPlayerJoined = null;
    this.onPlayerLeft = null;
    this.onGameStateUpdate = null;
    this.onPlayerInput = null;
    this.onGameStart = null;
    this.onGameEnd = null;
    this.onError = null;
  }

  // Połącz z serwerem
  connect(serverUrl = 'http://localhost:3000') {
    return new Promise((resolve, reject) => {
      this.socket = io(serverUrl);
      
      this.socket.on('connect', () => {
        this.isConnected = true;
        this.playerId = this.socket.id;
        console.log('Connected to server:', this.playerId);
        resolve();
      });
      
      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('Disconnected from server');
      });
      
      this.socket.on('player-joined', (data) => {
        this.opponentData = data;
        if (this.onPlayerJoined) this.onPlayerJoined(data);
      });
      
      this.socket.on('player-left', () => {
        this.opponentData = null;
        if (this.onPlayerLeft) this.onPlayerLeft();
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
        reject(error);
      });

      // 'connect_error' (nie 'error') to zdarzenie emitowane przez klienta
      // socket.io, gdy pierwsze połączenie się nie powiedzie (np. serwer
      // nieosiągalny). Bez tego listenera Promise z connect() nigdy by się
      // nie rozstrzygnął w takim przypadku - UI lobby wisiałby wiecznie na
      // "Łączenie z serwerem..." bez żadnej informacji dla gracza.
      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error.message);
        if (this.onError) this.onError(error);
        reject(error);
      });
    });
  }

  // Utwórz pokój
  createRoom() {
    return new Promise((resolve) => {
      this.socket.emit('create-room', {}, (response) => {
        this.roomId = response.roomId;
        this.isHost = true;
        console.log('Room created:', this.roomId);
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
          console.log('Joined room:', this.roomId);
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

  // Wyślij stan gry (tylko host)
  sendGameState(gameState) {
    if (!this.isConnected || !this.roomId || !this.isHost) return;
    
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
  }

  // Rozłącz
  disconnect() {
    if (this.socket) {
      this.leaveRoom();
      this.socket.disconnect();
    }
  }
}

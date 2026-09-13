const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Analogiczny przełącznik do src/debug.js po stronie klienta - domyślnie
// wyłączony, żeby logi połączeń/pokoi nie zapychały stdout na produkcji.
// Włączanie: TRON_DEBUG=1 node server.js
const DEBUG = process.env.TRON_DEBUG === '1';
function debugLog(...args) {
  if (DEBUG) console.log(...args);
}

// Dozwolone originy dla WebSocketa - w produkcji ustaw zmienną środowiskową
// ALLOWED_ORIGIN na dokładny adres GitHub Pages (np.
// "https://z0z6.github.io"), żeby dowolna strona w internecie nie mogła
// łączyć się z tym serwerem. Bez tej zmiennej (np. lokalnie) zostaje '*'.
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST']
  }
});

// Przechowuj pokoje
const rooms = new Map();

// --- Walidacja wejścia i podstawowy rate-limit ---
// Ten serwer to WCIĄŻ tylko relay (patrz komentarz niżej przy app.get('/'))
// - nie liczy kolizji ani nie rozstrzyga zwycięzcy, więc gracz modyfikujący
// lokalnego klienta może oszukiwać co do WYNIKU rundy. To jest świadomie
// zaakceptowane ograniczenie tej wersji (pełne przeniesienie logiki gry na
// serwer to osobna, większa zmiana). Poniższe funkcje łatają tańszy,
// bardziej przyziemny problem: serwer ufał KSZTAŁTOWI danych od klienta
// (roomId, action, itd.) bez żadnej walidacji, co pozwalało zawiesić/
// zaśmiecić serwer samym malformed payloadem, oraz nie miał żadnego limitu
// na tworzenie pokoi (trywialny DoS: pętla tworząca tysiące pokoi/s).
const ROOM_ID_RE = /^[A-Z0-9]{4,10}$/;
const ALLOWED_ACTIONS = new Set(['turnLeft', 'turnRight']);
const MAX_ROOM_ID_LOOKUP_LEN = 10;

function isValidRoomId(roomId) {
  return typeof roomId === 'string' && roomId.length <= MAX_ROOM_ID_LOOKUP_LEN && ROOM_ID_RE.test(roomId);
}

function isValidAction(action) {
  return typeof action === 'string' && ALLOWED_ACTIONS.has(action);
}

// Token nieprzewidywalny na tyle, żeby obcy socket nie mógł go zgadnąć i
// "przejąć" cudzego miejsca w pokoju przez rejoin-room (patrz niżej) - nie
// musi być kryptograficznie idealny (to wciąż tylko gra dla dwóch osób w
// jednym pokoju, nie system uwierzytelniania), ale zwykły
// Math.random().toString(36) użyty już do roomId byłby za krótki/za łatwy
// do obserwacji przy wielu próbach.
function generateReconnectToken() {
  return Array.from({ length: 4 }, () => Math.random().toString(36).slice(2, 10)).join('');
}

// Bardzo prosty token-bucket per socket, tylko dla 'create-room' (najbardziej
// oczywisty wektor spamu: tanie w wywołaniu, tworzy stan na serwerze).
// Nieproporcjonalnie prostszy niż pełny rate-limiter, ale wystarcza, żeby
// jeden klient nie mógł zalać serwera tysiącami pokoi w kilka sekund.
const ROOM_CREATE_LIMIT = 5;
const ROOM_CREATE_WINDOW_MS = 60 * 1000;
const roomCreateTimestamps = new Map(); // socket.id -> number[]

// Ile czasu (ms) pokój "trzyma miejsce" dla gracza, którego socket się
// rozłączył (chwilowy zanik wifi, telefon zablokowany na chwilę, zakładka
// w tle uśpiona przez system) - patrz duży komentarz przy socket.on('disconnect').
// 20s to kompromis: wystarczająco długo na typowy krótki zanik sieci,
// wystarczająco krótko, żeby drugi gracz nie czekał w nieskończoność na
// kogoś, kto faktycznie już sobie poszedł.
const RECONNECT_GRACE_MS = Number(process.env.RECONNECT_GRACE_MS) || 20 * 1000;

function isRoomCreateRateLimited(socketId) {
  const now = Date.now();
  const timestamps = (roomCreateTimestamps.get(socketId) || []).filter(
    (t) => now - t < ROOM_CREATE_WINDOW_MS
  );
  if (timestamps.length >= ROOM_CREATE_LIMIT) {
    roomCreateTimestamps.set(socketId, timestamps);
    return true;
  }
  timestamps.push(now);
  roomCreateTimestamps.set(socketId, timestamps);
  return false;
}

// Ten serwer NIE serwuje plików klienta - to wyłącznie backend WebSocket
// (Socket.io) dla trybu multiplayer. Statyczny klient 3D jest hostowany
// osobno przez GitHub Pages (patrz faza 0: base: '/TRON/3d/' w
// vite.config.js) i łączy się z tym serwerem przez CORS-owy WebSocket
// (stąd origin: '*' poniżej). Ten serwer trzeba wdrożyć osobno (np. Render,
// Railway, Fly.io) - GitHub Pages nie uruchamia Node.js.
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'tron-multiplayer-server', rooms: rooms.size });
});

// Jedyne miejsce, które WYKONUJE faktyczne, ostateczne opuszczenie pokoju:
// emituje prawdziwe 'player-left' (to ten sygnał main.js/Game.js traktuje
// jako koniec meczu, patrz onPlayerLeft), usuwa gracza z listy, czyści jego
// token i - jeśli trzeba - usuwa pusty pokój albo przekazuje rolę hosta.
// Wywoływane zarówno z jawnego 'leave-room' (natychmiast, bez okresu
// karencji - to świadoma decyzja gracza, nie zanik sieci), jak i z timera
// karencji po zerwaniu połączenia (patrz socket.on('disconnect') niżej).
function removePlayerFromRoom(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;

  room.players = room.players.filter((id) => id !== socketId);
  room.tokens.delete(socketId);

  io.to(roomId).emit('player-left', { playerId: socketId });

  if (room.players.length === 0) {
    rooms.delete(roomId);
    debugLog(`Room ${roomId} deleted (empty)`);
  } else if (room.host === socketId) {
    room.host = room.players[0];
    debugLog(`Host transferred to ${room.host} in room ${roomId}`);
  }
}

io.on('connection', (socket) => {
  debugLog('Player connected:', socket.id);
  
  // Utwórz pokój
  socket.on('create-room', (data, callback) => {
    if (typeof callback !== 'function') return;

    if (isRoomCreateRateLimited(socket.id)) {
      callback({ success: false, error: 'Too many rooms created, try again later' });
      return;
    }

    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const token = generateReconnectToken();
    
    rooms.set(roomId, {
      id: roomId,
      host: socket.id,
      players: [socket.id],
      tokens: new Map([[socket.id, token]]), // socket.id -> reconnect token (patrz rejoin-room)
      pendingDisconnects: new Map(), // reconnect token -> { socketId, timer } dla graczy w oknie karencji
      gameState: 'waiting',
      createdAt: Date.now()
    });
    
    socket.join(roomId);
    
    debugLog(`Room created: ${roomId} by ${socket.id}`);
    
    callback({
      success: true,
      roomId: roomId,
      token
    });
  });
  
  // Dołącz do pokoju
  socket.on('join-room', (data, callback) => {
    if (typeof callback !== 'function') return;

    if (!data || !isValidRoomId(data.roomId)) {
      callback({ success: false, error: 'Invalid room id' });
      return;
    }

    const room = rooms.get(data.roomId);
    
    if (!room) {
      callback({ success: false, error: 'Room not found' });
      return;
    }
    
    if (room.players.length >= 2) {
      callback({ success: false, error: 'Room is full' });
      return;
    }
    
    if (room.gameState !== 'waiting') {
      callback({ success: false, error: 'Game already started' });
      return;
    }
    
    room.players.push(socket.id);
    const token = generateReconnectToken();
    room.tokens.set(socket.id, token);
    socket.join(data.roomId);
    
    debugLog(`Player ${socket.id} joined room ${data.roomId}`);
    
    // Powiadom hosta
    io.to(room.host).emit('player-joined', {
      playerId: socket.id
    });
    
    callback({
      success: true,
      roomId: data.roomId,
      host: room.host,
      token
    });
  });
  
  // Powrót po zerwaniu połączenia (patrz socket.on('disconnect') niżej i
  // RECONNECT_GRACE_MS) - klient wywołuje to SAM, automatycznie, zaraz po
  // tym jak socket.io samo odtworzy transport (patrz _attemptRejoin() w
  // MultiplayerManager.js), używając tokena zapamiętanego przy
  // create-room/join-room. Nowy socket.id zastępuje stary wszędzie w
  // pokoju - z punktu widzenia drugiego gracza to ten sam przeciwnik, nie
  // nowy uczestnik.
  socket.on('rejoin-room', (data, callback) => {
    if (typeof callback !== 'function') return;

    if (!data || !isValidRoomId(data.roomId) || typeof data.token !== 'string' || data.token.length > 64) {
      callback({ success: false, error: 'Invalid rejoin request' });
      return;
    }

    const room = rooms.get(data.roomId);
    if (!room) {
      callback({ success: false, error: 'Room no longer exists' });
      return;
    }

    const pending = room.pendingDisconnects.get(data.token);
    if (!pending) {
      // Albo okno karencji już minęło (removePlayerFromRoom już posprzątał
      // i wysłał prawdziwe 'player-left'), albo token jest po prostu zły -
      // w obu przypadkach nie ma już do czego wracać.
      callback({ success: false, error: 'Reconnect window expired' });
      return;
    }

    clearTimeout(pending.timer);
    room.pendingDisconnects.delete(data.token);

    const oldSocketId = pending.socketId;
    room.players = room.players.map((id) => (id === oldSocketId ? socket.id : id));
    room.tokens.delete(oldSocketId);
    room.tokens.set(socket.id, data.token);
    if (room.host === oldSocketId) {
      room.host = socket.id;
    }

    socket.join(data.roomId);

    debugLog(`Player rejoined room ${data.roomId} as ${socket.id} (was ${oldSocketId})`);

    socket.to(data.roomId).emit('opponent-reconnected');

    callback({
      success: true,
      roomId: data.roomId,
      isHost: room.host === socket.id
    });
  });
  
  // Input gracza
  socket.on('player-input', (data) => {
    if (!data || !isValidRoomId(data.roomId) || !isValidAction(data.action)) return;

    const room = rooms.get(data.roomId);
    if (!room || !room.players.includes(socket.id)) return;
    
    // Przekaż input do innych graczy w pokoju
    socket.to(data.roomId).emit('player-input', {
      playerId: socket.id,
      action: data.action,
      data: data.data,
      timestamp: data.timestamp
    });
  });
  
  // Aktualizacja stanu gry - korekta dryfu pozycji przeciwnika (patrz
  // Game.js#update / RemotePlayer.js#applyRemoteState). Celowo NIE
  // ograniczone do hosta: obie strony wysyłają okresowo swoją WŁASNĄ
  // pozycję, żeby druga strona mogła skorygować swój lokalny model tego
  // gracza. To bezpieczne rozluźnienie względem poprzedniej wersji
  // (tylko host) - kanał ten i tak nigdy nie decyduje o WYNIKU rundy (ten
  // ustala wyłącznie lokalna detekcja kolizji każdego klienta), więc
  // dopuszczenie obu graczy do wysyłania niczego tu nie osłabia.
  socket.on('game-state-update', (data) => {
    if (!data || !isValidRoomId(data.roomId)) return;
    const room = rooms.get(data.roomId);
    if (!room || !room.players.includes(socket.id)) return;
    
    // Przekaż stan gry do innych graczy w pokoju
    socket.to(data.roomId).emit('game-state-update', data.gameState);
  });
  
  // Rozpocznij grę
  socket.on('start-game', (data) => {
    if (!data || !isValidRoomId(data.roomId)) return;
    const room = rooms.get(data.roomId);
    if (!room || room.host !== socket.id) return;
    
    if (room.players.length < 2) {
      debugLog('Cannot start game: not enough players');
      return;
    }
    
    room.gameState = 'playing';
    
    // Powiadom wszystkich graczy
    io.to(data.roomId).emit('game-start');
    
    debugLog(`Game started in room ${data.roomId}`);
  });
  
  // Zakończ grę
  socket.on('game-end', (data) => {
    if (!data || !isValidRoomId(data.roomId)) return;
    const room = rooms.get(data.roomId);
    if (!room) return;
    
    room.gameState = 'ended';
    
    // Powiadom wszystkich graczy
    io.to(data.roomId).emit('game-end', {
      winner: data.winner
    });
    
    debugLog(`Game ended in room ${data.roomId}, winner: ${data.winner}`);
  });
  
  // Opuść pokój
  socket.on('leave-room', (data) => {
    if (!data || !isValidRoomId(data.roomId)) return;
    const room = rooms.get(data.roomId);
    if (!room) return;

    socket.leave(data.roomId);
    // Jawne, świadome opuszczenie pokoju - NIE przechodzi przez okres
    // karencji (to nie zerwanie połączenia, gracz naciskał "LEAVE ROOM").
    removePlayerFromRoom(data.roomId, socket.id);
  });
  
  // Rozłącz
  socket.on('disconnect', () => {
    debugLog('Player disconnected:', socket.id);

    roomCreateTimestamps.delete(socket.id);

    for (const [roomId, room] of rooms.entries()) {
      if (!room.players.includes(socket.id)) continue;

      const token = room.tokens.get(socket.id);

      // Sam w pokoju (albo, teoretycznie, brak tokena z jakiegoś powodu) -
      // nie ma na kogo czekać, usuń jak dawniej, natychmiast.
      if (room.players.length < 2 || !token) {
        removePlayerFromRoom(roomId, socket.id);
        continue;
      }

      debugLog(`Player ${socket.id} lost connection to room ${roomId} - ${RECONNECT_GRACE_MS}ms na powrót`);

      // Miękki sygnał "przeciwnik ma problem z siecią" - main.js NIE
      // traktuje tego jako koniec meczu (w przeciwieństwie do prawdziwego
      // 'player-left', wysyłanego dopiero z removePlayerFromRoom, gdy okno
      // na powrót faktycznie minie).
      socket.to(roomId).emit('opponent-disconnected');

      const timer = setTimeout(() => {
        room.pendingDisconnects.delete(token);
        removePlayerFromRoom(roomId, socket.id);
      }, RECONNECT_GRACE_MS);

      room.pendingDisconnects.set(token, { socketId: socket.id, timer });
    }
  });
});

// Sprzątanie porzuconych pokoi - siatka bezpieczeństwa NIEZALEŻNA od zdarzenia
// 'disconnect' powyżej. 'disconnect' powinno odpalić się prawie zawsze (nawet
// przy zamknięciu karty czy zaniku sieci, dzięki wbudowanemu ping-timeoutowi
// Socket.io), ale nie ma stuprocentowej gwarancji (np. proces serwera padł i
// wstał na nowo z tym samym Map() w pamięci, albo klient utknął w dziwnym
// stanie sieci) - a rooms to zwykła Map() w pamięci procesu, bez żadnego TTL.
// Bez tego pojedyncze zapomniane/martwe pokoje wolno, ale w nieskończoność
// rosłyby w pamięci na długo działającym serwerze. Dwa progi:
// - pokój w stanie 'waiting' (nikt nie dołączył/nie wystartował) dłużej niż
//   30 minut - ktoś otworzył lobby i już nie wrócił,
// - pokój w dowolnym stanie dłużej niż 6 godzin - żaden realny mecz tyle nie
//   trwa, to na pewno śmieć.
const STALE_WAITING_ROOM_MS = 30 * 60 * 1000;
const STALE_ANY_ROOM_MS = 6 * 60 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  for (const [roomId, room] of rooms.entries()) {
    const age = now - room.createdAt;
    const isStale = age > STALE_ANY_ROOM_MS ||
      (room.gameState === 'waiting' && age > STALE_WAITING_ROOM_MS);
    if (isStale) {
      io.to(roomId).emit('player-left', { playerId: null, reason: 'room-expired' });
      rooms.delete(roomId);
      debugLog(`Room ${roomId} deleted (stale, age ${Math.round(age / 60000)}min)`);
    }
  }
}, 5 * 60 * 1000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

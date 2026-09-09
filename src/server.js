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

// Ten serwer NIE serwuje plików klienta - to wyłącznie backend WebSocket
// (Socket.io) dla trybu multiplayer. Statyczny klient 3D jest hostowany
// osobno przez GitHub Pages (patrz faza 0: base: '/TRON/3d/' w
// vite.config.js) i łączy się z tym serwerem przez CORS-owy WebSocket
// (stąd origin: '*' poniżej). Ten serwer trzeba wdrożyć osobno (np. Render,
// Railway, Fly.io) - GitHub Pages nie uruchamia Node.js.
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'tron-multiplayer-server', rooms: rooms.size });
});

io.on('connection', (socket) => {
  debugLog('Player connected:', socket.id);
  
  // Utwórz pokój
  socket.on('create-room', (data, callback) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    rooms.set(roomId, {
      id: roomId,
      host: socket.id,
      players: [socket.id],
      gameState: 'waiting',
      createdAt: Date.now()
    });
    
    socket.join(roomId);
    
    debugLog(`Room created: ${roomId} by ${socket.id}`);
    
    callback({
      success: true,
      roomId: roomId
    });
  });
  
  // Dołącz do pokoju
  socket.on('join-room', (data, callback) => {
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
    socket.join(data.roomId);
    
    debugLog(`Player ${socket.id} joined room ${data.roomId}`);
    
    // Powiadom hosta
    io.to(room.host).emit('player-joined', {
      playerId: socket.id
    });
    
    callback({
      success: true,
      roomId: data.roomId,
      host: room.host
    });
  });
  
  // Input gracza
  socket.on('player-input', (data) => {
    const room = rooms.get(data.roomId);
    if (!room) return;
    
    // Przekaż input do innych graczy w pokoju
    socket.to(data.roomId).emit('player-input', {
      playerId: socket.id,
      action: data.action,
      data: data.data,
      timestamp: data.timestamp
    });
  });
  
  // Aktualizacja stanu gry (tylko host wysyła)
  socket.on('game-state-update', (data) => {
    const room = rooms.get(data.roomId);
    if (!room || room.host !== socket.id) return;
    
    // Przekaż stan gry do innych graczy
    socket.to(data.roomId).emit('game-state-update', data.gameState);
  });
  
  // Rozpocznij grę
  socket.on('start-game', (data) => {
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
    const room = rooms.get(data.roomId);
    if (!room) return;
    
    room.players = room.players.filter(id => id !== socket.id);
    socket.leave(data.roomId);
    
    // Powiadom innych graczy
    socket.to(data.roomId).emit('player-left', {
      playerId: socket.id
    });
    
    // Usuń pokój jeśli pusty
    if (room.players.length === 0) {
      rooms.delete(data.roomId);
      debugLog(`Room ${data.roomId} deleted (empty)`);
    } else if (room.host === socket.id) {
      // Przekaż hosta
      room.host = room.players[0];
      debugLog(`Host transferred to ${room.host} in room ${data.roomId}`);
    }
  });
  
  // Rozłącz
  socket.on('disconnect', () => {
    debugLog('Player disconnected:', socket.id);
    
    // Usuń gracza ze wszystkich pokoi
    for (const [roomId, room] of rooms.entries()) {
      if (room.players.includes(socket.id)) {
        room.players = room.players.filter(id => id !== socket.id);
        
        // Powiadom innych graczy
        socket.to(roomId).emit('player-left', {
          playerId: socket.id
        });
        
        // Usuń pokój jeśli pusty
        if (room.players.length === 0) {
          rooms.delete(roomId);
          debugLog(`Room ${roomId} deleted (player disconnected)`);
        }
      }
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

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
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
  console.log('Player connected:', socket.id);
  
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
    
    console.log(`Room created: ${roomId} by ${socket.id}`);
    
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
    
    console.log(`Player ${socket.id} joined room ${data.roomId}`);
    
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
      console.log('Cannot start game: not enough players');
      return;
    }
    
    room.gameState = 'playing';
    
    // Powiadom wszystkich graczy
    io.to(data.roomId).emit('game-start');
    
    console.log(`Game started in room ${data.roomId}`);
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
    
    console.log(`Game ended in room ${data.roomId}, winner: ${data.winner}`);
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
      console.log(`Room ${data.roomId} deleted (empty)`);
    } else if (room.host === socket.id) {
      // Przekaż hosta
      room.host = room.players[0];
      console.log(`Host transferred to ${room.host} in room ${data.roomId}`);
    }
  });
  
  // Rozłącz
  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    
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
          console.log(`Room ${roomId} deleted (player disconnected)`);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/* server.js
   Servidor minimal para manejar salas LAN y sincronizar acciones básicas.
*/
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'client')));

const rooms = new Map();

function makeRoomId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

// 🔥 Estado inicial del juego
function createInitialState(p1, p2) {
  return {
    turn: p1, // empieza jugador 1
    players: {
      [p1]: { hp: 20, creature: null },
      [p2]: { hp: 20, creature: null }
    }
  };
}

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  // ✅ CREAR SALA
  socket.on('createRoom', () => {
    const id = makeRoomId();

    rooms.set(id, {
      players: [socket.id],
      state: null
    });

    socket.join(id);
    socket.data.roomId = id;

    // 🔥 IMPORTANTE: emitir evento
    socket.emit('roomCreated', { roomId: id });

    console.log('Room created', id);
  });

  // ✅ UNIRSE A SALA
  socket.on('joinRoom', (roomId) => {
    const r = rooms.get(roomId);

    if (!r) {
      socket.emit('errorMsg', 'No existe la sala');
      return;
    }

    if (r.players.length >= 2) {
      socket.emit('errorMsg', 'Sala llena');
      return;
    }

    r.players.push(socket.id);
    socket.join(roomId);
    socket.data.roomId = roomId;

    io.to(roomId).emit('playerJoined', { id: socket.id });

    console.log(socket.id, 'joined', roomId);

    // 🔥 INICIAR PARTIDA AUTOMÁTICAMENTE
    if (r.players.length === 2) {
      const [p1, p2] = r.players;

      r.state = createInitialState(p1, p2);

      io.to(roomId).emit('gameStart', {
        state: r.state
      });
    }
  });

  // ✅ ACCIONES DEL JUEGO
  socket.on('gameAction', ({ action }) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);

    if (!room || !room.state) return;

    const state = room.state;
    const playerId = socket.id;

    // 🔒 validar turno
    if (state.turn !== playerId) {
      socket.emit('errorMsg', 'No es tu turno');
      return;
    }

    // 🎮 lógica básica
    switch (action.type) {

      case 'SUMMON':
        if (state.players[playerId].creature) {
          socket.emit('errorMsg', 'Ya tienes criatura');
          return;
        }

        state.players[playerId].creature = action.creature;

        // 🔥 habilidad al invocar
        if (action.creature.ability) {
          const enemyId = Object.keys(state.players).find(id => id !== playerId);
          action.creature.ability.effect(state.players[enemyId]);
        }

        break;

      case 'ATTACK':
        const enemyId = Object.keys(state.players).find(id => id !== playerId);

        const myCreature = state.players[playerId].creature;
        const enemyCreature = state.players[enemyId].creature;

        if (!myCreature || !enemyCreature) return;

        enemyCreature.hp -= myCreature.atk;

        if (enemyCreature.hp <= 0) {
          state.players[enemyId].creature = null;
        }

        break;

      case 'END_TURN':
        const ids = Object.keys(state.players);
        state.turn = ids.find(id => id !== playerId);
        break;
    }

    // 🔁 sincronizar estado
    io.to(roomId).emit('stateUpdate', state);
  });

  // ❌ desconexión
  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);

    const roomId = socket.data.roomId;

    if (roomId && rooms.has(roomId)) {
      const r = rooms.get(roomId);

      r.players = r.players.filter(p => p !== socket.id);

      io.to(roomId).emit('playerLeft', { id: socket.id });

      if (r.players.length === 0) {
        rooms.delete(roomId);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log('Summon Arena server listening on', PORT);
});
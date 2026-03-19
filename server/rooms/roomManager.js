const rooms = new Map();

module.exports = {
createRoom(socket, mode = 'duel') {
  const roomId = `room_${Date.now()}`;
  const room = {
    id: roomId,
    p1: { socketId: socket.id, creature: null, keys: 5, wins: 0, losses: 0 },
    p2: mode === 'practice' ? { socketId: 'AI', creature: null, isAI: true } : null,
    mode,
    state: null,
    log: [],
    turn: socket.id,
    pity: {}
  };
  
  if (mode === 'practice') {
    const creatureFactory = require('../core/creatureFactory');
    room.p2.creature = creatureFactory.invocarCriatura('AI');
    room.p2.keys = 999; // IA tiene llaves ilimitadas
  }
  
  rooms.set(roomId, room);
  socket.join(roomId);
  return roomId;
},

joinRoom(socket, roomId) {
  const room = rooms.get(roomId);
  if (!room || room.p2) return null;
  room.p2 = { socketId: socket.id, creature: null, keys: 5, wins: 0, losses: 0 };
  socket.join(roomId);
  return roomId;
},
  getRoom(roomId) {
    return rooms.get(roomId);
  },

  removePlayer(socketId) {
    for (const [id, room] of rooms) {
      if (room.p1 && room.p1.socketId === socketId) delete room.p1;
      if (room.p2 && room.p2.socketId === socketId) delete room.p2;
      if (!room.p1 && !room.p2) rooms.delete(id);
    }
  },

  getAllRooms() {
    return Array.from(rooms.values());
  }
};
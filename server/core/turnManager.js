module.exports = {
  nextTurn(room) {
    if (!room.state) return;

    // Cambiar turno
    const currentTurn = room.state.turn;
    const p1Id = room.p1.socketId;
    const p2Id = room.p2 ? room.p2.socketId : 'AI';

    room.state.turn = (currentTurn === p1Id) ? p2Id : p1Id;

    // Si es turno de la IA (modo practice), ejecutar automáticamente
    if (room.state.turn === 'AI' && room.mode === 'practice') {
      const aiAction = require('./combatEngine').simulateAI(room);
      const result = require('./combatEngine').processAction(room, 'AI', aiAction);

      room.state = result.newState;
      room.log = result.log;

      // Cambiar turno de nuevo al jugador
      room.state.turn = p1Id;
    }

    return room.state.turn;
  },

  initializeCombat(room) {
    room.state = {
      p1: { ...room.p1.creature },
      p2: { ...room.p2.creature },
      turn: room.p1.socketId,
      mode: room.mode
    };
    room.log = [`¡Combate iniciado! Turno de ${room.p1.creature.name}`];
    return room.state;
  }
};
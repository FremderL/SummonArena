const playerStore = require('../core/playerStore');
const combatService = require('../core/combatService');

function createSocketContext(io) {
  const rooms = new Map();
  const bossSessions = new Map();

  function getSocketByBattleId(battleId) {
    return io.sockets.sockets.get(battleId) || null;
  }

  function getPlayerIdFromBattleId(battleId) {
    const socket = getSocketByBattleId(battleId);
    return socket && socket.data && socket.data.playerId;
  }

  function destroyRoom(roomId) {
    const room = rooms.get(roomId);
    if (!room) return;
    const ids = [...room.players];
    if (room.wagersByPlayer && typeof room.wagersByPlayer === 'object') {
      for (const battleId of Object.keys(room.wagersByPlayer)) {
        const playerId = getPlayerIdFromBattleId(battleId) || (room.playerIds && room.playerIds[battleId]);
        const sock = getSocketByBattleId(battleId);
        if (!playerId) continue;
        playerStore.refundWager(playerId, room.wagersByPlayer[battleId]);
        if (sock) emitProfileSync(sock);
      }
    }
    rooms.delete(roomId);
    for (const sid of ids) {
      const sock = getSocketByBattleId(sid);
      if (sock) {
        sock.leave(roomId);
        delete sock.data.roomId;
      }
    }
  }

  function emitProfileSync(socket) {
    if (!socket || !socket.data.playerId) return;
    socket.emit('profileSync', playerStore.getProfilePayload(socket.data.playerId));
  }

  function emitLeaderboardSync(target = io) {
    target.emit('leaderboardSync', playerStore.getLeaderboard(10));
  }

  function syncProfilesFromState(state) {
    if (!state || !state.players) return;
    const allCreatures = Object.values(state.players)
      .map((slot) => slot && slot.creature)
      .filter(Boolean);
    for (const battleId of Object.keys(state.players)) {
      if (battleId === 'BOSS') continue;
      const playerId = getPlayerIdFromBattleId(battleId);
      const slot = state.players[battleId];
      if (!playerId || !slot) continue;
      playerStore.setCreature(playerId, slot.creature ? combatService.normalizeCreature(slot.creature) : null);
      playerStore.recordEncounterAbilities(playerId, allCreatures);
    }
  }

  return {
    io,
    rooms,
    bossSessions,
    getSocketByBattleId,
    getPlayerIdFromBattleId,
    destroyRoom,
    emitProfileSync,
    emitLeaderboardSync,
    syncProfilesFromState
  };
}

module.exports = createSocketContext;

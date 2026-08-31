const playerStore = require('../../core/playerStore');
const combatService = require('../../core/combatService');

function makeRoomId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function sanitizeMatchMode(rawMode) {
  return rawMode === 'practice' ? 'practice' : 'duel';
}

function normalizeWager(rawWager) {
  if (!rawWager || !rawWager.type || rawWager.type === 'none') return null;
  const type = String(rawWager.type || '');
  if (type === 'gold' || type === 'essence') {
    return { type, amount: Math.max(1, Number(rawWager.amount || 0)) };
  }
  if (type === 'relic') {
    return { type, relicId: String(rawWager.relicId || '') };
  }
  return null;
}

function describeWager(stake) {
  if (!stake) return 'Sin apuesta';
  if (stake.type === 'gold') return `${stake.amount} de oro`;
  if (stake.type === 'essence') return `${stake.amount} esencia(s)`;
  if (stake.type === 'relic') return stake.relicName || 'una reliquia';
  return 'Sin apuesta';
}

function registerRoomHandlers(ctx, socket) {
  socket.on('createRoom', (options = {}) => {
    const id = makeRoomId();
    const matchMode = sanitizeMatchMode(options && options.matchMode);
    const requestedWager = normalizeWager(options && options.wager);
    let reservedStake = null;
    if (matchMode === 'duel' && requestedWager && socket.data.playerId) {
      const wagerResult = playerStore.reserveWager(socket.data.playerId, requestedWager);
      if (wagerResult.error) {
        socket.emit('errorMsg', wagerResult.error);
        return;
      }
      reservedStake = wagerResult.stake;
      ctx.emitProfileSync(socket);
    }
    ctx.rooms.set(id, {
      players: [socket.id],
      playerNames: { [socket.id]: socket.data.playerName },
      playerIds: { [socket.id]: socket.data.playerId || null },
      matchMode,
      state: null,
      wagerType: reservedStake ? reservedStake.type : null,
      wagerPreview: reservedStake ? {
        type: reservedStake.type,
        amount: reservedStake.amount || 0,
        relicName: reservedStake.relicName || '',
        text: describeWager(reservedStake)
      } : null,
      wagersByPlayer: reservedStake ? { [socket.id]: reservedStake } : {}
    });
    socket.join(id);
    socket.data.roomId = id;
    socket.emit('roomCreated', { roomId: id, matchMode, wager: ctx.rooms.get(id).wagerPreview || null });
  });

  socket.on('joinRoom', (payload) => {
    const roomId = typeof payload === 'string' ? payload : String(payload && payload.roomId || '');
    const room = ctx.rooms.get(roomId);
    if (!room) {
      socket.emit('errorMsg', 'No existe la sala');
      return;
    }
    if (room.players.length >= 2) {
      socket.emit('errorMsg', 'Sala llena');
      return;
    }

    const requestedWager = normalizeWager(payload && payload.wager);
    if (room.wagerType) {
      if (!requestedWager || requestedWager.type !== room.wagerType) {
        socket.emit('errorMsg', 'Debes igualar el tipo de apuesta de la sala');
        return;
      }
      const creatorStake = room.wagersByPlayer && room.wagersByPlayer[room.players[0]];
      if (room.wagerType !== 'relic' && Number(requestedWager.amount || 0) !== Number(creatorStake && creatorStake.amount || 0)) {
        socket.emit('errorMsg', 'Debes igualar el valor exacto de la apuesta');
        return;
      }
      if (!socket.data.playerId) {
        socket.emit('errorMsg', 'Necesitas perfil activo para unirte a una apuesta');
        return;
      }
      const wagerResult = playerStore.reserveWager(socket.data.playerId, requestedWager);
      if (wagerResult.error) {
        socket.emit('errorMsg', wagerResult.error);
        return;
      }
      room.wagersByPlayer[socket.id] = wagerResult.stake;
      ctx.emitProfileSync(socket);
    }

    room.players.push(socket.id);
    room.playerNames[socket.id] = socket.data.playerName;
    room.playerIds[socket.id] = socket.data.playerId || null;
    socket.join(roomId);
    socket.data.roomId = roomId;
    ctx.io.to(roomId).emit('playerJoined', { id: socket.id, name: socket.data.playerName, wager: room.wagerPreview || null });

    if (room.players.length === 2) {
      const [p1, p2] = room.players;
      room.state = combatService.createInitialState(p1, p2, room.playerNames, room.matchMode);
      room.state.wager = room.wagerPreview || null;
      ctx.io.to(roomId).emit('gameStart', { state: room.state });
    }
  });

  socket.on('disconnect', () => {
    ctx.bossSessions.delete(socket.id);
    const roomId = socket.data.roomId;
    if (!roomId || !ctx.rooms.has(roomId)) return;
    ctx.io.to(roomId).emit('playerLeft', { id: socket.id });
    ctx.destroyRoom(roomId);
  });
}

module.exports = registerRoomHandlers;

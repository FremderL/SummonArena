const playerStore = require('../../core/playerStore');
const authService = require('../../core/authService');

function sanitizePlayerName(raw, fallback = 'Invocador') {
  const clean = String(raw || '').replace(/\s+/g, ' ').trim().slice(0, 18);
  return clean || fallback;
}

function sanitizePlayerId(raw) {
  const clean = String(raw || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
  return clean || `guest_${Math.random().toString(36).slice(2, 10)}`;
}

function registerProfileHandlers(ctx, socket) {
  socket.on('resumeAccount', ({ authToken } = {}) => {
    const result = authService.resume(authToken);
    if (result.error) {
      socket.emit('authSync', { username: null, authenticated: false, authToken: null });
      return;
    }

    socket.data.playerId = result.playerId;
    socket.data.playerName = result.profile.name;
    socket.data.accountUsername = result.username;
    socket.emit('authSync', { username: result.username, authenticated: true, authToken: result.authToken });
    socket.emit('identitySync', {
      playerId: result.playerId,
      playerName: result.profile.name,
      sessionToken: result.profile.sessionToken,
      replacedIdentity: null
    });
    ctx.emitProfileSync(socket);
    ctx.emitLeaderboardSync(socket);
  });

  socket.on('registerAccount', ({ username, password, playerName } = {}) => {
    const result = authService.register(username, password, playerName || socket.data.playerName || 'Invocador');
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }

    socket.data.playerId = result.playerId;
    socket.data.playerName = result.profile.name;
    socket.data.accountUsername = result.username;
    socket.emit('authSync', { username: result.username, authenticated: true, authToken: result.authToken });
    socket.emit('identitySync', {
      playerId: result.playerId,
      playerName: result.profile.name,
      sessionToken: result.profile.sessionToken,
      replacedIdentity: null
    });
    ctx.emitProfileSync(socket);
    ctx.emitLeaderboardSync(socket);
  });

  socket.on('loginAccount', ({ username, password } = {}) => {
    const result = authService.login(username, password);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }

    socket.data.playerId = result.playerId;
    socket.data.playerName = result.profile.name;
    socket.data.accountUsername = result.username;
    socket.emit('authSync', { username: result.username, authenticated: true, authToken: result.authToken });
    socket.emit('identitySync', {
      playerId: result.playerId,
      playerName: result.profile.name,
      sessionToken: result.profile.sessionToken,
      replacedIdentity: null
    });
    ctx.emitProfileSync(socket);
    ctx.emitLeaderboardSync(socket);
  });

  socket.on('logoutAccount', ({ authToken } = {}) => {
    authService.logout(authToken);
    socket.data.accountUsername = null;
    socket.emit('authSync', { username: null, authenticated: false, authToken: null });
  });

  socket.on('identify', ({ playerId, playerName, sessionToken } = {}) => {
    const result = playerStore.identify(sanitizePlayerId(playerId), sessionToken, sanitizePlayerName(playerName, 'Invocador'));
    socket.data.playerId = result.playerId;
    socket.data.playerName = result.profile.name;
    socket.emit('identitySync', {
      playerId: result.playerId,
      playerName: result.profile.name,
      sessionToken: result.profile.sessionToken,
      replacedIdentity: result.replacedIdentity || null
    });
    ctx.emitProfileSync(socket);
    ctx.emitLeaderboardSync(socket);
    socket.emit('authSync', { username: socket.data.accountUsername || null, authenticated: !!socket.data.accountUsername, authToken: null });
  });

  socket.on('setPlayerName', (rawName) => {
    socket.data.playerName = sanitizePlayerName(rawName, socket.data.playerName);
    if (socket.data.playerId) {
      const profile = playerStore.setPlayerName(socket.data.playerId, socket.data.playerName);
      socket.data.playerName = profile.name;
      ctx.emitProfileSync(socket);
      ctx.emitLeaderboardSync();
    }

    const roomId = socket.data.roomId;
    const room = roomId && ctx.rooms.get(roomId);
    if (!room) return;

    room.playerNames[socket.id] = socket.data.playerName;
    if (room.state && room.state.players[socket.id]) {
      room.state.players[socket.id].name = socket.data.playerName;
      ctx.io.to(roomId).emit('stateUpdate', room.state);
    } else {
      ctx.io.to(roomId).emit('playerJoined', { id: socket.id, name: socket.data.playerName });
    }
  });

  socket.on('summonCreature', () => {
    if (!socket.data.playerId) return;
    const result = playerStore.summonCreature(socket.data.playerId);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      ctx.emitProfileSync(socket);
      return;
    }
    socket.emit('summonResult', { creature: result.creature, profile: result.profile });
    ctx.emitProfileSync(socket);
    ctx.emitLeaderboardSync(socket);
  });

  socket.on('eternalizeCurrentCreature', () => {
    if (!socket.data.playerId) return;
    if (socket.data.roomId || ctx.bossSessions.has(socket.id)) {
      socket.emit('errorMsg', 'No puedes eternizar una criatura durante un combate');
      return;
    }
    const result = playerStore.eternalizeCurrentCreature(socket.data.playerId);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }
    socket.emit('profileSync', result.profile);
  });

  socket.on('equipPreservedCreature', ({ eternalId } = {}) => {
    if (!socket.data.playerId) return;
    if (socket.data.roomId || ctx.bossSessions.has(socket.id)) {
      socket.emit('errorMsg', 'No puedes cambiar de criatura durante un combate');
      return;
    }
    const result = playerStore.equipPreservedCreature(socket.data.playerId, eternalId);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }
    socket.emit('profileSync', result.profile);
  });

  socket.on('useConsumable', ({ consumableId } = {}) => {
    if (!socket.data.playerId) return;
    if (socket.data.roomId || ctx.bossSessions.has(socket.id)) {
      socket.emit('errorMsg', 'No puedes usar consumibles durante un combate');
      return;
    }
    const result = playerStore.useConsumable(socket.data.playerId, consumableId);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }
    socket.emit('profileSync', result.profile);
  });

  socket.on('buyShopItem', ({ itemId } = {}) => {
    if (!socket.data.playerId) return;
    if (socket.data.roomId || ctx.bossSessions.has(socket.id)) {
      socket.emit('errorMsg', 'No puedes comprar en la tienda durante un combate');
      return;
    }
    const result = playerStore.purchaseShopItem(socket.data.playerId, itemId);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }
    socket.emit('shopPurchaseResult', {
      item: result.item,
      goldLeft: result.profile.gold,
      keys: result.profile.keys,
      essence: result.profile.essence
    });
    socket.emit('profileSync', result.profile);
  });

  socket.on('equipBackground', ({ backgroundId } = {}) => {
    if (!socket.data.playerId) return;
    const result = playerStore.equipBackground(socket.data.playerId, backgroundId);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }
    socket.emit('profileSync', result.profile);
  });

  socket.on('equipCardFrame', ({ cardFrameId } = {}) => {
    if (!socket.data.playerId) return;
    const result = playerStore.equipCardFrame(socket.data.playerId, cardFrameId);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }
    socket.emit('profileSync', result.profile);
  });

  socket.on('equipRelic', ({ relicId } = {}) => {
    if (!socket.data.playerId) return;
    const result = playerStore.equipRelic(socket.data.playerId, relicId);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }
    socket.emit('profileSync', result.profile);
  });

  socket.on('deleteAccount', ({ sessionToken } = {}) => {
    if (!socket.data.playerId) {
      socket.emit('errorMsg', 'No hay cuenta activa');
      return;
    }
    if (socket.data.roomId || ctx.bossSessions.has(socket.id)) {
      socket.emit('errorMsg', 'No puedes borrar la cuenta durante un combate');
      return;
    }

    const result = playerStore.deleteAccount(socket.data.playerId, sessionToken);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }

    authService.removeByPlayerId(socket.data.playerId);

    ctx.emitLeaderboardSync();
    socket.emit('accountDeleted', result.deletedProfile);
    socket.data.playerId = null;
    socket.data.playerName = 'Invocador';
    socket.data.accountUsername = null;
  });

  socket.on('unlockCreatureLineage', ({ eternalId }) => {
    if (!socket.data.playerId) return;
    if (socket.data.roomId || ctx.bossSessions.has(socket.id)) {
      socket.emit('errorMsg', 'No puedes desbloquear linaje durante un combate');
      return;
    }
    const result = playerStore.unlockCreatureLineage(socket.data.playerId, eternalId);
    if (result.error) {
      socket.emit('errorMsg', result.error);
      return;
    }
    socket.emit('lineageUnlocked', {
      ability: result.ability,
      message: result.message
    });
    socket.emit('profileSync', result.profile);
  });

  socket.on('getDivinityFragmentProgress', () => {
    if (!socket.data.playerId) return;
    const progress = playerStore.getDivinityFragmentProgress(socket.data.playerId);
    socket.emit('divinityFragmentProgress', progress);
  });
}

module.exports = registerProfileHandlers;

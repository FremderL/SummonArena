const playerStore = require('../../core/playerStore');
const creatureFactory = require('../../core/creatureFactory');
const combatService = require('../../core/combatService');

function mapRestoredCreatures(ctx, restoredCreatures) {
  if (!restoredCreatures) return null;
  return Object.fromEntries(
    Object.entries(restoredCreatures).map(([id, creature]) => [ctx.getPlayerIdFromBattleId(id) || id, creature])
  );
}

function emitDuelEndAndCleanup(ctx, roomId, duelPayload, state) {
  const room = ctx.rooms.get(roomId);
  const roomWagers = room && room.wagersByPlayer ? room.wagersByPlayer : null;
  const winnerBattleId = duelPayload.winnerId;
  const loserBattleId = duelPayload.loserId;
  const winnerStake = roomWagers ? roomWagers[winnerBattleId] || null : null;
  const loserStake = roomWagers ? roomWagers[loserBattleId] || null : null;

  if (roomWagers) {
    const winnerPlayerId = ctx.getPlayerIdFromBattleId(winnerBattleId);
    const loserPlayerId = ctx.getPlayerIdFromBattleId(loserBattleId);
    if (winnerPlayerId) playerStore.resolveWager(winnerPlayerId, 'winner', winnerStake, loserStake);
    if (loserPlayerId) playerStore.resolveWager(loserPlayerId, 'loser', loserStake, winnerStake);
    if (room) room.wagersByPlayer = null;
  }

  if (state && state.players) {
    for (const battleId of Object.keys(state.players)) {
      if (battleId === 'BOSS') continue;
      const sock = ctx.getSocketByBattleId(battleId);
      const playerId = ctx.getPlayerIdFromBattleId(battleId);
      if (!sock || !playerId) continue;
      playerStore.applyDuelEnd(playerId, {
        ...duelPayload,
        winnerId: ctx.getPlayerIdFromBattleId(duelPayload.winnerId) || duelPayload.winnerId,
        loserId: ctx.getPlayerIdFromBattleId(duelPayload.loserId) || duelPayload.loserId,
        restoredCreatures: mapRestoredCreatures(ctx, duelPayload.restoredCreatures),
        wager: roomWagers ? {
          type: winnerStake ? winnerStake.type : loserStake ? loserStake.type : null,
          winnerStake,
          loserStake
        } : null
      });
      ctx.emitProfileSync(sock);
    }
  }

  ctx.emitLeaderboardSync();

  ctx.io.to(roomId).emit('duelEnd', {
    ...duelPayload,
    winnerId: ctx.getPlayerIdFromBattleId(duelPayload.winnerId) || duelPayload.winnerId,
    loserId: ctx.getPlayerIdFromBattleId(duelPayload.loserId) || duelPayload.loserId,
    restoredCreatures: mapRestoredCreatures(ctx, duelPayload.restoredCreatures),
    wager: roomWagers ? {
      type: winnerStake ? winnerStake.type : loserStake ? loserStake.type : null,
      winnerStake,
      loserStake
    } : null
  });
  ctx.destroyRoom(roomId);
}

function handleResolvedState(ctx, roomId, state) {
  let duelPayload = null;
  if (state._duelEndPayload) {
    duelPayload = { ...state._duelEndPayload };
    delete state._duelEndPayload;
  }

  ctx.io.to(roomId).emit('stateUpdate', state);
  ctx.syncProfilesFromState(state);

  if (duelPayload) emitDuelEndAndCleanup(ctx, roomId, duelPayload, state);
}

function handleBossResolvedState(ctx, socket, state) {
  let duelPayload = null;
  if (state._duelEndPayload) {
    duelPayload = { ...state._duelEndPayload };
    delete state._duelEndPayload;
  }

  socket.emit('stateUpdate', state);
  const playerSlot = state.players[socket.id];
  if (playerSlot && socket.data.playerId) {
    playerStore.setCreature(socket.data.playerId, playerSlot.creature ? combatService.normalizeCreature(playerSlot.creature) : null);
    ctx.emitProfileSync(socket);
  }

  if (duelPayload && socket.data.playerId) {
    playerStore.applyDuelEnd(socket.data.playerId, {
      ...duelPayload,
      winnerId: duelPayload.winnerId === socket.id ? socket.data.playerId : duelPayload.winnerId,
      loserId: duelPayload.loserId === socket.id ? socket.data.playerId : duelPayload.loserId
    });
    ctx.emitProfileSync(socket);
    ctx.emitLeaderboardSync();
    socket.emit('duelEnd', {
      ...duelPayload,
      winnerId: duelPayload.winnerId === socket.id ? socket.data.playerId : duelPayload.winnerId,
      loserId: duelPayload.loserId === socket.id ? socket.data.playerId : duelPayload.loserId
    });
    ctx.bossSessions.delete(socket.id);
  }
}

function registerCombatHandlers(ctx, socket) {
  socket.on('startBossBattle', () => {
    if (!socket.data.playerId) return;
    const profile = playerStore.getProfile(socket.data.playerId);
    if (!profile.creature) {
      socket.emit('errorMsg', 'Invoca criatura primero');
      ctx.emitProfileSync(socket);
      return;
    }

    const bossId = 'BOSS';
    const apostleIndex = playerStore.getNextApostleIndex(socket.data.playerId);
    const bossCreature = combatService.normalizeCreature(creatureFactory.invocarJefe({ index: apostleIndex }));
    const playerCreature = combatService.normalizeCreature(profile.creature);
    const profileRelic = playerStore.getEquippedRelic(socket.data.playerId);
    combatService.applyPassiveBonusesOnSummon(playerCreature);
    combatService.applyPassiveBonusesOnSummon(bossCreature);
    const state = combatService.createInitialState(socket.id, bossId, { [socket.id]: socket.data.playerName, [bossId]: bossCreature.name }, 'boss');
    state.turn = socket.id;
    state.players[socket.id].creature = playerCreature;
    state.players[bossId].creature = bossCreature;
    state.players[bossId].name = bossCreature.name;
    combatService.applyRelicBonusesOnSummon(state, socket.id, profileRelic);
    combatService.primeBossState(state, bossId);
    ctx.bossSessions.set(socket.id, state);
    playerStore.recordEncounterAbilities(socket.data.playerId, [playerCreature, bossCreature]);
    socket.emit('gameStart', { state });
    ctx.emitProfileSync(socket);
  });

  socket.on('gameAction', ({ action }) => {
    const roomId = socket.data.roomId;
    const room = roomId && ctx.rooms.get(roomId);

    if (room && room.state) {
      const profile = socket.data.playerId ? playerStore.getProfile(socket.data.playerId) : { creature: null };
      const result = combatService.resolveAction(room.state, socket.id, action, {
        profileCreature: profile.creature,
        profileRelic: socket.data.playerId ? playerStore.getEquippedRelic(socket.data.playerId) : null
      });
      if (result.error) {
        socket.emit('errorMsg', result.error);
        return;
      }
      handleResolvedState(ctx, roomId, room.state);
      return;
    }

    const bossState = ctx.bossSessions.get(socket.id);
    if (!bossState) return;

    const profile = socket.data.playerId ? playerStore.getProfile(socket.data.playerId) : { creature: null };
    const playerResult = combatService.resolveAction(bossState, socket.id, action, {
      profileCreature: profile.creature,
      profileRelic: socket.data.playerId ? playerStore.getEquippedRelic(socket.data.playerId) : null
    });
    if (playerResult.error) {
      socket.emit('errorMsg', playerResult.error);
      return;
    }
    if (!bossState._duelEndPayload && bossState.turn === 'BOSS') {
      combatService.resolveBossTurn(bossState, 'BOSS');
    }
    handleBossResolvedState(ctx, socket, bossState);
  });
}

module.exports = registerCombatHandlers;

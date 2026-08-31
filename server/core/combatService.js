function createInitialState(p1, p2, playerNames = {}, matchMode = 'duel') {
  return {
    matchMode,
    turn: Math.random() < 0.5 ? p1 : p2,
    pendingDefenseBoost: {},
    activeEffects: [],
    bossIntent: null,
    bossRuntime: {},
    lineageAbilityUsed: {},
    players: {
      [p1]: { hp: 20, creature: null, name: playerNames[p1] || 'Jugador 1' },
      [p2]: { hp: 20, creature: null, name: playerNames[p2] || 'Jugador 2' }
    }
  };
}

function normalizeCreature(c) {
  if (!c || typeof c !== 'object') return c;
  const vida = Number(c.vida ?? c.hp ?? c.vidaMax) || 0;
  const vidaMax = Number(c.vidaMax ?? c.vida ?? c.hp) || vida;
  const ataque = Number(c.ataque ?? c.atk) || 0;
  const defensa = Number(c.defensa ?? c.def) || 0;
  return {
    ...c,
    vida,
    vidaMax,
    ataque,
    defensa,
    hp: vida,
    atk: ataque,
    def: defensa,
    regen: Math.max(1, Number(c.regen) || 1),
    _cooldowns: { ...(c._cooldowns || {}) }
  };
}

function sanitizeCreaturePayload(raw) {
  if (!raw || typeof raw !== 'object') return null;
  try {
    return JSON.parse(JSON.stringify(raw, (k, v) => (typeof v === 'function' ? undefined : v)));
  } catch (e) {
    return null;
  }
}

function cloneCreatureForRestore(creature) {
  if (!creature) return null;
  const clean = JSON.parse(JSON.stringify(creature));
  clean.vida = Number(clean.vidaMax ?? clean.vida ?? clean.hp) || 0;
  clean.hp = clean.vida;
  clean._cooldowns = {};
  return clean;
}

function getCreatureAbilities(creature) {
  return Array.isArray(creature && creature.abilities) ? creature.abilities : [];
}

function getAbilityById(creature, abilityId) {
  return getCreatureAbilities(creature).find((ability) => ability && ability.id === abilityId) || null;
}

function hasAbility(creature, abilityId) {
  return !!getAbilityById(creature, abilityId);
}

function ensureCreatureRuntime(creature) {
  if (!creature) return;
  if (!creature._cooldowns || typeof creature._cooldowns !== 'object') creature._cooldowns = {};
}

function ensureStateRuntime(state) {
  if (!state.pendingDefenseBoost || typeof state.pendingDefenseBoost !== 'object') state.pendingDefenseBoost = {};
  if (!Array.isArray(state.activeEffects)) state.activeEffects = [];
  if (!state.bossRuntime || typeof state.bossRuntime !== 'object') state.bossRuntime = {};
  if (!Object.prototype.hasOwnProperty.call(state, 'bossIntent')) state.bossIntent = null;
}

function getBossPhases(creature) {
  if (!creature || !Array.isArray(creature.bossPhases) || creature.bossPhases.length === 0) return [];
  return creature.bossPhases;
}

function getBossRuntime(state, bossId) {
  ensureStateRuntime(state);
  if (!state.bossRuntime[bossId]) {
    state.bossRuntime[bossId] = {
      phaseIndex: 0,
      patternIndex: 0
    };
  }
  return state.bossRuntime[bossId];
}

function getBossPhaseIndex(creature) {
  const phases = getBossPhases(creature);
  if (phases.length === 0) return 0;
  const lifePct = Number(creature.vida || 0) / Math.max(1, Number(creature.vidaMax || 1));
  let nextIndex = 0;
  for (let i = 1; i < phases.length; i += 1) {
    if (lifePct <= Number(phases[i].triggerBelowPct || 0)) nextIndex = i;
  }
  return nextIndex;
}

function getBossPhase(creature, phaseIndex) {
  const phases = getBossPhases(creature);
  if (phases.length === 0) return null;
  return phases[Math.min(phaseIndex, phases.length - 1)] || phases[0];
}

function syncBossPhase(state, bossId) {
  const bossCreature = state.players[bossId] && state.players[bossId].creature;
  if (!bossCreature) return { changed: false, phase: null, runtime: getBossRuntime(state, bossId) };
  const runtime = getBossRuntime(state, bossId);
  const phaseIndex = getBossPhaseIndex(bossCreature);
  const changed = runtime.phaseIndex !== phaseIndex;
  if (changed) {
    runtime.phaseIndex = phaseIndex;
    runtime.patternIndex = 0;
  }
  return { changed, phase: getBossPhase(bossCreature, runtime.phaseIndex), runtime };
}

function syncBossIntent(state, bossId) {
  ensureStateRuntime(state);
  const bossSlot = state.players[bossId];
  const bossCreature = bossSlot && bossSlot.creature;
  if (state.matchMode !== 'boss' || !bossCreature) {
    state.bossIntent = null;
    return null;
  }

  const phaseSync = syncBossPhase(state, bossId);
  const phase = phaseSync.phase;
  const pattern = phase && Array.isArray(phase.pattern) ? phase.pattern : [];
  const runtime = phaseSync.runtime;
  const step = pattern.length > 0 ? pattern[runtime.patternIndex % pattern.length] : null;

  state.bossIntent = step ? {
    bossId: bossCreature.bossId || bossCreature.name,
    bossName: bossCreature.name,
    phaseKey: phase && phase.key,
    phaseLabel: phase && phase.label,
    actionType: step.type,
    abilityId: step.abilityId || null,
    text: step.intent || 'Se prepara para atacar.'
  } : null;

  return state.bossIntent;
}

function pickReadyAbility(creature, preferredAbilityId) {
  const abilities = getCreatureAbilities(creature).filter((ability) => ability && ability.type === 'active');
  if (abilities.length === 0) return null;

  const preferred = preferredAbilityId ? abilities.find((ability) => ability.id === preferredAbilityId) : null;
  if (preferred && getCooldown(creature, preferred.id) <= 0) return preferred;

  return abilities.find((ability) => getCooldown(creature, ability.id) <= 0) || null;
}

function buildBossAction(state, bossId, playerId) {
  const bossCreature = state.players[bossId] && state.players[bossId].creature;
  const playerCreature = state.players[playerId] && state.players[playerId].creature;
  if (!bossCreature || !playerCreature) return { action: { type: 'ATTACK' }, phaseAnnouncement: '' };

  const phaseSync = syncBossPhase(state, bossId);
  const phase = phaseSync.phase;
  const runtime = phaseSync.runtime;
  const pattern = phase && Array.isArray(phase.pattern) ? phase.pattern : [];
  const step = pattern.length > 0 ? pattern[runtime.patternIndex % pattern.length] : null;
  runtime.patternIndex = pattern.length > 0 ? (runtime.patternIndex + 1) % pattern.length : 0;

  const readyAbility = step && step.abilityId ? pickReadyAbility(bossCreature, step.abilityId) : null;
  const abilityReady = readyAbility && readyAbility.id === step.abilityId;
  const silenced = getEffectModifier(state, bossId, 'silence') > 0;
  const phaseAnnouncement = phaseSync.changed && phase && phase.announce ? phase.announce : '';
  const phases = getBossPhases(bossCreature);
  const isFinalPhase = phases.length > 0 && runtime.phaseIndex === phases.length - 1;
  if (!state.lineageAbilityUsed) state.lineageAbilityUsed = {};
  const lineageReady = bossCreature.lineageAbility && !state.lineageAbilityUsed[bossId] && !silenced;

  if (lineageReady && isFinalPhase && (phaseSync.changed || !step || step.type === 'ABILITY')) {
    return { action: { type: 'LINEAGE_ABILITY' }, phaseAnnouncement };
  }

  if (step && step.type === 'ABILITY' && abilityReady && !silenced) {
    return { action: { type: 'ABILITY', abilityId: step.abilityId }, phaseAnnouncement };
  }
  if (step && step.type === 'DEFEND') {
    return { action: { type: 'DEFEND' }, phaseAnnouncement };
  }
  if (step && step.type === 'RECOVER') {
    return { action: { type: 'RECOVER' }, phaseAnnouncement };
  }
  if (!silenced) {
    const fallbackAbility = pickReadyAbility(bossCreature);
    if (fallbackAbility && (!step || step.type === 'ABILITY')) {
      return { action: { type: 'ABILITY', abilityId: fallbackAbility.id }, phaseAnnouncement };
    }
  }
  if (lineageReady && isFinalPhase) {
    return { action: { type: 'LINEAGE_ABILITY' }, phaseAnnouncement };
  }

  return {
    action: {
      type: decideAiAction(bossCreature, playerCreature) === 'DEFEND' ? 'DEFEND' : 'ATTACK'
    },
    phaseAnnouncement
  };
}

function applyPassiveBonusesOnSummon(creature) {
  if (!creature) return;
  ensureCreatureRuntime(creature);
  if (hasAbility(creature, 'auraDeSosten')) {
    creature.regen = Math.max(1, Number(creature.regen || 0) + 2);
  }
}

function applyRelicBonusesOnSummon(state, playerId, relic) {
  if (!state || !playerId || !relic) return;
  ensureStateRuntime(state);
  const effects = Array.isArray(relic.combatEffects)
    ? relic.combatEffects
    : relic.combatEffect
      ? [relic.combatEffect]
      : [];
  effects.forEach((effect) => {
    const alreadyApplied = state.activeEffects.some((entry) =>
      entry
      && entry.ownerId === playerId
      && entry.targetId === playerId
      && entry.sourceAbilityId === relic.relicId
      && entry.stat === effect.stat
    );
    if (alreadyApplied) return;
    state.activeEffects.push({
      sourceAbilityId: relic.relicId,
      sourceAbilityName: relic.relicName,
      ownerId: playerId,
      targetId: playerId,
      stat: effect.stat,
      amount: Number(effect.amount || 0),
      turnsLeft: Number(effect.durationTurns || 99)
    });
  });
}

function getEffects(state, targetId, stat) {
  ensureStateRuntime(state);
  return state.activeEffects.filter((effect) => effect && effect.targetId === targetId && effect.stat === stat);
}

function getEffectModifier(state, targetId, stat) {
  return getEffects(state, targetId, stat).reduce((sum, effect) => sum + Number(effect.amount || 0), 0);
}

function getEffectiveAttack(state, playerId) {
  const creature = state.players[playerId] && state.players[playerId].creature;
  const baseAtk = Number(creature && (creature.ataque ?? creature.atk)) || 0;
  let pct = getEffectModifier(state, playerId, 'attackPct');
  const flat = getEffectModifier(state, playerId, 'attackFlat');

  if (creature && hasAbility(creature, 'rabiaPrimordial')) {
    const lifePct = (Number(creature.vida || 0) / Math.max(1, Number(creature.vidaMax || 1)));
    if (lifePct <= 0.4) pct += 0.25;
  }

  return Math.max(1, Math.round((baseAtk * (1 + pct)) + flat));
}

function getEffectiveDefense(state, playerId) {
  const creature = state.players[playerId] && state.players[playerId].creature;
  const baseDef = Number(creature && (creature.defensa ?? creature.def)) || 0;
  const flat = getEffectModifier(state, playerId, 'defenseFlat');
  return Math.max(0, baseDef + flat);
}

function getCooldown(creature, abilityId) {
  ensureCreatureRuntime(creature);
  return Number(creature._cooldowns[abilityId] || 0);
}

function setCooldown(creature, abilityId, turns) {
  ensureCreatureRuntime(creature);
  creature._cooldowns[abilityId] = Math.max(0, Number(turns || 0));
}

function applyHpDelta(creature, delta) {
  const current = Number(creature.vida ?? creature.hp) || 0;
  const next = Math.max(0, Math.min(Number(creature.vidaMax || current), current + delta));
  creature.vida = next;
  creature.hp = next;
  return next;
}

function applyRecurringStatuses(state, playerId, logParts) {
  const creature = state.players[playerId] && state.players[playerId].creature;
  if (!creature) return;

  const bleed = getEffectModifier(state, playerId, 'bleed');
  if (bleed > 0) {
    applyHpDelta(creature, -bleed);
    logParts.push(`${creature.name || 'Criatura'} sufre ${bleed} por Sangrado`);
  }

  const burn = getEffectModifier(state, playerId, 'burn');
  if (burn > 0) {
    applyHpDelta(creature, -burn);
    logParts.push(`${creature.name || 'Criatura'} arde por ${burn}`);
  }

  const regenTurn = getEffectModifier(state, playerId, 'regenTurn');
  if (regenTurn > 0) {
    applyHpDelta(creature, regenTurn);
    logParts.push(`${creature.name || 'Criatura'} regenera ${regenTurn} HP`);
  }
}

function tickStartOfTurn(state, playerId) {
  ensureStateRuntime(state);
  const slot = state.players[playerId];
  const creature = slot && slot.creature;
  const logs = [];

  if (creature) {
    ensureCreatureRuntime(creature);
    for (const [abilityId, turns] of Object.entries(creature._cooldowns)) {
      creature._cooldowns[abilityId] = Math.max(0, Number(turns || 0) - 1);
    }
    applyRecurringStatuses(state, playerId, logs);
  }

  state.activeEffects = state.activeEffects
    .map((effect) => {
      if (!effect || effect.ownerId !== playerId) return effect;
      return { ...effect, turnsLeft: Number(effect.turnsLeft || 0) - 1 };
    })
    .filter((effect) => effect && Number(effect.turnsLeft || 0) > 0 && Number(effect.amount || 0) !== 0);

  return logs;
}

function endTurn(state, currentPlayerId) {
  const nextPlayerId = Object.keys(state.players).find((id) => id !== currentPlayerId);
  if (!nextPlayerId) return;
  state.turn = nextPlayerId;
  const startLogs = tickStartOfTurn(state, nextPlayerId);
  if (startLogs.length > 0) {
    state.lastCombatLine = `${state.lastCombatLine || ''} ${startLogs.join('. ')}.`.trim();
  }
}

function addEffectsFromAbility(state, casterId, enemyId, ability) {
  ensureStateRuntime(state);
  if (!ability || !Array.isArray(ability.effects)) return [];
  const added = [];
  for (const effect of ability.effects) {
    if (!effect) continue;
    const targetId = effect.target === 'self' ? casterId : enemyId;
    if (!targetId) continue;
    const entry = {
      sourceAbilityId: ability.id,
      sourceAbilityName: ability.name,
      ownerId: casterId,
      targetId,
      stat: effect.stat,
      amount: Number(effect.amount || 0),
      turnsLeft: Number(effect.durationTurns || ability.durationTurns || 2)
    };
    state.activeEffects.push(entry);
    added.push(entry);
  }
  return added;
}

function consumeShield(state, defenderId, damage) {
  let remaining = damage;
  const shieldEffects = getEffects(state, defenderId, 'shield');
  for (const effect of shieldEffects) {
    if (remaining <= 0) break;
    const absorbed = Math.min(Number(effect.amount || 0), remaining);
    effect.amount = Number(effect.amount || 0) - absorbed;
    remaining -= absorbed;
  }
  state.activeEffects = state.activeEffects.filter((effect) => !(effect && effect.stat === 'shield' && Number(effect.amount || 0) <= 0));
  return { remaining, absorbed: damage - remaining };
}

function applyThornsReflection(state, defenderId, attackerId, damage) {
  const defender = state.players[defenderId] && state.players[defenderId].creature;
  const attacker = state.players[attackerId] && state.players[attackerId].creature;
  if (!defender || !attacker) return 0;
  if (!hasAbility(defender, 'caparazonEspinas')) return 0;
  const reflected = Math.max(1, Math.round(Number(damage || 0) * 0.25));
  applyHpDelta(attacker, -reflected);
  return reflected;
}

function resolveDamage(state, attackerId, defenderId, damageMultiplier = 1) {
  ensureStateRuntime(state);
  const attacker = state.players[attackerId].creature;
  const defender = state.players[defenderId].creature;
  const atk = getEffectiveAttack(state, attackerId);
  const def = getEffectiveDefense(state, defenderId);
  const effectiveDef = (def * 0.6) + Number(state.pendingDefenseBoost[defenderId] || 0);

  let finalMultiplier = damageMultiplier;
  if (attacker && hasAbility(attacker, 'cazaImplacable')) {
    const defenderLifePct = (Number(defender.vida || 0) / Math.max(1, Number(defender.vidaMax || 1)));
    if (defenderLifePct <= 0.35 || getEffectModifier(state, defenderId, 'defenseFlat') < 0) {
      finalMultiplier += 0.2;
    }
  }

  if (attacker && attacker.bossMechanic === 'burst_window') {
    const defenderBoost = Number(state.pendingDefenseBoost[defenderId] || 0);
    if (defenderBoost > 0) finalMultiplier += 0.22;
  }

  const rawDamage = Math.max(1, Math.round((atk * finalMultiplier) - effectiveDef));
  const shieldResult = consumeShield(state, defenderId, rawDamage);
  const damage = Math.max(0, shieldResult.remaining);
  applyHpDelta(defender, -damage);
  delete state.pendingDefenseBoost[defenderId];
  const reflected = applyThornsReflection(state, defenderId, attackerId, damage);
  return { damage, nextHp: defender.vida, reflected, atk, effectiveDef, absorbed: shieldResult.absorbed };
}

function resolveDuelIfNeeded(state, attackerId, defenderId) {
  const attacker = state.players[attackerId] && state.players[attackerId].creature;
  const defender = state.players[defenderId] && state.players[defenderId].creature;
  const attackerHp = Number(attacker && (attacker.vida ?? attacker.hp)) || 0;
  const defenderHp = Number(defender && (defender.vida ?? defender.hp)) || 0;
  const practiceMode = state.matchMode === 'practice';
  const bossMode = state.matchMode === 'boss';
  const targetHp = practiceMode ? 1 : 0;
  const bossOrder = bossMode ? Number(defender && (defender.apostleOrder || defender.order) || 1) : 0;
  const bossCycle = bossMode
    ? Math.max(0, Math.floor((Number(defender && defender.difficultyTier || bossOrder) - 1) / 5))
    : 0;
  const rewardGold = practiceMode ? 0 : bossMode ? (22 + (bossOrder * 14) + (bossCycle * 12)) : 12;

  if (defender && defenderHp <= targetHp) {
    if (practiceMode) {
      defender.vida = Math.max(targetHp, defenderHp);
      defender.hp = defender.vida;
    } else {
      state.players[defenderId].creature = null;
    }
    state._duelEndPayload = {
      winnerId: attackerId,
      loserId: defenderId,
      rewardKeys: practiceMode ? 0 : bossMode ? 2 : 1,
      rewardGold,
      matchMode: state.matchMode,
      bossName: bossMode ? (defender && defender.name) : null,
      bossId: bossMode ? (defender && defender.bossId) : null,
      bossTitle: bossMode ? (defender && defender.title) : null,
      bossArchetype: bossMode ? (defender && defender.archetype) : null,
      bossRace: bossMode ? (defender && defender.race) : null,
      bossPantheon: bossMode ? (defender && defender.pantheon) : null,
      invocationView: bossMode ? (defender && defender.invocationView) : null,
      bossImage: bossMode ? (defender && defender.image) : null,
      bossRewardTitle: bossMode ? `Estandarte de ${defender && (defender.title || defender.name)}` : null,
      restoredCreatures: practiceMode ? {
        [attackerId]: cloneCreatureForRestore(attacker),
        [defenderId]: cloneCreatureForRestore(defender)
      } : null
    };
    return true;
  }

  if (attacker && attackerHp <= 0) {
    if (practiceMode) {
      attacker.vida = Math.max(targetHp, attackerHp);
      attacker.hp = attacker.vida;
    } else {
      state.players[attackerId].creature = null;
    }
    state._duelEndPayload = {
      winnerId: defenderId,
      loserId: attackerId,
      rewardKeys: practiceMode ? 0 : bossMode ? 2 : 1,
      matchMode: state.matchMode,
      bossName: bossMode ? (attacker && attacker.name) : null,
      bossId: bossMode ? (attacker && attacker.bossId) : null,
      bossTitle: bossMode ? (attacker && attacker.title) : null,
      bossArchetype: bossMode ? (attacker && attacker.archetype) : null,
      bossRace: bossMode ? (attacker && attacker.race) : null,
      bossPantheon: bossMode ? (attacker && attacker.pantheon) : null,
      invocationView: bossMode ? (attacker && attacker.invocationView) : null,
      bossImage: bossMode ? (attacker && attacker.image) : null,
      bossRewardTitle: bossMode ? `Estandarte de ${attacker && (attacker.title || attacker.name)}` : null,
      restoredCreatures: practiceMode ? {
        [attackerId]: cloneCreatureForRestore(attacker),
        [defenderId]: cloneCreatureForRestore(defender)
      } : null
    };
    return true;
  }

  return false;
}

function summarizeEffects(state, playerId) {
  ensureStateRuntime(state);
  const labels = [];

  state.activeEffects
    .filter((effect) => effect && effect.targetId === playerId)
    .forEach((effect) => {
      let label = effect.sourceAbilityName;
      if (effect.stat === 'bleed') label = 'Sangrado';
      else if (effect.stat === 'burn') label = 'Quemadura';
      else if (effect.stat === 'shield') label = 'Escudo';
      else if (effect.stat === 'silence') label = 'Silencio';
      else if (effect.stat === 'regenTurn') label = 'Regeneracion';
      else if (effect.stat === 'attackFlat') label = Number(effect.amount || 0) >= 0 ? 'Impulso' : 'Debilidad';
      else if (effect.stat === 'defenseFlat') label = Number(effect.amount || 0) >= 0 ? 'Fortificado' : 'Expuesto';
      labels.push(`${label} (${effect.turnsLeft})`);
    });

  return labels.join(', ');
}

function decideAiAction(aiCreature, playerCreature) {
  const ability = aiCreature && aiCreature.abilities && aiCreature.abilities[0];
  const cooldowns = (aiCreature && aiCreature._cooldowns) || {};
  const abilityReady = !!(ability && ability.type === 'active' && !(cooldowns[ability.id] > 0));
  const lifePct = aiCreature.vida / aiCreature.vidaMax;
  const enemyLifePct = playerCreature ? (playerCreature.vida / playerCreature.vidaMax) : 0;

  if (abilityReady && enemyLifePct < 0.4) return 'ABILITY';
  if (lifePct < 0.35 && abilityReady && ['muroAstral', 'pulsoVital', 'golpeVoraz'].includes(ability.id)) return 'ABILITY';
  if (lifePct < 0.45 && Math.random() < 0.45) return 'DEFEND';
  if (abilityReady && Math.random() < 0.55) return 'ABILITY';
  return 'ATTACK';
}

function resolveAction(state, playerId, action, options = {}) {
  if (!state || !action) return { error: 'Estado o accion invalida' };
  ensureStateRuntime(state);
  const enemyId = Object.keys(state.players).find((id) => id !== playerId);

  if (action.type !== 'SUMMON' && state.turn !== playerId) {
    return { error: 'No es tu turno' };
  }

  switch (action.type) {
    case 'SUMMON': {
      const slot = state.players[playerId];
      if (!slot) return { error: 'Jugador invalido' };
      if (slot.creature) return { error: 'Ya tienes criatura' };
      const cleaned = sanitizeCreaturePayload(options.profileCreature || action.creature);
      if (!cleaned) return { error: 'Criatura invalida' };
      slot.creature = normalizeCreature(cleaned);
      applyPassiveBonusesOnSummon(slot.creature);
      applyRelicBonusesOnSummon(state, playerId, options.profileRelic);
      break;
    }

    case 'ATTACK': {
      const mine = state.players[playerId].creature;
      const theirs = state.players[enemyId] && state.players[enemyId].creature;
      if (!mine || !theirs) return { error: 'Faltan criaturas para atacar' };
      const result = resolveDamage(state, playerId, enemyId, 1);
      state.lastCombatLine = `${mine.name || 'Criatura'} ataca e inflige ${result.damage} HP a ${theirs.name || 'Rival'} (${result.nextHp} HP).`;
      if (result.absorbed > 0) state.lastCombatLine += ` Escudo absorbe ${result.absorbed}.`;
      if (result.reflected > 0) state.lastCombatLine += ` Espinas devuelve ${result.reflected} HP.`;
      if (!resolveDuelIfNeeded(state, playerId, enemyId)) endTurn(state, playerId);
      break;
    }

    case 'DEFEND': {
      const mine = state.players[playerId].creature;
      if (!mine) return { error: 'No tienes criatura' };
      const buff = hasAbility(mine, 'pielDeGuerra') ? 9 : 6;
      const enemy = state.players[enemyId] && state.players[enemyId].creature;
      const weakenedBuff = enemy && enemy.bossMechanic === 'anti_defense' ? Math.max(3, buff - 3) : buff;
      state.pendingDefenseBoost[playerId] = weakenedBuff;
      if (hasAbility(mine, 'pielDeGuerra')) {
        state.activeEffects.push({
          sourceAbilityId: 'pielDeGuerra',
          sourceAbilityName: 'Piel De Guerra',
          ownerId: playerId,
          targetId: playerId,
          stat: 'shield',
          amount: 6,
          turnsLeft: 1
        });
      }
      state.lastCombatLine = `${mine.name || 'Criatura'} se defiende (+${weakenedBuff} DEF al siguiente golpe).`;
      if (enemy && enemy.bossMechanic === 'anti_defense') state.lastCombatLine += ` ${enemy.name} fractura parte de la guardia defensiva.`;
      if (hasAbility(mine, 'pielDeGuerra')) state.lastCombatLine += ' Piel De Guerra refuerza su guardia.';
      endTurn(state, playerId);
      break;
    }

    case 'RECOVER': {
      const mine = state.players[playerId].creature;
      if (!mine) return { error: 'No tienes criatura' };
      const enemy = state.players[enemyId] && state.players[enemyId].creature;
      const antiRecoverPenalty = enemy && enemy.bossMechanic === 'anti_recover' ? 0.72 : 1;
      const burnPenalty = getEffectModifier(state, playerId, 'burn') > 0 ? 0.55 : 1;
      const finalPenalty = burnPenalty * antiRecoverPenalty;
      const heal = Math.max(6, Math.round((6 + (Number(mine.regen) || 0) * 2) * finalPenalty));
      applyHpDelta(mine, heal);
      state.lastCombatLine = `${mine.name || 'Criatura'} recupera ${heal} HP.`;
      if (burnPenalty < 1) state.lastCombatLine += ' La quemadura reduce su curacion.';
      if (enemy && enemy.bossMechanic === 'anti_recover') state.lastCombatLine += ` ${enemy.name} presiona e impide una recuperacion completa.`;
      endTurn(state, playerId);
      break;
    }

    case 'ABILITY': {
      const mine = state.players[playerId].creature;
      const theirs = state.players[enemyId] && state.players[enemyId].creature;
      if (!mine || !theirs) return { error: 'Faltan criaturas para usar habilidad' };
      if (getEffectModifier(state, playerId, 'silence') > 0) return { error: 'Tu criatura esta silenciada.' };
      const abilityId = action.abilityId || (mine.abilities && mine.abilities[0] && mine.abilities[0].id);
      const ability = getAbilityById(mine, abilityId);
      if (!ability) return { error: 'Tu criatura no tiene esa habilidad' };
      if (ability.type === 'passive') return { error: `${ability.name} es pasiva y no se usa manualmente` };
      if (getCooldown(mine, ability.id) > 0) return { error: `${ability.name} sigue en cooldown (${getCooldown(mine, ability.id)} turno(s))` };

      const logParts = [`${mine.name || 'Criatura'} usa ${ability.name}`];

      if (ability.damageMultiplier) {
        const result = resolveDamage(state, playerId, enemyId, Number(ability.damageMultiplier || 1));
        logParts.push(`e inflige ${result.damage} HP a ${theirs.name || 'Rival'} (${result.nextHp} HP)`);
        if (result.absorbed > 0) logParts.push(`Escudo absorbe ${result.absorbed}`);
        if (result.reflected > 0) logParts.push(`Espinas devuelve ${result.reflected} HP`);
        if (ability.lifestealPct) {
          const heal = Math.max(1, Math.round(result.damage * Number(ability.lifestealPct)));
          applyHpDelta(mine, heal);
          logParts.push(`y roba ${heal} HP`);
        }
      }

      if (ability.healPercent) {
        const heal = Math.max(1, Math.round(mine.vidaMax * Number(ability.healPercent)));
        applyHpDelta(mine, heal);
        logParts.push(`y recupera ${heal} HP`);
      }

      const effects = addEffectsFromAbility(state, playerId, enemyId, ability);
      if (effects.length > 0) {
        const effectNames = [...new Set(effects.map((effect) => summarizeEffects({ ...state, activeEffects: [effect] }, effect.targetId)).filter(Boolean))];
        if (effectNames.length > 0) logParts.push(`aplica ${effectNames.join(', ')}`);
      }

      if (ability.cooldownTurns) setCooldown(mine, ability.id, Number(ability.cooldownTurns));
      state.lastCombatLine = logParts.join(' ');
      if (!resolveDuelIfNeeded(state, playerId, enemyId)) endTurn(state, playerId);
      break;
    }

    case 'LINEAGE_ABILITY': {
      const mine = state.players[playerId].creature;
      const theirs = state.players[enemyId] && state.players[enemyId].creature;
      if (!mine || !theirs) return { error: 'Faltan criaturas para usar habilidad de linaje' };
      if (!mine.lineageAbility) return { error: 'Tu criatura no tiene habilidad de linaje' };
      if (!state.lineageAbilityUsed) state.lineageAbilityUsed = {};
      if (state.lineageAbilityUsed[playerId]) return { error: 'Ya usaste tu habilidad de linaje en este combate' };

      const ability = mine.lineageAbility;
      const logParts = [`${mine.name || 'Criatura'} desata ${ability.name}`];

      if (ability.damageMultiplier) {
        const result = resolveDamage(state, playerId, enemyId, Number(ability.damageMultiplier || 1));
        logParts.push(`e inflige ${result.damage} HP a ${theirs.name || 'Rival'} (${result.nextHp} HP)`);
        if (result.absorbed > 0) logParts.push(`Escudo absorbe ${result.absorbed}`);
        if (result.reflected > 0) logParts.push(`Espinas devuelve ${result.reflected} HP`);
        if (ability.lifestealPct) {
          const heal = Math.max(1, Math.round(result.damage * Number(ability.lifestealPct)));
          applyHpDelta(mine, heal);
          logParts.push(`y roba ${heal} HP`);
        }
      }

      if (ability.healPercent) {
        const heal = Math.max(1, Math.round(mine.vidaMax * Number(ability.healPercent)));
        applyHpDelta(mine, heal);
        logParts.push(`y recupera ${heal} HP`);
      }

      const effects = addEffectsFromAbility(state, playerId, enemyId, ability);
      if (effects.length > 0) {
        const effectNames = [...new Set(effects.map((effect) => summarizeEffects({ ...state, activeEffects: [effect] }, effect.targetId)).filter(Boolean))];
        if (effectNames.length > 0) logParts.push(`aplica ${effectNames.join(', ')}`);
      }

      state.lineageAbilityUsed[playerId] = true;
      state.lastCombatLine = logParts.join(' ');
      if (!resolveDuelIfNeeded(state, playerId, enemyId)) endTurn(state, playerId);
      break;
    }

    default:
      return { error: 'Accion invalida' };
  }

  for (const id of Object.keys(state.players)) {
    const slot = state.players[id];
    if (!slot || !slot.creature) continue;
    slot.statusText = summarizeEffects(state, id);
  }

  if (state.matchMode === 'boss') {
    const bossId = Object.keys(state.players).find((id) => state.players[id] && state.players[id].creature && state.players[id].creature.bossId);
    if (bossId && state.players[bossId] && state.players[bossId].creature && state.players[bossId].creature.bossId) {
      syncBossIntent(state, bossId);
    } else if (state.players.BOSS && state.players.BOSS.creature) {
      syncBossIntent(state, 'BOSS');
    } else {
      state.bossIntent = null;
    }
  }

  return { state, duelPayload: state._duelEndPayload || null };
}

function resolveBossTurn(state, bossId) {
  if (!state || state.turn !== bossId) return { state, duelPayload: state && state._duelEndPayload };
  const playerId = Object.keys(state.players).find((id) => id !== bossId);
  const bossCreature = state.players[bossId] && state.players[bossId].creature;
  const playerCreature = state.players[playerId] && state.players[playerId].creature;
  if (!bossCreature || !playerCreature) return { state, duelPayload: state._duelEndPayload || null };
  const bossMove = buildBossAction(state, bossId, playerId);
  const result = resolveAction(state, bossId, bossMove.action);
  if (bossMove.phaseAnnouncement && state.lastCombatLine) {
    state.lastCombatLine = `${bossMove.phaseAnnouncement} ${state.lastCombatLine}`;
  } else if (bossMove.phaseAnnouncement) {
    state.lastCombatLine = bossMove.phaseAnnouncement;
  }
  syncBossIntent(state, bossId);
  return result;
}

function primeBossState(state, bossId) {
  if (!state || !bossId) return state;
  syncBossIntent(state, bossId);
  return state;
}

module.exports = {
  createInitialState,
  normalizeCreature,
  sanitizeCreaturePayload,
  applyPassiveBonusesOnSummon,
  applyRelicBonusesOnSummon,
  resolveAction,
  resolveBossTurn,
  primeBossState
};

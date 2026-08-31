const LINEAGE_ABILITIES = require('./lineageAbilities');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getFragmentId(legacy, race) {
  return `fragment_${legacy || 'unknown'}_${race || 'unknown'}`;
}

function getLineageAbilityForRace(race, legacy) {
  const matches = LINEAGE_ABILITIES
    .filter((ability) => ability.races && ability.races.includes(race) && ability.legacy === legacy)
    .sort((left, right) => {
      const leftSpecificity = Array.isArray(left.races) ? left.races.length : 999;
      const rightSpecificity = Array.isArray(right.races) ? right.races.length : 999;
      return leftSpecificity - rightSpecificity;
    });
  return matches.length ? clone(matches[0]) : null;
}

function grantDivinityFragment(creature, bossDefeated) {
  const roll = Math.random();
  const dropChance = 0.1;
  
  if (roll < dropChance) {
    const fragmentId = getFragmentId(creature.legacy, creature.race);
    return {
      dropped: true,
      fragmentId: fragmentId,
      legacy: creature.legacy || 'unknown',
      race: creature.race || 'unknown',
      bossName: bossDefeated || 'Apostol',
      message: `¡Fragmento de Divinidad obtenido! Pertenece al linaje ${creature.legacy || 'desconocido'}.`
    };
  }
  
  return {
    dropped: false,
    message: 'No se encontro fragmento esta vez.'
  };
}

function canUnlockLineageAbility(playerFragmentInventory, race, legacy) {
  const fragmentId = getFragmentId(legacy, race);
  const fragments = playerFragmentInventory || [];
  const count = fragments.filter((f) => f.fragmentId === fragmentId).length;
  return count >= 1;
}

function unlockLineageAbility(creature, playerFragmentInventory) {
  const ability = getLineageAbilityForRace(creature.race, creature.legacy);
  if (!ability) {
    return {
      success: false,
      message: 'Esta criatura no tiene linaje compatible con fragmentos.'
    };
  }
  
  if (creature.lineageAbilityUnlocked) {
    return {
      success: false,
      message: 'Esta criatura ya tiene habilidad de linaje desbloqueada.'
    };
  }
  
  const canUnlock = canUnlockLineageAbility(playerFragmentInventory, creature.race, creature.legacy);
  if (!canUnlock) {
    const fragmentIdNeeded = getFragmentId(creature.legacy, creature.race);
    const currentCount = (playerFragmentInventory || []).filter((f) => f.fragmentId === fragmentIdNeeded).length;
    return {
      success: false,
      message: `Necesitas 1 fragmento. Tienes ${currentCount}/1.`,
      progress: currentCount,
      needed: 1
    };
  }
  
  return {
    success: true,
    ability: ability,
    message: `¡Habilidad de linaje desbloqueada: ${ability.name}!`
  };
}

module.exports = {
  LINEAGE_ABILITIES,
  getLineageAbilityForRace,
  grantDivinityFragment,
  canUnlockLineageAbility,
  unlockLineageAbility,
  getFragmentId
};

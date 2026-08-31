const baseCreatures = require('../data/creatures');
const abilityCatalog = require('../data/abilityCatalog');
const bossCatalog = require('../data/bossCatalog');
const { getLineageAbilityForRace } = require('../data/divinitySystem');

const pityMap = new Map();

const RANKS = [
  { key: 'comun', prob: 0.40, mul: 1 },
  { key: 'pocoComun', prob: 0.25, mul: 1.08 },
  { key: 'raro', prob: 0.18, mul: 1.18 },
  { key: 'epico', prob: 0.10, mul: 1.34 },
  { key: 'legendario', prob: 0.05, mul: 1.52 },
  { key: 'mitico', prob: 0.02, mul: 1.72 }
];

function weightedPick(ranks) {
  const x = Math.random();
  let acc = 0;
  for (const rank of ranks) {
    acc += rank.prob;
    if (x <= acc) return rank;
  }
  return ranks[ranks.length - 1];
}

function pickRank(socketId, modifiers = {}) {
  let pity = pityMap.get(socketId) || 0;
  const minRank = String(modifiers.minRank || '');
  const floorIndex = RANKS.findIndex((entry) => entry.key === minRank);
  const allowedRanks = floorIndex >= 0 ? RANKS.slice(floorIndex) : RANKS;
  let rank;
  if (pity >= 20) {
    const pityPool = allowedRanks.filter((entry) => ['epico', 'legendario', 'mitico'].includes(entry.key));
    rank = weightedPick(pityPool.length ? pityPool : allowedRanks);
    pity = 0;
  } else {
    rank = weightedPick(allowedRanks);
    if (['epico', 'legendario', 'mitico'].includes(rank.key)) pity = 0;
    else pity += 1;
  }
  pityMap.set(socketId, pity);
  return rank;
}

function rollAbility(rankKey, baseCreature) {
  const chance = {
    comun: 0.1,
    pocoComun: 0.2,
    raro: 0.5,
    epico: 0.8,
    legendario: 1,
    mitico: 1
  }[rankKey];

  const signatureAbility = abilityCatalog.find((ability) => ability.id === baseCreature.signatureAbilityId);
  if (!signatureAbility && Math.random() >= chance) return [];
  if (!signatureAbility) {
    const pool = abilityCatalog.filter((ability) => {
      if (!Array.isArray(ability.archetypes) || ability.archetypes.length === 0) return true;
      return ability.archetypes.includes(baseCreature.archetype);
    });
    const ability = (pool.length ? pool : abilityCatalog)[Math.floor(Math.random() * (pool.length ? pool.length : abilityCatalog.length))];
    return [JSON.parse(JSON.stringify(ability))];
  }

  const result = [JSON.parse(JSON.stringify(signatureAbility))];
  const canRollExtra = ['epico', 'legendario', 'mitico'].includes(rankKey);
  if (canRollExtra && Math.random() < (rankKey === 'epico' ? 0.2 : 0.35)) {
    const extraPool = abilityCatalog.filter((ability) =>
      ability.id !== signatureAbility.id &&
      Array.isArray(ability.archetypes) &&
      ability.archetypes.includes(baseCreature.archetype)
    );
    if (extraPool.length > 0) {
      result.push(JSON.parse(JSON.stringify(extraPool[Math.floor(Math.random() * extraPool.length)])));
    }
  }
  return result;
}

function buildCreatureFromRank(rank) {
  const base = JSON.parse(JSON.stringify(
    baseCreatures[Math.floor(Math.random() * baseCreatures.length)]
  ));

  return {
    ...base,
    rank: rank.key,
    vidaMax: Math.round(base.vida * rank.mul),
    vida: Math.round(base.vida * rank.mul),
    ataque: Math.round(base.ataque * rank.mul),
    defensa: Math.round(base.defensa * rank.mul),
    regen: Math.max(1, Math.round(base.regen * rank.mul)),
    abilities: rollAbility(rank.key, base)
  };
}

function getOrderedBosses() {
  return [...bossCatalog].sort((left, right) => Number(left.order || 999) - Number(right.order || 999));
}

function getBossDefeatMap(archive = []) {
  return new Map(
    (Array.isArray(archive) ? archive : []).map((entry) => [entry.bossId, Number(entry && entry.defeats || 0)])
  );
}

function getApostleProgressIndex(archive = []) {
  const orderedBosses = getOrderedBosses();
  if (orderedBosses.length === 0) return 0;
  const defeatMap = getBossDefeatMap(archive);
  let progressIndex = 0;

  while (true) {
    const cycle = Math.floor(progressIndex / orderedBosses.length);
    const boss = orderedBosses[progressIndex % orderedBosses.length];
    const defeats = Number(defeatMap.get(boss.id) || 0);
    if (defeats <= cycle) break;
    progressIndex += 1;
  }

  return progressIndex;
}

function getApostleLadder(progress = {}, archive = []) {
  const orderedBosses = getOrderedBosses();
  const normalizedIndex = Math.max(0, Number(
    Number.isFinite(Number(progress.index)) ? progress.index : getApostleProgressIndex(archive)
  ));
  const currentPreview = module.exports.getApostlePreview(normalizedIndex);
  const currentCycle = Number(currentPreview && currentPreview.cycle || 0);
  const currentOrder = currentPreview ? Number(currentPreview.order || 1) : 1;
  const archiveMap = new Map((Array.isArray(archive) ? archive : []).map((entry) => [entry.bossId, entry]));

  return orderedBosses.map((boss) => {
    const archiveEntry = archiveMap.get(boss.id);
    const defeats = Number(archiveEntry && archiveEntry.defeats || 0);
    const requiredDefeats = currentCycle + (Number(boss.order || 1) < currentOrder ? 1 : 0);
    let status = 'locked';
    if (currentPreview && currentPreview.id === boss.id && defeats <= currentCycle) {
      status = 'current';
    } else if (defeats >= requiredDefeats && defeats > 0) {
      status = 'defeated';
    }

    return {
      id: boss.id,
      name: boss.name,
      title: boss.title,
      archetype: boss.archetype,
      race: boss.race || '',
      pantheon: boss.pantheon || '',
      bossMechanic: boss.bossMechanic || '',
      lore: boss.lore || '',
      invocationView: boss.invocationView || '',
      image: boss.image,
      order: Number(boss.order || 1),
      status,
      defeats,
      unlockedReward: archiveEntry ? archiveEntry.rewardTitle : null
    };
  });
}

module.exports = {
  invocarCriatura(socketId, modifiers = {}) {
    const rank = pickRank(socketId, modifiers);
    return buildCreatureFromRank(rank);
  },

  invocarJefe(progress = {}) {
    const orderedBosses = getOrderedBosses();
    const progressIndex = Math.max(0, Number(progress.index || 0));
    const cycle = Math.max(0, Math.floor(progressIndex / Math.max(1, orderedBosses.length)));
    const bossIndex = Math.min(progressIndex, orderedBosses.length - 1) % Math.max(1, orderedBosses.length);
    const template = JSON.parse(JSON.stringify(orderedBosses[bossIndex]));
    const lifeMultiplier = 1.58 + (bossIndex * 0.14) + (cycle * 0.14);
    const attackMultiplier = 1.28 + (bossIndex * 0.08) + (cycle * 0.08);
    const defenseMultiplier = 1.22 + (bossIndex * 0.06) + (cycle * 0.07);
    const regenBonus = bossIndex >= 2 ? 1 : 0;

    const lineageAbility = getLineageAbilityForRace(template.race, template.pantheon);

    return {
      ...template,
      bossId: template.id,
      vidaMax: Math.round(template.vida * lifeMultiplier),
      vida: Math.round(template.vida * lifeMultiplier),
      hp: Math.round(template.vida * lifeMultiplier),
      ataque: Math.round(template.ataque * attackMultiplier),
      atk: Math.round(template.ataque * attackMultiplier),
      defensa: Math.round(template.defensa * defenseMultiplier),
      def: Math.round(template.defensa * defenseMultiplier),
      regen: Math.max(1, Math.round((template.regen || 1) + regenBonus + cycle)),
      apostleOrder: Number(template.order || bossIndex + 1),
      difficultyTier: bossIndex + 1 + (cycle * orderedBosses.length),
      lineageAbilityUnlocked: !!lineageAbility,
      lineageAbility: lineageAbility || null,
      _cooldowns: {}
    };
  },

  getApostlePreview(index = 0) {
    const orderedBosses = getOrderedBosses();
    const normalizedIndex = Math.max(0, Number(index || 0));
    const cycle = Math.floor(normalizedIndex / Math.max(1, orderedBosses.length));
    const boss = orderedBosses[normalizedIndex % Math.max(1, orderedBosses.length)];
    if (!boss) return null;
    return {
      id: boss.id,
      name: boss.name,
      title: boss.title,
      archetype: boss.archetype,
      image: boss.image,
      order: Number(boss.order || 1),
      cycle
    };
  },

  getApostleLadder,
  getApostleProgressIndex,

  getPity(socketId) {
    return pityMap.get(socketId) || 0;
  }
};

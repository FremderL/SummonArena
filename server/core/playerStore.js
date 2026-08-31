const crypto = require('crypto');
const creatureFactory = require('./creatureFactory');
const profileRepository = require('./profileRepository');
const shopCatalog = require('../data/shopCatalog');
const backgroundCatalog = require('../data/backgroundCatalog');
const cardFrameCatalog = require('../data/cardFrameCatalog');
const loreCodex = require('../data/loreCodex');
const apostleRelicCatalog = require('../data/apostleRelicCatalog');
const bossCatalog = require('../data/bossCatalog');
const godCatalog = require('../data/godCatalog');
const { grantDivinityFragment, unlockLineageAbility, getLineageAbilityForRace, getFragmentId } = require('../data/divinitySystem');

const APOSTLE_MILESTONES = Object.freeze([
  { id: 'apostle_2', threshold: 2, rewardGold: 60, rewardKeys: 1, rewardEssence: 0, label: 'Tramo I' },
  { id: 'apostle_4', threshold: 4, rewardGold: 110, rewardKeys: 1, rewardEssence: 1, label: 'Tramo II' },
  { id: 'apostle_6', threshold: 6, rewardGold: 180, rewardKeys: 2, rewardEssence: 1, label: 'Tramo III' }
]);

const ESSENCE_DROP_CHANCE = 0.3;
const RELIC_DROP_CHANCE = 0.45;

const DEFAULT_PROFILE = Object.freeze({
  name: 'Invocador',
  sessionToken: '',
  keys: 3,
  gold: 0,
  essence: 0,
  wins: 0,
  losses: 0,
  bossWins: 0,
  creature: null,
  consumables: {},
  summonModifiers: {},
  unlockedBackgrounds: ['default_nexus'],
  equippedBackgroundId: 'default_nexus',
  unlockedCardFrames: ['default_frame'],
  equippedCardFrameId: 'default_frame',
  equippedRelicId: '',
  defeatedGods: [],
  unlockedMusicTracks: [],
  claimedBossRewards: [],
  claimedApostleMilestones: [],
  preservedCreatures: [],
  history: [],
  collection: [],
  discoveredAbilities: [],
  bossArchive: [],
  bossBanners: [],
  apostleRelics: [],
  divinityFragments: [],
  deleted: false,
  deletedAt: null,
  createdAt: null,
  lastSeenAt: null
});

const cache = new Map();

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeSessionToken() {
  return crypto.randomBytes(18).toString('hex');
}

function makeEternalId() {
  return crypto.randomBytes(10).toString('hex');
}

function normalizeName(rawName, fallback = 'Invocador') {
  const clean = String(rawName || '').replace(/\s+/g, ' ').trim().slice(0, 18);
  return clean || fallback;
}

function sanitizePlayerId(rawId) {
  const clean = String(rawId || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
  return clean || `player_${Math.random().toString(36).slice(2, 12)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function buildDefaultProfile(name) {
  const timestamp = nowIso();
  return {
    ...DEFAULT_PROFILE,
    name: normalizeName(name),
    sessionToken: makeSessionToken(),
    createdAt: timestamp,
    lastSeenAt: timestamp
  };
}

function ensureLoaded(playerId) {
  if (!playerId) throw new Error('playerId requerido');
  if (cache.has(playerId)) return cache.get(playerId);

  const stored = profileRepository.get(playerId);
  const profile = {
    ...DEFAULT_PROFILE,
    ...(stored || {})
  };
  cache.set(playerId, profile);
  return profile;
}

function persist(playerId) {
  const profile = ensureLoaded(playerId);
  profileRepository.set(playerId, clone(profile));
}

function serializeProfile(playerId, profileOverride) {
  const profile = profileOverride || ensureLoaded(playerId);
  const unlockedBackgrounds = Array.isArray(profile.unlockedBackgrounds) && profile.unlockedBackgrounds.length
    ? [...new Set(profile.unlockedBackgrounds.map((entry) => String(entry || '')))].filter(Boolean)
    : ['default_nexus'];
  const equippedBackgroundId = unlockedBackgrounds.includes(String(profile.equippedBackgroundId || ''))
    ? String(profile.equippedBackgroundId || '')
    : unlockedBackgrounds[0];
  const unlockedCardFrames = Array.isArray(profile.unlockedCardFrames) && profile.unlockedCardFrames.length
    ? [...new Set(profile.unlockedCardFrames.map((entry) => String(entry || '')))].filter(Boolean)
    : ['default_frame'];
  const equippedCardFrameId = unlockedCardFrames.includes(String(profile.equippedCardFrameId || ''))
    ? String(profile.equippedCardFrameId || '')
    : unlockedCardFrames[0];
  return {
    playerId,
    name: normalizeName(profile.name),
    sessionToken: profile.sessionToken,
    keys: Number(profile.keys || 0),
    gold: Number(profile.gold || 0),
    essence: Number(profile.essence || 0),
    wins: Number(profile.wins || 0),
    losses: Number(profile.losses || 0),
    bossWins: Number(profile.bossWins || 0),
    creature: profile.creature ? clone(profile.creature) : null,
    consumables: clone(profile.consumables || {}),
    summonModifiers: clone(profile.summonModifiers || {}),
    unlockedBackgrounds,
    equippedBackgroundId,
    unlockedCardFrames,
    equippedCardFrameId,
    equippedRelicId: String(profile.equippedRelicId || ''),
    defeatedGods: Array.isArray(profile.defeatedGods) ? clone(profile.defeatedGods) : [],
    unlockedMusicTracks: Array.isArray(profile.unlockedMusicTracks) ? clone(profile.unlockedMusicTracks) : [],
    apostleMilestones: getMilestonePayload(profile),
    backgroundCatalog: clone(backgroundCatalog),
    cardFrameCatalog: clone(cardFrameCatalog),
    godCatalog: clone(godCatalog),
    preservedCreatures: Array.isArray(profile.preservedCreatures) ? clone(profile.preservedCreatures).slice(0, 24) : [],
    history: Array.isArray(profile.history) ? clone(profile.history).slice(0, 24) : [],
    collection: Array.isArray(profile.collection) ? clone(profile.collection).slice(0, 60) : [],
    bossArchive: Array.isArray(profile.bossArchive) ? clone(profile.bossArchive).slice(0, 20) : [],
    bossBanners: Array.isArray(profile.bossBanners) ? clone(profile.bossBanners).slice(0, 20) : [],
    apostleRelics: Array.isArray(profile.apostleRelics) ? clone(profile.apostleRelics).slice(0, 24) : [],
    relicResonances: getRelicResonances(profile),
    abilityJournal: getAbilityJournal(profile),
    shopCatalog: clone(shopCatalog),
    loreCodex: getUnlockedLoreEntries(profile),
    pity: creatureFactory.getPity(playerId),
    createdAt: profile.createdAt || null,
    lastSeenAt: profile.lastSeenAt || null,
    divinityFragments: Array.isArray(profile.divinityFragments) ? clone(profile.divinityFragments) : []
  };
}

function pushHistory(profile, title, detail, tone = 'neutral') {
  const next = [{
    title,
    detail,
    tone,
    at: nowIso()
  }, ...(Array.isArray(profile.history) ? profile.history : [])];
  profile.history = next.slice(0, 24);
}

function rememberCreature(profile, creature) {
  if (!creature || !creature.name) return;
  const entries = Array.isArray(profile.collection) ? [...profile.collection] : [];
  const existing = entries.find((entry) => entry.name === creature.name);
  const rankOrder = ['comun', 'pocoComun', 'raro', 'epico', 'legendario', 'mitico'];
  const creatureRank = creature.rank || 'comun';
  const primaryAbility = Array.isArray(creature.abilities) && creature.abilities[0]
    ? {
        id: creature.abilities[0].id,
        name: creature.abilities[0].name,
        type: creature.abilities[0].type,
        desc: creature.abilities[0].desc || creature.abilities[0].description || ''
      }
    : null;

  if (existing) {
    existing.count = Number(existing.count || 0) + 1;
    existing.lastSeenAt = nowIso();
    if (rankOrder.indexOf(creatureRank) > rankOrder.indexOf(existing.bestRank || 'comun')) {
      existing.bestRank = creatureRank;
    }
    existing.image = creature.image || existing.image;
    existing.archetype = creature.archetype || existing.archetype;
    existing.race = creature.race || existing.race;
    existing.legacy = creature.legacy || existing.legacy;
    existing.lore = creature.lore || existing.lore;
    existing.primaryAbility = primaryAbility || existing.primaryAbility;
  } else {
    entries.push({
      name: creature.name,
      image: creature.image || '',
      archetype: creature.archetype || '',
      race: creature.race || '',
      legacy: creature.legacy || '',
      lore: creature.lore || '',
      primaryAbility,
      bestRank: creatureRank,
      count: 1,
      lastSeenAt: nowIso()
    });
  }

  entries.sort((left, right) => new Date(right.lastSeenAt).getTime() - new Date(left.lastSeenAt).getTime());
  profile.collection = entries.slice(0, 60);
}

function rememberDiscoveredAbility(profile, ability, source) {
  if (!profile || !ability || !ability.id) return;
  const journal = Array.isArray(profile.discoveredAbilities) ? [...profile.discoveredAbilities] : [];
  const existingIndex = journal.findIndex((entry) => entry.id === ability.id);
  const record = {
    id: ability.id,
    name: ability.name,
    type: ability.type,
    desc: ability.desc || ability.description || '',
    source: source || 'Origen desconocido'
  };
  if (existingIndex >= 0) {
    journal[existingIndex] = { ...journal[existingIndex], ...record };
  } else {
    journal.unshift(record);
  }
  profile.discoveredAbilities = journal.slice(0, 64);
}

function rememberCreatureAbilities(profile, creature, source) {
  if (!profile || !creature || !Array.isArray(creature.abilities)) return;
  creature.abilities.forEach((ability) => rememberDiscoveredAbility(profile, ability, source || creature.name));
}

function getConsumableRewardForBoss(payload) {
  if (!payload || !payload.bossId) return null;
  const archetype = String(payload.bossArchetype || '').toLowerCase();
  if (archetype === 'guardiana' || archetype === 'support') {
    return { consumableId: 'mending_salve', amount: 1, label: 'Salva De Marea' };
  }
  return { consumableId: 'star_sigil', amount: 1, label: 'Sigilo De Resonancia' };
}

function formatWager(stake) {
  if (!stake) return 'Sin apuesta';
  if (stake.type === 'gold') return `${stake.amount} de oro`;
  if (stake.type === 'essence') return `${stake.amount} esencia(s) de eternidad`;
  if (stake.type === 'relic') return `la reliquia ${stake.relicName || stake.relicId}`;
  return 'Apuesta desconocida';
}

function addStakeToProfile(profile, stake) {
  if (!profile || !stake) return;
  if (stake.type === 'gold') {
    profile.gold = Number(profile.gold || 0) + Number(stake.amount || 0);
    return;
  }
  if (stake.type === 'essence') {
    profile.essence = Number(profile.essence || 0) + Number(stake.amount || 0);
    return;
  }
  if (stake.type === 'relic') {
    const relics = Array.isArray(profile.apostleRelics) ? [...profile.apostleRelics] : [];
    relics.unshift({
      ...clone(stake.relic || {}),
      unlockedAt: nowIso(),
      wagerTransferred: true
    });
    profile.apostleRelics = relics.slice(0, 36);
  }
}

function removeStakeFromProfile(profile, stake) {
  if (!profile || !stake) return { ok: false, error: 'Apuesta invalida' };
  if (stake.type === 'gold') {
    const amount = Number(stake.amount || 0);
    if (amount <= 0) return { ok: false, error: 'La apuesta de oro debe ser mayor a 0' };
    if (Number(profile.gold || 0) < amount) return { ok: false, error: 'No tienes suficiente oro para esa apuesta' };
    profile.gold = Number(profile.gold || 0) - amount;
    return { ok: true };
  }
  if (stake.type === 'essence') {
    const amount = Number(stake.amount || 0);
    if (amount <= 0) return { ok: false, error: 'La apuesta de esencia debe ser mayor a 0' };
    if (Number(profile.essence || 0) < amount) return { ok: false, error: 'No tienes suficiente esencia para esa apuesta' };
    profile.essence = Number(profile.essence || 0) - amount;
    return { ok: true };
  }
  if (stake.type === 'relic') {
    const relicId = String(stake.relicId || '');
    if (!relicId) return { ok: false, error: 'Debes elegir una reliquia para apostar' };
    const relics = Array.isArray(profile.apostleRelics) ? [...profile.apostleRelics] : [];
    const index = relics.findIndex((entry) => entry && entry.relicId === relicId);
    if (index < 0) return { ok: false, error: 'No tienes esa reliquia para apostar' };
    const [removedRelic] = relics.splice(index, 1);
    profile.apostleRelics = relics;
    if (profile.equippedRelicId === relicId && !relics.some((entry) => entry && entry.relicId === relicId)) {
      profile.equippedRelicId = '';
    }
    stake.relic = clone(removedRelic);
    stake.relicName = removedRelic.relicName || stake.relicName || relicId;
    return { ok: true };
  }
  return { ok: false, error: 'Tipo de apuesta no soportado' };
}

function unlockBossReward(profile, payload) {
  if (!payload || !payload.bossId) return;
  const archive = Array.isArray(profile.bossArchive) ? [...profile.bossArchive] : [];
  const claimedRewards = new Set(Array.isArray(profile.claimedBossRewards) ? profile.claimedBossRewards : []);
  const now = nowIso();
  const bossMeta = bossCatalog.find((entry) => entry.id === payload.bossId) || null;
  const existing = archive.find((entry) => entry.bossId === payload.bossId);
  if (existing) {
    existing.defeats = Number(existing.defeats || 0) + 1;
    existing.lastDefeatedAt = now;
    existing.race = existing.race || payload.bossRace || (bossMeta && bossMeta.race) || '';
    existing.pantheon = existing.pantheon || payload.bossPantheon || (bossMeta && bossMeta.pantheon) || '';
    existing.invocationView = existing.invocationView || payload.invocationView || (bossMeta && bossMeta.invocationView) || '';
  } else {
    archive.unshift({
      bossId: payload.bossId,
      name: payload.bossName || payload.bossId,
      title: payload.bossTitle || payload.bossName || 'Apostol',
      archetype: payload.bossArchetype || '',
      race: payload.bossRace || (bossMeta && bossMeta.race) || '',
      pantheon: payload.bossPantheon || (bossMeta && bossMeta.pantheon) || '',
      invocationView: payload.invocationView || (bossMeta && bossMeta.invocationView) || '',
      image: payload.bossImage || '',
      rewardTitle: payload.bossRewardTitle || `Estandarte de ${payload.bossName || payload.bossId}`,
      defeats: 1,
      firstDefeatedAt: now,
      lastDefeatedAt: now
    });
  }
  profile.bossArchive = archive.slice(0, 20);
  const rewardTitle = payload.bossRewardTitle || `Estandarte de ${payload.bossName || payload.bossId}`;
  const banners = Array.isArray(profile.bossBanners) ? [...profile.bossBanners] : [];
  const firstRewardForBoss = !claimedRewards.has(payload.bossId);
  if (!banners.some((entry) => entry.bossId === payload.bossId)) {
    banners.unshift({
      bossId: payload.bossId,
      rewardTitle,
      unlockedAt: now
    });
    profile.bossBanners = banners.slice(0, 20);
    pushHistory(profile, 'Estandarte obtenido', `Desbloqueaste ${rewardTitle}.`, 'good');
  } else {
    profile.bossBanners = banners.slice(0, 20);
  }
  if (firstRewardForBoss) {
    const consumableReward = getConsumableRewardForBoss(payload);
    if (consumableReward) {
      profile.consumables = {
        ...(profile.consumables || {}),
        [consumableReward.consumableId]: Number((profile.consumables || {})[consumableReward.consumableId] || 0) + Number(consumableReward.amount || 0)
      };
      pushHistory(profile, 'Botin de apostol', `Recibiste ${consumableReward.label} como botin del encuentro.`, 'good');
    }
    claimedRewards.add(payload.bossId);
    profile.claimedBossRewards = [...claimedRewards];
  }
  const relicMeta = apostleRelicCatalog[payload.bossId];
  if (relicMeta) {
    const relics = Array.isArray(profile.apostleRelics) ? [...profile.apostleRelics] : [];
    if (!relics.some((entry) => entry.relicId === relicMeta.relicId) && Math.random() < RELIC_DROP_CHANCE) {
      relics.unshift({
        bossId: payload.bossId,
        unlockedAt: now,
        ...relicMeta
      });
      profile.apostleRelics = relics.slice(0, 24);
      pushHistory(profile, 'Reliquia obtenida', `Recuperaste ${relicMeta.relicName}.`, 'good');
    }
  }
  if (Math.random() < ESSENCE_DROP_CHANCE) {
    profile.essence = Number(profile.essence || 0) + 1;
    pushHistory(profile, 'Esencia obtenida', 'Recibiste una Esencia de Eternidad como botin del apostol.', 'good');
  }
}

function normalizePreservedCreature(creature) {
  if (!creature) return null;
  const copy = clone(creature);
  copy.eternalId = copy.eternalId || makeEternalId();
  copy.vida = Number(copy.vidaMax ?? copy.vida ?? copy.hp) || 0;
  copy.hp = copy.vida;
  copy._cooldowns = {};
  return copy;
}

function rememberPreservedCreature(profile, creature) {
  const preserved = normalizePreservedCreature(creature);
  if (!preserved) return null;
  const entries = Array.isArray(profile.preservedCreatures) ? [...profile.preservedCreatures] : [];
  const index = entries.findIndex((entry) => entry.eternalId === preserved.eternalId);
  if (index >= 0) entries[index] = preserved;
  else entries.unshift(preserved);
  profile.preservedCreatures = entries.slice(0, 24);
  return preserved;
}

function getClaimedMilestones(profile) {
  return Array.isArray(profile && profile.claimedApostleMilestones) ? profile.claimedApostleMilestones : [];
}

function getMilestonePayload(profile) {
  const uniqueBosses = Array.isArray(profile && profile.bossArchive) ? profile.bossArchive.length : 0;
  const claimed = new Set(getClaimedMilestones(profile));
  return APOSTLE_MILESTONES.map((milestone) => ({
    ...milestone,
    claimed: claimed.has(milestone.id),
    completed: uniqueBosses >= milestone.threshold
  }));
}

function applyApostleMilestones(profile) {
  const claimed = new Set(getClaimedMilestones(profile));
  const uniqueBosses = Array.isArray(profile && profile.bossArchive) ? profile.bossArchive.length : 0;
  const granted = [];

  APOSTLE_MILESTONES.forEach((milestone) => {
    if (uniqueBosses < milestone.threshold || claimed.has(milestone.id)) return;
    claimed.add(milestone.id);
    profile.gold = Number(profile.gold || 0) + Number(milestone.rewardGold || 0);
    profile.keys = Number(profile.keys || 0) + Number(milestone.rewardKeys || 0);
    profile.essence = Number(profile.essence || 0) + Number(milestone.rewardEssence || 0);
    granted.push(milestone);
    pushHistory(
      profile,
      'Recompensa de tramo',
      `${milestone.label}: recibiste ${milestone.rewardGold} de oro, ${milestone.rewardKeys} llave(s) y ${milestone.rewardEssence} esencia(s).`,
      'good'
    );
  });

  profile.claimedApostleMilestones = [...claimed];
  return granted;
}

function getUnlockedLoreEntries(profile) {
  const uniqueBosses = Array.isArray(profile && profile.bossArchive) ? profile.bossArchive.length : 0;
  return loreCodex
    .filter((entry) => uniqueBosses >= Number(entry.unlockAtBosses || 0))
    .map((entry) => clone(entry));
}

function getAbilityJournal(profile) {
  const known = new Map();
  const addAbility = (ability, source) => {
    if (!ability || !ability.id || known.has(ability.id)) return;
    known.set(ability.id, {
      id: ability.id,
      name: ability.name,
      type: ability.type,
      desc: ability.desc || ability.description || '',
      source
    });
  };

  const discovered = Array.isArray(profile && profile.discoveredAbilities) ? profile.discoveredAbilities : [];
  discovered.forEach((entry) => addAbility(entry, entry.source));

  const collection = Array.isArray(profile && profile.collection) ? profile.collection : [];
  collection.forEach((entry) => addAbility(entry.primaryAbility, entry.name));

  if (profile && profile.creature && Array.isArray(profile.creature.abilities)) {
    profile.creature.abilities.forEach((ability) => addAbility(ability, profile.creature.name || 'Invocacion activa'));
  }

  const preserved = Array.isArray(profile && profile.preservedCreatures) ? profile.preservedCreatures : [];
  preserved.forEach((entry) => {
    if (Array.isArray(entry.abilities)) entry.abilities.forEach((ability) => addAbility(ability, entry.name));
  });

  const defeatedBosses = new Set((Array.isArray(profile && profile.bossArchive) ? profile.bossArchive : []).map((entry) => entry.bossId));
  bossCatalog
    .filter((boss) => defeatedBosses.has(boss.id))
    .forEach((boss) => (boss.abilities || []).forEach((ability) => addAbility(ability, boss.name)));

  return Array.from(known.values()).sort((left, right) => left.name.localeCompare(right.name));
}

function getRelicResonances(profile) {
  const relics = Array.isArray(profile && profile.apostleRelics) ? profile.apostleRelics : [];
  const counts = relics.reduce((acc, relic) => {
    const key = String(relic && relic.attunement || 'Sin legado');
    acc[key] = Number(acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([attunement, count]) => ({
      attunement,
      count,
      resonanceTitle: count >= 3 ? 'Resonancia mayor' : count >= 2 ? 'Resonancia activa' : 'Eco tenue'
    }));
}

function rankProfiles() {
  const all = profileRepository.getAll();
  return Object.entries(all)
    .map(([playerId, profile]) => ({
      playerId,
      name: normalizeName(profile && profile.name),
      wins: Number(profile && profile.wins || 0),
      losses: Number(profile && profile.losses || 0),
      bossWins: Number(profile && profile.bossWins || 0),
      keys: Number(profile && profile.keys || 0),
      gold: Number(profile && profile.gold || 0),
      deleted: !!(profile && profile.deleted)
    }))
    .sort((left, right) => {
      if (right.wins !== left.wins) return right.wins - left.wins;
      if (right.bossWins !== left.bossWins) return right.bossWins - left.bossWins;
      if (left.losses !== right.losses) return left.losses - right.losses;
      return left.name.localeCompare(right.name);
    });
}

function getNextApostleIndexForPlayer(playerId) {
  const profile = ensureLoaded(playerId);
  return creatureFactory.getApostleProgressIndex(profile.bossArchive);
}

module.exports = {
  identify(rawPlayerId, rawSessionToken, fallbackName) {
    const requestedId = sanitizePlayerId(rawPlayerId);
    const requestedName = normalizeName(fallbackName);
    const stored = profileRepository.get(requestedId);

    if (!stored) {
      const createdProfile = buildDefaultProfile(requestedName);
      cache.set(requestedId, createdProfile);
      persist(requestedId);
      return { ok: true, playerId: requestedId, profile: serializeProfile(requestedId, createdProfile) };
    }

    const storedToken = String(stored.sessionToken || '');
    if (!rawSessionToken || rawSessionToken !== storedToken) {
      let freshId = requestedId;
      while (profileRepository.get(freshId) || cache.has(freshId)) {
        freshId = `player_${Math.random().toString(36).slice(2, 12)}`;
      }
      const createdProfile = buildDefaultProfile(requestedName);
      cache.set(freshId, createdProfile);
      persist(freshId);
      return {
        ok: true,
        playerId: freshId,
        profile: serializeProfile(freshId, createdProfile),
        replacedIdentity: requestedId
      };
    }

    const profile = {
      ...DEFAULT_PROFILE,
      ...stored,
      name: normalizeName(stored.name, requestedName),
      deleted: false,
      lastSeenAt: nowIso()
    };
    cache.set(requestedId, profile);
    persist(requestedId);
    return { ok: true, playerId: requestedId, profile: serializeProfile(requestedId, profile) };
  },

  getProfile(playerId) {
    return ensureLoaded(playerId);
  },

  getProfilePayload(playerId) {
    const payload = serializeProfile(playerId);
    payload.nextApostleIndex = getNextApostleIndexForPlayer(playerId);
    payload.nextApostle = creatureFactory.getApostlePreview(payload.nextApostleIndex);
    payload.apostleLadder = creatureFactory.getApostleLadder(
      { index: payload.nextApostleIndex },
      payload.bossArchive
    );
    return payload;
  },

  getLeaderboard(limit = 10) {
    return rankProfiles().slice(0, Math.max(1, limit)).map((entry, index) => ({
      rank: index + 1,
      playerId: entry.playerId,
      name: entry.name,
      wins: entry.wins,
      losses: entry.losses,
      bossWins: entry.bossWins,
      keys: entry.keys,
      deleted: entry.deleted
    }));
  },

  getPublicProfile(playerId) {
    const profile = profileRepository.get(playerId);
    if (!profile) return null;
    return {
      playerId,
      name: normalizeName(profile.name),
      wins: Number(profile.wins || 0),
      losses: Number(profile.losses || 0),
      bossWins: Number(profile.bossWins || 0),
      keys: Number(profile.keys || 0),
      gold: Number(profile.gold || 0),
      essence: Number(profile.essence || 0),
      consumables: clone(profile.consumables || {}),
      unlockedBackgrounds: Array.isArray(profile.unlockedBackgrounds) ? profile.unlockedBackgrounds.slice(0, 24) : ['default_nexus'],
      equippedBackgroundId: String(profile.equippedBackgroundId || 'default_nexus'),
      unlockedCardFrames: Array.isArray(profile.unlockedCardFrames) ? profile.unlockedCardFrames.slice(0, 24) : ['default_frame'],
      equippedCardFrameId: String(profile.equippedCardFrameId || 'default_frame'),
      equippedRelicId: String(profile.equippedRelicId || ''),
      apostleMilestones: getMilestonePayload(profile),
      deleted: !!profile.deleted,
      deletedAt: profile.deletedAt || null,
      createdAt: profile.createdAt || null,
      lastSeenAt: profile.lastSeenAt || null,
      collectionSize: Array.isArray(profile.collection) ? profile.collection.length : 0,
      bossArchiveCount: Array.isArray(profile.bossArchive) ? profile.bossArchive.length : 0,
      apostleRelics: Array.isArray(profile.apostleRelics) ? clone(profile.apostleRelics).slice(0, 24) : [],
      relicResonances: getRelicResonances(profile),
      abilityJournal: getAbilityJournal(profile),
      nextApostleIndex: creatureFactory.getApostleProgressIndex(profile.bossArchive),
      nextApostle: creatureFactory.getApostlePreview(creatureFactory.getApostleProgressIndex(profile.bossArchive)),
      apostleLadder: creatureFactory.getApostleLadder(
        { index: creatureFactory.getApostleProgressIndex(profile.bossArchive) },
        Array.isArray(profile.bossArchive) ? profile.bossArchive : []
      ),
      backgroundCatalog: clone(backgroundCatalog),
      cardFrameCatalog: clone(cardFrameCatalog),
      loreCodex: getUnlockedLoreEntries(profile)
    };
  },

  getNextApostleIndex(playerId) {
    return getNextApostleIndexForPlayer(playerId);
  },

  getShopCatalog() {
    return clone(shopCatalog);
  },

  equipBackground(playerId, backgroundId) {
    const profile = ensureLoaded(playerId);
    const targetId = String(backgroundId || '');
    if (!backgroundCatalog.some((entry) => entry.id === targetId)) {
      return { error: 'Ese fondo no existe' };
    }
    if (!Array.isArray(profile.unlockedBackgrounds) || !profile.unlockedBackgrounds.includes(targetId)) {
      return { error: 'Aun no desbloqueaste ese fondo' };
    }
    profile.equippedBackgroundId = targetId;
    pushHistory(profile, 'Fondo equipado', `Ahora usas el fondo ${backgroundCatalog.find((entry) => entry.id === targetId).name}.`, 'neutral');
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return { ok: true, profile: serializeProfile(playerId) };
  },

  setPlayerName(playerId, rawName) {
    const profile = ensureLoaded(playerId);
    const previousName = normalizeName(profile.name);
    profile.name = normalizeName(rawName, profile.name);
    if (profile.name !== previousName) {
      pushHistory(profile, 'Nombre actualizado', `Ahora juegas como ${profile.name}.`);
    }
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return serializeProfile(playerId);
  },

  summonCreature(playerId) {
    const profile = ensureLoaded(playerId);
    if ((profile.keys || 0) <= 0) {
      return { error: 'No tienes llaves' };
    }

    const summonModifiers = profile.summonModifiers || {};
    const creature = creatureFactory.invocarCriatura(playerId, summonModifiers);
    profile.keys -= 1;
    profile.creature = creature;
    profile.summonModifiers = {};
    rememberCreature(profile, creature);
    rememberCreatureAbilities(profile, creature, creature.name);
    pushHistory(
      profile,
      'Nueva invocacion',
      `Obtuviste a ${creature.name} (${creature.rank || 'comun'}).${summonModifiers.minRank ? ` El Sigilo de Resonancia altero la invocacion.` : ''}`,
      'good'
    );
    profile.lastSeenAt = nowIso();
    persist(playerId);

    return {
      creature: clone(creature),
      profile: serializeProfile(playerId)
    };
  },

  setCreature(playerId, creature) {
    const profile = ensureLoaded(playerId);
    profile.creature = creature ? clone(creature) : null;
    if (profile.creature) rememberCreatureAbilities(profile, profile.creature, profile.creature.name);
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return serializeProfile(playerId);
  },

  eternalizeCurrentCreature(playerId) {
    const profile = ensureLoaded(playerId);
    if (!profile.creature) return { error: 'No tienes criatura activa para eternizar' };
    if (Number(profile.essence || 0) <= 0) return { error: 'No tienes Esencia de Eternidad' };

    const active = clone(profile.creature);
    if (active.eternalId && Array.isArray(profile.preservedCreatures) && profile.preservedCreatures.some((entry) => entry.eternalId === active.eternalId)) {
      return { error: 'Esa criatura ya fue preservada' };
    }

    profile.essence -= 1;
    const preserved = rememberPreservedCreature(profile, active);
    profile.creature = clone(preserved);
    pushHistory(profile, 'Criatura eternizada', `${preserved.name} fue preservada con una Esencia de Eternidad.`, 'good');
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return { ok: true, profile: serializeProfile(playerId), creature: clone(profile.creature) };
  },

  equipPreservedCreature(playerId, eternalId) {
    const profile = ensureLoaded(playerId);
    const preserved = Array.isArray(profile.preservedCreatures)
      ? profile.preservedCreatures.find((entry) => entry.eternalId === String(eternalId || ''))
      : null;
    if (!preserved) return { error: 'No se encontro esa criatura preservada' };

    const equipped = normalizePreservedCreature(preserved);
    profile.creature = clone(equipped);
    pushHistory(profile, 'Criatura equipada', `${equipped.name} fue elegida desde la coleccion preservada.`, 'neutral');
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return { ok: true, profile: serializeProfile(playerId), creature: clone(profile.creature) };
  },

  purchaseShopItem(playerId, itemId) {
    const profile = ensureLoaded(playerId);
    const item = shopCatalog.find((entry) => entry.id === String(itemId || ''));
    if (!item) return { error: 'Ese articulo no existe en la tienda' };

    if (Number(profile.gold || 0) < Number(item.costGold || 0)) {
      return { error: 'No tienes suficiente oro' };
    }

    if (item.effectType === 'restoreCreature') {
      if (!profile.creature) return { error: 'No tienes criatura activa para restaurar' };
      const currentLife = Number(profile.creature.vida ?? profile.creature.hp ?? 0);
      const maxLife = Number(profile.creature.vidaMax ?? currentLife);
      if (currentLife >= maxLife) {
        return { error: 'Tu criatura activa ya tiene la vida completa' };
      }
      profile.creature.vida = maxLife;
      profile.creature.hp = maxLife;
    }

    if (item.effectType === 'unlockBackground') {
      const backgroundId = String(item.backgroundId || '');
      if (!backgroundCatalog.some((entry) => entry.id === backgroundId)) {
        return { error: 'Ese fondo no existe en el catalogo' };
      }
      const unlocked = Array.isArray(profile.unlockedBackgrounds) ? profile.unlockedBackgrounds : [];
      if (unlocked.includes(backgroundId)) {
        return { error: 'Ese fondo ya fue desbloqueado' };
      }
      profile.unlockedBackgrounds = [...unlocked, backgroundId];
    }

    if (item.effectType === 'unlockCardFrame') {
      const cardFrameId = String(item.cardFrameId || '');
      if (!cardFrameCatalog.some((entry) => entry.id === cardFrameId)) {
        return { error: 'Ese marco no existe en el catalogo' };
      }
      const unlockedFrames = Array.isArray(profile.unlockedCardFrames) ? profile.unlockedCardFrames : [];
      if (unlockedFrames.includes(cardFrameId)) {
        return { error: 'Ese marco ya fue desbloqueado' };
      }
      profile.unlockedCardFrames = [...unlockedFrames, cardFrameId];
    }

    profile.gold = Number(profile.gold || 0) - Number(item.costGold || 0);

    if (item.effectType === 'keys') {
      profile.keys = Number(profile.keys || 0) + Number(item.amount || 0);
    } else if (item.effectType === 'essence') {
      profile.essence = Number(profile.essence || 0) + Number(item.amount || 0);
    } else if (item.effectType === 'addConsumable') {
      const consumableId = String(item.consumableId || '');
      profile.consumables = {
        ...(profile.consumables || {}),
        [consumableId]: Number((profile.consumables || {})[consumableId] || 0) + Number(item.amount || 0)
      };
    } else if (item.effectType === 'unlockBackground' && !profile.equippedBackgroundId) {
      profile.equippedBackgroundId = String(item.backgroundId || 'default_nexus');
    } else if (item.effectType === 'unlockCardFrame' && !profile.equippedCardFrameId) {
      profile.equippedCardFrameId = String(item.cardFrameId || 'default_frame');
    }

    pushHistory(profile, 'Compra en tienda', `Compraste ${item.name} por ${item.costGold} de oro.`, 'good');
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return {
      ok: true,
      item: clone(item),
      profile: serializeProfile(playerId)
    };
  },

  useConsumable(playerId, consumableId) {
    const profile = ensureLoaded(playerId);
    const inventory = { ...(profile.consumables || {}) };
    const count = Number(inventory[consumableId] || 0);
    if (count <= 0) return { error: 'No tienes ese consumible' };

    if (consumableId === 'mending_salve') {
      if (!profile.creature) return { error: 'No tienes criatura activa para usar la Salva de Marea' };
      const current = Number(profile.creature.vida ?? profile.creature.hp ?? 0);
      const max = Number(profile.creature.vidaMax ?? current);
      if (current >= max) return { error: 'Tu criatura ya tiene la vida completa' };
      const heal = Math.max(10, Math.round(max * 0.45));
      const next = Math.min(max, current + heal);
      profile.creature.vida = next;
      profile.creature.hp = next;
      pushHistory(profile, 'Consumible usado', `Usaste una Salva de Marea y recuperaste ${next - current} HP.`, 'good');
    } else if (consumableId === 'star_sigil') {
      profile.summonModifiers = { ...(profile.summonModifiers || {}), minRank: 'raro' };
      pushHistory(profile, 'Consumible usado', 'El Sigilo de Resonancia alterara tu siguiente invocacion.', 'good');
    } else {
      return { error: 'Ese consumible aun no se puede usar' };
    }

    inventory[consumableId] = count - 1;
    if (inventory[consumableId] <= 0) delete inventory[consumableId];
    profile.consumables = inventory;
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return { ok: true, profile: serializeProfile(playerId) };
  },

  reserveWager(playerId, rawStake) {
    const profile = ensureLoaded(playerId);
    if (!rawStake || !rawStake.type || rawStake.type === 'none') return { ok: true, stake: null, profile: serializeProfile(playerId) };
    const stake = {
      type: String(rawStake.type || ''),
      amount: Number(rawStake.amount || 0),
      relicId: rawStake.relicId ? String(rawStake.relicId) : ''
    };
    const result = removeStakeFromProfile(profile, stake);
    if (!result.ok) return { error: result.error };
    pushHistory(profile, 'Apuesta reservada', `Reservaste ${formatWager(stake)} para un duelo entre jugadores.`, 'neutral');
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return { ok: true, stake, profile: serializeProfile(playerId) };
  },

  refundWager(playerId, stake) {
    if (!stake) return { ok: true, profile: serializeProfile(playerId) };
    const profile = ensureLoaded(playerId);
    addStakeToProfile(profile, stake);
    pushHistory(profile, 'Apuesta devuelta', `Recuperaste ${formatWager(stake)} porque el duelo no se completo.`, 'neutral');
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return { ok: true, profile: serializeProfile(playerId) };
  },

  resolveWager(playerId, outcome, ownStake, enemyStake) {
    const profile = ensureLoaded(playerId);
    if (outcome === 'winner') {
      addStakeToProfile(profile, ownStake);
      addStakeToProfile(profile, enemyStake);
      pushHistory(profile, 'Apuesta ganada', `Ganaste ${formatWager(enemyStake)} en el duelo.`, 'good');
    } else if (outcome === 'loser') {
      pushHistory(profile, 'Apuesta perdida', `Perdiste ${formatWager(ownStake)} en el duelo.`, 'danger');
    }
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return { ok: true, profile: serializeProfile(playerId) };
  },

  equipCardFrame(playerId, cardFrameId) {
    const profile = ensureLoaded(playerId);
    const targetId = String(cardFrameId || '');
    if (!cardFrameCatalog.some((entry) => entry.id === targetId)) {
      return { error: 'Ese marco no existe' };
    }
    if (!Array.isArray(profile.unlockedCardFrames) || !profile.unlockedCardFrames.includes(targetId)) {
      return { error: 'Aun no desbloqueaste ese marco' };
    }
    profile.equippedCardFrameId = targetId;
    pushHistory(profile, 'Marco equipado', `Ahora usas el marco ${cardFrameCatalog.find((entry) => entry.id === targetId).name}.`, 'neutral');
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return { ok: true, profile: serializeProfile(playerId) };
  },

  equipRelic(playerId, relicId) {
    const profile = ensureLoaded(playerId);
    const targetId = String(relicId || '');
    if (!targetId) {
      profile.equippedRelicId = '';
      pushHistory(profile, 'Reliquia desequipada', 'Quitaste la reliquia activa del inventario.', 'neutral');
      profile.lastSeenAt = nowIso();
      persist(playerId);
      return { ok: true, profile: serializeProfile(playerId) };
    }
    const relic = Array.isArray(profile.apostleRelics)
      ? profile.apostleRelics.find((entry) => entry.relicId === targetId)
      : null;
    if (!relic) return { error: 'No tienes esa reliquia' };
    profile.equippedRelicId = targetId;
    pushHistory(profile, 'Reliquia equipada', `Ahora portas ${relic.relicName}.`, 'neutral');
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return { ok: true, profile: serializeProfile(playerId) };
  },

  getEquippedRelic(playerId) {
    const profile = ensureLoaded(playerId);
    const targetId = String(profile.equippedRelicId || '');
    if (!targetId) return null;
    return Array.isArray(profile.apostleRelics)
      ? clone(profile.apostleRelics.find((entry) => entry.relicId === targetId) || null)
      : null;
  },

  recordEncounterAbilities(playerId, creatures = []) {
    const profile = ensureLoaded(playerId);
    creatures.forEach((creature) => rememberCreatureAbilities(profile, creature, creature && creature.name));
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return serializeProfile(playerId);
  },

  applyDuelEnd(playerId, payload) {
    const profile = ensureLoaded(playerId);
    const practiceMatch = payload && payload.matchMode === 'practice';
    const bossMatch = payload && payload.matchMode === 'boss';

    if (payload && payload.winnerId === playerId) {
      profile.wins += 1;
      if (bossMatch) profile.bossWins += 1;
      if (!practiceMatch) profile.keys += Number(payload.rewardKeys || 0);
      if (!practiceMatch) profile.gold += Number(payload.rewardGold || 0);
      if (bossMatch) {
        unlockBossReward(profile, payload);
        applyApostleMilestones(profile);
        
        const bossData = bossCatalog.find(b => b.id === payload.bossId);
        if (bossData) {
          const fragmentResult = grantDivinityFragment(
            { legacy: bossData.pantheon, race: bossData.race },
            bossData.name
          );
          if (fragmentResult.dropped) {
            profile.divinityFragments = profile.divinityFragments || [];
            profile.divinityFragments.push({
              fragmentId: fragmentResult.fragmentId,
              legacy: fragmentResult.legacy,
              race: fragmentResult.race,
              obtainedAt: new Date().toISOString(),
              bossName: fragmentResult.bossName
            });
            pushHistory(
              profile,
              'Fragmento de Divinidad',
              fragmentResult.message,
              'good'
            );
          }
        }
      }
      pushHistory(
        profile,
        bossMatch ? 'Apostol derrotado' : 'Victoria',
        bossMatch
          ? `Derrotaste a ${payload.bossName || 'un apostol'} y obtuviste ${Number(payload.rewardGold || 0)} de oro.`
          : `Ganaste un combate en la arena y obtuviste ${Number(payload.rewardGold || 0)} de oro.`,
        'good'
      );
    } else if (payload && payload.loserId === playerId) {
      profile.losses += 1;
      if (!practiceMatch) profile.creature = null;
      pushHistory(
        profile,
        bossMatch ? 'Caida ante apostol' : 'Derrota',
        bossMatch ? `Tu invocacion cayo frente a ${payload.bossName || 'un apostol'}.` : 'Perdiste un combate en la arena.',
        'danger'
      );
    }

    if (practiceMatch && payload && payload.restoredCreatures && payload.restoredCreatures[playerId]) {
      profile.creature = clone(payload.restoredCreatures[playerId]);
      pushHistory(profile, 'Practica concluida', 'La invocacion fue restaurada al terminar la practica entre jugadores.');
    }

    profile.lastSeenAt = nowIso();
    persist(playerId);
    return serializeProfile(playerId);
  },

  deleteAccount(playerId, sessionToken) {
    const profile = ensureLoaded(playerId);
    if (!profile.sessionToken || profile.sessionToken !== String(sessionToken || '')) {
      return { error: 'Sesion invalida para borrar la cuenta' };
    }

    profile.deleted = true;
    profile.deletedAt = nowIso();
    profile.lastSeenAt = profile.deletedAt;
    profile.creature = null;
    profile.keys = 0;
    profile.sessionToken = '';
    persist(playerId);
    cache.delete(playerId);

    return {
      ok: true,
      playerId,
      deletedProfile: {
        playerId,
        name: normalizeName(profile.name),
        deleted: true,
        deletedAt: profile.deletedAt
      }
    };
  },

  touch(playerId) {
    const profile = ensureLoaded(playerId);
    if (!profile.sessionToken) profile.sessionToken = makeSessionToken();
    if (!profile.name) profile.name = 'Invocador';
    if (!profile.createdAt) profile.createdAt = nowIso();
    profile.deleted = false;
    profile.lastSeenAt = nowIso();
    persist(playerId);
    return serializeProfile(playerId);
  },

  unlockCreatureLineage(playerId, eternalId) {
    const profile = ensureLoaded(playerId);
    
    let targetCreature = null;
    let targetType = null;
    
    if (eternalId) {
      const preserved = (profile.preservedCreatures || []).find(p => p.eternalId === eternalId);
      if (!preserved) {
        return { error: 'Criatura eterna no encontrada.' };
      }
      if (preserved.lineageAbilityUnlocked) {
        return { error: 'Esta criatura ya tiene habilidad de linaje desbloqueada.' };
      }
      targetCreature = preserved;
      targetType = 'preserved';
    } else {
      if (!profile.creature) {
        return { error: 'No tienes criatura activa para desbloquear linaje.' };
      }
      if (profile.creature.lineageAbilityUnlocked) {
        return { error: 'Tu criatura ya tiene habilidad de linaje desbloqueada.' };
      }
      targetCreature = profile.creature;
      targetType = 'active';
    }
    
    const ability = getLineageAbilityForRace(targetCreature.race, targetCreature.legacy);
    if (!ability) {
      return { error: 'Tu criatura no tiene linaje compatible con fragmentos.' };
    }
    
    const result = unlockLineageAbility(targetCreature, profile.divinityFragments || []);
    if (!result.success) {
      return result;
    }
    
    targetCreature.lineageAbilityUnlocked = true;
    targetCreature.lineageAbility = result.ability;
    
    const fragmentIdNeeded = getFragmentId(targetCreature.legacy, targetCreature.race);
    const fragmentsToRemove = 1;
    let removed = 0;
    profile.divinityFragments = (profile.divinityFragments || []).filter(f => {
      if (f.fragmentId === fragmentIdNeeded && removed < fragmentsToRemove) {
        removed++;
        return false;
      }
      return true;
    });
    
    pushHistory(
      profile,
      'Linaje Desbloqueado',
      result.message,
      'good'
    );
    
    persist(playerId);
    return {
      ok: true,
      ability: result.ability,
      targetType,
      profile: serializeProfile(playerId)
    };
  },

  getDivinityFragmentProgress(playerId) {
    const profile = ensureLoaded(playerId);
    const fragments = profile.divinityFragments || [];
    const progress = {};
    
    fragments.forEach(f => {
      progress[f.fragmentId] = (progress[f.fragmentId] || 0) + 1;
    });
    
    return progress;
  }
};

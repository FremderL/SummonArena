const baseCreatures = require('../data/creatures');
const abilitiesData = require('../data/abilities');

const pityMap = new Map(); // socketId → contador

module.exports = {
  invocarCriatura(socketId) {
    let pity = pityMap.get(socketId) || 0;

    const base = baseCreatures[Math.floor(Math.random() * baseCreatures.length)];

    let rank, multi;
    const rand = Math.random();

    if (pity >= 20) {
      rank = 'epico';
      multi = 2;
      pity = 0;
    } else {
      if (rand < 0.40) { rank = 'comun'; multi = 1; }
      else if (rand < 0.65) { rank = 'pocoComun'; multi = 1.2; }
      else if (rand < 0.83) { rank = 'raro'; multi = 1.5; }
      else if (rand < 0.93) { rank = 'epico'; multi = 2; }
      else if (rand < 0.98) { rank = 'legendario'; multi = 3; }
      else { rank = 'mitico'; multi = 4; }

      if (['epico','legendario','mitico'].includes(rank)) pity = 0;
      else pity++;
    }

    pityMap.set(socketId, pity);

    const creature = {
      ...base,
      name: `${rank.toUpperCase()} ${base.name}`,
      vida: Math.floor(base.vida * multi),
      ataque: Math.floor(base.ataque * multi),
      defensa: Math.floor(base.defensa * multi),
      regen: Math.floor(base.regen * multi),
      currentVida: Math.floor(base.vida * multi),
      rank,
      ability: abilitiesData.specialAttacks[rank] || abilitiesData.specialAttacks.comun
    };

    return creature;
  },

  getPity(socketId) {
    return pityMap.get(socketId) || 0;
  }
};
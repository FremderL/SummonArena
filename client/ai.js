/* ai.js
   Responsable: inteligencia artificial del enemigo en modo local
*/
(() => {
  function decideAction(aiCreature, playerCreature) {
    const ability = aiCreature && aiCreature.abilities && aiCreature.abilities[0];
    const cooldowns = (aiCreature && aiCreature._cooldowns) || {};
    const abilityReady = !!(ability && ability.type === 'active' && !(cooldowns[ability.id] > 0));
    const lifePct = aiCreature.vida / aiCreature.vidaMax;
    const enemyLifePct = playerCreature ? (playerCreature.vida / playerCreature.vidaMax) : 0;
    const possibleDmg = Math.max(1, aiCreature.ataque - (playerCreature.defensa || 0));

    if (playerCreature && playerCreature.vida - possibleDmg <= 0) {
      return abilityReady && Math.random() < 0.65 ? 'ability' : 'attack';
    }

    if (lifePct < 0.35) {
      if (abilityReady && ability.id === 'reinicioTemporal') return 'ability';
      if (aiCreature.regen * 1.2 > 3) return Math.random() < 0.6 ? 'recover' : 'defend';
      return 'defend';
    }

    if (abilityReady) {
      if (enemyLifePct < 0.45) return Math.random() < 0.72 ? 'ability' : 'attack';
      if (Math.random() < 0.58) return 'ability';
    }

    if (lifePct < 0.6 && Math.random() < 0.28) return 'defend';

    return 'attack';
  }

  window.SimpleAI = { decideAction };
})();

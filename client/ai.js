/* ai.js
   Responsable: inteligencia artificial del enemigo en modo local
*/
(() => {
  function decideAction(aiCreature, playerCreature){
    // Prioridades según especificación
    const lifePct = aiCreature.vida / aiCreature.vidaMax;
    const enemyLifePct = playerCreature ? (playerCreature.vida / playerCreature.vidaMax) : 0;

    // si puede matar -> atacar
    const possibleDmg = Math.max(1, aiCreature.ataque - (playerCreature.defensa || 0));
    if(playerCreature && playerCreature.vida - possibleDmg <= 0){
      return 'attack';
    }

    if(lifePct < 0.35){
      // prefer recuperar si cura > defender
      if(aiCreature.regen * 1.2 > 3) return Math.random() < 0.6 ? 'recover' : 'defend';
      return 'defend';
    }

    // si tiene habilidad, 40% de usarla
    if(aiCreature.abilities && aiCreature.abilities.length > 0 && Math.random() < 0.4) return 'ability';

    return 'attack';
  }

  window.SimpleAI = {decideAction};
})();

/* abilities.js
   Responsable: definir habilidades activas y pasivas
*/
(() => {
  const ALL = [
    {id:'sangreVoraz', name:'Sangre Voraz', type:'active', desc:'Inflige daño extra del 20% del ataque.', exec: (src, tgt, ctx) => {
      const extra = Math.max(1, Math.round(src.atk * 0.2 || src.ataque * 0.2));
      return {type:'damage', amount: extra, text:`Sangre Voraz +${extra}`};
    }},

    {id:'escudoArcano', name:'Escudo Arcano', type:'passive', desc:'Al defender, aumenta defensa temporalmente.', apply: (cre) => { cre._tempDefBoost = (cre._tempDefBoost||0)+6; }},

    {id:'tormentaEter', name:'Tormenta de Éter', type:'active', desc:'Daño en área moderado.', exec:(src,tgt,ctx)=>{
      const dmg = Math.max(1, Math.round(src.ataque * 1.1));
      return {type:'damage', amount:dmg, text:`Tormenta Éter ${dmg}`};
    }},

    {id:'reinicioTemporal', name:'Reinicio Temporal', type:'active', desc:'Restaura parte de la vida propia.', exec:(src)=>{
      const heal = Math.max(1, Math.round(src.vidaMax * 0.18));
      return {type:'heal', amount:heal, text:`Reinicio +${heal}`};
    }},

    {id:'espinasVivas', name:'Espinas Vivas', type:'passive', desc:'Devuelve parte del daño recibido.', onDamaged:(cre,damage)=>{
      const ret = Math.round(damage*0.25); return ret;
    }},

    {id:'meteoros', name:'Lluvia de Meteoros', type:'active', desc:'Ataque fuerte con posibilidad de crítico.', exec:(src,tgt)=>{
      const dmg = Math.round(src.ataque * 1.6); const crit = Math.random() < 0.18;
      return {type:'damage', amount: dmg * (crit?2:1), crit, text:`Meteoros ${crit? 'CRIT ':' '}${dmg}`};
    }},

    {id:'auraVital', name:'Aura Vital', type:'passive', desc:'Aumenta la regeneración.', apply:(cre)=>{ cre.regen = Math.max(1, cre.regen + 2); }},

    {id:'colmilloVacio', name:'Colmillo del Vacío', type:'active', desc:'Ataque que reduce la defensa enemiga temporalmente.', exec:(src,tgt)=>{
      const dmg = Math.round(src.ataque*1.1); return {type:'damage', amount:dmg, debuff:{defense:-3,duration:2}, text:`Colmillo ${dmg}`};
    }},

    {id:'cataclismo', name:'Cataclismo', type:'active', desc:'Gran daño, largo cooldown.', exec:(src,tgt)=>{
      const dmg = Math.round(src.ataque*2.1); return {type:'damage', amount:dmg, text:`Cataclismo ${dmg}`};
    }},
  ];

  window.ABILITIES = {ALL};
})();

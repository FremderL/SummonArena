/* gacha.js
   Responsable: sistema de invocación (invocarCriatura) y pity system
*/
(() => {
  const RANKS = [
    {key:'comun',prob:0.40,mul:1},
    {key:'pocoComun',prob:0.25,mul:1.2},
    {key:'raro',prob:0.18,mul:1.5},
    {key:'epico',prob:0.10,mul:2},
    {key:'legendario',prob:0.05,mul:3},
    {key:'mitico',prob:0.02,mul:4}
  ];

  // Lista de criaturas base (20) - estructura mínima
  const CREATURES = [
    {name: "Aetherfang",image: "assets/creatures/aetherfang.png", vida:90, ataque:18, defensa:6, regen:2},
    {name: "Pyroclast Drake",image: "assets/creatures/pyroclast_drake.png", vida:100, ataque:22, defensa:8, regen:1},
    {name: "Luminary Seraph",image: "assets/creatures/aetherfang.png", vida:80, ataque:16, defensa:7, regen:3},
    {name: "Umbra Stalker",image: "assets/creatures/aetherfang.png", vida:78, ataque:20, defensa:5, regen:2},
    {name: "Titan Mossbeard",image: "assets/creatures/aetherfang.png", vida:140, ataque:12, defensa:14, regen:4},
    {name: "Frostbite Warden",image: "assets/creatures/aetherfang.png", vida:110, ataque:17, defensa:10, regen:2},
    {name: "Storm Hydra",image: "assets/creatures/aetherfang.png", vida:130, ataque:24, defensa:9, regen:1},
    {name: "Infernal Juggernaut",image: "assets/creatures/aetherfang.png", vida:150, ataque:26, defensa:12, regen:1},
    {name: "Crystal Basilisk",image: "assets/creatures/aetherfang.png", vida:95, ataque:19, defensa:11, regen:2},
    {name: "Chrono Mantis",image: "assets/creatures/aetherfang.png", vida:85, ataque:18, defensa:6, regen:3},
    {name: "Void Leviathan",image: "assets/creatures/aetherfang.png", vida:160, ataque:28, defensa:16, regen:2},
    {name: "Sunflare Phoenix",image: "assets/creatures/aetherfang.png", vida:88, ataque:21, defensa:6, regen:5},
    {name: "Ironclad Colossus",image: "assets/creatures/aetherfang.png", vida:170, ataque:14, defensa:18, regen:2},
    {name: "Bloodmoon Reaper",image: "assets/creatures/aetherfang.png", vida:92, ataque:25, defensa:7, regen:1},
    {name: "Glimmer Sprite",image: "assets/creatures/aetherfang.png", vida:60, ataque:12, defensa:4, regen:4},
    {name: "Abyssal Kraken",image: "assets/creatures/aetherfang.png", vida:155, ataque:23, defensa:13, regen:2},
    {name: "Thunder Behemoth",image: "assets/creatures/aetherfang.png", vida:135, ataque:24, defensa:11, regen:1},
    {name: "Verdant Guardian",image: "assets/creatures/aetherfang.png", vida:120, ataque:15, defensa:12, regen:3},
    {name: "Nether Djinn",image: "assets/creatures/aetherfang.png", vida:82, ataque:20, defensa:5, regen:4},
    {name: "Astral Chimera",image: "assets/creatures/aetherfang.png", vida:125, ataque:27, defensa:9, regen:2}
  ];

  // export to window for game.js
  window.GACHA = {
    CREATURES,
    RANKS,
    createInvoker: function(){
      let pity = 0; // contador de invocaciones sin épico o superior

      function weightedPick(ranks){
        const x = Math.random();
        let acc = 0;
        for(const r of ranks){
          acc += r.prob;
          if(x <= acc) return r;
        }
        return ranks[ranks.length-1];
      }

      function pickRank(){
        // pity: si pity >=20 -> garantizar épico (o superior si aleatorio lo decide)
        if(pity >= 20){
          // elegir entre epico/legendario/mitico respetando proporciones relativas
          const choices = RANKS.filter(r=>['epico','legendario','mitico'].includes(r.key));
          const total = choices.reduce((s,c)=>s+c.prob,0);
          const normalized = choices.map(c=>({key:c.key,prob:c.prob/total,mul:c.mul}));
          const pick = weightedPick(normalized);
          return pick;
        }
        return weightedPick(RANKS);
      }

      function invocarCriatura(){
        if(window.Game && window.Game.player && window.Game.player.keys <= 0){
          throw new Error('No tienes llaves para invocar');
        }

        const base = JSON.parse(JSON.stringify(CREATURES[Math.floor(Math.random()*CREATURES.length)]));
        const rank = pickRank();

        // update pity
        if(['epico','legendario','mitico'].includes(rank.key)){
          pity = 0;
        } else {
          pity++;
        }

        const multiplier = rank.mul;
        const final = {
          name: base.name,
          rank: rank.key,
          vidaBase: base.vida,
          ataqueBase: base.ataque,
          defensaBase: base.defensa,
          regenBase: base.regen,
          vidaMax: Math.round(base.vida * multiplier),
          vida: Math.round(base.vida * multiplier),
          ataque: Math.round(base.ataque * multiplier),
          defensa: Math.round(base.defensa * multiplier),
          regen: Math.max(1, Math.round(base.regen * multiplier/1)),
          abilities: [],
          image: base.image,
        };

        // give abilities based on rank probability
        const abilPool = window.ABILITIES && window.ABILITIES.ALL ? window.ABILITIES.ALL : [];
        const chanceStrong = {
          comun:0.05,pocoComun:0.12,raro:0.25,epico:0.5,legendario:0.8,mitico:0.95
        }[rank.key];

        // always at least one ability for raro+ and a chance for others
        if(Math.random() < chanceStrong || ['raro','epico','legendario','mitico'].includes(rank.key)){
          // pick 1-2 abilities
          const n = Math.random() < 0.2 ? 2 : 1;
          for(let i=0;i<n;i++){
            const pick = abilPool[Math.floor(Math.random()*abilPool.length)];
            if(pick && !final.abilities.find(a=>a.id===pick.id)) final.abilities.push(pick);
          }
        }

        // consume key
        if(window.Game && window.Game.player){
          window.Game.player.keys = Math.max(0, window.Game.player.keys - 1);
          updateKeyDisplay();
        }

        return final;
      }

      function updateKeyDisplay(){
        const el = document.getElementById('key-count');
        if(el && window.Game) el.textContent = window.Game.player.keys;
      }

      return {invocarCriatura, _getPity:()=>pity};
    }
  };
})();

/* game.js
   Versión completa PRO:
   - Soporte LAN (Socket.io)
   - Combate local (practice)
   - UI tipo cartas (habilidades + lore)
*/

(() => {

  // ==============================
  // 🌍 ESTADO GLOBAL
  // ==============================
  window.Game = {
    player: { creature: null, keys: 1, wins: 0, losses: 0 },
    enemyCreature: null,
    mode: 'duel',
    socket: null,
    serverState: null
  };

  function $(id){ return document.getElementById(id); }

  function logTo(elId, text){
    const el = $(elId);
    if(!el) return;
    el.innerHTML += `[${new Date().toLocaleTimeString()}] ${text}<br>`;
    el.scrollTop = el.scrollHeight;
  }

  // ==============================
  // 🎴 RENDER CARTAS (PRO)
  // ==============================
  function renderCreatureCard(cre, containerId){
    const c = $(containerId);
    if(!c) return;

    if(!cre){
      c.innerHTML = '<em>Vacío</em>';
      return;
    }

    const rarityClass = cre.rank || 'comun';
    const rankName = {
      comun:'Común',
      pocoComun:'Poco común',
      raro:'Raro',
      epico:'Épico',
      legendario:'Legendario',
      mitico:'MÍTICO'
    }[rarityClass];

    c.className = `creature-card ${rarityClass}`;

    c.innerHTML = `
      <div class="rank">${rankName}</div>

      <img class="art"
        src="${cre.image || 'assets/creatures/aetherfang.png'}"
        onerror="this.src='assets/creatures/aetherfang.png'"
      >

      <div class="name">${cre.name}</div>

      <div class="stats">
        <div class="stat">❤️<br>${cre.vida}</div>
        <div class="stat">⚔️<br>${cre.ataque}</div>
        <div class="stat">🛡️<br>${cre.defensa}</div>
      </div>

      ${
        cre.abilities && cre.abilities.length
        ? `<div class="ability">
            <strong>${cre.abilities[0].name}</strong>
            <p>${cre.abilities[0].description || ''}</p>
          </div>`
        : ''
      }

      ${
        cre.lore
        ? `<div class="lore"><em>${cre.lore}</em></div>`
        : ''
      }
    `;
  }

  function updatePlayerUI(){
    $('key-count').textContent = window.Game.player.keys;
    $('wins').textContent = window.Game.player.wins;
    $('losses').textContent = window.Game.player.losses;
  }

  function updateArenaVisuals(){
    renderCreatureCard(window.Game.player.creature, 'player-creature-card');
    renderCreatureCard(window.Game.enemyCreature, 'enemy-creature-card');
  }

  // ==============================
  // 🌐 MULTIPLAYER (SERVER)
  // ==============================
  function setupSocket(){

    const socket = io();
    window.Game.socket = socket;

    socket.on("connect", ()=>{
      logTo('gacha-log', 'Conectado al servidor');
    });

    socket.on("roomCreated", ({ roomId })=>{
      alert("Código de sala: " + roomId);
      logTo('gacha-log', "Sala creada: " + roomId);
    });

    socket.on("playerJoined", ()=>{
      logTo('gacha-log', "Jugador conectado");
    });

    socket.on("gameStart", ({ state })=>{
      window.Game.serverState = state;

      $('summon-screen').classList.add('hidden');
      $('arena-screen').classList.remove('hidden');

      renderFromServer(state);
    });

    socket.on("stateUpdate", (state)=>{
      window.Game.serverState = state;
      renderFromServer(state);
    });

    socket.on("errorMsg", (msg)=>{
      alert(msg);
    });
  }

  function renderFromServer(state){
    const myId = window.Game.socket.id;

    const me = state.players[myId];
    const enemyId = Object.keys(state.players).find(id => id !== myId);
    const enemy = state.players[enemyId];

    window.Game.player.creature = me.creature;
    window.Game.enemyCreature = enemy.creature;

    updateArenaVisuals();

    const panel = $('actionPanel');
    if(state.turn === myId){
      panel.style.display = "flex";
    } else {
      panel.style.display = "none";
    }
  }

  function sendAction(type){
    window.Game.socket.emit("gameAction", {
      action: {
        type,
        creature: window.Game.player.creature
      }
    });
  }

  // ==============================
  // 🧠 COMBATE LOCAL (PRACTICE)
  // ==============================
  let currentCombat = null;

  function computeDamage(a, d){
    return Math.max(1, a.ataque - d.defensa);
  }

  class Combat {
    constructor(p, e, onUpdate){
      this.player = JSON.parse(JSON.stringify(p));
      this.enemy = JSON.parse(JSON.stringify(e));
      this.turn = 'player';
      this.onUpdate = onUpdate;
    }

    step(actor, type){
      const A = actor === 'player' ? this.player : this.enemy;
      const T = actor === 'player' ? this.enemy : this.player;

      if(type === 'ATTACK'){
        const dmg = computeDamage(A, T);
        T.vida -= dmg;
      }

      if(this.onUpdate) this.onUpdate(this);

      if(this.player.vida <= 0 || this.enemy.vida <= 0){
        finalizeCombat(this);
        return;
      }

      this.turn = this.turn === 'player' ? 'enemy' : 'player';
    }
  }

  function startLocalCombat(){
    currentCombat = new Combat(
      window.Game.player.creature,
      window.Game.enemyCreature,
      (c)=>{
        window.Game.player.creature.vida = c.player.vida;
        window.Game.enemyCreature.vida = c.enemy.vida;
        updateArenaVisuals();
      }
    );
  }

  function finalizeCombat(c){
    if(c.player.vida > 0){
      alert("¡Ganaste!");
      window.Game.player.keys++;
      window.Game.player.wins++;
    } else {
      alert("Perdiste");
      window.Game.player.creature = null;
      window.Game.player.losses++;
    }
    updatePlayerUI();
  }

  // ==============================
  // 🎮 UI EVENTS
  // ==============================
  document.addEventListener('DOMContentLoaded', ()=>{

    setupSocket();
    updatePlayerUI();

    window.Game.invoker = window.GACHA.createInvoker();

    // invocar
    $('btn-new-summon').onclick = ()=>{
      try{
        const cr = window.Game.invoker.invocarCriatura();
        window.Game.player.creature = cr;
        renderCreatureCard(cr,'summon-result');
        updatePlayerUI();
      }catch(e){
        alert(e.message);
      }
    };

    // crear sala
    $('btn-new-room').onclick = ()=>{
      window.Game.socket.emit("createRoom");
    };

    // unirse
    $('btn-join-room').onclick = ()=>{
      const id = $('join-room-id').value.trim();
      if(!id) return alert("Ingresa ID");
      window.Game.socket.emit("joinRoom", id);
    };

    // combate local
    $('btn-start-combat').onclick = ()=>{
      if(!window.Game.player.creature){
        return alert("Invoca criatura primero");
      }

      const en = window.Game.invoker.invocarCriatura();
      window.Game.enemyCreature = en;

      $('summon-screen').classList.add('hidden');
      $('arena-screen').classList.remove('hidden');

      startLocalCombat();
    };

    // acciones
    document.querySelectorAll('.action-btn').forEach(btn=>{
      btn.onclick = ()=>{
        const action = btn.dataset.action;

        if(window.Game.serverState){
          sendAction(action);
        } else {
          if(currentCombat){
            currentCombat.step('player', action);

            setTimeout(()=>{
              currentCombat.step('enemy', 'ATTACK');
            }, 400);
          }
        }
      };
    });

    renderCreatureCard(null,'summon-result');
    updateArenaVisuals();
  });

})();
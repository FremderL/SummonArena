const socket = io();

window.NetworkClient = {
  createRoom() { return new Promise(resolve => socket.emit('createRoom', resolve)); },
  joinRoom(roomId) { return new Promise((resolve, reject) => socket.emit('joinRoom', roomId, (ok, msg) => ok ? resolve() : reject(msg))); },
  setCreature(creature) { socket.emit('setCreature', creature); },
  playerAction(action) { socket.emit('playerAction', action); },
  startCombat() { socket.emit('startCombat'); }
};

// === LISTENERS CORREGIDOS (esto faltaba) ===
socket.on('playerJoined', () => {
  logTo('gacha-log', '✅ Oponente conectado. Invoca y pulsa "Iniciar Combate"');
});

socket.on('combatStarted', (data) => {
  window.Game.enemyCreature = data.creatures.p2 || data.creatures.p1;
  $('summon-screen').classList.add('hidden');
  $('arena-screen').classList.remove('hidden');
  updateArenaVisuals();
  logTo('combat-log', '¡COMBATE INICIADO!');
});

socket.on('gameState', (data) => {
  if (window.Game.player.creature) window.Game.player.creature.vida = data.creatures.p1.vida || data.creatures.p1.vidaMax;
  if (window.Game.enemyCreature) window.Game.enemyCreature.vida = data.creatures.p2.vida || data.creatures.p2.vidaMax;
  updateArenaVisuals();
  data.log.forEach(l => logTo('combat-log', l));
});

socket.on('combatEnd', () => {
  $('arena-screen').classList.add('hidden');
  $('game-over').classList.remove('hidden');
});
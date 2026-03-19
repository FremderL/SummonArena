let playerData = { keys: 5, wins: 0, losses: 0, creature: null };

function loadSave() {
  const saved = localStorage.getItem('summonArenaSave');
  if (saved) playerData = JSON.parse(saved);
}

function saveProgress() {
  localStorage.setItem('summonArenaSave', JSON.stringify(playerData));
}

window.onload = loadSave;
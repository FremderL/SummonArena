const express = require('express');
const playerStore = require('../../core/playerStore');

function createLeaderboardRoutes() {
  const router = express.Router();

  router.get('/leaderboard', (_req, res) => {
    res.json({
      items: playerStore.getLeaderboard(10)
    });
  });

  return router;
}

module.exports = createLeaderboardRoutes;

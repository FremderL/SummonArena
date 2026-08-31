const express = require('express');

function createHealthRoutes() {
  const router = express.Router();

  router.get('/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'summon-arena',
      now: new Date().toISOString()
    });
  });

  return router;
}

module.exports = createHealthRoutes;

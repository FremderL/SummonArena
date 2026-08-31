const express = require('express');
const playerStore = require('../../core/playerStore');

function createShopRoutes() {
  const router = express.Router();

  router.get('/shop', (_req, res) => {
    res.json({ items: playerStore.getShopCatalog() });
  });

  router.post('/shop/purchase', (req, res) => {
    const playerId = req.body && req.body.playerId;
    const itemId = req.body && req.body.itemId;
    if (!playerId || !itemId) {
      res.status(400).json({ error: 'playerId e itemId son requeridos' });
      return;
    }

    const result = playerStore.purchaseShopItem(playerId, itemId);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.json({
      ok: true,
      item: result.item,
      profile: result.profile
    });
  });

  return router;
}

module.exports = createShopRoutes;

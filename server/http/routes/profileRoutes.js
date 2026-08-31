const express = require('express');
const playerStore = require('../../core/playerStore');
const authService = require('../../core/authService');

function createProfileRoutes() {
  const router = express.Router();

  router.get('/profiles/:playerId', (req, res) => {
    const profile = playerStore.getPublicProfile(req.params.playerId);
    if (!profile) {
      res.status(404).json({ error: 'Perfil no encontrado' });
      return;
    }
    res.json(profile);
  });

  router.delete('/profiles/:playerId', (req, res) => {
    const result = playerStore.deleteAccount(req.params.playerId, req.body && req.body.sessionToken);
    if (result.error) {
      res.status(403).json({ error: result.error });
      return;
    }
    authService.removeByPlayerId(req.params.playerId);
    res.json(result.deletedProfile);
  });

  return router;
}

module.exports = createProfileRoutes;

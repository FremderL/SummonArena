const express = require('express');
const authService = require('../../core/authService');

function createAuthRoutes() {
  const router = express.Router();

  router.post('/auth/register', (req, res) => {
    const result = authService.register(req.body && req.body.username, req.body && req.body.password, req.body && req.body.playerName);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.json({
      username: result.username,
      authToken: result.authToken,
      playerId: result.playerId,
      profile: result.profile
    });
  });

  router.post('/auth/login', (req, res) => {
    const result = authService.login(req.body && req.body.username, req.body && req.body.password);
    if (result.error) {
      res.status(401).json({ error: result.error });
      return;
    }
    res.json({
      username: result.username,
      authToken: result.authToken,
      playerId: result.playerId,
      profile: result.profile
    });
  });

  router.post('/auth/resume', (req, res) => {
    const result = authService.resume(req.body && req.body.authToken);
    if (result.error) {
      res.status(401).json({ error: result.error });
      return;
    }
    res.json({
      username: result.username,
      authToken: result.authToken,
      playerId: result.playerId,
      profile: result.profile
    });
  });

  router.post('/auth/logout', (req, res) => {
    const result = authService.logout(req.body && req.body.authToken);
    res.json(result);
  });

  router.get('/auth/:username', (req, res) => {
    const account = authService.getPublicAccount(req.params.username);
    if (!account) {
      res.status(404).json({ error: 'Cuenta no encontrada' });
      return;
    }
    res.json(account);
  });

  return router;
}

module.exports = createAuthRoutes;

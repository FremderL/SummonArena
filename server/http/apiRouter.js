const express = require('express');
const createHealthRoutes = require('./routes/healthRoutes');
const createLeaderboardRoutes = require('./routes/leaderboardRoutes');
const createProfileRoutes = require('./routes/profileRoutes');
const createAuthRoutes = require('./routes/authRoutes');
const createShopRoutes = require('./routes/shopRoutes');

function createApiRouter() {
  const router = express.Router();

  router.use(createHealthRoutes());
  router.use(createAuthRoutes());
  router.use(createLeaderboardRoutes());
  router.use(createProfileRoutes());
  router.use(createShopRoutes());

  return router;
}

module.exports = createApiRouter;

const createSocketContext = require('./createSocketContext');
const registerProfileHandlers = require('./handlers/profileHandlers');
const registerRoomHandlers = require('./handlers/roomHandlers');
const registerCombatHandlers = require('./handlers/combatHandlers');

function createGameGateway(io) {
  const ctx = createSocketContext(io);

  io.on('connection', (socket) => {
    socket.data.playerId = null;
    socket.data.playerName = 'Invocador';
    socket.data.accountUsername = null;
    ctx.emitLeaderboardSync(socket);

    registerProfileHandlers(ctx, socket);
    registerRoomHandlers(ctx, socket);
    registerCombatHandlers(ctx, socket);
  });
}

module.exports = createGameGateway;

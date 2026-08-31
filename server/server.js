/* server.js
   Punto de entrada del backend de Summon Arena.
*/
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const createApiRouter = require('./http/apiRouter');
const createGameGateway = require('./socket/gameGateway');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', createApiRouter());
app.use(express.static(path.join(__dirname, '..', 'client')));

createGameGateway(io);

server.listen(PORT, () => {
  console.log('Summon Arena server listening on', PORT);
});

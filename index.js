const express = require('express');
const app = express();
const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const server = http.createServer(app);
const io = require('socket.io')(http);
const randomId = require('./src/uuid');

//////
const { createGame, findGame, updateGame } = require('./src/games');
const { createPlayers, deletePlayer } = require('./src/players');

io.listen(server);

app.use(cors());

io.on('connection', (socket) => {
  console.log('client connected');

  socket.on('disconnect', () => {
    deletePlayer(socket.id);
  });

  socket.on('createGame', (data) => {
    const gameId = `${data.name}-${randomId()}`;
    const player = createPlayers(socket.id, data.name, gameId);
    const game = createGame(gameId, player.id, null);

    socket.join(gameId);
    socket.emit('upGame', game);
    socket.emit('crPlayer', player);
  });

  socket.on('joinGame', (data) => {
    const game = findGame(data.gameId);

    if (!game) {
      socket.emit('notif', { massege: 'wrong id' });
      return;
    }
    if (game.player2) {
      socket.emit('notif', { massege: 'cant join' });
      return;
    }

    const player = createPlayers(socket.id, data.name);

    game.player2 = player.id;
    game.status = 'playing';

    updateGame(game);

    socket.join(data.gameId);
    socket.emit('upGame', game);
    socket.emit('crPlayer', player);
    socket.broadcast.emit('upGame', game);
    socket.broadcast.emit('notif', {
      massege: `${data.name} has joined the game `,
    });
  });

  socket.on('adding', ({ blocks, id, gameId }) => {
    const game = findGame(gameId);
    console.log(game);
    game.blocks = blocks;

    const newTurn = game.turn === game.player1 ? game.player2 : game.player1;

    game.turn = newTurn;

    console.log(game)
    updateGame(game);
    io.in(gameId).emit('upGame',game)
  });

  
});
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

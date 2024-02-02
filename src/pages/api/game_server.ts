import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  //@ts-ignore
  const server = res.socket.server;

  if (server.io) {

    console.log('Socket is already running');

  } else {

    console.log('Socket is initializing');
    const io = new Server(server);
    server.io = io;

    io.on('connection', (socket) => {

      console.log('a user connected: ', socket.id);

      socket.on("enter-the-room", (roomName: string) => {

        socket.join(roomName);

        console.log(`User ${socket.id} has joined to room: ${roomName}`);

        sendSelectedEmojisEvent(io, roomName);

      });

      socket.on("select-emoji", (emoji: string) => {

        // The 0 room is the default room, and the 1 room is our game room.
        const roomName = Array.from(socket.rooms)[1];
        const roomPlayers = io.sockets.adapter.rooms.get(roomName);

        // @ts-ignore
        socket.emoji = emoji;

        // @ts-ignore
        console.log(`[${roomName}] User ${socket.id} selected the ${socket.emoji} emoji`);

        sendSelectedEmojisEvent(io, roomName);

        // The game starts with 2 players.
        if (roomPlayers?.size === 2) {

          const player1Socket = io.sockets.sockets.get(Array.from(roomPlayers)[0]);
          const player2Socket = io.sockets.sockets.get(Array.from(roomPlayers)[1]);

          // Can only enter in the match if the user has selected a emoji.
          // @ts-ignore
          if (player1Socket.emoji && player2Socket.emoji) {

            io.to(roomName).emit("game-start", {
              player1: {
                id: player1Socket?.id,
                // @ts-ignore
                emoji: player1Socket.emoji,
                score: 0
              },
              player2: {
                id: player2Socket?.id,
                // @ts-ignore
                emoji: player2Socket.emoji,
                score: 0
              },
              game: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
              ],
              turn: player1Socket?.id,
              result: null
            });

          }

        }

      });

      socket.on('game-update', function (gameObject: Game) {

        // The 0 room is the default room, and the 1 room is our game room.
        const roomName2 = Array.from(socket.rooms)[1];

        console.log(`[${roomName2}] The game was updated to: ${gameObject.game}`);

        let primaryDiagonal: Array<0 | 1 | 2> = [];
        let secondaryDiagonal: Array<0 | 1 | 2> = [];

        // Checking if the game has a winner
        for (let i = 0; i < gameObject.game.length; i++) {

          const row = gameObject.game[i];
          const column = [gameObject.game[0][i], gameObject.game[1][i], gameObject.game[2][i]];

          primaryDiagonal.push(gameObject.game[i][i]);
          secondaryDiagonal.push(gameObject.game[i][gameObject.game.length - 1 - i]);

          if (row.every(function (position) { return position > 0 }) && row.every(function (position, j, arr) { return arr[0] === position })) {

            gameObject.result = row[0];

          } else if (column.every(function (position) { return position > 0 }) && column.every(function (position, j, arr) { return arr[0] === position })) {

            gameObject.result = column[0];

          }

        }

        if (primaryDiagonal.every(function (position) { return position > 0 }) && primaryDiagonal.every(function (position, j, arr) { return arr[0] === position })) {

          gameObject.result = primaryDiagonal[0];

        } else if (secondaryDiagonal.every(function (position) { return position > 0 }) && secondaryDiagonal.every(function (position, j, arr) { return arr[0] === position })) {

          gameObject.result = secondaryDiagonal[0];

        } if (gameObject.game.toString().split(',').indexOf('0') === -1) {

          gameObject.result = 0;

        }

        if (gameObject.result !== null) {

          if (gameObject.result > 0) {

            console.log(`[${roomName2}] Player ${socket.id} is the winner!`);

            if (socket.id === gameObject.player1.id) {

              gameObject.player1.score += 1;

            } else {

              gameObject.player2.score += 1;

            }

          } else {

            console.log(`[${roomName2}] Tied match!`);

          }

        } else {

          gameObject.turn = gameObject.turn === gameObject.player1.id ? gameObject.player2.id : gameObject.player1.id;

          console.log(`[${roomName2}] Now is the turn of player: ${gameObject.turn}`);

        }

        console.log(`[${roomName2}] game: `, gameObject)

        // The 0 room is the default room, and the 1 room is our game room.
        const roomName = Array.from(socket.rooms)[1];

        io.to(roomName).emit("game-updated", gameObject);

      })

    });

  }

  res.end();

}

// Send back the selected emojis to avoid the other player to select the same emojis.
function sendSelectedEmojisEvent(io: Server, roomName: string) {

  const roomPlayers = io.sockets.adapter.rooms.get(roomName);
  // @ts-ignore
  const emojis = Array.from(roomPlayers).map(function (player) {
    // @ts-ignore
    return io.sockets.sockets.get(player).emoji;

  }).filter(function (emoji) { return emoji });

  if (emojis.length) {
    io.to(roomName).emit("selected-emojis", emojis);
  }

}
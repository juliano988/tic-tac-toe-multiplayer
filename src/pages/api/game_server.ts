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

      });

      socket.on("select-emoji", (emoji: string) => {

        socket.emoji = emoji;

        console.log(`User ${socket.id} selected the ${socket.emoji} emoji`);

        // The 0 room is the default room, and the 1 room is our game room.
        const room = Array.from(io.sockets.adapter.rooms)[1];
        const roomName = room[0];
        const roomPlayers = Array.from(room[1])

        // The game starts with 2 players.
        if (roomPlayers.length === 2) {

          const player1Socket = io.sockets.sockets.get(roomPlayers[0]);
          const player2Socket = io.sockets.sockets.get(roomPlayers[1]);

          if (player1Socket && player2Socket) {

            io.to(roomName).emit("game-start", {
              player1: {
                id: player1Socket.id,
                emoji: player1Socket.emoji,
                score: 0
              },
              player2: {
                id: player2Socket.id,
                emoji: player2Socket.emoji,
                score: 0
              },
              game: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
              ],
              turn: player1Socket.id,
              result: null
            });

          }

        }

      });

    });

  }

  res.end();

}
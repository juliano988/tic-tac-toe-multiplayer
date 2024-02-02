"use client"

import Image from "next/image";
import { Socket, io } from "socket.io-client";
import CharacterButton from "./components/CharacterButton";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GameBoard from "./components/GameBoard";
import EndGame from "./components/EndGame";

export default function Home() {

  const searchParams = useSearchParams();

  const [room, setroom] = useState<string>('');
  const [socket, setsocket] = useState<Socket>();

  const [wasEmojiSelected, setwasEmojiSelected] = useState(false);

  const [gameObject, setgameObject] = useState<Game>();

  useEffect(function () {

    if (typeof window !== 'undefined') {

      const room = searchParams?.get('room') || window.crypto.randomUUID();

      window.history.replaceState(null, '', `?room=${room}`);

      setroom(room);

    }

  }, []);

  useEffect(function () {

    if (room) {

      fetch('/api/game_server').finally(function () {

        const socket = io();

        setsocket(socket);

        socket.on("connect", () => {

          console.log(`User ${socket.id} connected`);

          socket.emit("enter-the-room", room);

        });

        socket.on("game-start", (gameObject: Game) => {

          setgameObject(gameObject);

        });

        socket.on("game-updated", (gameObject: Game) => {

          setgameObject(gameObject);

        });

      });

    }

  }, [room]);

  function handleEmojiSelection(emoji: string) {

    if (socket) {

      socket.emit("select-emoji", emoji);

      setwasEmojiSelected(true);

    }

  }

  function handleGameChange(game: Game['game']) {

    if (socket && gameObject) {

      gameObject.game = game;

      socket.emit("game-update", gameObject);

    }

  }

  return (

    <>

      <header className="mt-4 mb-4">
        <h1>Jogo da Velha 👵</h1>
        <h2>Multiplayer 🎮</h2>
      </header>

      {gameObject ?

        <div className="flex flex-col justify-center items-center h-full">

          {gameObject.turn === socket?.id ? <span className={`mb-3 text-lg motion-safe:animate-bounce transition-all`}>👇 Sua vez! 👇</span> : <></>}
          {gameObject.turn !== socket?.id ? <span className={`mb-3 text-lg transition-all`}>
            {socket?.id === gameObject.player1.id ? gameObject.player1.emoji : gameObject.player2.emoji} Pensando...
          </span> : <></>}

          <div className="flex justify-between items-end w-[240px] mb-2">

            <div>
              <h5 className={`${gameObject.turn === gameObject.player1.id ? 'scale-110 font-medium' : 'scale-90'} transition-all text-lg`}>{gameObject.player1.emoji} Jogador 1</h5>
              <span>{gameObject.player1.score}</span>
            </div>

            <div>
              <h5 className={`${gameObject.turn === gameObject.player2.id ? 'scale-110 font-medium' : 'scale-90'} transition-all text-lg`}>{gameObject.player2.emoji} Jogador 2</h5>
              <span>{gameObject.player2.score}</span>
            </div>

          </div>

          <GameBoard
            userId={socket?.id as string}
            player1={gameObject.player1}
            player2={gameObject.player2}
            turn={gameObject.turn}
            game={gameObject.game}
            onChangeGame={(game) => handleGameChange(game)} />

        </div> :

        <div className="flex flex-col justify-center h-full">

          <div className={`${wasEmojiSelected ? 'opacity-0 h-0 scale-y-0 -mt-9 transition-all' : ''}`}>

            <span>Selecione seu personagem:</span>

            <div>
              <CharacterButton onClick={() => handleEmojiSelection("👨")} emoji="👨" />
              <CharacterButton onClick={() => handleEmojiSelection("👩")} emoji="👩" />
              <CharacterButton onClick={() => handleEmojiSelection("🤖")} emoji="🤖" />
              <CharacterButton onClick={() => handleEmojiSelection("👾")} emoji="👾" />
              <CharacterButton onClick={() => handleEmojiSelection("👽")} emoji="👽" />
              <CharacterButton onClick={() => handleEmojiSelection("💀")} emoji="💀" />
              <CharacterButton onClick={() => handleEmojiSelection("👻")} emoji="👻" />
              <CharacterButton onClick={() => handleEmojiSelection("❓")} emoji="❓" />
            </div>

          </div>

          <br />

          <div className={`flex flex-col ${wasEmojiSelected ? '' : 'opacity-0 h-0 scale-y-0 transition-all'}`}>

            <span>Envie o link para um amigo:</span>
            <input className="text-center" value={`${typeof window !== 'undefined' ? window.location.origin : ''}?room=${room}`} readOnly></input>

          </div>

        </div>

      }

      <footer className="mt-4 mb-4">
        <h6>Developed by 🤓 Júlio Faria</h6>
      </footer>

      {gameObject ?
        <EndGame
          // @ts-ignore
          socket={socket as Socket}
          gameObject={gameObject} />
        : <></>}

    </>

  );

}

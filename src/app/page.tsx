"use client"

import Image from "next/image";
import { Socket, io } from "socket.io-client";
import CharacterButton from "./components/CharacterButton";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GameBoard from "./components/GameBoard";

export default function Home() {

  const searchParams = useSearchParams();

  const [room, setroom] = useState<string>('');
  const [socket, setsocket] = useState<Socket>();

  const [wasEmojiSelected, setwasEmojiSelected] = useState(false);

  const [gameObject, setgameObject] = useState();

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

        socket.on("game-start", (gameObject) => {

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

  return (

    <>

      <header className="mt-4 mb-4">
        <h1>Jogo da Velha 👵</h1>
        <h2>Multiplayer 🎮</h2>
      </header>

      {gameObject ?

        <div className="flex justify-center items-center h-full">

          <GameBoard player1Emoji="👨" player2Emoji="❓" turn={2} onChangeGame={(a) => console.log(a)} game={[
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ]} />

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

    </>

  );

}

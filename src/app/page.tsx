import Image from "next/image";
import CharacterButton from "./components/CharacterButton";

export default function Home() {

  return (

    <>

      <header className="mt-4 mb-4">
        <h1>Jogo da Velha 👵</h1>
        <h2>Multiplayer 🎮</h2>
      </header>

      <div className="flex flex-col justify-center h-full">

        <span>Selecione seu personagem:</span>

        <div>
          <CharacterButton emoji="👨" />
          <CharacterButton emoji="👩" />
          <CharacterButton emoji="🤖" />
          <CharacterButton emoji="👾" />
          <CharacterButton emoji="👽" />
          <CharacterButton emoji="💀" />
          <CharacterButton emoji="👻" />
          <CharacterButton emoji="❓" />
        </div>

      </div>

      <footer className="mt-4 mb-4">
        <h6>Developed by 🤓 Júlio Faria</h6>
      </footer>

    </>

  );

}

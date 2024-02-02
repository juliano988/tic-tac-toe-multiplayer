import { Socket } from "socket.io"

export default function EndGame(props: {
  socket: Socket,
  gameObject: Game
}) {

  function isUserTheWinner(userId: string) {

    if (userId === props.gameObject.player1.id) {

      if (props.gameObject.result === 1) {

        return true;

      } else {

        return false;

      }

    } else {

      if (props.gameObject.result === 2) {

        return true;

      } else {

        return false;

      }

    }

  }

  function handleRematch() {

    props.gameObject.result = null;
    props.gameObject.game = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

    props.socket.emit("game-update", props.gameObject);

  }

  if (props.gameObject.result !== null) {

    return (

      <div className="fixed w-full h-full backdrop-blur-sm flex gap-5 flex-col justify-center items-center">

        <span className="text-9xl animate-bounce">{props.gameObject.result === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji}</span>

        {!props.gameObject.result ?
          <span className="text-center text-4xl font-semibold">EMPATE!<br />🤝</span> :
          <>
            {isUserTheWinner(props.socket.id) ?
              <span className="text-center text-4xl font-semibold">PARABÉNS PELA<br />VITÓRIA!<br />🏆</span> :
              <span className="text-center text-4xl font-semibold">VOCÊ PERDEU!<br />😭</span>}
          </>
        }

        <span className="text-3xl font-semibold">{`${props.gameObject.player1.emoji} ${props.gameObject.player1.score} X ${props.gameObject.player2.score} ${props.gameObject.player2.emoji}`}</span>

        {/* In tie, anyone can ask for a rematch */}
        {isUserTheWinner(props.socket.id) ?
          <span className="text-xl font-medium">Aguardando revanche...</span> :
          <button className="text-xl font-medium text-white bg-red-500 w-fit p-2 rounded" onClick={() => handleRematch()}>REVANCHE!</button>}

      </div>

    )

  } else {

    return <></>;

  }

}
import { DetailedHTMLProps, TableHTMLAttributes, useEffect, useState } from "react";
import { Socket } from "socket.io-client";


export default function GameBoard(props: {
  socket: Socket,
  gameObject: Game | undefined,
  onChangeGame: (game: Array<Array<0 | 1 | 2>>) => void
} & DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>) {

  const [p11, setp11] = useState<string | null>(null);
  const [p12, setp12] = useState<string | null>(null);
  const [p13, setp13] = useState<string | null>(null);

  const [p21, setp21] = useState<string | null>(null);
  const [p22, setp22] = useState<string | null>(null);
  const [p23, setp23] = useState<string | null>(null);

  const [p31, setp31] = useState<string | null>(null);
  const [p32, setp32] = useState<string | null>(null);
  const [p33, setp33] = useState<string | null>(null);

  useEffect(function () {

    if (props.gameObject?.game?.length) {

      setp11(props.gameObject?.game[0][0] ? props.gameObject?.game[0][0] === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji : null);
      setp12(props.gameObject?.game[0][1] ? props.gameObject?.game[0][1] === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji : null);
      setp13(props.gameObject?.game[0][2] ? props.gameObject?.game[0][2] === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji : null);

      setp21(props.gameObject?.game[1][0] ? props.gameObject?.game[1][0] === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji : null);
      setp22(props.gameObject?.game[1][1] ? props.gameObject?.game[1][1] === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji : null);
      setp23(props.gameObject?.game[1][2] ? props.gameObject?.game[1][2] === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji : null);

      setp31(props.gameObject?.game[2][0] ? props.gameObject?.game[2][0] === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji : null);
      setp32(props.gameObject?.game[2][1] ? props.gameObject?.game[2][1] === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji : null);
      setp33(props.gameObject?.game[2][2] ? props.gameObject?.game[2][2] === 1 ? props.gameObject.player1.emoji : props.gameObject.player2.emoji : null);

    }

  }, [props.gameObject?.game]);

  function handleClickPosition(position: string) {

    if (props.gameObject?.game && props.socket.id === props.gameObject.turn) {

      const playerNumber = props.gameObject.turn === props.gameObject.player1.id ? 1 : 2;

      switch (position) {

        case 'p11': props.gameObject.game[0][0] = playerNumber; break;
        case 'p12': props.gameObject.game[0][1] = playerNumber; break;
        case 'p13': props.gameObject.game[0][2] = playerNumber; break;

        case 'p21': props.gameObject.game[1][0] = playerNumber; break;
        case 'p22': props.gameObject.game[1][1] = playerNumber; break;
        case 'p23': props.gameObject.game[1][2] = playerNumber; break;

        case 'p31': props.gameObject.game[2][0] = playerNumber; break;
        case 'p32': props.gameObject.game[2][1] = playerNumber; break;
        case 'p33': props.gameObject.game[2][2] = playerNumber; break;

        default: break;

      }

      props.onChangeGame(props.gameObject?.game);

    }

  }

  return (

    <table className="border-solid border-black border w-fit">

      <tbody className={`${props.socket.id === props.gameObject?.turn ? 'cursor-pointer' : 'cursor-not-allowed'}`}>

        <tr>
          <td className="border-solid border-black border w-20 h-20 text-5xl" onClick={() => handleClickPosition('p11')}>{props.gameObject ? p11 : '❔'}</td>
          <td className="border-solid border-black border w-20 h-20 text-5xl" onClick={() => handleClickPosition('p12')}>{props.gameObject ? p12 : '❔'}</td>
          <td className="border-solid border-black border w-20 h-20 text-5xl" onClick={() => handleClickPosition('p13')}>{props.gameObject ? p13 : '❔'}</td>
        </tr>

        <tr>
          <td className="border-solid border-black border w-20 h-20 text-5xl" onClick={() => handleClickPosition('p21')}>{props.gameObject ? p21 : '❔'}</td>
          <td className="border-solid border-black border w-20 h-20 text-5xl" onClick={() => handleClickPosition('p22')}>{props.gameObject ? p22 : '❔'}</td>
          <td className="border-solid border-black border w-20 h-20 text-5xl" onClick={() => handleClickPosition('p23')}>{props.gameObject ? p23 : '❔'}</td>
        </tr>

        <tr>
          <td className="border-solid border-black border w-20 h-20 text-5xl" onClick={() => handleClickPosition('p31')}>{props.gameObject ? p31 : '❔'}</td>
          <td className="border-solid border-black border w-20 h-20 text-5xl" onClick={() => handleClickPosition('p32')}>{props.gameObject ? p32 : '❔'}</td>
          <td className="border-solid border-black border w-20 h-20 text-5xl" onClick={() => handleClickPosition('p33')}>{props.gameObject ? p33 : '❔'}</td>
        </tr>

      </tbody>

    </table>

  )

}
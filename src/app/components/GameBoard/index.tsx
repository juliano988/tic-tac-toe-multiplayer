import { DetailedHTMLProps, TableHTMLAttributes, useEffect, useState } from "react";

export default function GameBoard(props: {
  userId: string,
  player1: Game['player1'],
  player2: Game['player2'],
  turn: string,
  game: Array<Array<0 | 1 | 2>>,
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

    if (props.game?.length) {

      setp11(props.game[0][0] ? props.game[0][0] === 1 ? props.player1.emoji : props.player2.emoji : null);
      setp12(props.game[0][1] ? props.game[0][1] === 1 ? props.player1.emoji : props.player2.emoji : null);
      setp13(props.game[0][2] ? props.game[0][2] === 1 ? props.player1.emoji : props.player2.emoji : null);

      setp21(props.game[1][0] ? props.game[1][0] === 1 ? props.player1.emoji : props.player2.emoji : null);
      setp22(props.game[1][1] ? props.game[1][1] === 1 ? props.player1.emoji : props.player2.emoji : null);
      setp23(props.game[1][2] ? props.game[1][2] === 1 ? props.player1.emoji : props.player2.emoji : null);

      setp31(props.game[2][0] ? props.game[2][0] === 1 ? props.player1.emoji : props.player2.emoji : null);
      setp32(props.game[2][1] ? props.game[2][1] === 1 ? props.player1.emoji : props.player2.emoji : null);
      setp33(props.game[2][2] ? props.game[2][2] === 1 ? props.player1.emoji : props.player2.emoji : null);

    }

  }, [props.game]);

  function handleClickPosition(position: string) {

    if (props.game && props.userId === props.turn) {

      const playerNumber = props.turn === props.player1.id ? 1 : 2;

      switch (position) {

        case 'p11': props.game[0][0] = playerNumber; break;
        case 'p12': props.game[0][1] = playerNumber; break;
        case 'p13': props.game[0][2] = playerNumber; break;

        case 'p21': props.game[1][0] = playerNumber; break;
        case 'p22': props.game[1][1] = playerNumber; break;
        case 'p23': props.game[1][2] = playerNumber; break;

        case 'p31': props.game[2][0] = playerNumber; break;
        case 'p32': props.game[2][1] = playerNumber; break;
        case 'p33': props.game[2][2] = playerNumber; break;

        default: break;

      }

      props.onChangeGame(props.game);

    }

  }

  return (

    <table className="border-solid border-black border w-fit">

      <tbody className={`${props.userId === props.turn ? 'cursor-pointer' : 'cursor-not-allowed'}`}>

        <tr>
          <td className="border-solid border-black border w-20 h-20" onClick={() => handleClickPosition('p11')}>{p11}</td>
          <td className="border-solid border-black border w-20 h-20" onClick={() => handleClickPosition('p12')}>{p12}</td>
          <td className="border-solid border-black border w-20 h-20" onClick={() => handleClickPosition('p13')}>{p13}</td>
        </tr>

        <tr>
          <td className="border-solid border-black border w-20 h-20" onClick={() => handleClickPosition('p21')}>{p21}</td>
          <td className="border-solid border-black border w-20 h-20" onClick={() => handleClickPosition('p22')}>{p22}</td>
          <td className="border-solid border-black border w-20 h-20" onClick={() => handleClickPosition('p23')}>{p23}</td>
        </tr>

        <tr>
          <td className="border-solid border-black border w-20 h-20" onClick={() => handleClickPosition('p31')}>{p31}</td>
          <td className="border-solid border-black border w-20 h-20" onClick={() => handleClickPosition('p32')}>{p32}</td>
          <td className="border-solid border-black border w-20 h-20" onClick={() => handleClickPosition('p33')}>{p33}</td>
        </tr>

      </tbody>

    </table>

  )

}
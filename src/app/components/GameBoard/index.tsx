import { DetailedHTMLProps, TableHTMLAttributes, useEffect, useState } from "react";

export default function GameBoard(props: {
  player1Emoji: string,
  player2Emoji: string,
  turn: 1 | 2,
  game: Array<Array<null | 1 | 2>>,
  onChangeGame: (game:Array<Array<null | 1 | 2>>) => void
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

    setp11(props.game[0][0] ? props.game[0][0] === 1 ? props.player1Emoji : props.player2Emoji : null);
    setp12(props.game[0][1] ? props.game[0][1] === 1 ? props.player1Emoji : props.player2Emoji : null);
    setp13(props.game[0][2] ? props.game[0][2] === 1 ? props.player1Emoji : props.player2Emoji : null);

    setp21(props.game[1][0] ? props.game[1][0] === 1 ? props.player1Emoji : props.player2Emoji : null);
    setp22(props.game[1][1] ? props.game[1][1] === 1 ? props.player1Emoji : props.player2Emoji : null);
    setp23(props.game[1][2] ? props.game[1][2] === 1 ? props.player1Emoji : props.player2Emoji : null);

    setp31(props.game[2][0] ? props.game[2][0] === 1 ? props.player1Emoji : props.player2Emoji : null);
    setp32(props.game[2][1] ? props.game[2][1] === 1 ? props.player1Emoji : props.player2Emoji : null);
    setp33(props.game[2][2] ? props.game[2][2] === 1 ? props.player1Emoji : props.player2Emoji : null);

  }, [props.game]);

  function handleClickPosition(position: string) {

    switch (position) {

      case 'p11': props.game[0][0] = props.turn; break;
      case 'p12': props.game[0][1] = props.turn; break;
      case 'p13': props.game[0][2] = props.turn; break;

      case 'p21': props.game[1][0] = props.turn; break;
      case 'p22': props.game[1][1] = props.turn; break;
      case 'p23': props.game[1][2] = props.turn; break;

      case 'p31': props.game[2][0] = props.turn; break;
      case 'p32': props.game[2][1] = props.turn; break;
      case 'p33': props.game[2][2] = props.turn; break;

      default: break;

    }

    props.onChangeGame(props.game);

  }

  return (

    <table className="border-solid border-black border w-fit">

      <tbody>

        <tr>
          <td className="border-solid border-black border cursor-pointer w-20 h-20" onClick={() => handleClickPosition('p11')}>{p11}</td>
          <td className="border-solid border-black border cursor-pointer w-20 h-20" onClick={() => handleClickPosition('p12')}>{p12}</td>
          <td className="border-solid border-black border cursor-pointer w-20 h-20" onClick={() => handleClickPosition('p13')}>{p13}</td>
        </tr>

        <tr>
          <td className="border-solid border-black border cursor-pointer w-20 h-20" onClick={() => handleClickPosition('p21')}>{p21}</td>
          <td className="border-solid border-black border cursor-pointer w-20 h-20" onClick={() => handleClickPosition('p22')}>{p22}</td>
          <td className="border-solid border-black border cursor-pointer w-20 h-20" onClick={() => handleClickPosition('p23')}>{p23}</td>
        </tr>

        <tr>
          <td className="border-solid border-black border cursor-pointer w-20 h-20" onClick={() => handleClickPosition('p31')}>{p31}</td>
          <td className="border-solid border-black border cursor-pointer w-20 h-20" onClick={() => handleClickPosition('p32')}>{p32}</td>
          <td className="border-solid border-black border cursor-pointer w-20 h-20" onClick={() => handleClickPosition('p33')}>{p33}</td>
        </tr>

      </tbody>

    </table>

  )

}
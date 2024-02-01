type Game = {
  player1: {
    id: string,
    emoji: string,
    score: number
  },
  player2: {
    id: string,
    emoji: string,
    score: number
  },
  game: Array<Array<0 | 1 | 2>>,
  turn: string,
  result: null | 0 | 1 | 2
}
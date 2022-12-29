import { predictedWinner } from './func'

export enum PLAYER {
  ONEPLAYER = 'one',
  TWOPLAYER = 'two',
}

export type Tstate = {
  active: typeof PLAYER[keyof typeof PLAYER]
  isFirstTimer: boolean
}

export const initGameState = {
  board: [
    { value: 'y', isPT: false },
    { value: 'y', isPT: false },
    { value: 'y', isPT: false },
    { value: null, isPT: false },
    { value: null, isPT: false },
    { value: null, isPT: false },
    { value: 'x', isPT: false },
    { value: 'x', isPT: false },
    { value: 'x', isPT: false },
  ],
  highlight: Array(9).fill(null),
  spaceX: null,
  whoIsNext: true,
  winner: false,
  wrongMove: false,
  cheat: false,
  preWinner: predictedWinner(),
  isWinner: '',
  username: '',
}

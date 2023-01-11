import { predictedWinner } from './func'

export enum PLAYER {
  ONEPLAYER = 'one',
  TWOPLAYER = 'two',
}

export type Tstate = {
  active: typeof PLAYER[keyof typeof PLAYER]
  isFirstTimer: boolean
}

export const initGameState: ()=>TInitGameState = ()=>{
    return ({
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
  spaceX: [null, null] /**[index, indexValue]=[0, 'y'] from initGameState above */,
  whoIsNext: 'y',
  track:0,
  winner: false,
  wrongMove: false,
  cheat: false,
  preWinner: predictedWinner(),
  isWinner: '',
  username: '',
})
}

type Tindex = null|number;

type TPlayer = 'y'|'x'|null

export type TInitGameState = {
    username: string;
    isWinner: string;
    preWinner: string;
    cheat: boolean;
    track: number;
    wrongMove: boolean;
    winner: boolean;
    whoIsNext: 'y' | 'x';
    spaceX: [Tindex, TPlayer],
    highlight: any[],
    board: any[]
}

export const ItemTypes = {
  PLAYER: 'player',
}

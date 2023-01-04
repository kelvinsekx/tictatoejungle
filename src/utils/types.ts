import { predictedWinner } from './func'

export enum PLAYER {
  ONEPLAYER = 'one',
  TWOPLAYER = 'two',
}

export type Tstate = {
  active: typeof PLAYER[keyof typeof PLAYER]
  isFirstTimer: boolean
}

export const getNextPlayer = function (i = undefined): 'x'|'y'{
    let players: ['y', 'x'] = ['y', 'x']
    if(typeof i === 'undefined') {
        return players[0]
    }
  	if(i === 1)--i;
    else ++i
    return players[i]
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
  spaceX: [[null, null], [null, null]] /**[index, indexValue]=[0, 'y'] from initGameState above */,
  whoIsNext: getNextPlayer(),
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
type TMoves = [Tindex, Tindex]

type TPlayer = 'y'|'x'|null
type TPMoves = [TPlayer, TPlayer]

export type TInitGameState = {
    username: string;
    isWinner: string;
    preWinner: string;
    cheat: boolean;
    track: number;
    wrongMove: boolean;
    winner: boolean;
    whoIsNext: 'y' | 'x';
    spaceX: [TMoves, TPMoves],
    highlight: any[],
    board: any[]
}

export const ItemTypes = {
  PLAYER: 'player',
}

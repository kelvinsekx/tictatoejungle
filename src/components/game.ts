import { checkItIncludes, checkWinnerExist, mutatePossibleMvt } from '../utils/func'
import { possibleMovements, winningPosition } from '../utils/util'
import {TInitGameState, PLAYER, initGameState} from '../utils/types'
import { findPossibleMoveable } from '../utils/robotHelper'

type Tbox = {index:number; value: 'x' | 'y' | null}

interface TGame {
    presentIndex: number
    board: Tbox[];
    box: Tbox;
    prevBox: Tbox;
    emit: (v:any)=>void;
    isGameTypeSingle: boolean;
    state: TInitGameState;
    track: number;
    nextplayer: 'x' | 'y'
}

export class Game implements TGame {
    winnerExist = false
    isValidMovement = false
    cheated = false
    prevIndex; prevPlayer
    box; prevBox; emit
    Tbox; board
    presentIndex: number
    state:TInitGameState
    isGameTypeSingle: boolean;
    track = 0; nextplayer

    constructor( state: TInitGameState, emit: (v: TInitGameState)=>void, mode: PLAYER){
        this.state = state
        this.board = this.state.board.slice()
        this.emit = emit
        this.nextplayer = this.state.whoIsNext
        this.prevIndex = state.spaceX[0]
        this.prevPlayer = state.spaceX[1]
        this.isGameTypeSingle = mode === PLAYER.ONEPLAYER
    }

    async play(index, state){
        if (this.isWinnerExist())return
        this.state = state

        this.board = state.board
        this.box = state.board[index]
        this.prevBox = state.board[this.prevIndex]

        this.presentIndex = index
    
        if(this.box.value === null){
            this.exchangePlayers()
        }else{
            return this.copyBox()
        }
        if(!this.isValidMovement || this.cheated) return
        if(this.isWinnerExist())return;
        this.next()
        if(this.isGameTypeSingle ) {
            await setTimeout(()=>{
                return this.nextPlayer()
            }, 2000)
        }
        return
    }

    isWinnerExist(){
     this.winnerExist = checkWinnerExist(winningPosition, this.board)
     if(this.winnerExist){
        this.emit({
            ...this.state,
            winner: this.winnerExist,
            isWinner: this.box.value.toUpperCase() 
        })
     }
     return this.winnerExist
    }

    isMovementValid(){
        return this.isValidMovement = this.prevIndex === null ? true : checkItIncludes(possibleMovements, [
            this.prevIndex,
            this.presentIndex
          ])
    }

    hasCheated(){
        this.cheated = this.nextplayer !== this.box.value

         this.emit({
            ...this.state,
              cheat: this.cheated,
              whoIsNext: this.nextplayer
        })
        return this.cheated
    }


    async exchangePlayers(){
        if(!this.isMovementValid())
            return this.emit({
                ...this.state,
                wrongMove: true,
            })
        if(this.cheated || (this.prevPlayer == null))
            return this.hasCheated()

        this.box.value = this.nextplayer
        this.prevBox.value = null

        this.prevPlayer = null
        //set prev Errors to default
        this.state.wrongMove = false
        this.state.cheat = false
        this.state.spaceX = [
            this.prevIndex,
            this.prevPlayer
        ]
    }

    nextPlayer() {
        if(this.winnerExist)return
        const fExt = findPossibleMoveable(this.board)
  
        let mvt = mutatePossibleMvt(this.board, fExt)
        if (checkWinnerExist(winningPosition, this.board)) {
           return this.emit({
                ...this.state,
                winner: this.winnerExist,
                isWinner: this.box.value.toUpperCase() 
            })
        }
        return this.emit({
            ...this.state,
          board: mvt,
          whoIsNext: this.getNextPlayer(),
        })
      }

      getNextPlayer = (): 'x' | 'y' => {
        let players: ['y', 'x'] = [
          'y',
          'x',
        ]
        if (this.track === 1) --this.track
        else ++this.track
        this.emit({ ...this.state,track: this.track })
        return this.nextplayer = players[this.track]
      }

      next(){
        return this.emit({
            ...this.state,
            whoIsNext: this.getNextPlayer(),
        })
      }

      copyBox(){
        if(this.hasCheated()) return;
        const copyHighlight = Array(9).fill(null);
        copyHighlight[this.presentIndex] = true

        this.prevIndex = this.presentIndex;
        this.prevPlayer = this.box.value

        this.emit({
            ...this.state,
            highlight: copyHighlight,
            spaceX: [
                this.presentIndex,
                this.box.value,
            ],
        })
      }

      restart (){
        this.state = initGameState()
        this.board = this.state.board.slice();
        this.nextplayer = this.state.whoIsNext
        this.prevIndex = this.state.spaceX[0]
        this.prevPlayer = this.state.spaceX[1]
        this.track = 0
        return this.emit({...initGameState()})
      }
}
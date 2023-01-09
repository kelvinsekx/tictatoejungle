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

    async play(index, board){
        if (this.isWinnerExist())return

        this.board = board
        this.box = board[index]
        this.presentIndex = index
        this.prevBox = this.board[this.prevIndex]
    
        if(this.box.value === null){
            this.exchangePlayers()
        }else{
            return this.copyBox()
        }
        if(!this.isValidMovement || this.cheated) return
        this.next()
        if(this.isGameTypeSingle ) {
            await setTimeout(()=>{
                this.nextPlayer()
            }, 2000)
        }
    }

    isWinnerExist(){
     this.winnerExist = checkWinnerExist(winningPosition, this.board)
     if(this.winnerExist){
        this.emit({
            winner: this.winnerExist,
            isWinner: this.box.value.toUpperCase() 
        })
     }
     return this.winnerExist
    }

    isMovementValid(){
        return this.isValidMovement = checkItIncludes(possibleMovements, [
            this.prevIndex,
            this.presentIndex
          ])
    }

    hasCheated(){
        this.cheated = this.nextplayer !== this.box.value
        return this.emit({
              cheat: true,
            })
    }

    exchangePlayers(){
        if(!this.isMovementValid())
            return this.emit({
                wrongMove: true,
                spaceX: [
                 null,
                 null,
                ]
            })
        if(this.cheated)
            return this.emit({
                cheat: true,
            })
        if (this.isValidMovement) {
            this.box.value = this.prevPlayer
            this.prevBox.value = null
            this.emit({
                board: this.board,
                wrongMove: false
            })
        }
        this.isWinnerExist()
    }

    nextPlayer() {
        let checkWinner = false
        if(this.cheated || this.winnerExist)return
        const fExt = findPossibleMoveable(this.board)
  
        let mvt = mutatePossibleMvt(this.board, fExt)
        if (checkWinnerExist(winningPosition, this.board)) {
          checkWinner = true
        }
        return this.emit({
          board: mvt,
          winner: checkWinner,
          whoIsNext: this.getNextPlayer(this.state.track),
        })
      }

      getNextPlayer = (i = undefined): 'x' | 'y' => {
        let players: ['y', 'x'] = [
          'y',
          'x',
        ]
        if (typeof i === 'undefined') {
          return players[0]
        }
        if (this.track === 1) --this.track
        else ++this.track
        this.emit({ track: this.track })
        return this.nextplayer = players[this.track]
      }

      next(){
            return this.emit({
                whoIsNext: this.getNextPlayer(this.track),
            })
      }

      copyBox(){
        this.isCheating()
        if(this.cheated) return;
        const copyHighlight = Array(9).fill(null);
        copyHighlight[this.presentIndex] = true

        this.prevIndex = this.presentIndex;
        this.prevPlayer = this.box.value;

        this.emit({
          board: this.board,
          highlight: copyHighlight,
          spaceX: [
            this.presentIndex,
            this.box.value,
          ],
          wrongMove: false,
          cheat: false,
        })
      }

      isCheating(){
        if (this.nextplayer === this.box.value) {
            this.cheated = false
             this.emit({
                cheat: false
            })
        }else{
            this.cheated = true
            this.emit({
                cheat: true
            })
        }
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
import * as React from 'react'
import { possibleMovements, winningPosition } from './util'
import { checkItIncludes, checkWinnerExist, mutatePossibleMvt } from './func'
import { default as XBOARD, DecideWhatNext } from './reactiUtil'
import { findPossibleMoveable } from './robotHelper'

import { XjungleContext } from './context'
import { initGameState, PLAYER, TInitGameState } from './types'
import { TellAboutOneplayer } from '../apps/OnePlayer'
import { TellAboutTwoplayer } from '../apps/TwoPlayers'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface IProps {}

const composedHigherHOCX = (
  ChildComposedComponent: typeof TellAboutOneplayer | typeof TellAboutTwoplayer,
  player: PLAYER
) =>
  class Player extends React.Component<IProps, TInitGameState> {
    constructor(props: IProps) {
      super(props)
      this.state = {
        ...initGameState(),
      }
    }
    static contextType = XjungleContext

    componentDidMount() {
      const username = localStorage.getItem('username')
      this.setState({
        ...this.state,
        //username: username ? username : this.context.username,
      })
    }

    componentDidUpdate(_: TInitGameState, prevState: TInitGameState) {
      // somewhat buggy code *()*
      if (prevState.username) return
      // if (prevState.username !== this.context.username) {
      //   this.setState({
      //     ...this.state,
      //     username: this.context.username,
      //   })
      // }
    }

    NEXTPLAYER = (existingMovements) => {
      let checkWinner = false
      if (this.state.winner) return
      const fExt = findPossibleMoveable(existingMovements)

      let mvt = mutatePossibleMvt(existingMovements, fExt)
      if (checkWinnerExist(winningPosition, existingMovements)) {
        checkWinner = true
      }
      return this.setState({
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
      if (i === 1) --i
      else ++i
      this.setState({ track: i })
      return players[i]
    }

    handleClick = async (index: number) => {
      console.log(index)
      if (this.state.spaceX[0].slice(-1)[0] === index) return
      if (this.state.winner) return

      let checkWinner,
        isWinner,
        copyHighlight = Array(9).fill(null)
      copyHighlight[index] = true

      const board = this.state.board.slice(),
        box = board[index],
        indexMoves = this.state.spaceX[0],
        playerMoves = this.state.spaceX[1]

      const clickedBoxIsEmpty = box.value === null
      if (clickedBoxIsEmpty) {
        if (indexMoves.slice(-2)[1] == null) {
          return
        }
        // if previous moves are not empty proceed
        if (
          checkItIncludes(possibleMovements, [
            indexMoves.slice(-2)[1],
            index,
          ])
        ) {
          box.value = playerMoves.slice(-2)[1]
          board[indexMoves.slice(-2)[1]].value = null
          this.setState({
            spaceX: [
              indexMoves,
              playerMoves,
            ],
          })
          if (checkWinnerExist(winningPosition, board)) {
            checkWinner = true
            isWinner = this.state.whoIsNext === 'y' ? 'Y' : 'X'
          }
          await this.setState({
            winner: checkWinner,
            isWinner: isWinner,
          })
          setTimeout(
            () =>
              this.setState({
                whoIsNext: this.getNextPlayer(this.state.track),
              }),
            1000
          )
          if (player === PLAYER.ONEPLAYER) {
            setTimeout(() => this.NEXTPLAYER(board), 1850)
          }
        } else {
          return this.setState({
            wrongMove: true,
          })
        }
      }
      // if ClickedBoxIsNotEmpty
      let indexValue = box.value
      // find cheat
      if (this.state.whoIsNext !== box.value) {
        console.log(this.state.whoIsNext, box.value)
        await this.setState({
          spaceX: [
            [
              null,
              null,
            ],
            [
              null,
              null,
            ],
          ],
          cheat: true,
        })
        return
      }

      indexMoves.push(index)
      playerMoves.push(indexValue)
      return this.setState({
        board: board,
        highlight: copyHighlight,
        spaceX: [
          indexMoves,
          playerMoves,
        ],
        wrongMove: false,
        cheat: false,
      })
    }

    restart = async () => {
      await this.setState(initGameState())
    }
    render() {
      let status = DecideWhatNext(this.state, player)

      return (
        <div>
          <button onClick={() => this.restart()} className="restart">
            RESTART GAME
          </button>
          <div>
            <ChildComposedComponent preWinner={this.state.preWinner} />
            {status}
          </div>
          <DndProvider backend={HTML5Backend}>
            <XBOARD {...this.state} handleClick={this.handleClick} />
          </DndProvider>
          <div style={{ padding: '2rem' }} />
        </div>
      )
    }
  }

//composedHigherHOCX().contextType = XjungleContext
export default composedHigherHOCX

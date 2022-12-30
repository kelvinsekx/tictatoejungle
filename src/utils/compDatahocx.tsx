import * as React from 'react'
import { possibleMovements, winningPosition } from './util'
import { checkItIncludes, checkWinnerExist, mutatePossibleMvt } from './func'
import { default as XBOARD, DecideWhatNext } from './reactiUtil'
import { findPossibleMoveable } from './robotHelper'

import { XjungleContext } from './context'
import { initGameState, PLAYER, TInitGameState } from './types'
import { TellAboutOneplayer } from '../apps/OnePlayer'
import { TellAboutTwoplayer } from '../apps/TwoPlayers'

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
        username: username ? username : this.context.username,
      })
    }

    componentDidUpdate(_: TInitGameState, prevState: TInitGameState) {
      // somewhat buggy code *()*
      if (prevState.username) return
      if (prevState.username !== this.context.username) {
        this.setState({
          ...this.state,
          username: this.context.username,
        })
      }
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

    handleClick = (index: number) => {
      if (this.state.winner) {
        return
      }

      let checkWinner
      let isWinner
      let copyHighlight = Array(9).fill(null)
      copyHighlight[index] = true

      const board = this.state.board.slice(),
        box = board[index]

      const clickedBoxIsEmpty = box.value === null
      if (clickedBoxIsEmpty) {
        if (this.state.spaceX[0] == null) {
          return
        }
        if (
          checkItIncludes(possibleMovements, [
            this.state.spaceX[0],
            index,
          ])
        ) {
          box.value = this.state.spaceX[1]
          board[this.state.spaceX[0]].value = null
          this.setState({
            spaceX: [
              null,
              null,
            ],
          })
          if (checkWinnerExist(winningPosition, board)) {
            checkWinner = true
            isWinner = this.state.whoIsNext ? 'y' : 'x'
          }
          this.setState({
            board: board,
            whoIsNext: this.getNextPlayer(this.state.track),
            winner: checkWinner,
            wrongMove: false,
            cheat: false,
            isWinner: isWinner,
          })
          if (player === PLAYER.ONEPLAYER) {
            setTimeout(() => this.NEXTPLAYER(board), 1450)
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
        return this.setState({
          spaceX: [
            null,
            null,
          ],
          cheat: true,
        })
      }
      return this.setState({
        board: board,
        highlight: copyHighlight,
        spaceX: [
          index,
          indexValue,
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
          <XBOARD {...this.state} handleClick={this.handleClick} />
        </div>
      )
    }
  }

//composedHigherHOCX().contextType = XjungleContext
export default composedHigherHOCX

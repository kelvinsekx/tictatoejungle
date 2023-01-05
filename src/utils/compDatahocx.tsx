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
  playerMode: PLAYER
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
      // const username = localStorage.getItem('username')
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
      if (this.state.spaceX[0] === index) return
      if (this.state.winner) return

      let checkWinner,
        isWinner,
        copyHighlight = Array(9).fill(null)
      copyHighlight[index] = true

      const s = { ...this.state },
        board = s.board.slice(),
        box = board[index],
        prevIndex = s.spaceX[0],
        prevPlayer = s.spaceX[1]

      const clickedBoxIsEmpty = box.value === null
      if (clickedBoxIsEmpty) {
        if (prevIndex == null) return
        if (s.cheat) return
        // if previous moves are not empty proceed
        if (
          checkItIncludes(possibleMovements, [
            prevIndex,
            index,
          ])
        ) {
          box.value = prevPlayer
          board[prevIndex].value = null
          if (checkWinnerExist(winningPosition, board)) {
            checkWinner = true
            isWinner = this.state.whoIsNext === 'y' ? 'Y' : 'X'
          }
          await this.setState({
            ...s,
            winner: checkWinner,
            isWinner: isWinner,
          })
          await setTimeout(
            () =>
              this.setState({
                whoIsNext: this.getNextPlayer(this.state.track),
              }),
            1000
          )
          if (playerMode === PLAYER.ONEPLAYER) {
            await setTimeout(() => this.NEXTPLAYER(board), 1200)
          }
          return
        } else {
          return this.setState({
            wrongMove: true,
            spaceX: [
              null,
              null,
            ],
          })
        }
      }
      // if ClickedBoxIsNotEmpty
      let player = box.value
      // find cheat
      if (this.state.whoIsNext !== box.value) {
        return this.setState({
          cheat: true,
        })
      }
      return await this.setState({
        board: board,
        highlight: copyHighlight,
        spaceX: [
          index,
          player,
        ],
        wrongMove: false,
        cheat: false,
      })
    }

    restart = async () => {
      await this.setState(initGameState())
    }

    render() {
      let status = DecideWhatNext(this.state, playerMode)

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
          <div style={{ padding: '2rem' }} />
        </div>
      )
    }
  }

//composedHigherHOCX().contextType = XjungleContext
export default composedHigherHOCX

import * as React from 'react'
import { default as XBOARD, DecideWhatNext } from './reactiUtil'

import { XjungleContext } from './context'
import { initGameState, PLAYER, TInitGameState } from './types'
import { TellAboutOneplayer } from '../apps/OnePlayer'
import { TellAboutTwoplayer } from '../apps/TwoPlayers'
import { Game } from '../components/game'

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
      this.handleClick = this.handleClick.bind(this)
    }
    static contextType = XjungleContext
    game: Game = new Game(
      { ...initGameState() },
      (v) => this.setState(v),
      playerMode
    )

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

    handleClick(index: number) {
      return this.game.play(index, this.state.board)
    }

    render() {
      let status = DecideWhatNext(this.state, playerMode)

      return (
        <div>
          <button onClick={() => this.game.restart()} className="restart">
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

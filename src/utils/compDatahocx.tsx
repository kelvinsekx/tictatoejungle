import * as React from 'react'
import { default as XBOARD, DecideWhatNext } from './reactiUtil'

//import { XjungleContext } from './context'
import { initGameState, PLAYER } from './types'
import { TellAboutOneplayer } from '../apps/OnePlayer'
import { TellAboutTwoplayer } from '../apps/TwoPlayers'
import { Game } from '../components/game'

const composedHigherHOCX = (
  ChildComposedComponent: typeof TellAboutOneplayer | typeof TellAboutTwoplayer,
  playerMode: PLAYER
) =>
  function Player() {
    const [
      state,
      setState,
    ] = React.useState({
      ...initGameState(),
    })

    const game: Game = React.useMemo(
      () => new Game({ ...initGameState() }, (v) => setState(v), playerMode),
      []
    )

    const handleClick = function (index: number) {
      return game.play(index, state)
    }

    let status = React.useMemo(
      () => DecideWhatNext(state, playerMode),
      [
        state,
      ]
    )

    return (
      <div>
        <button onClick={() => game.restart()} className="restart">
          RESTART GAME
        </button>
        <div>
          <ChildComposedComponent preWinner={state.preWinner} />
          {status}
        </div>
        <XBOARD {...state} handleClick={handleClick} />
        <div style={{ padding: '2rem' }} />
      </div>
    )
  }

export default composedHigherHOCX

import * as React from 'react'
import GameBox from '../utils/compDatahocx'
import { PLAYER } from '../utils/types'

export const TellAboutTwoplayer = React.memo(
  ({ preWinner }: { preWinner: string }) => {
    return (
      <h2 style={{ fontSize: '66%' }}>
        Sekx predicted {preWinner} to beat {preWinner === 'x' ? 'y' : 'x'}{' '}
        (prove him wrong)
      </h2>
    )
  },
  (prev, pres) => prev !== pres
)

const TwoPlayers = GameBox(TellAboutTwoplayer, PLAYER.TWOPLAYER)

export default TwoPlayers

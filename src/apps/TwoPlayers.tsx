import * as React from 'react'
import GameBox from '../utils/compDatahocx'
import { PLAYER } from '../utils/types'

export const TellAboutTwoplayer = ({ preWinner }: { preWinner: string }) => (
  <h2 style={{ fontSize: '66%' }}>
    Sekx predicted {preWinner} to beat {preWinner === 'x' ? 'y' : 'x'} (prove
    him wrong)
  </h2>
)

const TwoPlayers = GameBox(TellAboutTwoplayer, PLAYER.TWOPLAYER)

export default TwoPlayers

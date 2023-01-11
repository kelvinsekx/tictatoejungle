import * as React from 'react'
import GameBox from '../utils/compDatahocx'
import { PLAYER } from '../utils/types'

export const TellAboutOneplayer = React.memo(
  function TellAboutOnePlayer(props) {
    return (
      <h2 style={{ fontSize: '66%' }}>
        XJungler...now you're playing against sekx
      </h2>
    )
  },
  (prev, pre) => prev !== pre
)

const OnePlayer = GameBox(TellAboutOneplayer, PLAYER.ONEPLAYER)

export default OnePlayer

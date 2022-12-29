import GameBox from '../utils/compDatahocx'
import { PLAYER } from '../utils/types'

export const TellAboutOneplayer = () => (
  <h2 style={{ fontSize: '66%' }}>
    XJungler...now you're playing against sekx
  </h2>
)

const OnePlayer = GameBox(TellAboutOneplayer, PLAYER.ONEPLAYER)

export default OnePlayer

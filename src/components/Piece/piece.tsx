import * as React from 'react'
import { Player } from '../Player/player'

interface TPieceProps {
  player: string
  onDrag: () => { player: string }
}
export const Piece: React.FC<TPieceProps> = ({ player, onDrag }) => {
  const isPlayer = !!player
  return isPlayer ? <Player player={player} onDrag={onDrag} /> : null
}

import * as React from 'react'
import { Player } from '../Player/player'

interface TPieceProps {
  player: string
  onDrag: () => { player: string }
}
export const Piece = ({ player, onDrag }: TPieceProps) => {
  const isPlayer = !!player
  return isPlayer ? <Player player={player} onDrag={onDrag} /> : null
}

import * as React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'

import { ItemTypes } from '../../utils/types'

const playerStyle: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 'bold',
  cursor: 'move',
}

export const Player: React.FC<{
  player: string
  onDrag: () => { player: string }
}> = ({ player, onDrag }) => {
  const [
    { isDragging },
    drag,
    preview,
  ] = useDrag(
    () => ({
      type: ItemTypes.PLAYER,
      item: onDrag,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  )

  return (
    <>
      <DragPreviewImage connect={preview} src={player} />
      <div
        ref={drag}
        style={{
          ...playerStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {player}
      </div>
    </>
  )
}

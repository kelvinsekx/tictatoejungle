import * as React from 'react'
import { useDrop } from 'react-dnd'
import { Piece } from '../Piece/piece'

import { ItemTypes } from '../../utils/types'

type TBox = {
  className: string
  onClick: (j: number) => null
  id: string
  value: string
  index: number
  prevIndex: number | null
  board: any[]
}

export function Box({
  className,
  board,
  onClick,
  id,
  value,
  index,
  prevIndex,
}: TBox) {
  //console.log(board)
  const [
    { isOver },
    drop,
  ] = useDrop(
    () => ({
      accept: ItemTypes.PLAYER,

      drop: () => {
        onClick(index)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [index]
  )
  return (
    <div
      data-testid="box"
      className={`box ${className}`}
      onClick={() => {
        onClick(index)
      }}
      id={id}
      ref={drop}
    >
      <Piece
        player={value}
        onDrag={() => {
          onClick(index)
          console.log('inde', index)
          return { player: 'player' }
        }}
      />
      {isOver && null}
    </div>
  )
}

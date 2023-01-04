import * as React from 'react'
import { useDrop } from 'react-dnd'
import { Piece } from '../Piece/piece'

import { ItemTypes, TInitGameState } from '../../utils/types'
import { possibleMovements } from '../../utils/util'
import { checkItIncludes } from '../../utils/func'

type TBox = {
  className: string
  onClick: (j: number) => null
  id: string
  value: string
  index: number
  prevBox: Pick<TInitGameState, 'spaceX'>
}

export function Box({ className, onClick, id, value, index, prevBox }: TBox) {
  const [
    { isOver },
    drop,
  ] = useDrop(
    () => ({
      accept: ItemTypes.PLAYER,
      canDrop: () => {
        return checkItIncludes(possibleMovements, [
          prevBox[0].slice(-2)[1],
          index,
        ])
      },
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
          return { player: 'player' }
        }}
      />
      {isOver && null}
    </div>
  )
}

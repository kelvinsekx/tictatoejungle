import * as React from 'react'

type TBox = {
  className: string
  onClick: () => void
  id: string
  value: string
}
export function Box({ className, onClick, id, value }: TBox) {
  return (
    <button className={`box ${className}`} onClick={onClick} id={id}>
      {value}
    </button>
  )
}

import { render, screen } from '@testing-library/react'
import { default as Board } from '../utils/reactiUtil'

import { board as boardData } from './board.data'

const props = {
  handleClick: (f) => f,
  board: boardData,
  highlight: Array(9).fill(null),
}

describe('player board', () => {
  it('renders at least a button', () => {
    render(<Board {...props} />)
    const btns = screen.getAllByRole('button')
    expect(btns.length).toBeGreaterThan(1)
    screen.debug()
  })
})

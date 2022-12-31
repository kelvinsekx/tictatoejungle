import { render, screen } from '@testing-library/react'
import { default as Board } from '../utils/reactiUtil'

import { board as boardData } from '../utils/board.data'

const props = {
  handleClick: (f) => f,
  board: boardData,
  highlight: Array(9).fill(null),
}

describe('player board', () => {
  it('renders at least a button', () => {
    render(<Board {...props} />)
    const btns = screen.getAllByRole('button')
    const boardContent = btns.map((e) => e.textContent).toString()
    const expectedBoardContent = boardData.map((e) => e.value).toString()
    expect(boardContent === expectedBoardContent)
    screen.debug()
  })
})

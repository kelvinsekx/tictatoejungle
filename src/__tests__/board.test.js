import { render, screen } from '@testing-library/react'
import { default as Board } from '../utils/reactiUtil'

import { board as boardData } from './board.data'

const props = {
  handleClick: (f) => f,
  board: boardData,
  highlight: Array(9).fill(null),
}
describe('player board', () => {
  it('it renders', () => {
    render(<Board {...props} />)
    expect(screen.getByRole('button').contains('x'))
    screen.debug()
  })
})

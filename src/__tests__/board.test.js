import { fireEvent, render, screen } from '@testing-library/react'

import HOCBoard from '../utils/compDatahocx'
import { board as boardData } from '../utils/board.data'
import { PLAYER } from '../utils/types'

import { TellAboutOneplayer } from '../apps/OnePlayer'

const Board = HOCBoard(TellAboutOneplayer, PLAYER.ONEPLAYER)

//prettier-ignore
const allPosition = [
  0,1,2,3,4,5,6,7,8,
],
defaultPositionWithXY = [
  0,1,2,6,7,8,
],
random = (n)=> Math.floor(Math.random() * n)

const startPosition = defaultPositionWithXY[random(6)],
  destination = allPosition.filter((n) => n % 2 === 0)[random(5)]

jest.mock('react-dnd', () => ({
  useDrop: () => [
    {},
    jest.fn,
  ],
  useDrag: () => [
    {},
    jest.fn,
    jest.fn,
  ],
  DragPreviewImage: ({ connect, src }) => <div />,
}))

describe('player board', () => {
  it('renders default board state', async () => {
    render(<Board />)
    const btns = screen.getAllByTestId('box')
    const boardContent = btns.map((e) => e.textContent).toString()
    const defaultBoardContent = boardData.map((e) => e.value).toString()
    expect(boardContent === defaultBoardContent).toBeTruthy()
  })

  it('player should move if movement is one of possibleMovements', async () => {
    render(<Board />)
    const btns = screen.getAllByTestId('box')
    await fireEvent.click(btns[0])
    await fireEvent.click(btns[3])
    expect(btns[0].textContent).toBe('')
    expect(btns[3].textContent).toBe('y')
    await fireEvent.click(btns[8])
    await fireEvent.click(btns[5])
    expect(btns[8].textContent).toBe('')
    expect(btns[5].textContent).toBe('x')
  })

  it("player shouldn't move if movement is not possibleMovement", async () => {
    render(<Board />)
    const btns = screen.getAllByTestId('box')
    await fireEvent.click(btns[startPosition])
    await fireEvent.click(btns[destination])
    expect(btns[startPosition].textContent).not.toBe('')
  })
})

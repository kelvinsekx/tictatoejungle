import { render, screen } from '@testing-library/react'
import PlayerToggleBtn from './playtogglebtn'

const props = {
  pFor: 'two',
  handleClick: (f) => f,
  active: false,
}

const txt = [
  {
    false: 'on two players',
    true: 'twoPlayers',
  },
  {
    false: 'on one player',
    true: 'onePlayer',
  },
]

const random = Math.floor(Math.random() * 2)

describe('players toggle button', () => {
  it('changes active state', () => {
    render(<PlayerToggleBtn {...props} />)
    const txtContent = props.active ? txt[random]['false'] : txt[random]['true']
    expect(screen.getByText(txtContent)).toBeInTheDocument()
    screen.debug()
  })
})

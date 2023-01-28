import { render, screen } from '@testing-library/react'
import PlayerToggleBtn from './playtogglebtn'

const random = Math.floor(Math.random() * 2)

const props = {
  pFor: [
    'one',
    'two',
  ][random],
  handleClick: (f) => f,
  active: false,
}

const txt = [
  {
    true: 'on one player',
    false: 'onePlayer',
  },
  {
    true: 'on two players',
    false: 'twoPlayers',
  },
]

describe('players toggle button', () => {
  it('changes active state', () => {
    render(<PlayerToggleBtn {...props} />)
    const txtContent =
      props.active === false ? txt[random]['false'] : txt[random]['true']
    expect(screen.getByText(txtContent)).toBeInTheDocument()
  })
})

import * as React from 'react'
import styles from '../App.module.css'

type TPlayToggleBtn = {
  pFor: TActive
  handleClick: () => void
  active: boolean
}

type TActive = 'one' | 'two'

const PlayerToggleBtn = ({
  pFor,
  handleClick,
  active = false,
}: TPlayToggleBtn) => {
  const txt = function () {
    if (pFor === 'one') {
      return active ? 'on one player' : 'onePlayer'
    }
    return active ? 'on two players' : 'twoPlayers'
  }

  const getClassName = (): string =>
    `${styles.btn} ${active ? 'navBtn purple' : 'navBtn'}`

  const props = {
    className: getClassName(),
    onClick: handleClick,
  }
  return <button {...props}>{txt()}</button>
}

export default PlayerToggleBtn

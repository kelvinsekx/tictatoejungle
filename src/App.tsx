import React, { useState, useReducer } from 'react'
import TwoPlayers from './apps/TwoPlayers'
import OnePlayer from './apps/OnePlayer'

import { XjungleContext } from './utils/context'
import { FaUserCog } from 'react-icons/fa'

import Footer from './components/footer'
import WelcomeBanner from './components/WelcomeBanner'
import Aside from './components/Aside.js'
import PlayerToggleBtn from './components/PlayerToggleBtn/playtogglebtn'

import { setFirstTimerToFalse } from './utils/func'
import { reducer, initialState } from './utils/reducer'
import { PLAYER } from './utils/types'

function XJungle() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isVisible, setIsVisible] = useState(false)
  const { setUsername } = React.useContext(XjungleContext)

  const XJungle =
    state.active === PLAYER.ONEPLAYER ? <OnePlayer /> : <TwoPlayers />

  const submitUsername = (username: string): void => {
    setUsername(username)
    localStorage.setItem('username', username)
  }

  if (state.isFirstTimer) {
    return (
      <WelcomeBanner
        close={() => {
          setFirstTimerToFalse(() => dispatch({ type: 'toggleFistTimer' }))
        }}
      />
    )
  }

  return (
    <div>
      <div>
        <nav>
          <h2>XJungle</h2>
          <PlayerToggleBtn
            pFor={'one'}
            active={state.active === 'one'}
            handleClick={() => dispatch({ type: 'one' })}
          />

          <PlayerToggleBtn
            pFor={'two'}
            active={state.active === 'two'}
            handleClick={() => dispatch({ type: 'two' })}
          />

          <div>
            <FaUserCog size={'24px'} onClick={() => setIsVisible(!isVisible)} />
          </div>
          <Aside isVisible={isVisible} submitUsername={submitUsername} />
        </nav>

        <main>
          {/**the div with className ad-1 & ad-2 are for styling purposes */}
          <div className="ad-1" />
          <div className="junglearea">{XJungle}</div>
          <div className="ad-2" />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default XJungle

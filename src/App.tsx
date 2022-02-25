import React, { useState } from "react"
import TwoPlayers from "./apps/TwoPlayers"
import OnePlayer from "./apps/OnePlayer"

import Footer from "./components/footer"
import WelcomeBanner from "./components/WelcomeBanner"

import styles from "./components/App.module.css"

const ifFirstTimer = ((): boolean => {
  let tt = window.localStorage.getItem('isFirstTimer');
  if (tt === 'false') {
    return false;
  }
  return true;
})()

function XJungle() {
  const [player, setPlayer] = useState("oneplayer")
  const [active, setActive] = useState('one')
  const [firstTimer, setFirstTimer] = useState(ifFirstTimer)


  const setToFirstTimer = () => {
    setFirstTimer(false)
    return window.localStorage.setItem('isFirstTimer', 'false');
  }

  function HandleClick(type: string): void {
    if (type === "one") {
      setPlayer("oneplayer")
    } else {
      setPlayer('twoplayers')
    }
    setActive(type)
  }

  const XJungle = player === "oneplayer" ? <OnePlayer /> : <TwoPlayers />

  return <div>
    {firstTimer ?
      <WelcomeBanner close={setToFirstTimer} /> : <div>
        <nav>
          <h2>XJungle</h2>
          <button
            className={`
            ${styles.btn} 
            ${active === 'one' ? 'navBtn purple' : 'navBtn'}`}

            onClick={() => HandleClick('one')}
          >
            {active === 'one' ? 'on one player' : 'onePlayer'}
          </button>
          <button
            className={`
            ${styles.btn} 
            ${active === 'two' ? 'navBtn purple' : 'navBtn'}`}
            onClick={() => HandleClick('two')}
          >
            {active === 'two' ? 'on two players' : 'twoPlayers'}
          </button>
        </nav>
        <main>
          <div className="ad-1" />
          <div className="junglearea">
            {XJungle}
          </div>
          <div className="ad-2" />
        </main>
        <Footer />
      </div>
    }

  </div>
}

export default XJungle;
import React, {useState} from "react";
import TwoPlayers from "./apps/TwoPlayers";
import OnePlayer from "./apps/OnePlayer";

import Footer from "./components/footer"

function XJungle () {
  const [player, setPlayer ] = useState("oneplayer")
  const [active, setActive] = useState('one')

  function HandleClick (type){
    if(type === "one"){
      setPlayer("oneplayer")
    }else{
      setPlayer('twoplayers')
    }
    setActive(type)
    return;
  }
  const XJungle = player === "oneplayer" ? <OnePlayer /> : <TwoPlayers />
  return <div>
    <nav>
      <h2>XJungle</h2>
          <button 
            className={active === 'one' ? 'navBtn purple' : 'navBtn'}
            style={{position: "relative", top: "1.4rem"}} 
            onClick={()=>HandleClick('one')}  
          >
            {active === 'one' ? 'on one player' : 'onePlayer'}
          </button>
          <button 
            className={active === 'two' ? 'navBtn purple' : 'navBtn'}
            style={{position: "relative", top: "1.4rem"}} 
            onClick={()=>HandleClick('two')}
          >
            {active === 'two' ? 'on two players' : 'twoPlayers'}
          </button>
    </nav>
    <main>
      <div className="ad-1"/>
      <div className="junglearea">
        {XJungle}
      </div>
      <div className="ad-2"/> 
    </main>
    <Footer />
  </div>
}

export default XJungle;
import React, {useState} from "react";
import TwoPlayers from "./apps/TwoPlayers";
import OnePlayer from "./apps/OnePlayer";

function XJungle () {
  const [player, setPlayer ] = useState("oneplayer")
  const XJungle = player === "oneplayer" ? <OnePlayer /> : <TwoPlayers />
  return <div>
    <nav>
      <h2>XJungle</h2>
    </nav>
    <main>
      <div className="ad"/>
      <div className="junglearea">
        {XJungle}
        <nav style={{marginTop: '2rem'}}>
          <button onClick={()=>setPlayer("oneplayer")}>
            One Player
          </button>
          <button onClick={()=>setPlayer("twoplayers")}>
            Two Players
          </button>
        </nav>
      </div>
      <div className="ad"/> 
    </main>
  </div>
}

export default XJungle;
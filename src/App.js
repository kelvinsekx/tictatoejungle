import React, {useState} from "react";
import TwoPlayers from "./apps/TwoPlayers";
import OnePlayer from "./apps/OnePlayer";

function XJungle () {
  const [player, setPlayer ] = useState("oneplayer")
  const XJungle = player === "oneplayer" ? <OnePlayer /> : <TwoPlayers />
  return <div>
    <nav>
      <h2>XJungle</h2>
          <button className="navBtn" 
            style={{position: "relative", top: "1.4rem"}} 
            onClick={()=>setPlayer("oneplayer")}>
            One Player
          </button>
          <button className="navBtn"
          style={{position: "relative", top: "1.4rem"}} 
          onClick={()=>setPlayer("twoplayers")}>
            Two Players
          </button>
    </nav>
    <main>
      <div className="ad-1"/>
      <div className="junglearea">
        {XJungle}
      </div>
      <div className="ad-2"/> 
    </main>
    <footer>
      <p>Hi, this web game, XJungle, is created and maintained by <a href="https://ww.kelvinsekx/codes">kelvinsekx</a> together with the love I have for you.</p>
      <div><strong>About XJungle :</strong> This is an interesting game very similar to the tic tac toe game only with a twist. It is a popular paper game in Nigeria {'\u{1F600}'}. </div>
    </footer>
  </div>
}

export default XJungle;
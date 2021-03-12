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
      <div className="ack">
          <p><strong style={{borderBottom: '2px solid black'}}>Acknowledgements (this part is subjected to change without notice) :</strong></p>
        <div style={{padding: 0, margin: 0}}>
          <p style={{padding: 0, margin: 0}}> This is a simple game but would have not been possible without the help of some really awesome people. I'd like to appreaciate my mum for the support and resilience will building this app. Also, my siblings: Joshua and Eric, I like to call them the two crazy people in my life. I would also appreciate Tomi Osinuga for in some type of way urging me to quicken the release of this app. Also, my really awesome students like Arogundade, Temilade and Adedeji for hastening me concerning the release of this app</p>
          <p>Awesome students like Rasheed, and feedbacks from him and Rotimi were also useful for the continual development of this app. Overall thanks to everyone who has helped with the experimental stage I wish this page is big enough for me to list you all but it just wouldnot, and my mentor, Irabor -and most especially God for the help.</p>
        </div>
      </div>
      <div>&copy; 2021 with Tears and Love</div>
    </footer>
  </div>
}

export default XJungle;
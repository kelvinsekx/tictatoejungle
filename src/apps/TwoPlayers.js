import GameBox from "../utils/compDatahocx"

const TellAboutTwoplayer = ({preWinner})=>
<h2 style={{ fontSize: "66%" }}>
             Sekx predicted {preWinner} to beat{" "}
             {preWinner === "x" ? "y" : "x"} (prove him wrong)
          </h2>

 const TwoPlayers = GameBox(TellAboutTwoplayer, 'TwoPlayers')

 export default TwoPlayers;

import GameBox from "../utils/compDatahocx";

const TellAboutOneplayer = () => (
  <h2 style={{ fontSize: "66%" }}>
    XJungler...now you're playing against sekx
  </h2>
);

const TwoPlayers = GameBox(TellAboutOneplayer, "OnePlayer");

export default TwoPlayers;

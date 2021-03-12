import React from "react";
import "../index.css";
import {possibleMovements,winningPosition} from '../utils/util'
import {checkItIncludes,checkWinnerExist} from "../utils/func";
import {DecideWhatNext, BoxTriangle1, BoxTriangle2,Box} from "../utils/reactiUtil"

class TwoPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boox: [
        { vl: "y", isPT: false },
        { vl: "y", isPT: false },
        { vl: "y", isPT: false },
        { vl: null, isPT: false },
        { vl: null, isPT: false },
        { vl: null, isPT: false },
        { vl: "x", isPT: false },
        { vl: "x", isPT: false },
        { vl: "x", isPT: false },
      ],
      highlight: Array(9).fill(null),
      spaceX: null,
      whoIsNext: true,
      winner: false,
      wrongMove: false,
      cheat: false,
    };
  }

  handleClick(index) {
    // console.log(this.state.spaceX);
    //Algo-1: checkWinner
    let checkWinner;
    if (this.state.winner) {
      return;
    }
    // Algo1: Highlight each BOX
    let copyHighlight = Array(9).fill(null);
    copyHighlight[index] = true;
    // Algo2:
    let makeFormerBoox = this.state.boox.slice();

    // when box isnot empty, do this
    if (this.state.boox[index].vl == null) {
      if (this.state.spaceX == null) {
        // console.log("dont continue")
        return;
      }
      if (checkItIncludes(possibleMovements, [this.state.spaceX[0], index])) {
        //
        // if spaceX works not fine
        makeFormerBoox[index].vl = this.state.spaceX[1];
        makeFormerBoox[this.state.spaceX[0]].vl = null;

        // check if winner exist
        // if it does tell me
        if (checkWinnerExist(winningPosition, makeFormerBoox)) {
            let newBoox = checkWinnerExist(winningPosition, makeFormerBoox)
          checkWinner = true;
          console.log(newBoox)
          makeFormerBoox = newBoox
          //makeFormerBoox[index].
        }
        return  this.setState({
          boox: makeFormerBoox,
          whoIsNext: !this.state.whoIsNext,
          winner: checkWinner,
          wrongMove: false,
          cheat: false,
        });
      } else {
        return this.setState({
          wrongMove: true,
        });
      }
    } else {
      // do this when BOX is not empty
      let formerValue = this.state.boox[index].vl;
     // console.log(formerValue)
      ;if (this.state.whoIsNext) {
        if (formerValue !== "y") {
          this.setState({
            spaceX: null,
            cheat: true,
          });
          // console.log('wrong naaa')
          return;
        }
      } else {
        if (formerValue !== "x") {
          this.setState({
            spaceX: null,
            cheat: true,
          });
          // console.log('wrong naaa joor')
          return;
        }
      };
      //console.log(this.state.spaceX)
      return this.setState({
        boox: makeFormerBoox,
        highlight: copyHighlight,
        spaceX: [index, formerValue],
        wrongMove: false,
        cheat: false,
      });
    }
  }

  restart = () => {
    return this.setState({
        boox: [
            { vl: "y", isPT: false },
            { vl: "y", isPT: false },
            { vl: "y", isPT: false },
            { vl: null, isPT: false },
            { vl: null, isPT: false },
            { vl: null, isPT: false },
            { vl: "x", isPT: false },
            { vl: "x", isPT: false },
            { vl: "x", isPT: false },
          ],
        highlight: Array(9).fill(null),
        spaceX: null,
        whoIsNext: true,
        winner: false,
        wrongMove: false,
        cheat: false,
      });
  };
  render() {
    let status = DecideWhatNext(this.state)
    return (
      <div>
        <button onClick={() => this.restart()} className="restart">
          RESTART GAME
        </button>
      <div>
        <h2 style={{fontSize: '66%'}}>Sekx predicted X to beat Y (prove him wrong)</h2>
        {status}
      </div>
        <div id="xBoard">
          <div className="flex">
            <Box
              v={this.state.boox[0].vl}
              onClick={() => this.handleClick(0)}
              className={this.state.highlight[0] ? "highlight" : ""}
              id = {this.state.boox[0].isPT ? 'mrk' : null}
            />
            <Box
              v={this.state.boox[1].vl}
              onClick={() => this.handleClick(1)}
              className={this.state.highlight[1] ? "highlight" : ""}
              id = {this.state.boox[1].isPT ? 'mrk' : null}
            />
            <Box
              v={this.state.boox[2].vl}
              onClick={() => this.handleClick(2)}
              className={this.state.highlight[2] ? "highlight" : ""}
              id = {this.state.boox[2].isPT ? 'mrk' : null}
            />
          </div>
          <BoxTriangle1 />
          <div className="flex fcv">
            <Box
              v={this.state.boox[3].vl}
              onClick={() => this.handleClick(3)}
              className={this.state.highlight[3] ? "highlight" : ""}
              id = {this.state.boox[3].isPT ? 'mrk' : null}
            />
            <Box
              v={this.state.boox[4].vl}
              onClick={() => this.handleClick(4)}
              className={this.state.highlight[4] ? "highlight" : ""}
              id = {this.state.boox[4].isPT ? 'mrk' : null}
            />
            <Box
              v={this.state.boox[5].vl}
              onClick={() => this.handleClick(5)}
              className={this.state.highlight[5] ? "highlight" : ""}
              id = {this.state.boox[5].isPT ? 'mrk' : null}
            />
          </div>
          <BoxTriangle2 />
          <div className="flex">
            <Box
              v={this.state.boox[6].vl}
              onClick={() => this.handleClick(6)}
              className={this.state.highlight[6] ? "highlight" : ""}
              id = {this.state.boox[6].isPT ? 'mrk' : null}
            />

            <Box
              v={this.state.boox[7].vl}
              onClick={() => this.handleClick(7)}
              className={this.state.highlight[7] ? "highlight" : ""}
              id = {this.state.boox[7].isPT ? 'mrk' : null}
            />

            <Box
              v={this.state.boox[8].vl}
              onClick={() => this.handleClick(8)}
              className={this.state.highlight[8] ? "highlight" : ""}
              id = {this.state.boox[8].isPT ? 'mrk' : null}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TwoPlayers;

import React from "react";
import "../index.css";
import {possibleMovements,winningPosition, ptA} from '../utils/util'
import {checkItIncludes,checkWinnerExist, mutatePossibleMvt, cheat} from "../utils/func";

function findPossibleMoveable (ext) {
  let psm = possibleMovements;
  let keepState = [];
  /**try to keep the state of available movements for x */
  for (let c of psm) {
      if(ext[c[0]].vl === 'x' && ext[c[1]].vl === null){
        keepState.push(c)
      }
  }
  console.log(keepState);
  const l = keepState.length;
  /** dont think like a fool */
  if(l < 2){
    /**
     * # if the state is just one,
     * # return it, and end the thinking
     */
    return keepState[0]
  }

  if(l >= 2){
    /** "(* ! *)"  */
  /** my name is ROBOT sekx */
  /** I have been built not to be foolish, */
  /** and not to be too smart. */
  /** my job here is just simple, win when given the 
   * most foolish opportunity to.
   * thanks,
   * 
   *                      Yours sincerely,
   *                       Robot, sekx.
  */
    function TMWTD(){
      for(let x of ptA) {
      let truthy = true;
      if(keepState.length === x.ar.length){
        for(let i = 0; i < keepState.length; i++){
          if(keepState[i][0] !== x.ar[i][0] || 
            keepState[i][1] !== x.ar[i][1]){
              truthy = false
            }
        }
        if(truthy) return x.pt;
      }
    }}
    let td = TMWTD()
    //console.log(td)
    if(td === 'I'){
      return keepState[1]
    }else if(td === 'II'){
      return keepState[5]
    }else if(td === 'III'){
      return keepState[3]
    }else if(td === 'IV'){
      return keepState[2]
    }else if (td === 'V'){
      return keepState[6]
    }else if (td === 'VI'){
      return keepState[5]
    }else if (td === 'VII'){
      return keepState[1]
    }else if (td === 'VIII'){
      return keepState[1]
    }
    else{
      return keepState[Math.floor(Math.random()* l)]
    }
  }
};

class OnePlayer extends React.Component {
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

  NEXTPLAYER = ( wS,existingMovements) => {
    let checkWinner;
    if(this.state.winner)return;
    const ext = existingMovements
    const fExt = findPossibleMoveable(ext);
     // console.log(wS);
    let mvt = mutatePossibleMvt(ext, fExt)
    // check if winner exist
        // if it does tell me
        if (checkWinnerExist(winningPosition, ext)) {
          checkWinner = true;
        }
    return this.setState({
      boox : mvt,
      winner: checkWinner,
      whoIsNext: !wS,
    })
  };

  handleClick(index) {
    // console.log(this.state.spaceX);
    // Algo-1: checkWinner
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
          //console.log(newBoox)
          makeFormerBoox = newBoox
        }
         this.setState({
          boox: makeFormerBoox,
          whoIsNext: !this.state.whoIsNext,
          winner: checkWinner,
          wrongMove: false,
          cheat: false
        });
        setTimeout( 
          ()=>this.NEXTPLAYER( this.state.whoIsNext, makeFormerBoox), 1450)
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
      hits: 0,
      });
  };
  render() {
    let status = this.state.wrongMove ? (
      <Pronounce> Kharrma, this is an impossible movement</Pronounce>
    ) : this.state.winner ? (
      <Pronounce>
        <strong>
          {this.state.whoIsNext ? "X" : "Y"}!! OSHABLOBLO..you won
        </strong>
      </Pronounce>
    ) : this.state.whoIsNext ? (
      <div>
        <Pronounce styles={{backgroundColor: "yellow", color: "#000"}}>Y, you are next</Pronounce>

        {this.state.cheat ? <Cheated> X {cheat()}</Cheated> : ""}
      </div>
    ) : (
      <div>
        <Pronounce styles={{backgroundColor: "green", color: "#fff"}}>X, you are Next </Pronounce>

        {this.state.cheat ? <Cheated> Y {cheat()}</Cheated> : null}
      </div>
    );
    return (
      <div>
        <button onClick={() => this.restart()} className="restart">
        RESTART GAME
      </button>
          <h2 style={{fontSize: '66%'}}>XJungler...now you're playing agains sekx</h2>
        {status}
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

class Box extends React.Component {
  render() {
    return (
      <button
        className={`box ${this.props.className}`}
        onClick={this.props.onClick}
        id={this.props.id}
      >
        {this.props.v}
      </button>
    );
  }
}

function Pronounce({ children, styles }) {

  return <span style={{ fontSize: "1.4rem", ...styles }}>{children}</span>;
}

function Cheated({ children }) {
  return (
    <span
      style={{
        backgroundColor: "yellowgreen",
        color: "rgb(186, 9, 9)",
        fontSize: "1.5rem",
      }}
    >
      {children}
    </span>
  );
}

function BoxTriangle1() {
  return (
    <div className="recol-container">
      <div className="recol-11"></div>
      <div className="recol-21"></div>
    </div>
  );
}

function BoxTriangle2() {
  return (
    <div className="recol-container">
      <div className="recol-1"></div>
      <div className="recol-2"></div>
    </div>
  );
}

export default OnePlayer;

import React from 'react';
import { possibleMovements, winningPosition } from '../utils/util';
import {
  checkItIncludes,
  checkWinnerExist,
  predictedWinner,
  mutatePossibleMvt,
} from '../utils/func';
import {
  default as XBOARD,
  DecideWhatNext,
} from '../utils/reactiUtil';
import { findPossibleMoveable } from '../utils/robotHelper';

const composedHigherHOCX = (ChildComposedComponent, player) =>
  class Player extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        boox: [
          { vl: 'y', isPT: false },
          { vl: 'y', isPT: false },
          { vl: 'y', isPT: false },
          { vl: null, isPT: false },
          { vl: null, isPT: false },
          { vl: null, isPT: false },
          { vl: 'x', isPT: false },
          { vl: 'x', isPT: false },
          { vl: 'x', isPT: false },
        ],
        highlight: Array(9).fill(null),
        spaceX: null,
        whoIsNext: true,
        winner: false,
        wrongMove: false,
        cheat: false,
        preWinner: predictedWinner(),
        isWinner: '',
      };
      this.handleClick = this.handleClick.bind(this);
      this.restart = this.restart.bind(this);
    }

    NEXTPLAYER = (wS, existingMovements) => {
      let checkWinner;
      if (this.state.winner) return;
      const ext = existingMovements;
      const fExt = findPossibleMoveable(ext);
      // console.log(wS);
      let mvt = mutatePossibleMvt(ext, fExt);
      // check if winner exist
      // if it does tell me
      if (checkWinnerExist(winningPosition, ext)) {
        checkWinner = true;
      }
      return this.setState({
        boox: mvt,
        winner: checkWinner,
        whoIsNext: !wS,
      });
    };

    handleClick(index) {
      // console.log(this.state.spaceX);
      //Algo-1: checkWinner
      let checkWinner;
      let isWinner;
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
        if (
          checkItIncludes(possibleMovements, [
            this.state.spaceX[0],
            index,
          ])
        ) {
          //
          // if spaceX works not fine
          makeFormerBoox[index].vl = this.state.spaceX[1];
          makeFormerBoox[this.state.spaceX[0]].vl = null;
          this.setState({
            spaceX: [null, null],
          });
          // check if winner exist
          // if it does tell me
          if (checkWinnerExist(winningPosition, makeFormerBoox)) {
            let newBoox = checkWinnerExist(
              winningPosition,
              makeFormerBoox,
            );
            checkWinner = true;
            // console.log(newBoox)
            isWinner = this.state.whoIsNext ? 'y' : 'x';
            console.log(isWinner);
            makeFormerBoox = newBoox;
            //makeFormerBoox[index].
          }
          this.setState({
            boox: makeFormerBoox,
            whoIsNext: !this.state.whoIsNext,
            winner: checkWinner,
            wrongMove: false,
            cheat: false,
            isWinner: isWinner,
          });
          if (player === 'OnePlayer') {
            setTimeout(
              () =>
                this.NEXTPLAYER(this.state.whoIsNext, makeFormerBoox),
              1450,
            );
          }
        } else {
          return this.setState({
            wrongMove: true,
          });
        }
      } else {
        // do this when BOX is not empty
        let formerValue = this.state.boox[index].vl;
        if (this.state.whoIsNext) {
          if (formerValue !== 'y') {
            this.setState({
              spaceX: null,
              cheat: true,
            });
            return;
          }
        } else {
          if (formerValue !== 'x') {
            this.setState({
              spaceX: null,
              cheat: true,
            });
            // console.log('wrong naaa joor')
            return;
          }
        }
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
          { vl: 'y', isPT: false },
          { vl: 'y', isPT: false },
          { vl: 'y', isPT: false },
          { vl: null, isPT: false },
          { vl: null, isPT: false },
          { vl: null, isPT: false },
          { vl: 'x', isPT: false },
          { vl: 'x', isPT: false },
          { vl: 'x', isPT: false },
        ],
        highlight: Array(9).fill(null),
        spaceX: null,
        whoIsNext: true,
        winner: false,
        wrongMove: false,
        cheat: false,
        isWinner: '',
      });
    };
    render() {
      let status = DecideWhatNext(this.state, player);
      return (
        <div>
          <button onClick={() => this.restart()} className="restart">
            RESTART GAME
          </button>
          <div>
            <ChildComposedComponent {...this.state} />
            {status}
          </div>
          <XBOARD {...this.state} handleClick={this.handleClick} />
        </div>
      );
    }
  };

export default composedHigherHOCX;

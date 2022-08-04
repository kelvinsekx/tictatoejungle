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

import { XjungleContext } from './context';

const composedHigherHOCX = (ChildComposedComponent, player) =>
  class Player extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        board: [
          { value: 'y', isPT: false },
          { value: 'y', isPT: false },
          { value: 'y', isPT: false },
          { value: null, isPT: false },
          { value: null, isPT: false },
          { value: null, isPT: false },
          { value: 'x', isPT: false },
          { value: 'x', isPT: false },
          { value: 'x', isPT: false },
        ],
        highlight: Array(9).fill(null),
        spaceX: null,
        whoIsNext: true,
        winner: false,
        wrongMove: false,
        cheat: false,
        preWinner: predictedWinner(),
        isWinner: '',
        username: '',
      };
    }
    static contextType = XjungleContext.Consumer;

    componentDidMount() {
      const username = localStorage.getItem('username');
      this.setState({
        ...this.state,
        username: username ? username : this.context.username,
      });
    }

    componentDidUpdate(_, prevState) {
      if (prevState.username) return;
      if (prevState.username !== this.context.username) {
        this.setState({
          ...this.state,
          username: this.context.username,
        });
      }
    }

    NEXTPLAYER = (wS, existingMovements) => {
      let checkWinner;
      if (this.state.winner) return;
      const fExt = findPossibleMoveable(existingMovements);

      let mvt = mutatePossibleMvt(existingMovements, fExt);
      if (checkWinnerExist(winningPosition, existingMovements)) {
        checkWinner = true;
      }
      return this.setState({
        board: mvt,
        winner: checkWinner,
        whoIsNext: !wS,
      });
    };

    handleClick = (index) => {
      let checkWinner;
      let isWinner;
      if (this.state.winner) {
        return;
      }

      let copyHighlight = Array(9).fill(null);
      copyHighlight[index] = true;
      let makeFormerBoox = this.state.board.slice();

      if (this.state.board[index].value == null) {
        if (this.state.spaceX == null) {
          return;
        }
        if (
          checkItIncludes(possibleMovements, [
            this.state.spaceX[0],
            index,
          ])
        ) {
          makeFormerBoox[index].value = this.state.spaceX[1];
          makeFormerBoox[this.state.spaceX[0]].value = null;
          this.setState({
            spaceX: [null, null],
          });
          if (checkWinnerExist(winningPosition, makeFormerBoox)) {
            let newBoox = checkWinnerExist(
              winningPosition,
              makeFormerBoox,
            );
            checkWinner = true;

            isWinner = this.state.whoIsNext ? 'y' : 'x';
            console.log(isWinner);
            makeFormerBoox = newBoox;
          }
          this.setState({
            board: makeFormerBoox,
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
        let formerValue = this.state.board[index].value;
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
            return;
          }
        }
        return this.setState({
          board: makeFormerBoox,
          highlight: copyHighlight,
          spaceX: [index, formerValue],
          wrongMove: false,
          cheat: false,
        });
      }
    };

    restart = () => {
      return this.setState({
        ...this.state,
        board: [
          { value: 'y', isPT: false },
          { value: 'y', isPT: false },
          { value: 'y', isPT: false },
          { value: null, isPT: false },
          { value: null, isPT: false },
          { value: null, isPT: false },
          { value: 'x', isPT: false },
          { value: 'x', isPT: false },
          { value: 'x', isPT: false },
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
            <ChildComposedComponent
              preWinner={this.state.preWinner}
            />
            {status}
          </div>
          <XBOARD {...this.state} handleClick={this.handleClick} />
        </div>
      );
    }
  };

composedHigherHOCX().contextType = XjungleContext;
export default composedHigherHOCX;

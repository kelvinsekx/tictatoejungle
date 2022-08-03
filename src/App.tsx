import React, { useState, useReducer } from 'react';
import TwoPlayers from './apps/TwoPlayers';
import OnePlayer from './apps/OnePlayer';

import Footer from './components/footer';
import WelcomeBanner from './components/WelcomeBanner';

import styles from './components/App.module.css';
import { setFirstTimerToFalse, ifFirstTimer } from './utils/func';

enum PLAYER {
  ONEPLAYER = 'onePlayer',
  TWOPLAYER = 'twoPlayers',
}

type TActive = 'one' | 'two';

const initialState = {
  player: 'onePlayer',
  active: 'one',
};

type Tstate = {
  player: string;
  active: string;
};
const reducer = (state: Tstate, action: { type: string }): Tstate => {
  switch (action.type) {
    case 'one':
      return { ...initialState };
    case 'two':
      return {
        ...state,
        player: PLAYER.TWOPLAYER,
        active: 'two',
      };
    default:
      throw new Error(
        'action type is not known, consider using setToOnePlayer or setToTwoPlayers',
      );
  }
};

function XJungle() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [firstTimer, setFirstTimer] = useState(ifFirstTimer);

  const XJungle =
    state.player === PLAYER.ONEPLAYER ? (
      <OnePlayer />
    ) : (
      <TwoPlayers />
    );

  const getClassName = (player: TActive): string =>
    `${styles.btn} ${
      state.active === player ? 'navBtn purple' : 'navBtn'
    }`;

  return (
    <div>
      {firstTimer ? (
        <WelcomeBanner
          close={() => setFirstTimerToFalse(setFirstTimer)}
        />
      ) : (
        <div>
          <nav>
            <h2>XJungle</h2>
            <button
              className={getClassName('one')}
              onClick={() => dispatch({ type: 'one' })}
            >
              {state.active === 'one' ? 'on one player' : 'onePlayer'}
            </button>
            <button
              className={getClassName('two')}
              onClick={() => dispatch({ type: 'two' })}
            >
              {state.active === 'two'
                ? 'on two players'
                : 'twoPlayers'}
            </button>
          </nav>
          <main>
            {/**the div with className ad-1 & ad-2 are for styling purposes */}
            <div className="ad-1" />
            <div className="junglearea">{XJungle}</div>
            <div className="ad-2" />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default XJungle;

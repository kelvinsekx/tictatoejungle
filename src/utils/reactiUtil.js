import React from 'react'
import { cheat as cheated } from './func'
import { PLAYER } from './types'
import { Box } from '../components/Box/box'

export default function XBoard({ handleClick, board, highlight, spaceX }) {
  return (
    <div id="xBoard">
      <div className="flex">
        {[
          0,
          1,
          2,
        ].map((i) => (
          <Box
            key={i}
            index={i}
            board={board}
            prevIndex={spaceX[0]}
            value={board[i].value}
            onClick={(j) => handleClick(j)}
            className={highlight[i] ? 'highlight' : ''}
            id={board[i].isPT ? 'mrk' : null}
          />
        ))}
      </div>
      <BoxTriangle1 />
      <div className="flex fcv">
        {[
          3,
          4,
          5,
        ].map((i) => (
          <Box
            key={i}
            index={i}
            value={board[i].value}
            prevIndex={spaceX[0]}
            onClick={(j) => handleClick(j)}
            className={highlight[i] ? 'highlight' : ''}
            id={board[i].isPT ? 'mrk' : null}
          />
        ))}
      </div>
      <BoxTriangle2 />
      <div className="flex">
        {[
          6,
          7,
          8,
        ].map((i) => (
          <Box
            key={i}
            index={i}
            value={board[i].value}
            prevIndex={spaceX[0]}
            onClick={(j) => handleClick(j)}
            className={highlight[i] ? 'highlight' : ''}
            id={board[i].isPT ? 'mrk' : null}
          />
        ))}
      </div>
    </div>
  )
}

function Pronounce({ children, styles, id }) {
  return (
    <span style={{ ...styles }} id={id} className="pron">
      {children}
    </span>
  )
}

function Winner({ children }) {
  return <span className="winner">{children}</span>
}

function Cheated({ children }) {
  return <span className="cheated">{children}</span>
}

export function DecideWhatNext(states, player) {
  // prettier-ignore
  const { 
    winner, wrongMove, whoIsNext, 
    cheat, isWinner, preWinner, 
    username 
  } = states

  if (wrongMove) {
    return (
      <Pronounce id="pr-kr"> Kharrma, this is an impossible movement</Pronounce>
    )
  }

  if (winner) {
    const tellIfSekxPredictedWinnerRight =
      preWinner === isWinner ? (
        <div>sekx predicted well</div>
      ) : (
        <div>you proved sekx wrong. Congrats</div>
      )
    return (
      <Winner>
        {player === PLAYER.TWOPLAYER ? tellIfSekxPredictedWinnerRight : null}
        <strong>
          {'\u{1F947}'} {isWinner}!! oshabloblo..you won {'\u{1F3C6}'}
        </strong>
      </Winner>
    )
  }
  if (whoIsNext === 'y')
    return (
      <div>
        <Pronounce styles={{ backgroundColor: 'yellow', color: '#000' }}>
          {`${username ? username : 'Y'}, you are next`}
        </Pronounce>

        {cheat ? <Cheated> X {cheated()}</Cheated> : ''}
      </div>
    )
  else
    return (
      <div>
        <Pronounce styles={{ backgroundColor: 'green', color: '#fff' }}>
          X, you are Next{' '}
        </Pronounce>

        {cheat ? (
          <Cheated>
            {' '}
            {`${username ? username : 'Y'}`} {cheated()}
          </Cheated>
        ) : null}
      </div>
    )
}

export function BoxTriangle1() {
  return (
    <div className="recol-container">
      <div className="recol-11"></div>
      <div className="recol-21"></div>
    </div>
  )
}

export function BoxTriangle2() {
  return (
    <div className="recol-container">
      <div className="recol-1"></div>
      <div className="recol-2"></div>
    </div>
  )
}

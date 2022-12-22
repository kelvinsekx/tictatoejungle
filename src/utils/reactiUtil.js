import React from 'react'
import { cheat as cheated } from './func'

export default function XBoard({ handleClick, board, highlight }) {
  return (
    <div id="xBoard">
      <div className="flex">
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            v={board[i].value}
            onClick={() => handleClick(i)}
            className={highlight[i] ? 'highlight' : ''}
            id={board[i].isPT ? 'mrk' : null}
          />
        ))}
      </div>
      <BoxTriangle1 />
      <div className="flex fcv">
        {[3, 4, 5].map((i) => (
          <Box
            key={i}
            v={board[i].value}
            onClick={() => handleClick(i)}
            className={highlight[i] ? 'highlight' : ''}
            id={board[i].isPT ? 'mrk' : null}
          />
        ))}
      </div>
      <BoxTriangle2 />
      <div className="flex">
        {[6, 7, 8].map((i) => (
          <Box
            key={i}
            v={board[i].value}
            onClick={() => handleClick(i)}
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
  const { winner, wrongMove, whoIsNext, cheat, isWinner, preWinner, username } =
    states
  if (wrongMove) {
    return (
      <Pronounce id="pr-kr"> Kharrma, this is an impossible movement</Pronounce>
    )
  }
  return winner ? (
    <Winner>
      {player === 'TwoPlayers' ? (
        preWinner === isWinner ? (
          <div>sekx predicted well</div>
        ) : (
          <div>you proved sekx wrong. congrats</div>
        )
      ) : (
        ''
      )}
      <strong>
        {'\u{1F947}'} {whoIsNext ? 'X' : `${username ? username : 'Y'}`}!!
        oshabloblo..you won {'\u{1F3C6}'}
      </strong>
    </Winner>
  ) : whoIsNext ? (
    <div>
      <Pronounce styles={{ backgroundColor: 'yellow', color: '#000' }}>
        {`${username ? username : 'Y'}, you are next`}
      </Pronounce>

      {cheat ? <Cheated> X {cheated()}</Cheated> : ''}
    </div>
  ) : (
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

export function Box({ className, onClick, id, v }) {
  return (
    <button className={`box ${className}`} onClick={onClick} id={id}>
      {v}
    </button>
  )
}

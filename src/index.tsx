import * as React from 'react'
import ReactDOM from 'react-dom'
import './css/cssModule'
import { XjungleContext as Context } from './utils/context'

import XJungle from './App'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

function Game() {
  const [
    username,
    setUsername,
  ] = React.useState<string>('')

  return (
    <Context.Provider value={{ username, setUsername }}>
      <GameBox />
    </Context.Provider>
  )
}

function GameBox() {
  const [
    width,
    setWidth,
  ] = React.useState<number>(window.innerWidth)

  React.useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  if (width < 830)
    return (
      <DndProvider backend={TouchBackend}>
        <XJungle />
      </DndProvider>
    )

  return (
    <DndProvider backend={HTML5Backend}>
      <XJungle />
    </DndProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
)

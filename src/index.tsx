import * as React from 'react'
import ReactDOM from 'react-dom'
import './css/cssModule'
import { XjungleContext as Context } from './utils/context'

import XJungle from './App'

function Game() {
  const [username, setUsername] = React.useState<string>('')
  return (
    <Context.Provider value={{ username, setUsername }}>
      <XJungle />
    </Context.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);

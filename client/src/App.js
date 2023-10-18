import './App.css'
import './index.css'
import { useState } from 'react'

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a>Learn React</a>
      </header>
    </div>
  )
}

export default App

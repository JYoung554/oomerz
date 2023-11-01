import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import './App.css'
import './index.css'
import { useState, useEffect } from 'react'

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const getToken = () => {
    let token = localStorage.getItem('token')
    if (token) {
      console.log('true')
      return setAuthenticated(true)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          authenticated={authenticated}
          element={<Login />}
        ></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  )
}

export default App

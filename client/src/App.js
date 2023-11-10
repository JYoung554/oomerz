import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import axios from 'axios'
import Profile from './pages/Profile'
import { BASE_URL } from './globals'
import './App.css'
import './index.css'
import { useState, useEffect } from 'react'

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [posts, setPosts] = useState([])
  const getToken = () => {
    let token = localStorage.getItem('token')
    if (token) {
      console.log('true')
      return setAuthenticated(true)
    }
  }

  const getPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/home`)
      setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToken()
    //getPosts()
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
        <Route
          path="/"
          element={<Home posts={posts} setPosts={setPosts} />}
        ></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  )
}

export default App

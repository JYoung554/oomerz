import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import axios from 'axios'
import Profile from './pages/Profile'
import { BASE_URL } from './globals'
import {
  SET_AUTHENTICATED,
  SET_CURRENT_USER,
  SET_CURRENT_USER_DATA,
  GET_ALL_USERS
} from '../src/store/types'
import './App.css'
import './index.css'
import { useState, useEffect, useReducer } from 'react'

const iState = {
  authenticated: false,
  currentUser: {},
  currentUserData: null,
  allUsers: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: action.payload }
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload }
    case SET_CURRENT_USER_DATA:
      return { ...state, currentUserData: action.payload }
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload }
    default:
      return state
  }
}

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const history = useNavigate()
  const checkToken = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      const res = await axios.get(`${BASE_URL}/auth/session`)
      dispatch({ type: SET_CURRENT_USER, payload: res.data })
      dispatch({ type: SET_AUTHENTICATED, payload: true })
      history(`/home/${state.currentUser.handle}`)
      console.log('true')
    }
  }
  const logOut = () => {
    localStorage.clear()
    dispatch({ type: SET_CURRENT_USER, payload: {} })
    dispatch({ type: SET_AUTHENTICATED, payload: false })
    history('/login')
  }

  useEffect(() => {
    checkToken()
    console.log(state.authenticated)
  }, [state.authenticated])

  return (
    <div className="App">
      <Routes
        authenticated={state.authenticated}
        currentUser={state.currentUser}
      >
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={
            <Login
              authenticated={state.authenticated}
              currentUser={state.currentUser}
              appDispatch={dispatch}
            />
          }
        ></Route>
        <Route
          path="/home/:handle"
          element={
            <Home
              authenticated={state.authenticated}
              currentUser={state.currentUser}
              currentUserData={state.currentUserData}
              logOut={logOut}
            />
          }
        ></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  )
}

export default App

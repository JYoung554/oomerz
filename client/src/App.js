import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import axios from 'axios'
import Profile from './pages/Profile'
import Trivia from './pages/Trivia'
import { BASE_URL } from './globals'
import {
  SET_AUTHENTICATED,
  SET_USER,
  CAPTION_FORM,
  PROFILE_CARDS_BY_HANDLE,
  SET_CURRENT_USER,
  SET_CURRENT_USER_DATA,
  SET_PROFILE_CARD,
  GET_PROFILE_FORM,
  GET_ALL_USERS
} from '../src/store/types'
import './App.css'
import './index.css'
import { useState, useEffect, useReducer } from 'react'

const iState = {
  authenticated: false,
  currentUser: {},
  currentUserData: null,
  selectedUser: null,
  setProfile: [],
  profileCardsByHandle: [],
  profileCard: [],
  allUsers: []
}

//
const reducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: action.payload }
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload }
    case SET_CURRENT_USER_DATA:
      return { ...state, currentUserData: action.payload }
    case SET_USER:
      return { ...state, selectedUser: action.payload }
    /*  case CAPTION_FORM:
      return {
        ...state,
        profileCard: {
          ...state.profileCard,
          caption: { [action.payload.name]: action.payload.value }
        }
      }*/
    case SET_PROFILE_CARD:
      return { ...state, profileCard: action.payload }
    case PROFILE_CARDS_BY_HANDLE:
      return { ...state, profileCardsByHandle: action.payload }
    case GET_PROFILE_FORM:
      return { ...state, profileCard: action }
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload }
    default:
      return state
  }
}
function ProfilePage() {}
//
const App = (props) => {
  let { selectedUser } = useParams()
  const [state, dispatch] = useReducer(reducer, iState)
  const history = useNavigate()
  let { handle } = useParams()
  const checkToken = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      const res = await axios.get(`${BASE_URL}/auth/session`)
      dispatch({ type: SET_CURRENT_USER, payload: res.data })
      dispatch({ type: SET_USER, payload: res.data })
      dispatch({ type: SET_AUTHENTICATED, payload: true })
      history(`/home/${state.currentUser.handle}`)
      console.log(state.currentUser)
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
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={
            <Login
              authenticated={state.authenticated}
              currentUser={state.currentUser}
              profileCard={state.profileCard}
              setProfile={state.setProfile}
              appDispatch={dispatch}
            />
          }
        ></Route>
        <Route
          path={`/home/:handle`}
          element={
            <Home
              authenticated={state.authenticated}
              profileCard={state.profileCard}
              currentUser={state.currentUser}
              caption={state.profileCard.caption}
              currentUserData={state.currentUserData}
              profileCardsByHandle={state.profileCardsByHandle}
              setProfile={state.setProfile}
              selectedUser={state.selectedUser}
              appDispatch={dispatch}
              logOut={logOut}
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <Profile
              dispatch={dispatch}
              profileCardsByHandle={state.profileCardsByHandle}
              selectedUser={state.selectedUser}
              currentUser={state.currentUser}
              currentUserData={state.currentUserData}
            />
          }
        ></Route>
        <Route
          path="/trivia"
          element={
            <Trivia
              appDispatch={dispatch}
              selectedUser={state.selectedUser}
              currentUser={state.currentUser}
              currentUserData={state.currentUserData}
            />
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default App

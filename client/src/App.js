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
  SET_TRIVIA_TOTAL,
  SET_GEN_STATUS,
  CAPTION_FORM,
  PROFILE_CARDS_BY_HANDLE,
  SET_CURRENT_USER,
  SET_CURRENT_USER_DATA,
  SET_PROFILE_CARD,
  UPDATE_PROFILE_CARD,
  SET_CURRENT_USER_SELECTED_PROFILE_CARD,
  GET_ALL_USERS,
  GET_PROFILE_CARD
} from '../src/store/types'
import './App.css'
import './index.css'
import { useState, useEffect, useReducer } from 'react'

const iState = {
  authenticated: false,
  currentUser: {},
  currentUserData: null,
  currentUserSelectedProfileCard: [],
  selectedUser: null,
  genStatus: 'None',
  setProfile: [],
  profileCardsByHandle: [],
  triviaTotal: 0,
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
    case SET_GEN_STATUS:
      return { ...state, genStatus: action.payload }
    case SET_TRIVIA_TOTAL:
      return { ...state, triviaTotal: state.triviaTotal + 1 }
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
    case GET_PROFILE_CARD:
      return { ...state, profileCard: action.payload }
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload }
    case SET_CURRENT_USER_SELECTED_PROFILE_CARD:
      return { ...state, currentUserSelectedProfile: action.payload }
    case UPDATE_PROFILE_CARD:
      let updatedProfileCard = state.currentUserData.ProfileCard.filter(
        (profileCard) => profileCard.id !== action.payload.id
      )
      return {
        ...state,
        currentUserData: {
          ...state.currentUserData,
          ProfileCard: [...updatedProfileCard, action.payload.ProfileCard]
        }
      }
    default:
      return state
  }
}
function ProfilePage() {}
//
const App = () => {
  let { selectedUser } = useParams()
  const [state, dispatch] = useReducer(reducer, iState)
  const history = useNavigate()
  let { handle } = useParams()
  const checkToken = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      const res = await axios.get(`${BASE_URL}/auth/session`)

      dispatch({ type: SET_CURRENT_USER, payload: res.data })
      dispatch({ type: SET_CURRENT_USER_DATA, payload: res.data })
      dispatch({ type: SET_AUTHENTICATED, payload: true })
      history(`/home/${state.currentUser.handle}`)
      console.log(state.currentUserData)
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
    console.log(state.genStatus)
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
              genStatus={state.genStatus}
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
              triviaTotal={state.triviaTotal}
              currentUserData={state.currentUserData}
              currentUserSelectedProfileCard={
                state.currentUserSelectedProfileCard
              }
              profileCardsByHandle={state.profileCardsByHandle}
              setProfile={state.setProfile}
              genStatus={state.genStatus}
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
              genStatus={state.genStatus}
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
              genStatus={state.genStatus}
              selectedUser={state.selectedUser}
              currentUser={state.currentUser}
              triviaTotal={state.triviaTotal}
              currentUserData={state.currentUserData}
            />
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default App

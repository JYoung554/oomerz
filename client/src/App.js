import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import axios from 'axios'
import Profile from './pages/Profile'
import Trivia from './pages/Trivia'
import Users from '../src/pages/Users'
import UserPage from '../src/pages/UserPage'
import Nav from '../src/components/Nav'
import Avatar from './components/Avatar'
import Settings from './pages/Settings'
import { BASE_URL } from './globals'
import {
  SET_AUTHENTICATED,
  SET_USER,
  SET_TRIVIA_TOTAL,
  SET_GEN_STATUS,
  PROFILE_CARDS_BY_HANDLE,
  SET_CURRENT_USER,
  SET_CURRENT_USER_DATA,
  ADD_CURRENT_USER_PROFILE_CARD,
  ADD_TRIVIA,
  SET_CARD,
  SET_PROFILE_CARD,
  SET_PROFILE_USER,
  GET_USER,
  UPDATE_PROFILE_CARD,
  SET_CURRENT_USER_SELECTED_PROFILE_CARD,
  GET_ALL_USERS,
  GET_PROFILE_CARD
} from './store/types'
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
  profileCard: [],
  setProfile: [],
  user: {},
  users: [],
  profileCardsByHandle: [],
  triviaTotal: 0,
  selectedProfileCard: [],
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
      return { ...state, triviaTotal: action.payload }
    case SET_USER:
      return { ...state, selectedUser: action.payload }
    case SET_PROFILE_USER:
      return { ...state, users: action.payload }
    case SET_PROFILE_CARD:
      return { ...state, selectedProfileCard: action.payload }
    case ADD_TRIVIA:
      return state.triviaTotal >= 0
        ? { ...state, triviaTotal: state.triviaTotal + 1 }
        : { ...state, triviaTotal: state.triviaTotal }
    case PROFILE_CARDS_BY_HANDLE:
      return { ...state, profileCardsByHandle: action.payload }
    case GET_PROFILE_CARD:
      return { ...state, profileCard: action.payload }
    case SET_CARD:
      return { ...state, profileCard: action.payload }
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload }
    case GET_USER:
      return { ...state, user: action.payload }
    case ADD_CURRENT_USER_PROFILE_CARD:
      return {
        ...state,
        currentUserData: {
          ...state.currentUserData,
          ProfileCards: action.payload
        }
      }
    case SET_CURRENT_USER_SELECTED_PROFILE_CARD:
      return { ...state, currentUserSelectedProfileCard: action.payload }
    case UPDATE_PROFILE_CARD:
      let updatedProfileCard = state.currentUserData.ProfileCards.filter(
        (profileCard) => profileCard.id !== action.payload.id
      )
      return {
        ...state,
        currentUserData: {
          ...state.currentUserData,
          ProfileCards: [...updatedProfileCard, action.payload.profileCard]
        }
      }
    default:
      return state
  }
}

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
      dispatch({ type: SET_AUTHENTICATED, payload: true })
      history(`/home/${state.currentUser.handle}`)

      console.log(state.currentUserData)
      console.log(state.selectedProfileCard)
    }
  }
  const logOut = () => {
    localStorage.clear()

    dispatch({ type: SET_AUTHENTICATED, payload: false })
    dispatch({ type: SET_CURRENT_USER, payload: {} })
    dispatch({ type: SET_CURRENT_USER_DATA, payload: null })

    history('/login')
  }

  useEffect(() => {
    checkToken()
    console.log(state.authenticated)
    console.log(state.genStatus)
  }, [state.authenticated])

  return (
    <div className="App">
      <header>
        <Avatar
          selectedUser={state.selectedUser}
          currentUser={state.currentUser}
          currentUserData={state.currentUserData}
          appDispatch={dispatch}
        ></Avatar>
        <Nav
          authenticated={state.authenticated}
          currentUser={state.currentUser}
          currentUserData={state.currentUserData}
          appDispatch={dispatch}
          logOut={logOut}
        ></Nav>
      </header>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={
            <Login
              authenticated={state.authenticated}
              currentUser={state.currentUser}
              setProfile={state.setProfile}
              genStatus={state.genStatus}
              appDispatch={dispatch}
            />
          }
        ></Route>
        <Route
          path={`/home/:${state.currentUser.handle}`}
          element={
            <Home
              authenticated={state.authenticated}
              selectedProfileCard={state.selectedProfileCard}
              currentUser={state.currentUser}
              currentUserData={state.currentUserData}
              triviaTotal={state.triviaTotal}
              currentUserSelectedProfileCard={
                state.currentUserSelectedProfileCard
              }
              profileCard={state.profileCard}
              profileCardsByHandle={state.profileCardsByHandle}
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
              appDispatch={dispatch}
              profileCardsByHandle={state.profileCardsByHandle}
              selectedUser={state.selectedUser}
              genStatus={state.genStatus}
              currentUser={state.currentUser}
              currentUserData={state.currentUserData}
              profileCard={state.profileCard}
              users={state.users}
              currentUserSelectedProfileCard={
                state.currentUserSelectedProfileCard
              }
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
              profileCard={state.profileCard}
              currentUserData={state.currentUserData}
              selectedProfileCard={state.selectedProfileCard}
              currentUserSelectedProfileCard={
                state.currentUserSelectedProfileCard
              }
            />
          }
        ></Route>
        <Route
          path="/users"
          element={
            <Users
              currentUser={state.currentUser}
              selectedUser={state.selectedUser}
              profileCard={state.profileCard}
              user={state.user}
              appDispatch={dispatch}
            />
          }
        ></Route>
        <Route
          path="/user/:user_id"
          element={
            <UserPage
              selectedUser={state.selectedUser}
              currentUser={state.currentUser}
              currentUserData={state.currentUserData}
              appDispatch={dispatch}
            ></UserPage>
          }
        ></Route>
        <Route
          path="/settings"
          element={
            <Settings
              selectedUser={state.selectedUser}
              currentUser={state.currentUser}
              currentUserData={state.currentUserData}
              appDispatch={dispatch}
            ></Settings>
          }
        ></Route>
      </Routes>
    </div>
  )
}
export default App

import React, { useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import { BASE_URL } from '../globals'
const {
  LOGIN_FORM,
  SUBMIT_LOGIN_FORM,
  SET_CURRENT_USER,
  SET_CURRENT_USER_DATA,
  SET_AUTHENTICATED,
  PROFILE_CARDS_BY_HANDLE,
  GET_PROFILE_CARD,
  SET_USER,
  RESET_LOGIN
} = require('../store/types')

const iState = {
  loginForm: {
    email: '',
    handle: '',
    password: ''
  },
  submittedLogin: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_FORM:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.payload.name]: action.payload.value
        }
      }
    case SUBMIT_LOGIN_FORM:
      return { ...iState, submittedLogin: action.payload }
    case RESET_LOGIN:
      return { ...iState }
    default:
      return state
  }
}

const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const { caption, currentUser, genStatus, triviaTotal, profileCardsByHandle } =
    props
  const loginForm = state.loginForm

  const history = useNavigate()

  const handleChange = (e) => {
    dispatch({
      type: LOGIN_FORM,
      payload: { name: e.target.name, value: e.target.value }
    })
  }

  const handleSubmit = async (e) => {
    const { selectedUser } = props
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, state.loginForm)

      localStorage.setItem('token', res.data.token)
      dispatch({
        type: SUBMIT_LOGIN_FORM,
        payload: true
      })
      dispatch({
        type: RESET_LOGIN
      })
      props.appDispatch({ type: SET_CURRENT_USER, payload: res.data.user })
      //props.appDispatch({ type: SET_USER, payload: res.data.user })
      props.appDispatch({ type: SET_AUTHENTICATED, payload: true })
      console.log(selectedUser)

      history(`/home/${res.data.user.handle}`)
    } catch (error) {
      console.log(error)
    }
  }
  const loginProps = { loginForm, handleSubmit, handleChange }

  return (
    <div>
      <LoginForm {...loginProps} />
    </div>
  )
}
export default Login

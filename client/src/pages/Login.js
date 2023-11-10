import React, { useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import { LOGIN_FORM, SUBMIT_LOGIN_FORM } from '../store/types'
import { BASE_URL } from '../globals'

const iState = {
  loginForm: {
    email: '',
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
    default:
      return state
  }
}

const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const loginForm = state.loginForm
  const history = useNavigate()

  const handleChange = (e) => {
    dispatch({
      type: LOGIN_FORM,
      payload: { name: e.target.name, value: e.target.value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}/auth/login`, state.loginForm)
      dispatch({
        type: SUBMIT_LOGIN_FORM,
        payload: true
      })
      history('/home')
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

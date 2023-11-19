import React, { useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import axios from 'axios'
import { BASE_URL } from '../globals'
const { REGISTER_FORM, SUBMIT_REGISTER_FORM } = require('../store/types')

const iState = {
  registerForm: {
    username: '',
    password: '',
    handle: '',
    email: '',
    avatarUrl: ''
  },
  submittedRegister: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case REGISTER_FORM:
      return {
        ...state,
        registerForm: {
          ...state.registerForm,
          [action.payload.name]: action.payload.value
        }
      }
    case SUBMIT_REGISTER_FORM:
      return { ...iState, submittedRegister: action.payload }
    default:
      return state
  }
}

const Register = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const registerForm = state.registerForm
  console.log(registerForm)
  const history = useNavigate()
  const handleChange = (e) => {
    dispatch({
      type: REGISTER_FORM,
      payload: { name: e.target.name, value: e.target.value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}/auth/register`, state.registerForm)
      dispatch({
        type: SUBMIT_REGISTER_FORM,
        payload: true
      })
      history('/login')
    } catch (error) {
      throw error
    }
  }

  const registerProps = { registerForm, handleSubmit, handleChange }
  return (
    <div>
      <RegisterForm {...registerProps} />
    </div>
  )
}
export default Register

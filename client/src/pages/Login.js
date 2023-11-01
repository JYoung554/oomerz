import React, { useState } from 'react'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import { BASE_URL } from '../globals'

const Login = (props) => {
  const [loginForm, handleLoginForm] = useState({ email: '', password: '' })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, loginForm)
      localStorage.setItem('token', res.data.token)
      handleLoginForm({ email: '', password: '' })
      console.log(res)
    } catch (error) {
      throw error
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    handleLoginForm({ ...loginForm, [name]: value })
  }

  const loginProps = { ...loginForm, handleSubmit, handleChange }

  return (
    <div>
      <LoginForm {...loginProps} />
    </div>
  )
}
export default Login

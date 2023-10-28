import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'

const Login = (props) => {
  const [loginForm, handleLoginForm] = useState({ username: '', password: '' })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios(`${BASE_URL}/auth/login`, loginForm)
      localStorage.setItem('token', res.data.token)
      handleLoginForm({ username: '', password: '' })
    } catch (error) {
      throw error
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    handleLoginForm({ ...loginForm, [name]: value })
  }

  return (
    <div>
      <LoginForm />
    </div>
  )
}
export default Login

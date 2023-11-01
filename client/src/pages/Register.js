import React, { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import axios from 'axios'
import { BASE_URL } from '../globals'
const Register = (props) => {
  const [registerForm, handleRegisterForm] = useState({
    username: '',
    password: '',
    handle: '',
    email: '',
    avatarUrl: ''
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, registerForm)
      handleRegisterForm({
        username: '',
        password: '',
        handle: '',
        email: '',
        avatarUrl: ''
      })
      console.log(res)
    } catch (error) {
      throw error
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    handleRegisterForm({ ...registerForm, [name]: value })
  }

  const registerProps = { registerForm, handleSubmit, handleChange }

  return (
    <div>
      <RegisterForm {...registerProps} />
    </div>
  )
}
export default Register

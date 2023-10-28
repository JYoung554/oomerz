import React from 'react'
import RegisterForm from '../components/RegisterForm'


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
    } catch (error) {
      throw error
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    handleRegisterForm({ ...registerForm, [name]: value })
  }

  return (
    <div>
      <RegisterForm />
    </div>
  )
}
export default Register

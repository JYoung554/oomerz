import React from 'react'

const LoginForm = (props) => {
  return (
    <div>
      <form>
        <h3>Login</h3>
        <input type="text" name="Username" placeholder="Username"></input>
        <input type="text" name="password" placeholder="Password"></input>
      </form>
    </div>
  )
}
export default LoginForm

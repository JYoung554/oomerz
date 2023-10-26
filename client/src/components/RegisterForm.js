import React from 'react'

const registerForm = (props) => {
  return (
    <div>
      <h3>Register</h3>
      <form>
        <input type="text" name="username" placeholder="Username"></input>
        <input type="text" name="password" placeholder="Password"></input>
        <input type="text" name="handle" placeholder="Handle"></input>
        <input type="text" name="avatarUrl" placeholder="AvatarUrl"></input>
      </form>
    </div>
  )
}
export default registerForm

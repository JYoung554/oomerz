import React from 'react'

const registerForm = (props) => {
  return (
    <div class="main-container">
      <h3>Register</h3>
      <form onSubmit={(e) => props.handleSubmit(e)}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={props.registerForm.username}
          onChange={(e) => props.handleChange(e)}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={props.registerForm.email}
          onChange={(e) => props.handleChange(e)}
        ></input>
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={props.registerForm.password}
          onChange={(e) => props.handleChange(e)}
        ></input>
        <input
          type="text"
          name="handle"
          placeholder="Handle"
          value={props.registerForm.handle}
          onChange={(e) => props.handleChange(e)}
        ></input>
        <input
          type="text"
          name="avatarUrl"
          placeholder="AvatarUrl"
          value={props.registerForm.avatarUrl}
          onChange={(e) => props.handleChange(e)}
        ></input>
        <button class="home-button">Register</button>
      </form>
    </div>
  )
}
export default registerForm

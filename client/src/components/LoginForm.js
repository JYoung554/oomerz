import React from 'react'

const LoginForm = (props) => {
  return (
    <div class="main-container">
      <form onSubmit={(e) => props.handleSubmit(e)}>
        <h3>Login</h3>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={props.loginForm.email}
          onChange={(e) => props.handleChange(e)}
        ></input>
        <input
          type="text"
          name="handle"
          placeholder="Handle"
          value={props.loginForm.handle}
          onChange={(e) => props.handleChange(e)}
        ></input>

        <input
          type="text"
          name="password"
          placeholder="Password"
          value={props.loginForm.password}
          onChange={(e) => props.handleChange(e)}
        ></input>
        <button class="home-button">Login</button>
      </form>
    </div>
  )
}
export default LoginForm

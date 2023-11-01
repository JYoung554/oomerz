import React from 'react'

const LoginForm = (props) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          props.handleSubmit(e)
        }}
      >
        <h3>Login</h3>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            props.handleChange(e)
          }}
        ></input>
        <input
          type="text"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            props.handleChange(e)
          }}
        ></input>
        <button>Login</button>
      </form>
    </div>
  )
}
export default LoginForm

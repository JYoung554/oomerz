import { NavLink, useNavigate } from 'react-router-dom'

const PublicNav = (props) => {
  return (
    <div>
      <NavLink to="/register">
        <button class="logOut-button">Register</button>
      </NavLink>
      <NavLink to="/login">
        <button class="logOut-button">Login</button>
      </NavLink>
      <NavLink to="/users">
        <button class="logOut-button">Users</button>
      </NavLink>
    </div>
  )
}

export default PublicNav

import { NavLink, useNavigate } from 'react-router-dom'

const LoginNav = (props) => {
  const { currentUser, currentUserData } = props
  const history = useNavigate()
  const profile = currentUser.handle

  return (
    <div>
      <NavLink to={`/home/${profile}`}>
        <button
          class="logOut-button"
          onClick={() => history(`/home/${profile}`)}
        >
          Home
        </button>
      </NavLink>

      <NavLink to="/users">
        <button class="logOut-button" onClick={() => history('/users')}>
          Users
        </button>
      </NavLink>

      <NavLink to="/login">
        <button class="logOut-button" onClick={() => props.logOut()}>
          Log Out
        </button>
      </NavLink>

      <NavLink to="/settings">
        <button class="logOut-button" onClick={() => history('/settings')}>
          Settings
        </button>
      </NavLink>
    </div>
  )
}
export default LoginNav

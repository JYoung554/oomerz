import axios from 'axios'
import LoginNav from '../components/LoginNav'
import PublicNav from '../components/PublicNav'

const Nav = (props) => {
  const { currentUser, currentUserData, appDispatch } = props

  return props.authenticated ? (
    <div>
      <LoginNav
        currentUser={props.currentUser}
        currentUserData={props.currentUserData}
        logOut={props.logOut}
      ></LoginNav>
    </div>
  ) : (
    <PublicNav></PublicNav>
  )
}
export default Nav

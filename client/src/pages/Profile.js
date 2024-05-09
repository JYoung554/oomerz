import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../globals'
import {
  PROFILE_CARDS_BY_HANDLE,
  SET_CURRENT_USER_DATA,
  SET_PROFILE_CARD,
  SET_CURRENT_USER,
  SET_USER
} from '../store/types'

const Profile = (props) => {
  const {
    dispatch,
    profileCardsByHandle,
    selectedUser,
    currentUser,
    appDispatch,
    currentUserData
  } = props

  const [users, setUsers] = useState([])
  const [profileCards, setProfileCards] = useState([])
  const getAllProfileCards = async () => {
    const res = await axios.get(
      `${BASE_URL}/home/profileCard/${selectedUser.id}`,
      `${BASE_URL}/home`
    )
    console.log(selectedUser.id)
    console.log(currentUserData.ProfileCard)
    setProfileCards(res.data)
  }

  const getAllUsers = async () => {
    const res = await axios.get(`${BASE_URL}/home`)

    dispatch({ type: SET_CURRENT_USER_DATA, payload: res.data })
    dispatch({ type: SET_PROFILE_CARD, payload: res.data })

    console.log(res.data)
    setUsers(res.data)
  }

  useEffect(() => {
    getAllProfileCards()
    getAllUsers()
  }, [selectedUser])

  return (
    <div>
      {users.length ? (
        <div class="profile-list-container">
          {profileCards.map((profileCard, idx) => (
            <div class="profile-main-container" key={`${profileCard.id}`}>
              <p>{profileCard.User.handle}</p>
              <img
                src={profileCard.User.avatarUrl}
                alt={`Your avatar ${profileCard.User.handle}`}
              ></img>
              <p>{profileCard.caption}</p>
              <p>{profileCard.triviaTotal}</p>
              <p>{profileCard.genStatus}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>'no users.'</p>
      )}
    </div>
  )
}
export default Profile

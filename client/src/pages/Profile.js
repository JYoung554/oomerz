import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../globals'
import {
  PROFILE_CARDS_BY_HANDLE,
  SET_CURRENT_USER_DATA,
  SET_CURRENT_USER,
  SET_USER
} from '../store/types'



const Profile = (props) => {
  const {
    dispatch,
    profileCardsByHandle,
    selectedUser,
    currentUser,
    currentUserData
  } = props

  const [users, setUsers] = useState([])
  const [profileCards, setProfileCards] = useState([users])
  const getAllProfileCards = async () => {
    const res = await axios.get(
      `${BASE_URL}/home/profileCard/${selectedUser.id}`,
      `${BASE_URL}/home`
    )

    console.log(res.data)
    setProfileCards(res.data)
  }

  const getAllUsers = async () => {
    const res = await axios.get(`${BASE_URL}/home`)

    console.log(res.data)
    setUsers(res.data)
  }

  useEffect(() => {
    getAllUsers()
    getAllProfileCards()
  }, [selectedUser])

  return (
    <div>
      {users.length ? (
        <div>
          {profileCards.map((profileCard, idx) => (
            <div key={`${profileCard.id}`}>
              <p>{profileCard.User.handle}</p>
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

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

import TriviaCard from '../components/TriviaCard'

const Profile = (props) => {
  const {
    dispatch,
    profileCardsByHandle,
    selectedUser,
    currentUser,
    currentUserData
  } = props
  const [users, setUsers] = useState([])
  const [profileCards, setProfileCards] = useState([])
  const getAllProfileCards = async () => {
    const res = await axios.get(
      `${BASE_URL}/home/profileCard/${selectedUser.id}`
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
    getAllProfileCards()
    getAllUsers()
  }, [])

  return (
    <div>
      <div>
        {profileCards.map((profileCard, id) => (
          <div key={`${id}`}>
            <h2>{profileCard.caption}</h2>
            <p>{profileCard.genStatus}</p>
            <p>{profileCard.triviaTotal}</p>
          </div>
        ))}
      </div>
      {users.map((user, id) => (
        <div key={`${id}`}>
          <h2>{user.handle}</h2>
        </div>
      ))}
    </div>
  )
}
export default Profile

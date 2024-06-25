import React from 'react'
import axios from 'axios'
import { useState, useEffect, useReducer } from 'react'
import { BASE_URL } from '../globals'
import {
  PROFILE_CARDS_BY_HANDLE,
  SET_CURRENT_USER_DATA,
  SET_PROFILE_CARD,
  SET_CURRENT_USER,
  SET_USER,
  SET_USER_PROFILES,
  SET_USER_PROFILE_CARDS
} from '../store/types'

const iState = {
  users: [],
  profileCards: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_PROFILES:
      return { ...state, users: action.payload }
    case SET_USER_PROFILE_CARDS:
      return { ...state, profileCards: action.payload }
    default:
      return state
  }
}

const Profile = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const {
    profileCardsByHandle,
    selectedUser,
    currentUser,
    appDispatch,
    currentUserData
  } = props
  const [profile, setProfile] = useState('')
  const [profileCards, setProfileCards] = useState([])
  const [users, setUsers] = useState([])
  const getAllProfileCards = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/home/profileCard/${selectedUser.id}`
      )
      setProfileCards(res.data)
      console.log(setProfileCards)

      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/home`)
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }

    console.log()
  }

  useEffect(() => {
    getAllProfileCards()
    getAllUsers()
    console.log(profileCards)
  }, [selectedUser])

  return (
    <div>
      {users.length ? (
        <div class="profile-list-container">
          {profileCards.map((profileCard, idx) => (
            <div class="profile-main-container" key={`${profileCard.id}`}>
              <p>{profileCard.User.handle}</p>
              <button class="profile-button-list">
                <img
                  class="profile-img-list"
                  src={profileCard.User.avatarUrl}
                  alt={`Your avatar ${profileCard.User.handle}`}
                ></img>
              </button>
              <p>{profileCard.caption}</p>
              <p>{profileCard.genStatus}</p>
              <p>{profileCard.triviaTotal}</p>
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

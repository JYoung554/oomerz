import React from 'react'
import axios from 'axios'
import { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
import {
  PROFILE_CARDS_BY_HANDLE,
  SET_CURRENT_USER_DATA,
  SET_PROFILE_CARD,
  SET_CARD,
  SET_CURRENT_USER,
  SET_USER,
  SET_USER_PROFILES
} from '../store/types'

const iState = {
  users: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_PROFILES:
      return { ...state, users: action.payload }
    default:
      return state
  }
}

const Profile = (props) => {
  const history = useNavigate()
  const [state, dispatch] = useReducer(reducer, iState)
  const {
    profileCardsByHandle,
    profileCard,
    selectedUser,
    currentUser,
    appDispatch,
    currentUserData,
    currentUserSelectedProfileCard
  } = props
  const [profile, setProfile] = useState('')
  //const [profileCards, setProfileCards] = useState([])
  const [users, setUsers] = useState([])

  const getAllProfileCards = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/home/profileCard/${profileCard.id}`
      )
      appDispatch({ type: SET_CARD, payload: res.data })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/home/${currentUser.handle}`)
      if (!currentUserData && res.data) {
        appDispatch({ type: SET_CURRENT_USER_DATA, payload: res.data })
        appDispatch({ type: SET_CARD, payload: res.data.ProfileCard })
        appDispatch({ type: SET_PROFILE_CARD, payload: res.data })
        appDispatch({ type: SET_USER, payload: res.data })
      }
    } catch (error) {
      console.log(error)
    }

    console.log(currentUserData)
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

  const backToHome = async () => {
    history(`/home/${currentUser.handle}`)
  }

  const deleteProfileCard = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`${BASE_URL}/home/${currentUser.handle}`)
      history(`/home/${currentUser.handle}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
    getAllProfileCards()
    getAllUsers()
    console.log(profileCard)
  }, [selectedUser])

  return (
    <div>
      <button
        onClick={(e) => {
          backToHome(e)
        }}
      >
        Back
      </button>
      {users.length ? (
        <div class="profile-list-container">
          {profileCard.map((profile, idx) => (
            <div class="profile-main-container" key={`${profile.id}`}>
              <p>{profile.User.handle}</p>
              <button class="profile-button-list">
                <img
                  class="profile-img-list"
                  src={profile.User.avatarUrl}
                  alt={`Your avatar ${profile.User.handle}`}
                ></img>
              </button>
              {console.log(profile.User.avatarUrl)}
              <p>{profile.caption}</p>
              <p>{profile.genStatus}</p>
              <p>{profile.triviaTotal}</p>
            </div>
          ))}
          <div class="profile-main-container" key={`${currentUserData.id}`}>
            <p>{currentUserData.handle}</p>
            <button class="profile-button-list">
              <img
                class="profile-img-list"
                src={currentUserData.avatarUrl}
                alt={`Your avatar ${currentUserData.handle}`}
              ></img>
            </button>
            {currentUserData.ProfileCard !== null ? (
              <div>
                <p>{currentUserData.ProfileCard.caption}</p>
                <p>{currentUserData.ProfileCard.genStatus}</p>
                <p>{currentUserData.ProfileCard.triviaTotal}</p>
              </div>
            ) : (
              <p>No Profile</p>
            )}
          </div>
          <div>
            <button
              onClick={(e) => {
                deleteProfileCard(e)
              }}
            >
              Delete Profile Card
            </button>
          </div>
        </div>
      ) : (
        <p>'no users.'</p>
      )}
    </div>
  )
}
export default Profile

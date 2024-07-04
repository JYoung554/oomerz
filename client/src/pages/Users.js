import React from 'react'
import axios from 'axios'
import { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
import {
  PROFILE_CARDS_BY_HANDLE,
  SET_CURRENT_USER_DATA,
  SET_PROFILE_CARD,
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

const Users = (props) => {
  const history = useNavigate()
  const [state, dispatch] = useReducer(reducer, iState)
  const { selectedUser, currentUser } = props
  const [profile, setProfile] = useState('')
  const [profileCards, setProfileCards] = useState([])
  const [users, setUsers] = useState([])

  const getUsers = async () => {
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

  useEffect(() => {
    getUsers()
    console.log(profileCards)
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
          {users.map((user, idx) => (
            <div class="profile-main-container" key={`${user.id}`}>
              <p>{user.handle}</p>
              <button class="profile-button-list">
                <img
                  class="profile-img-list"
                  src={user.avatarUrl}
                  alt={`Your avatar ${user.handle}`}
                ></img>
              </button>
              {console.log(user.avatarUrl)}
              <p>{user.caption}</p>
              <p>{user.genStatus}</p>
              <p>{user.triviaTotal}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>'no users.'</p>
      )}
    </div>
  )
}
export default Users

import React from 'react'
import axios from 'axios'
import { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
import { SET_PROFILE_CARD, SET_CARD, SET_USER } from '../store/types'




const Profile = (props) => {
  const history = useNavigate()
  const {
    profileCard,
    selectedUser,
    currentUser,
    appDispatch,
    currentUserData
  } = props

  const getAllProfileCards = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/home/profileCard/${profileCard.id}`
      )
      appDispatch({ type: SET_CARD, payload: res.data.ProfileCard })
    } catch (error) {
      console.log(error)
    }
  }

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/home/profileCard/${profileCard.id}`
      )
      if (!currentUserData && res.data) {
        appDispatch({ type: SET_CARD, payload: res.data.ProfileCard })
        appDispatch({ type: SET_PROFILE_CARD, payload: res.data })
        appDispatch({ type: SET_USER, payload: res.data })
      }
    } catch (error) {
      console.log(error)
    }

    console.log(currentUserData)
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
      <div class="profile-list-container">
        <div class="profile-main-container">
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
    </div>
  )
}
export default Profile

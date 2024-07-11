import { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SET_CURRENT_USER_DATA } from '../store/types'
import { UPDATE_AVATAR } from '../store/types'
import { BASE_URL } from '../globals'

const iState = {
  avatarUpdate: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_AVATAR:
      return { ...state, avatarUpdate: action.payload }
    default:
      return state
  }
}

const Settings = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const { currentUser, currentUserData, appDispatch } = props
  const history = useNavigate()

  const handleChange = async (e) => {
    dispatch({
      type: UPDATE_AVATAR,
      payload: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/home/user/${currentUser.handle}`,
        {
          avatarUrl: state.avatarUpdate
        }
      )
      const userInfo = res.data
      appDispatch({
        type: SET_CURRENT_USER_DATA,
        payload: userInfo,
        handle: userInfo.handle,
        avatarUrl: userInfo.avatarUrl
      })
      console.log(res.data)
      history(`/home/${currentUser.handle}`)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {}, [])

  return currentUser && currentUserData ? (
    <div>
      <p>Change Profile Picture</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="avatarUrl"
          type="text"
          placeholder="Enter Image Url"
          value={state.avatarUpdate}
          onChange={(e) => handleChange(e)}
        ></input>
      </form>
    </div>
  ) : (
    ''
  )
}
export default Settings

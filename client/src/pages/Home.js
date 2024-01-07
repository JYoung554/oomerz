import React from 'react'
import axios from 'axios'
import ProfileCard from '../components/ProfileCard'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Grid, Card, Icon, Image } from 'semantic-ui-react'
import { useState, useReducer, useEffect } from 'react'
import { BASE_URL } from '../globals'
const {
  SET_CURRENT_USER_DATA,
  SET_PROFILE,
  SET_USER,
  SET_PROFILE_CARD,
  GET_PROFILE_CARD,
  CAPTION_FORM,
  SUBMIT_CAPTION,
  PROFILE_CARDS_BY_HANDLE,
  SELECT_COMMENT
} = require('../store/types')

const iState = {
  users: [],
  captionForm: '',
  genStatus: '',
  triviaTotal: 0,
  clickedPostComment: false,
  submittedCaption: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case GET_PROFILE_CARD:
      return state
    case CAPTION_FORM:
      return { ...state, captionForm: action.payload }
    case SUBMIT_CAPTION:
      return { ...state, submittedCaption: action.payload }
    case SELECT_COMMENT:
      return { ...state, clickedPostComment: action.payload }
    default:
      return state
  }
}

const Home = (props) => {
  let { handle } = useParams()
  const history = useNavigate()
  const [state, dispatch] = useReducer(reducer, iState)
  const {
    currentUser,
    currentUserData,
    profileCard,
    profileCardsByHandle,
    selectedUser,
    appDispatch
  } = props
  const getProfile = async () => {
    try {
      console.log(state.captionForm)
      const res = await axios.get(`${BASE_URL}/home/${handle}`)
      if (!selectedUser && res.data) {
        appDispatch({ type: SET_USER, payload: res.data })
        appDispatch({
          type: PROFILE_CARDS_BY_HANDLE,
          payload: res.data.ProfileCards
        })
        console.log(currentUserData)
      } else if (selectedUser && selectedUser.handle !== res.data.handle) {
        appDispatch({ type: SET_USER, payload: res.data })
        appDispatch({
          type: PROFILE_CARDS_BY_HANDLE,
          payload: res.data.ProfileCards
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*const handleChange = (e) => {
    dispatch({
      type: CAPTION_FORM,
      payload: { name: e.target.name, value: e.target.value }
    })
  }*/
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/home/:handle`,
        profileCard.caption
      )
      if (!selectedUser && res.data) {
        appDispatch({ type: SET_USER, payload: res.data })
        appDispatch({
          type: PROFILE_CARDS_BY_HANDLE,
          payload: res.data.ProfileCards
        })
        console.log(selectedUser.id)
      } else if (selectedUser && selectedUser.handle !== res.data.handle) {
        appDispatch({ type: SET_USER, payload: res.data })
        appDispatch({
          type: PROFILE_CARDS_BY_HANDLE,
          payload: res.data.ProfileCards
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProfileCardsByHandle = async () => {
    const res = await axios.get(`${BASE_URL}/home/${selectedUser.handle}`)
    dispatch({ type: SET_PROFILE_CARD, payload: res.data.ProfileCards })
    history('/profile')
  }

  const targetProfileCard = async () => {
    const res = await axios.get(`${BASE_URL}/home/${selectedUser.id}}`)
  }

  const handleProfileCardSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(state.captionForm)
      const res = await axios.post(`${BASE_URL}/home/${selectedUser.id}`, {
        caption: state.captionForm,
        userId: selectedUser.id
      })
      dispatch({ type: SUBMIT_CAPTION, payload: true })
      dispatch({ type: SELECT_COMMENT, payload: !state.clickedPostComment })
      appDispatch({
        type: PROFILE_CARDS_BY_HANDLE,
        payload: [
          ...profileCardsByHandle,
          {
            id: res.data.id,
            caption: res.data.caption,
            genStatus: res.data.genStatus,
            triviaTotal: res.data.triviaTotal
          }
        ]
      })
      console.log(selectedUser)
    } catch (error) {
      console.log(error)
    }
  }
  /*const renderProfiles = () => {
    return currentUserData.Users.map((user, index) => (
      <div key={index}>
        <h2>{user.User.handle}</h2>
        <h2>{user.User.avatarUrl}</h2>
        <h2>{user.User.caption}</h2>
        <h2>{user.User.genStatus}</h2>
        <h2>{user.User.triviaTotal}</h2>
      </div>
    ))
  }
*/
  useEffect(() => {
    getProfile()
  }, [selectedUser, profileCardsByHandle])

  return currentUser && currentUserData ? (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Card>
            <button onClick={(e) => getProfileCardsByHandle(e)}>
              <p>{'https://imgur.com/'}</p>
            </button>
            <p>{currentUser.handle}</p>
            <p>{state.genStatus}</p>
            <p>{state.triviaTotal}</p>
            {state.clickedPostComment === false ? (
              <form onSubmit={(e) => handleProfileCardSubmit(e)}>
                <input
                  type="text"
                  name="captionForm"
                  placeholder="Type a caption"
                  value={state.captionForm}
                  onChange={(e) =>
                    dispatch({ type: CAPTION_FORM, payload: e.target.value })
                  }
                ></input>
                <p></p>
              </form>
            ) : (
              <p>{state.captionForm}</p>
            )}
          </Card>
        </Grid.Column>
      </Grid.Row>
      <button onClick={props.logOut}></button>
    </Grid>
  ) : (
    <div>
      <p>Hello</p>
      <button onClick={props.logOut}></button>
    </div>
  )
}
export default Home

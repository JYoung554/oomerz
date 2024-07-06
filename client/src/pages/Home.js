import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Grid, Card, Icon, Image } from 'semantic-ui-react'
import { useState, useReducer, useEffect } from 'react'
import { BASE_URL } from '../globals'

const {
  SET_CURRENT_USER_DATA,
  SET_USER,
  SET_PROFILE_CARD,
  ADD_CURRENT_USER_PROFILE_CARD,
  CAPTION_FORM,
  SUBMIT_CAPTION,
  PROFILE_CARDS_BY_HANDLE,
  SELECT_COMMENT,
  SET_USER_PROFILE_CARDS,
  UPDATE_PROFILE_CARD,
  SET_CURRENT_USER_SELECTED_PROFILE_CARD
} = require('../store/types')

const iState = {
  captionForm: '',
  clickedPostComment: false,
  profileCard: [],
  submittedCaption: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case CAPTION_FORM:
      return { ...state, captionForm: action.payload }
    case SUBMIT_CAPTION:
      return { ...state, submittedCaption: action.payload }
    case SET_USER_PROFILE_CARDS:
      return { ...state, profileCard: action.payload }
    case SELECT_COMMENT:
      return { ...state, clickedPostComment: action.payload }
    default:
      return state
  }
}

const Home = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const {
    currentUser,
    currentUserData,
    currentUserSelectedProfileCard,
    selectedProfileCard,
    profileCardsByHandle,
    selectedUser,
    logOut,
    appDispatch,
    genStatus
  } = props

  const history = useNavigate()

  const [profileCards, setProfileCards] = useState([])

  const getProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/home/${currentUser.handle}`)
      if (!currentUserData && res.data) {
        appDispatch({ type: SET_CURRENT_USER_DATA, payload: res.data })
        appDispatch({ type: SET_PROFILE_CARD, payload: res.data })
        appDispatch({ type: SET_USER, payload: res.data })
        console.log(profileCards)
      }
    } catch (error) {
      console.log(error)
    }

    console.log(currentUserData)
    console.log(selectedProfileCard)
  }

  console.log(getProfile())

  const getProfileCardsByHandle = async () => {
    const res = await axios.get(`${BASE_URL}/home/${currentUser.handle}`)
    dispatch({ type: SET_PROFILE_CARD, payload: res.data.ProfileCards })
    history('/profile')
  }

  const handleProfileCardSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(currentUserSelectedProfileCard.caption)
      const res = await axios.post(`${BASE_URL}/home/${currentUser.id}`, {
        caption: state.captionForm,
        genStatus: genStatus,
        triviaTotal: state.triviaTotal,
        userId: currentUser.id
      })
      dispatch({ type: SUBMIT_CAPTION, payload: true })
      dispatch({ type: SELECT_COMMENT, payload: !state.clickedPostComment })
      appDispatch({ type: ADD_CURRENT_USER_PROFILE_CARD, payload: res.data })
      appDispatch({
        type: SET_CURRENT_USER_SELECTED_PROFILE_CARD,
        payload: {
          ...currentUserSelectedProfileCard,
          caption: state.captionForm
        }
      })
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
      console.log(currentUserData.ProfileCard)
      console.log(currentUserData)
    } catch (error) {
      console.log(error)
    }
  }

  const updateCaption = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `${BASE_URL}/home/profileCard/${selectedUser.id},`,
        {
          caption: state.captionForm
        }
      )
      dispatch({ type: SUBMIT_CAPTION, payload: true })
      dispatch({ type: SELECT_COMMENT, payload: !state.clickedPostComment })
      appDispatch({ type: ADD_CURRENT_USER_PROFILE_CARD, payload: res.data })
      const profileCard = res.data
      console.log(profileCard)
      appDispatch({
        type: UPDATE_PROFILE_CARD,
        payload: {
          profileCard: profileCard,
          id: profileCard.id,
          caption: profileCard.caption
        }
      })
      appDispatch({
        type: SET_CURRENT_USER_SELECTED_PROFILE_CARD,
        payload: {
          ...currentUserSelectedProfileCard,
          caption: state.captionForm
        }
      })
      appDispatch({
        type: SET_USER_PROFILE_CARDS,
        payload: {
          ...profileCard,
          caption: state.captionForm
        }
      })
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
      console.log(currentUserData.ProfileCard)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteUser = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`${BASE_URL}/home/${currentUser.handle}`)
      logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const getTrivia = async () => {
    console.log(currentUserData.ProfileCard)
    console.log(currentUserSelectedProfileCard)
    history(`/trivia`)
  }

  const renderProfileForm = () => {
    return currentUserSelectedProfileCard.caption === undefined ? (
      <form class="form-style" onSubmit={(e) => handleProfileCardSubmit(e)}>
        <input
          type="text"
          name="captionForm"
          placeholder="Type a caption"
          value={state.captionForm}
          onChange={(e) =>
            dispatch({ type: CAPTION_FORM, payload: e.target.value })
          }
        ></input>
      </form>
    ) : currentUserSelectedProfileCard.caption != undefined ? (
      <form class="form-style" onSubmit={(e) => updateCaption(e)}>
        <input
          type="text"
          name="captionForm"
          placeholder="Type a caption"
          value={state.captionForm}
          onChange={(e) =>
            dispatch({ type: CAPTION_FORM, payload: e.target.value })
          }
        ></input>
      </form>
    ) : (
      'An error has occured'
    )
  }

  useEffect(() => {
    getProfile()
    console.log(currentUserSelectedProfileCard.caption)
    console.log(currentUserSelectedProfileCard)
  }, [currentUserData, state.profileCard])

  return currentUser && currentUserData ? (
    <div class="main-container">
      <h2 class="title-banner">Oomerz</h2>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Card>
              <button
                class="profile-button"
                onClick={(e) => getProfileCardsByHandle(e)}
              >
                <img
                  class="profile-img"
                  src={currentUserData.avatarUrl}
                  alt={`Your Avatar ${currentUserData.handle}`}
                ></img>
              </button>
              <p></p>
              <p></p>
              {currentUserData.ProfileCard !== null ? (
                <p>{currentUserSelectedProfileCard.caption}</p>
              ) : (
                'Type a Caption here!'
              )}

              <p>Generation: {currentUserSelectedProfileCard.genStatus}</p>
              <p>Trivia : {currentUserSelectedProfileCard.triviaTotal}</p>
            </Card>
          </Grid.Column>
        </Grid.Row>
        {renderProfileForm()}
        <button
          class="logOut-button"
          onClick={(e) => {
            getTrivia(e)
          }}
        >
          Start Trivia
        </button>
      </Grid>

      <div>
        <button
          onClick={(e) => {
            deleteUser(e)
          }}
        >
          Delete User
        </button>
      </div>
    </div>
  ) : (
    <div>
      <button class="logOut-button" onClick={props.logOut}>
        Log Out
      </button>
    </div>
  )
}
export default Home

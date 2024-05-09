import React from 'react'
import axios from 'axios'
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
  SET_TRIVIA_TOTAL,
  PROFILE_CARDS_BY_HANDLE,
  SELECT_COMMENT,
  UPDATE_PROFILE_CARD,
  SET_CURRENT_USER_SELECTED_PROFILE_CARD
} = require('../store/types')

const iState = {
  users: [],
  captionForm: '',
  clickedPostComment: false,
  submittedCaption: false
}

const reducer = (state, action) => {
  switch (action.type) {
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
  const [userCard, setUserCard] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [profileCards, setProfileCards] = useState([])
  const [state, dispatch] = useReducer(reducer, iState)
  const {
    currentUser,
    currentUserData,
    currentUserSelectedProfileCard,
    profileCard,
    profileCardsByHandle,
    selectedUser,
    appDispatch,
    triviaTotal,
    genStatus
  } = props
  const getProfile = async () => {
    try {
      console.log(state.captionForm)
      const res = await axios.get(`${BASE_URL}/home/${currentUser.handle}`)
      if (!currentUserData && res.data) {
        appDispatch({ type: SET_CURRENT_USER_DATA, payload: res.data })
        appDispatch({ type: SET_PROFILE_CARD, payload: res.data.ProfileCard })

        //appDispatch({ type: GET_PROFILE_CARD, payload: res.data })
      }
      if (!selectedUser && res.data) {
        appDispatch({ type: SET_USER, payload: res.data })
        appDispatch({
          type: PROFILE_CARDS_BY_HANDLE,
          payload: res.data.ProfileCards
        })
        //appDispatch({ type: GET_PROFILE_CARD, payload: res.data })
        console.log(res.data)
      } else if (selectedUser && selectedUser.handle !== res.data.handle) {
        appDispatch({ type: SET_USER, payload: res.data })
        appDispatch({
          type: PROFILE_CARDS_BY_HANDLE,
          payload: res.data.ProfileCards
        })
        console.log(res.data)
      }
      console.log(currentUserData)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllProfileCards = async () => {
    const res = await axios.get(
      `${BASE_URL}/home/profileCard/${selectedUser.id}`
    )
    appDispatch({ type: GET_PROFILE_CARD, payload: res.data })
    //appDispatch({ type: SET_CURRENT_USER_DATA, payload: res.data })
    //appDispatch({ type: SET_PROFILE_CARD, payload: res.data })
    setProfileCards(res.data.ProfileCard)
    console.log(res.data.ProfileCard)
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
  const handleUpdating = () => {
    setIsUpdating(!isUpdating)
  }

  const handleProfileCardSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(state.captionForm)
      const res = await axios.post(`${BASE_URL}/home/${currentUser.id}`, {
        caption: state.captionForm,
        genStatus: genStatus,
        triviaTotal: state.triviaTotal,
        userId: selectedUser.id
      })
      dispatch({ type: SUBMIT_CAPTION, payload: true })
      dispatch({ type: SELECT_COMMENT, payload: !state.clickedPostComment })
      appDispatch({ type: GET_PROFILE_CARD, payload: res.data.ProfileCard })
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
      console.log(currentUserData)
    } catch (error) {
      console.log(error)
    }
  }

  const updateProfileCardSubmit = async (req, res) => {
    try {
      const res = await axios.put(`${BASE_URL}/home/${selectedUser.id}`, {
        caption: state.caption,
        genStatus: genStatus,
        triviaTotal: triviaTotal
      })
      console.log(res.data[1][0])
      const profileCard = res.data[1][0]
      appDispatch({
        type: UPDATE_PROFILE_CARD,
        payload: { profileCard: profileCard, id: profileCard.id }
      })
      appDispatch({
        type: SET_CURRENT_USER_SELECTED_PROFILE_CARD,
        payload: {
          ...currentUserSelectedProfileCard,
          caption: state.caption,
          genStatus: genStatus,
          triviaTotal: triviaTotal
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const renderProfile = async () => {
    return (
      <div>
        {state.clickedPostComment && renderProfileForm()}
        <button
          onClick={() =>
            dispatch({
              type: SELECT_COMMENT,
              payload: !state.clickedPostComment
            })
          }
        >
          {state.clickedPostComment ? 'Cancel' : 'click'}
        </button>
      </div>
    )
  }

  const getTrivia = async () => {
    console.log(currentUser)
    history(`/trivia`)
  }

  const renderProfileForm = () => {
    return (
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
    )
  }

  const renderProfileAttributes = () => {
    return currentUserData.ProfileCard.map((profileCard, idx) => (
      <div class="profile-main-container" key={`${profileCard.id}`}>
        <p>{profileCard.caption}</p>
        <p>{profileCard.triviaTotal}</p>
        <p>{profileCard.genStatus}</p>
      </div>
    ))
  }

  useEffect(() => {
    getProfile()
    //getAllProfileCards()
  }, [selectedUser, profileCardsByHandle, currentUser, currentUserData])

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
              <p>{currentUserData.handle}</p>
              <p>{currentUserData}</p>
              <p>Generation {currentUserData}</p>
              <p>Trivia : {currentUserData}</p>
            </Card>
          </Grid.Column>
          {userCard.caption !== '' ? (
            <button class="home-button" onClick={(e) => getTrivia(e)}>
              Start Trivia
            </button>
          ) : (
            <p>{'Type a caption to get started!'}</p>
          )}
        </Grid.Row>

        <button class="logOut-button" onClick={props.logOut}>
          Log Out
        </button>
      </Grid>
      {renderProfileForm()}
      {renderProfile()}
      {renderProfileAttributes()}
    </div>
  ) : (
    <div>
      <p>Hello</p>
      <button class="logOut-button" onClick={props.logOut}>
        Log Out
      </button>
    </div>
  )
}
export default Home

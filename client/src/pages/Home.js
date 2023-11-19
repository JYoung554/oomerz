import React from 'react'
import axios from 'axios'
import ProfileCard from '../components/ProfileCard'
import { Button, Grid, Card, Icon, Image } from 'semantic-ui-react'
import { useState, useReducer, useEffect } from 'react'
import { BASE_URL } from '../globals'
const {
  SET_CURRENT_USER_DATA,
  PROFILE_CARD,
  GET_PROFILE_CARD
} = require('../store/types')

const iState = {
  users: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_DATA:
      return { ...state }
    case PROFILE_CARD:
      return state
    case GET_PROFILE_CARD:
      return state
    default:
      return state
  }
}

const Home = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)
  const { currentUser, currentUserData, appDispatch } = props

  const getProfile = async () => {
    try {
      console.log(currentUser.handle)
      const res = await axios.get(`${BASE_URL}/home/${currentUser.handle}`)
      if (!currentUserData && res.data) {
        appDispatch({ type: SET_CURRENT_USER_DATA, payload: res.data })
        console.log(res.data)
      }
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
  }, [currentUserData])

  return currentUser && currentUserData ? (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Card>
            <p>{currentUser.username}</p>
            <ProfileCard />
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

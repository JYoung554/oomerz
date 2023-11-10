import React from 'react'
import ProfileCard from '../components/ProfileCard'
import { Button, Grid, Card, Icon, Image } from 'semantic-ui-react'
import { useState } from 'react'

const Home = (props) => {
  const [profileForm, handleProfileForm] = useState({
    username: '',
    avatarUrl: '',
    caption: '',
    genStatus: '',
    triviaTotal: ''
  })

  const profileFormProps = { profileForm }
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Card>
            <ProfileCard {...profileFormProps} />
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
export default Home

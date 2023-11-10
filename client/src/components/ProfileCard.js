import React from 'react'


const ProfileCard = (props) => {
  return (
    <div>
      <div>
        <h1>{props.profileForm.username}</h1>
        <div></div>
        <div>{props.profileForm.avatarUrl}A</div>
        <p>{props.profileForm.caption}A</p>
        <p>{props.profileForm.genStatus}</p>
        <p>{props.profileForm.triviaTotal}</p>
      </div>
    </div>
  )
}
export default ProfileCard

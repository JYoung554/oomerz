import React from 'react'


const ProfileCard = (props) => {
  return (
    <div>
      <div>
        <h1>{props.handle}</h1>
        <div></div>
        <div>{props.avatarUrl}</div>
        <p>{props.caption}</p>
        <p>{props.genStatus}</p>
        <p>{props.triviaTotal}</p>
      </div>
    </div>
  )
}
export default ProfileCard

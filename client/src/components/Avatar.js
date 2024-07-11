const Avatar = (props) => {
  const { currentUser, currentUserData } = props
  return currentUser && currentUserData ? (
    <div class="profile-list-avatar-container">
      <div class="profile-main-avatar-container">
        <p>{currentUserData.handle}</p>
        <button class="profile-avatar-button">
          <img
            class="profile-img-avatar-list"
            src={currentUserData.avatarUrl}
            alt={`Your avatar ${currentUserData.handle}`}
          ></img>
        </button>

        {console.log(currentUserData)}
      </div>
    </div>
  ) : (
    ''
  )
}

export default Avatar

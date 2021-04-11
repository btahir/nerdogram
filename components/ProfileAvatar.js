function ProfileAvatar({ avatar, size }) {
  const imageSize = size === 'small' ? 'h-8 w-8' : "h-24 w-24 sm:h-32 sm:w-32"
  return (
    <img
      src={avatar}
      alt="profile-avatar"
      className={`rounded-full object-cover ${imageSize}`}
    />
  )
}

export default ProfileAvatar

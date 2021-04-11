import ProfileAvatar from './ProfileAvatar'
import Icon from './Icon'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'

function UserCardSection({ avatarUrl, username, openMore, showDelete }) {
  return (
    <div className="h-16 w-full flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <ProfileAvatar avatar={avatarUrl} size="small" />
        <Link href={`/profile/${username}`}>{username}</Link>
      </div>
      {showDelete ?
        <button
          aria-label="delete-post"
          className="focus:outline-none"
          onClick={openMore}
        >
          <Icon icon={faTrashAlt} width='w-4' height='h-4' />
        </button>
        :
        null
      }
    </div>
  )
}

export default UserCardSection

import { useState } from 'react'
import Icon from './Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { shortenText } from '@/utils/helpers'
import Link from 'next/link'
import { data } from 'autoprefixer'

function CardActionsSection({ postId, postDate, githubUrl, description, likes, setLikes }) {
  const [liked, setLiked] = useState(false)

  async function handleLike() {
    const updatedlikes = likes + 1
    if (!liked) {
      setLiked(true)
      setLikes(updatedlikes)
      try {
        const body = { postId, updatedlikes }
        await fetch('/api/update-like', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-center h-10">
        <div className="pt-1 pb-2 space-x-4 w-30">
          <button
            className="focus:outline-none"
            aria-label="like"
            onClick={handleLike}
          >
            {liked ?
              <FontAwesomeIcon className={`w-6 h-6 inline-flex text-red-500`} icon={fasHeart} />
              :
              <Icon icon={faHeart} width='w-6' height='h-6' />
            }
          </button>
          <Link passHref href={`/posts/${postId}`}>
            <a>
              <Icon icon={faComment} width='w-6' height='h-6' />
            </a>
          </Link>
          <a
            className="cursor-pointer"
            type="button" 
            aria-label="github-link"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={faGithub} width='w-6' height='h-6' />
          </a>
        </div>
        <div className="font-medium">
          {likes} likes
        </div>
      </div>
      <div className="py-2">
        {shortenText(description, 100)}
      </div>
      <div className="uppercase text-xs text-gray-400">
        {new Date(postDate).toDateString()}
      </div>
    </div>
  )
}

export default CardActionsSection

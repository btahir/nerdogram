import { useState } from 'react'
import UserCardSection from './UserCardSection'
import CardActionsSection from './CardActionsSection'

function InstaCard({ data }) {
  const [postLikes, setPostLikes] = useState(data.likes)

  return (
    <div className="w-full bg-white max-w-lg shadow-sm sm:my-4 sm:rounded-sm mx-auto">
      <UserCardSection
        avatarUrl={data.author.image}
        username={data.author.name}
      />
      <img
        src={data.imageUrl}
        alt="card-preview"
        className="h-96 sm:h-120 w-full"
      />
      <CardActionsSection
        postDate={data.createdAt}
        description={data.description}
        likes={postLikes}
        setLikes={setPostLikes}
        postId={data.id}
        githubUrl={data.repository}
      />
    </div>
  )
}

export default InstaCard

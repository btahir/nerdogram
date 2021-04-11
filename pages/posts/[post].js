import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'
import UserCardSection from '@/components/UserCardSection'
import CardActionsSection from '@/components/CardActionsSection'
import CardCommentSection from '@/components/CardCommentSection'
import PostComment from '@/components/PostComment'
import { useRouter } from 'next/router'
import prisma from '@/lib/prisma'

function PostPage({ post, session }) {
  const router = useRouter()
  const [image, setImage] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [postId, setPostId] = useState('')
  const [postAuthorName, setPostAuthorName] = useState('')
  const [postDate, setPostDate] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [postLikes, setPostLikes] = useState(10)
  const [postComments, setPostComments] = useState([])

  useEffect(() => {
    const postData = JSON.parse(post)
    setImage(postData.imageUrl)
    setUserAvatar(postData.author.image)
    setUsername(postData.author.name)
    setPostDescription(postData.description)
    setPostId(postData.id)
    setPostAuthorName(postData.author.name)
    setPostComments(postData.comments)
    setPostDate(postData.createdAt)
    setPostLikes(postData.likes)
    setGithubUrl(postData.repository)
  }, [])

  function openMore() {
    toggleModal()
  }

  function toggleModal() {
    setShowModal(!showModal)
  }

  async function deletePost() {
    try {
      const body = { postId, postAuthorName }
      await fetch('/api/delete-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteComment(commentId, commentAuthorName) {
    try {
      const body = { commentId, commentAuthorName }
      await fetch('/api/delete-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setPostComments(...[postComments.filter(c => c.id !== commentId)])
    } catch (error) {
      console.error(error)
    }
  }

  function addPostComment(newComment) {
    setPostComments([...postComments, {
      content: newComment,
      author: {
        name: session?.user?.name,
        image: session?.user?.image,
      }
    }])
  }

  return (
    <div className="">
      <div className="relative py-24 flex flex-col sm:flex-row justify-center items-stretch min-h-screen">
        {/* modal */}
        {showModal ?
          <div className="absolute inset-0 bg-white border border-gray-300 h-40 w-11/12 max-w-md m-auto rounded shadow flex flex-col justify-center items-center px-2">
            <p className="text-lg">Are you sure you want to delete this post?</p>
            <div className="space-x-4 mt-4">
              <button
                className="text-red-600 hover:bg-red-50 border border-red-600 font-semibold text-lg px-2 py-0.5 rounded focus:outline-none"
                onClick={() => deletePost()}
              >
                Delete
              </button>
              <button
                onClick={() => toggleModal()}
                className="text-gray-900 hover:bg-gray-50 border border-gray-900 font-medium text-lg px-2 py-0.5 rounded focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
          :
          null
        }
        <img
          src={image}
          className="w-full sm:w-2/3 max-w-2xl object-cover border border-gray-300 border-r-0"
        />
        <div className="w-full sm:w-1/3 max-w-md bg-white border border-gray-300 flex flex-col justify-between">
          <div>
            <UserCardSection
              avatarUrl={userAvatar}
              username={username}
              openMore={openMore}
              showDelete={session?.user?.name === postAuthorName}
            />
            <div className="py-2 px-4 border-b border-gray-100 max-h-28 overflow-y-auto">
              {postDescription}
            </div>
          </div>
          <CardCommentSection
            comments={postComments}
            deleteComment={deleteComment}
            sessionUser={session?.user?.name}
          />
          <div className="border-t border-gray-100">
            <CardActionsSection 
              postDate={postDate} 
              description="" 
              likes={postLikes}
              setLikes={setPostLikes}
              postId={postId}
              githubUrl={githubUrl}
            />
            <PostComment
              postId={postId}
              addPostComment={addPostComment}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  const postId = parseInt(context.params.post)
  const postResponse = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      comments: {
        include: {
          author: true
        }
      }
    }
  })

  const post = JSON.stringify(postResponse)

  return { props: { post, session } }
}

export default PostPage

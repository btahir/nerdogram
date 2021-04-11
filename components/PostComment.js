import { useState } from 'react'

function PostComment({ postId, addPostComment }) {
  const [comment, setComment] = useState('')
  const [commented, setCommented] = useState(false)

  async function handlePostComment() {
    setCommented(true)
    try {
      const body = {
        postId,
        content: comment,
      }
      await fetch('/api/create-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })    
      addPostComment(comment)  
      setComment('')
    } catch (error) {
      console.error(error)
    }
  }

  const commentedButton = commented ? 'pointer-events-none opacity-50' : 'pointer-events-auto'
  
  return (
    <div className="border-t border-gray-100 p-4 flex justify-between">
      <input
        className="w-4/5 form-input focus:outline-none"
        placeholder="Add a comment..."
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className={`text-palette-primary font-medium focus:outline-none ${commentedButton}`}
        onClick={handlePostComment}
      >
        Post
    </button>
    </div>
  )
}

export default PostComment

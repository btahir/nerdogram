import ProfileAvatar from './ProfileAvatar'
import Icon from './Icon'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

function CardCommentSection({ comments, deleteComment, sessionUser }) {

  return (
    <div className="h-full max-h-120 overflow-y-auto">
      {
        comments.map((comment, index) => (
          <div className="flex justify-between p-4" key={index}>
            <div className="flex space-x-2">
              <ProfileAvatar avatar={comment?.author?.image} size="small" />
              <div className="font-medium">
                {comment?.author?.name}
              </div>
              <div>
                {comment?.content}
              </div>
            </div>
            {sessionUser === comment?.author?.name ?
              <button
                aria-label="delete-comment"
                className="focus:outline-none"
                onClick={() => deleteComment(comment.id, sessionUser)}
              >
                <Icon icon={faTrashAlt} width='w-4' height='h-4' />
              </button>
              :
              null
            }
          </div>
        ))
      }
    </div>
  )
}

export default CardCommentSection

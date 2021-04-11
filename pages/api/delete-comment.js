import { getSession } from 'next-auth/client'
import prisma from '@/lib/prisma'

export default async function handle(req, res) {
  const { commentId, commentAuthorName } = req.body

  const session = await getSession({ req })
  if (session?.user.name === commentAuthorName) {
    const deleteComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    })
    res.json(deleteComment)
  } else {
    res.json({status:'Not Authorized'})
  }
}
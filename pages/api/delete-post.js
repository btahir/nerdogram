import { getSession } from 'next-auth/client'
import prisma from '@/lib/prisma'

export default async function handle(req, res) {
  const { postId, postAuthorName } = req.body

  const session = await getSession({ req })
  if (session?.user.name === postAuthorName) {
    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    })
    res.json(deletePost)
  } else {
    res.json({status:'Not Authorized'})
  }
}

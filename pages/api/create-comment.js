import { getSession } from 'next-auth/client'
import prisma from '@/lib/prisma'

export default async function handle(req, res) {
  const { content, postId } = req.body

  const session = await getSession({ req })
  const result = await prisma.comment.create({
    data: {
      content,
      post: { connect: { id: postId } },
      author: { connect: { name: session?.user?.name } },
    },
  })
  res.json(result)
}
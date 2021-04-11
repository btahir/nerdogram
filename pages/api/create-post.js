import { getSession } from 'next-auth/client'
import prisma from '@/lib/prisma'

export default async function handle(req, res) {
  const { imageUrl, repository, description } = req.body

  const session = await getSession({ req })
  const result = await prisma.post.create({
    data: {
      imageUrl,
      repository,
      description,
      likes: 10,
      author: { connect: { name: session?.user?.name } },
    },
  })
  res.json(result)
}

import prisma from '@/lib/prisma'

export default async function handle(req, res) {
  const { postId, updatedlikes } = req.body

  const updatePost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likes: updatedlikes,
    },
  })
  res.json(updatePost)
}

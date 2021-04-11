import { getSession } from 'next-auth/client'
import prisma from '@/lib/prisma'

export default async function handle(req, res) {
  const { updatedBio } = req.body

  const session = await getSession({ req })
  const updateUser = await prisma.user.update({
    where: {
      name: session.user.name,
    },
    data: {
      bio: updatedBio,
    },
  })
  res.json(updateUser)
}

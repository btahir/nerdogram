import { useEffect, useState } from 'react'
import prisma from '@/lib/prisma'
import NerdCard from '@/components/NerdCard'

function IndexPage({ feed }) {
  const [feedData, setFeedData] = useState([])
  useEffect(() => {
    setFeedData( JSON.parse(feed) )
  }, [])

  return (
    <div className="mx-auto max-w-4xl mt-12 py-4">
      <h1 className="py-4 sm:py-6 text-center font-extrabold text-2xl sm:text-3xl text-palette-primary">Nerd Feed</h1>
      <div className="w-full">
        {feedData.map((item, index) => (
          <NerdCard
            key={index}
            data={item}
          />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const feedResponse = await prisma.post.findMany({
    take: 10,
    orderBy: [
      {
        createdAt: 'desc'
      }
    ],
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
  })
  const feed = JSON.stringify(feedResponse)
  return { props: { feed } }
}

export default IndexPage

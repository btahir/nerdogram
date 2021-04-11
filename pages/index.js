import { useEffect, useState } from 'react'
import prisma from '@/lib/prisma'
import NerdCard from '@/components/NerdCard'

function IndexPage({ feed }) {
  const [feedData, setFeedData] = useState([])
  useEffect(() => {
    setFeedData( JSON.parse(feed) )
  }, [])

  return (
    <div className="mx-auto max-w-4xl mt-12 py-4 flex justify-center">
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

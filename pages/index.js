import { useEffect, useState } from 'react'
import prisma from '@/lib/prisma'
import NerdCard from '@/components/NerdCard'
import SearchBar from '@/components/SearchBar'

function IndexPage({ feed }) {
  const [feedData, setFeedData] = useState([])
  useEffect(() => {
    setFeedData(JSON.parse(feed))    
  }, [])

  console.log(feedData)

  return (
    <div className="mx-auto max-w-4xl mt-12 py-4">
      <h1 className="py-4 sm:py-6 text-center font-extrabold text-3xl sm:text-4xl text-gray-900">Nerd Feed</h1>
      <SearchBar />
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

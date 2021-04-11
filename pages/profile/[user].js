import { useState, useEffect } from 'react'
import SEO from '@/components/SEO'
import NerdStat from '@/components/NerdStat'
import ProfileAvatar from '@/components/ProfileAvatar'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/client'
import { shortenText } from '@/utils/helpers'
import Link from 'next/link'

function ProfilePage({ user, session }) {
  const pageTitle = `Profile | ${process.env.siteTitle}`
  const [username, setUserName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [bioModal, setBioModal] = useState('')
  const [bio, setBio] = useState('')
  const [posts, setPosts] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    const userData = JSON.parse(user)
    setUserName(userData.name)
    setAvatar(userData.image)
    setBio(userData.bio)
    setPosts(userData.posts)
  }, [])

  async function handleSubmit() {
    const updatedBio = shortenText(bioModal, 200)
    setBio(updatedBio)
    try {
      const body = { updatedBio }
      await fetch('/api/update-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      toggleModal()
    } catch (error) {
      console.error(error)
    }
  }

  function toggleModal() {
    setShowEditModal(!showEditModal)
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 py-6 sm:py-8 relative min-h-screen">
      <SEO title={pageTitle} />
      {/* modal */}
      <div className={showEditModal ? "absolute inset-0 w-full h-full flex justify-center items-center z-20" : "hidden"}>
        <div className="h-48 w-5/6 max-w-lg mx-auto my-auto rounded bg-white z-30">
          <div className="flex flex-col justify-center items-center space-y-4 max-w-md w-5/6 mx-auto h-full">
            <textarea
              rows="3"
              className="w-full form-textarea border border-gray-300 rounded p-2"
              placeholder="Your Bio (Max: 200 Characters)"
              type="text"
              onChange={(e) => setBioModal(e.target.value)}
            />
            <div className="flex justify-center w-full space-x-4">
              <button
                className="py-1 px-2 bg-palette-primary rounded text-white focus:outline-none"
                onClick={handleSubmit}
              >
                Submit
            </button>
              <button
                className="py-1 px-2 bg-palette-primary rounded text-white focus:outline-none"
                onClick={toggleModal}
              >
                Cancel
            </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 grid gap-4 grid-cols-5 auto-rows-max sm:auto-rows-min">
        <div className="col-start-1 col-span-2 sm:col-span-1 m-auto">
          <ProfileAvatar avatar={avatar} />
        </div>
        <div className="text-sm sm:text-base col-start-3 col-span-3 sm:col-span-4 m-auto sm:ml-0">
          <div className="flex space-x-8 items-baseline mb-2 sm:mb-4">
            <h1 className="font-semibold">{username}</h1>
            {username === session?.user?.name ?
              <button
                className="px-2 py-1 border border-gray-300 rounded-sm focus:outline-none"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </button>
              :
              <button>Follow</button>
            }
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <NerdStat num={97} stat="posts" />
            <NerdStat num={705} stat="followers" />
            <NerdStat num={12} stat="following" />
          </div>
        </div>
        <p className="col-start-1 col-span-5 px-4">
          {bio}
        </p>
      </div>
      <div className="flex flex-wrap py-4">
        {posts.map((item, index) => (
          <Link key={index} passHref href={`/posts/${item.id}`}>
          <a className="w-1/3 cursor-pointer">
            <img
              src={item.imageUrl}
              alt="post-preview"
              className="h-32 sm:h-64 md:h-72 w-full p-0.5 sm:p-1 object-cover rounded-sm row-span-1 col-span-1"
            />
          </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  const response = await prisma.user.findUnique({
    where: { name: context.params.user },
    select: {
      name: true,
      image: true,
      bio: true,
      posts: true,
    },
  })

  const user = JSON.stringify(response)

  return { props: { user, session } }
}

export default ProfilePage

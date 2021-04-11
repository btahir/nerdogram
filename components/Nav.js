import Icon from './Icon'
import Link from 'next/link'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'

function Nav() {
  const router = useRouter()
  const [session, loading] = useSession()

  return (
    <header className="fixed top-0 w-full z-20 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4 py-3">
        <Link href="/" passHref>
          <a className="focus:outline-none cursor-pointer">
            <h1 className="flex items-center no-underline">
              <img height="40" width="100" alt="logo" className="object-contain" src="/icon.svg" />
            </h1>
          </a>
        </Link>
        <div className="flex items-center space-x-6">
          {session ?
            <>
              <Link passHref href="/create">
                <a>
                  <Icon icon={faPlusSquare} width="w-6" height="h-6" />
                </a>
              </Link>
              <button className="focus:outline-none" aria-label="signin" onClick={() => signOut()}>
                <Icon icon={faSignOutAlt} width="w-6" height="h-6" />
              </button>
              <button
                aria-label="profile"
                onClick={() => router.push(`/profile/${session.user.name}`)}
                className="focus:outline-none"
              >
                <img
                  src={session.user.image}
                  alt="profile-avatar"
                  className="h-6 w-6 rounded-full"
                />
              </button>
            </>
            :
            <button className="focus:outline-none" aria-label="signout" onClick={() => router.push('api/auth/signin')}>
              <Icon icon={faSignInAlt} width="w-6" height="h-6" />
            </button>
          }
        </div>
      </div>
    </header >
  )
}

export default Nav

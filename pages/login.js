import { useState } from 'react'
import SEO from '@/components/SEO'
import LoginHeader from '@/components/LoginHeader'
import SignInForm from '@/components/SignInForm'
import SignUpForm from '@/components/SignUpForm'

// import { signIn, signOut, useSession } from 'next-auth/client'


function LoginPage() {
  const pageTitle = `Login | ${process.env.siteTitle}`
  // const [session, loading] = useSession()

  // const toggleIsSigningIn = () => {
  //   setIsSigningIn(!isSigningIn)
  // }

  return (
    <div className="container mx-auto min-h-screen pt-12 sm:pt-40">
      <SEO title={pageTitle} />
      {/* {!session && <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>}
      {session && <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>} */}
    </div>
  )
}

export default LoginPage

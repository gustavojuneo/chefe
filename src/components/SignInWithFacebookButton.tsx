'use client'
import { signIn } from 'next-auth/react'

import facebookLogo from '@/assets/images/facebook-logo.svg'
import Image from 'next/image'

export function SignInWithFacebook() {
  const handleSignIn = async () => {
    await signIn('facebook')
  }

  return (
    <button
      className="flex justify-center items-center gap-2 rounded border-black border-2 py-2 px-3"
      onClick={handleSignIn}
    >
      <Image
        src={facebookLogo}
        alt="Continue com Facebook"
        width={30}
        height={30}
      />
      Continue com Facebook
    </button>
  )
}

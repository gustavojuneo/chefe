'use client'
import { signIn } from 'next-auth/react'

import googleLogo from '@/assets/images/google-logo.svg'
import Image from 'next/image'

export function SignInWithGoogleButton() {
  const handleSignIn = async () => {
    await signIn('google')
  }

  return (
    <button
      className="flex justify-center items-center gap-2 rounded border-black border-2 py-2 px-3"
      onClick={handleSignIn}
    >
      <Image
        src={googleLogo}
        alt="Continue com Google"
        width={30}
        height={30}
      />
      Continue com Google
    </button>
  )
}

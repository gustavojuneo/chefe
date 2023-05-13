import { getServerSession } from 'next-auth/next'

import { SignInWithFacebook } from '@/components/SignInWithFacebookButton'
import { SignInWithGoogleButton } from '@/components/SignInWithGoogleButton'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

interface PageProps {
  searchParams: {
    callbackUrl?: string
  }
}

export default async function SignIn({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  const { callbackUrl } = searchParams

  if (session) {
    if (callbackUrl) {
      redirect(callbackUrl)
    } else {
      redirect('/application')
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full max-w-[375px] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-zinc-800 mb-6">
          Entre no Chefe
        </h1>
        <div className="mb-4 text-base text-red-400" />
        <div className="w-full flex flex-col justify-center gap-2">
          <SignInWithGoogleButton />
          <SignInWithFacebook />
        </div>
      </div>
    </div>
  )
}

'use client'
import { SignInWithFacebook } from '@/components/SignInWithFacebookButton'
import { SignInWithGoogleButton } from '@/components/SignInWithGoogleButton'
import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import Image from 'next/image'

export default function Profile() {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="flex flex-col justify-center gap-2">
        {session?.user ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={session?.user?.image ?? ''}
                alt={session?.user?.name ?? ''}
                width={50}
                height={50}
                className="rounded-full"
              />
              <h1 className="text-zinc-800 text-2xl">{session?.user?.name}</h1>
            </div>
            <button
              className="mt-20 flex gap-2 items-center text-zinc-800"
              onClick={handleLogout}
            >
              <LogOut />
              Deslogar
            </button>
          </div>
        ) : (
          <>
            <SignInWithGoogleButton />
            <SignInWithFacebook />
          </>
        )}
      </div>
    </div>
  )
}

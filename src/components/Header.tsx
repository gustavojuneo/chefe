'use client'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const session = useSession()

  const user = session?.data?.user
  const status = session?.status
  const isLoading = status === 'loading'

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <header className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        {isLoading ? (
          <div className="animate-pulse flex gap-4">
            <div className="rounded-full bg-slate-200 w-[60px] h-[60px]"></div>
            <div className="flex flex-col justify-center gap-2">
              <span className="block bg-slate-200 w-[100px] h-[16px] rounded" />
              <span className="block bg-slate-200 w-[120px] h-[24px] rounded" />
            </div>
          </div>
        ) : (
          <>
            <Link href="/application/profile">
              <Image
                src={
                  user?.image ??
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232'
                }
                alt={user?.name ?? 'Convidado'}
                width={60}
                height={60}
                className="rounded-full"
              />
            </Link>
            <div className="flex flex-col justify-center">
              <span>Bem vindo,</span>
              <span className="font-bold text-lg">
                {user?.name ?? 'Convidado'}
              </span>
            </div>
          </>
        )}
      </div>
      <button
        className="flex gap-2 items-center text-zinc-800 disabled:opacity-40"
        onClick={handleLogout}
        disabled={isLoading || status === 'unauthenticated'}
      >
        <LogOut />
      </button>
    </header>
  )
}

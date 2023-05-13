'use client'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const session = useSession()
  if (!session.data) return null

  const { user } = session.data

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <header className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link href="/application/profile">
          <Image
            src={user.image}
            alt={user.name}
            width={60}
            height={60}
            className="rounded-full"
          />
        </Link>
        <div className="flex flex-col justify-center">
          <span>Bem vindo,</span>
          <span className="font-bold text-lg">{user.name}</span>
        </div>
      </div>
      <button
        className="flex gap-2 items-center text-zinc-800"
        onClick={handleLogout}
      >
        <LogOut />
      </button>
    </header>
  )
}

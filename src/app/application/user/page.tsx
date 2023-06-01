'use client'
import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function User() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="flex flex-col justify-center gap-2 h-full">
        <div className="flex flex-col items-center">
          {isLoading ? (
            <div className="animate-pulse flex flex-col items-center gap-2">
              <div className="w-[100px] h-[100px] bg-slate-200 rounded-full"></div>
              <div className="block w-[200px] h-[32px] bg-slate-200 rounded" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Image
                src={session?.user?.image ?? ''}
                alt={session?.user?.name ?? ''}
                width={100}
                height={100}
                className="rounded-full"
              />
              <h1 className="text-zinc-800 text-2xl font-semibold">
                {session?.user?.name}
              </h1>
            </div>
          )}
          <nav className="flex flex-col items-center mt-10">
            <ul className="flex flex-col items-center gap-2">
              <li className="text-zinc-800 hover:text-zinc-600 transition font-medium">
                <Link
                  className="block p-2"
                  href={`${pathname}/your-informations`}
                >
                  Suas informações
                </Link>
              </li>
              <li className="p-2 cursor-not-allowed text-zinc-400 transition font-medium">
                Configurações
              </li>
            </ul>
          </nav>
          <button
            className="mt-20 flex gap-2 items-center text-zinc-800 hover:bg-zinc-200 p-2 rounded transition"
            onClick={handleLogout}
          >
            <LogOut />
            Deslogar
          </button>
        </div>
      </div>
      <span className="text-center">
        Feito com ❤️ por{' '}
        <strong>
          <a href="https://gustavojuneo.dev" target="_blank" rel="noreferrer">
            Gustavo
          </a>
        </strong>{' '}
        e{' '}
        <strong>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/anna-serrasantos/"
            rel="noreferrer"
          >
            Anna
          </a>
        </strong>
      </span>
    </div>
  )
}

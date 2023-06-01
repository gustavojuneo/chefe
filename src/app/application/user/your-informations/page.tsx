'use client'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Form } from './components/Form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function YourInformations() {
  const { data: session, status } = useSession()
  const user = session?.user ?? ({} as User)
  const isLoading = status === 'loading' && !user.name

  return (
    <div className="w-full h-full flex flex-col justify-center h-full">
      <div className="flex flex-col gap-2 h-full">
        <header className="mb-20">
          <Link
            href="/application/user"
            className="text-zinc-800 hover:text-zinc-500 transition"
          >
            <ArrowLeft size={24} />
          </Link>
        </header>
        <div className="flex flex-col items-center">
          {isLoading ? (
            <div className="animate-pulse flex flex-col items-center gap-2">
              <div className="w-[100px] h-[100px] bg-slate-200 rounded-full mb-2"></div>
              {/* <Button isLoading>Alterar foto</Button> */}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Image
                src={user.image}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              {/* <Button className="bg-zinc-400 mt-2" disabled>
                Alterar foto
              </Button> */}
            </div>
          )}
        </div>
        <Form user={user} isLoading={isLoading} />
      </div>
      {isLoading ? (
        <div className="animate-pulse flex justify-center">
          <span className="block w-[240px] h-[24px] bg-zinc-200 rounded" />
        </div>
      ) : (
        <span className="text-center">
          Feito com ❤️ por{' '}
          <strong className="text-zinc-800 hover:text-red-500 transition">
            <a href="https://gustavojuneo.dev" target="_blank" rel="noreferrer">
              Gustavo
            </a>
          </strong>{' '}
          e{' '}
          <strong className="text-zinc-800 hover:text-red-500 transition">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/anna-serrasantos/"
              rel="noreferrer"
            >
              Anna
            </a>
          </strong>
        </span>
      )}
    </div>
  )
}

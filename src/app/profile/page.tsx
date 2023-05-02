'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()

  const handleConnectWithGoogle = async () => {
    await signIn('google')
  }

  const handleConnectWithFacebook = async () => {
    await signIn('facebook')
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div>
      <h1>Hello</h1>
      <button
        className="bg-green-500 p-2 text-white"
        onClick={handleConnectWithGoogle}
      >
        Conectar com Google
      </button>
      <button
        className="bg-blue-500 p-2 text-white ml-2"
        onClick={handleConnectWithFacebook}
      >
        Conectar com Facebook
      </button>
      <h2 className="text-black text-lg">
        Usuario logado: {session?.user?.name}
      </h2>

      <button
        className="bg-green-500 p-2 text-white mt-20"
        onClick={handleLogout}
      >
        Deslogar
      </button>
    </div>
  )
}

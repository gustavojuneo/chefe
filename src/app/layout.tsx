import '../styles/global.css'

import { Inter } from 'next/font/google'
import { Home, List, User } from 'lucide-react'

import ActiveLink from '@/components/ActiveLink'
import { Main } from './main'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Chefe',
    template: '%s | Chefe',
  },
  robots: {
    index: true,
    follow: true,
  },
  description: 'An application to get random values from list.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="bg-zinc-50 h-screen w-screen flex justify-center">
        <div className="flex flex-col w-full h-full">
          <Main>{children}</Main>
          <footer className="mt-auto w-full flex justify-center bg-zinc-100">
            <div className="w-full max-w-[375px]">
              <nav className="w-ful">
                <ul className="flex gap-24 text-lg justify-center">
                  <li className="pt-3 pb-6">
                    <ActiveLink
                      className="text-zinc-700 flex flex-col items-center"
                      href="/"
                    >
                      <Home size={24} />
                      Home
                    </ActiveLink>
                  </li>
                  <li className="pt-3 pb-6">
                    <ActiveLink
                      className="text-zinc-700 flex flex-col items-center"
                      href="/lists"
                    >
                      <List size={24} />
                      Lists
                    </ActiveLink>
                  </li>
                  <li className="pt-3 pb-6">
                    <ActiveLink
                      className="text-zinc-700 flex flex-col items-center"
                      href="/profile"
                    >
                      <User size={24} />
                      Profile
                    </ActiveLink>
                  </li>
                </ul>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

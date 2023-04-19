import '../styles/global.css'

import { Inter } from 'next/font/google'
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
      <body className="bg-[#08070B] h-screen w-screen flex justify-center">
        <div className="flex flex-col w-full h-full">
          <Main>{children}</Main>
          <footer className="mt-auto w-full">
            <nav className="w-full bg-zinc-900">
              <ul className="flex gap-4 text-lg justify-center">
                <li className="p-2">
                  <ActiveLink className="text-gray-200" href="/">
                    Home
                  </ActiveLink>
                </li>
                <li className="p-2">
                  <ActiveLink className="text-gray-200" href="/lists">
                    Lists
                  </ActiveLink>
                </li>
                <li className="p-2">
                  <ActiveLink className="text-gray-200" href="/profile">
                    Profile
                  </ActiveLink>
                </li>
              </ul>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  )
}

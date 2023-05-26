import 'react-toastify/dist/ReactToastify.css'
import { Home, List, User } from 'lucide-react'

import ActiveLink from '@/components/ActiveLink'
import { Main } from './main'

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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Main>{children}</Main>
      <footer
        id="root-footer"
        className="mt-auto w-full flex justify-center bg-zinc-100 fixed bottom-0"
      >
        <div className="w-full max-w-[375px]">
          <nav className="w-ful">
            <ul className="flex gap-24 text-lg justify-center">
              <li className="pt-3 pb-6">
                <ActiveLink
                  className="text-zinc-700 flex flex-col items-center"
                  href="/application"
                >
                  <Home size={24} />
                  Home
                </ActiveLink>
              </li>
              <li className="pt-3 pb-6">
                <ActiveLink
                  className="text-zinc-700 flex flex-col items-center"
                  href="/application/lists"
                >
                  <List size={24} />
                  Lists
                </ActiveLink>
              </li>
              <li className="pt-3 pb-6">
                <ActiveLink
                  className="text-zinc-700 flex flex-col items-center"
                  href="/application/profile"
                >
                  <User size={24} />
                  Profile
                </ActiveLink>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  )
}

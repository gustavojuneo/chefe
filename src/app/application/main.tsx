'use client'

import { ListsProvider } from '@/contexts/ListsContext'
import { SessionProvider } from 'next-auth/react'
import { useRef } from 'react'

export const Main = ({ children }: any) => {
  const mainRef = useRef<HTMLElement>(null)

  return (
    <SessionProvider>
      <ListsProvider>
        <main
          ref={mainRef}
          className="w-full h-full flex justify-center overflow-x-hidden overflow-y-auto px-4"
        >
          <div className="w-full max-w-[375px] py-10">{children}</div>
        </main>
      </ListsProvider>
    </SessionProvider>
  )
}

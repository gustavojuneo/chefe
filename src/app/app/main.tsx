'use client'

import { ListsProvider } from '@/contexts/ListsContext'
import { SessionProvider } from 'next-auth/react'

export const Main = ({ children }: any) => (
  <SessionProvider>
    <ListsProvider>
      <main className="w-full h-full flex justify-center overflow-y-auto mb-[88px]">
        <div className="w-full max-w-[375px] h-full py-10">{children}</div>
      </main>
    </ListsProvider>
  </SessionProvider>
)

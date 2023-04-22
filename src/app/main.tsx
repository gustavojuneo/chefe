'use client'

import { ListsProvider } from '@/contexts/ListsContext'

export const Main = ({ children }: any) => (
  <ListsProvider>
    <main className="w-full h-full flex justify-center overflow-y-auto mb-10">
      <div className="w-full max-w-[375px] h-full">{children}</div>
    </main>
  </ListsProvider>
)

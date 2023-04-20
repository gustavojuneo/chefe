'use client'

import { ListsProvider } from '@/contexts/ListsContext'

export const Main = ({ children }: any) => (
  <ListsProvider>
    <main className="w-full h-full">{children}</main>
  </ListsProvider>
)

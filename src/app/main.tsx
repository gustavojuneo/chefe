'use client'

import { ListsProvider } from '@/contexts/ListsContext'

export const Main = ({ children }: any) => (
  <ListsProvider>
    <main>{children}</main>
  </ListsProvider>
)

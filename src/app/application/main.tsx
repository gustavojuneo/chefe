'use client'

import { ListsProvider } from '@/contexts/ListsContext'
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const Main = ({ children }: any) => {
  const [footerHeight, setFooterHeight] = useState(84)

  useEffect(() => {
    const footer = document.getElementById('root-footer')
    setFooterHeight(footer?.clientHeight ?? 84)
  }, [])

  return (
    <SessionProvider>
      <ListsProvider>
        <main
          className={`w-full h-full flex justify-center overflow-x-hidden overflow-y-auto mb-[${footerHeight}] px-4`}
        >
          <div className="w-full max-w-[375px] h-full py-10">{children}</div>
        </main>
      </ListsProvider>
    </SessionProvider>
  )
}

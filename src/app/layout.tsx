import { Inter } from 'next/font/google'

import '../styles/global.css'
import { Toast } from '@/components/Toast'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="bg-zinc-50 h-screen w-screen flex justify-center">
        <Toast />
        <div className="flex flex-col w-full h-full">{children}</div>
      </body>
    </html>
  )
}

'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function ActiveLink({ children, href, className, ...rest }: any) {
  const pathname = usePathname()
  const customClass = clsx(className, {
    '!text-red-500': pathname === href,
    'hover:text-red-700': pathname !== href,
    transition: true,
  })

  return (
    <Link className={customClass} href={href} {...rest}>
      {children}
    </Link>
  )
}

export default ActiveLink

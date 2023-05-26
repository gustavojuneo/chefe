'use client'

import { Button } from '@/components/Button'
import clsx from 'clsx'
import { Share } from 'lucide-react'
import { usePathname } from 'next/navigation'

type ButtonProps = {
  listId: string
  showLabel?: boolean
  circle?: boolean
  isLoading?: boolean
  disabled?: boolean
}

export const ShareButton = ({
  listId,
  circle = true,
  showLabel = false,
  isLoading = false,
  disabled = false,
}: ButtonProps) => {
  const pathname = usePathname()

  const handleShareList = (listId?: string) => {
    const shareLink = `https://chefe.gustavojuneo.dev${pathname}/${listId}?usp=sharing`
    navigator.clipboard.writeText(shareLink)
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div
          className={clsx('p-2 flex items-center gap-2 bg-slate-200 border-2', {
            'rounded-full': circle,
            rounded: !circle,
          })}
        >
          <div className="w-[18px] h-[18px]"></div>
          {showLabel ? <div className="w-14 h-[20px]" /> : null}
        </div>
      </div>
    )
  }

  return (
    <Button
      circle={circle}
      className="bg-blue-400 hover:bg-blue-700"
      disabled={disabled}
      onClick={() => handleShareList(listId)}
    >
      <Share size={18} />
      {showLabel ? 'Share' : null}
    </Button>
  )
}

'use client'

import { Button as ButtonComponent } from '@/components/Button'
import clsx from 'clsx'
import { Share } from 'lucide-react'

type ButtonProps = {
  listId: string
  showLabel?: boolean
  circle?: boolean
  isLoading?: boolean
  disabled?: boolean
  onShare: (listId: string) => void
}

export const Button = ({
  listId,
  circle = true,
  showLabel = false,
  isLoading = false,
  disabled = false,
  onShare,
}: ButtonProps) => {
  const handleShareList = (listId: string) => {
    onShare(listId)
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
    <ButtonComponent
      circle={circle}
      className="bg-blue-400 hover:bg-blue-700"
      disabled={disabled}
      onClick={() => handleShareList(listId)}
    >
      <Share size={18} />
      {showLabel ? 'Share' : null}
    </ButtonComponent>
  )
}

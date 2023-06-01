'use client'

import { Button } from '@/components/Button'
import { useLists } from '@/hooks/useLists'
import clsx from 'clsx'
import { Trash } from 'lucide-react'

type ButtonProps = {
  listId: string
  showLabel?: boolean
  label?: string
  circle?: boolean
  isLoading?: boolean
  inListPage?: boolean
  disabled?: boolean
}

export const DeleteButton = ({
  listId,
  label = 'Delete',
  circle = true,
  showLabel = false,
  isLoading = false,
  inListPage = false,
  disabled = false,
}: ButtonProps) => {
  const { removeList } = useLists()

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
      className="bg-red-400 hover:bg-red-500 text-white"
      disabled={disabled}
      onClick={() => removeList(listId, inListPage)}
    >
      <Trash size={18} />
      {showLabel && label}
    </Button>
  )
}

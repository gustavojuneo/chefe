'use client'

import { Button } from '@/components/Button'
import { useLists } from '@/hooks/useLists'
import { Trash } from 'lucide-react'

type DeleteButtonProps = {
  listId: string
  itemId: string
  showLabel?: boolean
}

export const DeleteButton = ({
  listId,
  itemId,
  showLabel = false,
}: DeleteButtonProps) => {
  const { removeItemFromList } = useLists()

  return (
    <Button
      circle
      className="bg-red-400 hover:bg-red-500 text-white"
      onClick={() => removeItemFromList(listId, itemId)}
    >
      <Trash size={18} />
      {showLabel ? 'Delete' : null}
    </Button>
  )
}

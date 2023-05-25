'use client'

import { Button } from '@/components/Button'
import { Share } from 'lucide-react'

type ButtonProps = {
  showLabel?: boolean
}

export const ShareButton = ({ showLabel = false }: ButtonProps) => {
  return (
    <Button circle className="bg-blue-400 hover:bg-blue-700">
      <Share size={18} />
      {showLabel ? 'Share' : null}
    </Button>
  )
}

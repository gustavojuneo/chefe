import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

interface DialogTriggerProps {
  children: ReactNode
}

export const DialogTrigger = ({ children }: DialogTriggerProps) => {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>
}

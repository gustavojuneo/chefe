'use client'

import { CreateListForm } from '@/components/CreateListForm'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

export const CreateListModal = () => {
  const [opened, setOpened] = useState(false)

  const handleToggleModal = (open: boolean) => {
    setOpened(open)
  }

  return (
    <Dialog.Root open={opened} onOpenChange={handleToggleModal}>
      <Dialog.Trigger asChild>
        <button className="p-2 bg-white text-black">Abrir</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[320px] p-6 bg-zinc-400 rounded">
          <CreateListForm handleCloseModal={() => handleToggleModal(false)} />
          <Dialog.Close asChild>
            <button className="absolute right-2 top-1">X</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Plus, Pencil } from 'lucide-react'

import { CreateListForm, FormData } from '@/components/CreateListForm'

type Props = {
  defaultData?: FormData
  update?: boolean
}

export const CreateListModal = ({ defaultData, update = false }: Props) => {
  const [opened, setOpened] = useState(false)

  const handleToggleModal = (open: boolean) => {
    setOpened(open)
  }

  return (
    <Dialog.Root open={opened} onOpenChange={handleToggleModal}>
      <Dialog.Trigger asChild>
        <button className="p-2 bg-green-500 text-white font-medium rounded-md flex justify-center gap-2 items-center">
          {update ? (
            <>
              <Pencil size={18} />
              Atualizar
            </>
          ) : (
            <>
              Nova Lista
              <Plus />
            </>
          )}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[320px] p-6 bg-zinc-400 rounded">
          <CreateListForm
            handleCloseModal={() => handleToggleModal(false)}
            defaultData={defaultData}
            update={update}
          />
          <Dialog.Close asChild>
            <button className="absolute right-2 top-1">X</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

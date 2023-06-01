'use client'

// import * as Dialog from '@radix-ui/react-dialog'
import * as Dialog from '@/components/dialog'
import { useState } from 'react'
import { Plus, Pencil } from 'lucide-react'

import { CreateListForm, FormData } from '@/components/CreateListForm'
import clsx from 'clsx'

type Props = {
  defaultData?: FormData
  update?: boolean
  isLoading?: boolean
  disabled?: boolean
}

export const CreateListModal = ({
  defaultData,
  update = false,
  isLoading = false,
  disabled = false,
}: Props) => {
  const [opened, setOpened] = useState(false)
  const isDisabled = isLoading || disabled

  const handleToggleModal = (open: boolean) => {
    setOpened(open)
  }

  return (
    <Dialog.Root
      visible={opened}
      onOpenChange={(open) => (isDisabled ? () => {} : handleToggleModal(open))}
    >
      <Dialog.Trigger>
        {isLoading ? (
          <div className="animate-pulse">
            <div
              className={clsx(
                'p-2 flex items-center gap-2 bg-slate-200 border-2 h-full rounded',
              )}
            >
              <div className="w-[18px] h-[18px]"></div>
              {<div className="w-14 h-[20px]" />}
            </div>
          </div>
        ) : (
          <button
            disabled={isDisabled}
            className={clsx(
              'p-2 bg-green-500 text-white font-medium rounded-md flex justify-center gap-2 items-center',
              {
                'disabled:opacity-50': isDisabled,
              },
            )}
          >
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
        )}
      </Dialog.Trigger>
      <Dialog.Content title={update ? 'Atualizar lista' : 'Nova lista'}>
        <CreateListForm
          handleCloseModal={() => handleToggleModal(false)}
          defaultData={defaultData}
          update={update}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

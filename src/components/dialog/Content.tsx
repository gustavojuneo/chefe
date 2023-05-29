import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

interface DialogProps {
  children: ReactNode
  title: string
  hasClose?: boolean
}

export const Content = ({
  children,
  title = 'Compartilhando "filmes"',
  hasClose = true,
}: DialogProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/20" />
      <Dialog.Content
        className={clsx(
          'fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-3rem)] max-w-[512px] bg-zinc-50 p-6 rounded-xl min-h-[300px]',
          {
            'pt-4': hasClose || !!title,
          },
        )}
      >
        {(!!title || hasClose) && (
          <div className="flex justify-between items-center mb-4 gap-4">
            <h2 className="w-full font-bold text-2xl truncate">{title}</h2>
            {hasClose && (
              <Dialog.Close>
                <X size={24} />
              </Dialog.Close>
            )}
          </div>
        )}
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

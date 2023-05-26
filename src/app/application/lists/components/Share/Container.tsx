import { useLists } from '@/hooks/useLists'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { Check, ChevronDown, Link2, Lock } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

type ShareContainerProps = {
  listId: string | null
  opened: boolean
  onOpenChange: (opened: boolean) => void
}

export const ShareContainer = ({
  listId,
  opened = false,
  onOpenChange,
}: ShareContainerProps) => {
  const { getCurrentList, current, isGetting } = useLists()
  const pathname = usePathname()

  const handleShareList = () => {
    const isMobile = /iphone|ipod|android|ie|blackberry|fennec/.test(
      navigator.userAgent.toLowerCase(),
    )
    const shareLink = `https://chefe.gustavojuneo.dev${pathname}/${listId}?usp=sharing`

    if (isMobile && navigator.canShare?.()) {
      navigator?.share({
        url: shareLink,
      })
    } else {
      navigator.clipboard.writeText(shareLink)
    }
  }

  const handleChangeVisibility = (restricted: boolean) => {
    console.log(restricted)
  }

  useEffect(() => {
    if (current.id !== listId && listId) {
      getCurrentList(listId)
    }
  }, [current.id, listId, getCurrentList])

  return (
    <Dialog.Root open={opened} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20" />
        <Dialog.Content className="fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[512px] p-6 bg-zinc-50 rounded-xl">
          <header className="flex items-center mb-4">
            <h3 className="block flex-1 text-2xl font-semibold text-zinc-700">
              Compartilhe a lista
            </h3>
          </header>
          <div className="flex flex-col gap-4 mb-10">
            {isGetting && 'Carregando...'}
            <input
              type="text"
              placeholder="Adicione membros"
              className="w-full border-2 border-zinc-200 p-2 rounded outline-none placeholder:text-zinc-600 focus:border-red-500 focus:placeholder:text-red-400 peer transition"
            />
            <div className="text-zinc-700">
              <h3 className="mb-4 text-lg font-semibold">Acesso geral</h3>
              <div className="flex items-center gap-4">
                <span>
                  <Lock />
                </span>
                <div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="flex items-center text-sm font-medium p-2 rounded hover:bg-zinc-200 gap-2 transition">
                        Restrito <ChevronDown size={16} />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        align="start"
                        className={clsx([
                          'bg-zinc-50 shadow-md rounded py-2 transition',
                          'radix-side-bottom:animate-slideUpAndFade',
                        ])}
                      >
                        <DropdownMenu.Item
                          className="flex items-center hover:bg-zinc-200 px-4 cursor-pointer"
                          onClick={() =>
                            !current.restricted
                              ? handleChangeVisibility(true)
                              : () => {}
                          }
                        >
                          <span className="min-w-[24px] min-h-[24px] p-2 box-content text-red-500">
                            {current.restricted && <Check />}
                          </span>
                          Restrito
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          className="flex items-center hover:bg-zinc-200 px-4 cursor-pointer"
                          onClick={() =>
                            current.restricted
                              ? handleChangeVisibility(false)
                              : () => {}
                          }
                        >
                          <span className="min-w-[24px] min-h-[24px] p-2 box-content">
                            {!current.restricted && <Check />}
                          </span>
                          Qualquer pessoa com o link
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                  <small className="p-2">
                    Apenas as pessoas com acesso podem abrir com o link
                  </small>
                </div>
              </div>
            </div>
          </div>
          <footer className="flex items-center justify-between">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-3xl text-blue-500 border border-zinc-400 font-semibold"
              onClick={handleShareList}
            >
              <Link2 size={18} strokeWidth={3} /> Copiar Link
            </button>
            <button
              className="bg-blue-500 px-3 py-2 rounded-3xl text-zinc-100"
              onClick={() => onOpenChange(false)}
            >
              Concluído
            </button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

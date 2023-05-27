import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useLists } from '@/hooks/useLists'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { Check, ChevronDown, Clipboard, Globe, Lock, Send } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Spinner } from '@/components/Spinner'

type ShareContainerProps = {
  listId: string | null
  opened: boolean
  onOpenChange: (opened: boolean) => void
}

export const Container = ({
  listId,
  opened = false,
  onOpenChange,
}: ShareContainerProps) => {
  const { getCurrentList, current, isGetting, changeListVisibility } =
    useLists()
  const [copied, setCopied] = useState(false)
  // eslint-disable-next-line no-undef
  const resetCopy = useRef<NodeJS.Timeout>()

  const pathname = usePathname()

  const handleCopyLink = () => {
    const isMobile = /iphone|ipod|android|ie|blackberry|fennec/.test(
      navigator.userAgent.toLowerCase(),
    )
    const shareLink = `https://chefe.gustavojuneo.dev${pathname}/${listId}?usp=sharing`

    if (isMobile && navigator.canShare?.()) {
      navigator?.share({
        url: shareLink,
      })
    } else {
      navigator.clipboard.writeText(shareLink).then(() => setCopied(true))
    }
  }

  const handleChangeVisibility = async () => {
    if (listId) await changeListVisibility(listId)
  }

  const handleInviteMember = async (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      email: { value: string }
    }
    event.preventDefault()
    const { value: email } = target.email

    try {
      const response = await api.post(`/lists/${listId}/invite`, {
        data: { email },
      })
      const { data } = response

      if (data.message) {
        toast.success(data.message, {
          position: 'top-center',
          closeOnClick: true,
          theme: 'colored',
        })
      }
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err?.response?.data.message, {
          position: 'top-center',
          closeOnClick: true,
          theme: 'colored',
        })
      }
    }

    target.email.value = ''
  }

  useEffect(() => {
    if (current.id !== listId && listId) {
      getCurrentList(listId)
    }
  }, [current.id, listId, getCurrentList])

  useEffect(() => {
    if (copied) {
      resetCopy.current = setTimeout(() => setCopied(false), 3000)
    }

    return () => {
      clearTimeout(resetCopy.current)
    }
  }, [copied])

  return (
    <Dialog.Root open={opened} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20" />
        <Dialog.Content className="fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[512px] p-6 bg-zinc-50 rounded-xl min-h-[300px]">
          {isGetting ? (
            <Spinner />
          ) : (
            <>
              <header className="flex items-center mb-4">
                <h3 className="block flex-1 text-2xl font-semibold text-zinc-700 max-w-[90%] truncate">
                  Compartilhe {`"${current.name}"`}
                </h3>
              </header>
              <div className="flex flex-col gap-4 mb-10">
                <form
                  onSubmit={handleInviteMember}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    name="email"
                    placeholder="Adicione membros pelo e-mail"
                    className="flex-1 border-2 border-zinc-200 p-2 rounded outline-none placeholder:text-zinc-600 focus:border-red-500 focus:placeholder:text-red-400 peer transition"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded bg-green-400 hover:bg-green-600 text-zinc-50 flex items-center justify-center transition"
                  >
                    <Send />
                  </button>
                </form>
                <div className="text-zinc-700">
                  <h3 className="mb-4 text-lg font-semibold">Acesso geral</h3>
                  <div className="flex items-center gap-4">
                    <span
                      className={clsx('p-2 rounded-full', {
                        'bg-green-200': !current.restricted,
                        'bg-zinc-200': current.restricted,
                      })}
                    >
                      {current.restricted ? (
                        <Lock />
                      ) : (
                        <Globe className="stroke-green-800" />
                      )}
                    </span>
                    <div>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className="flex items-center text-sm font-medium p-2 rounded hover:bg-zinc-200 gap-2 transition">
                            {current.restricted
                              ? 'Restrito'
                              : 'Qualquer pessoa com o link'}
                            <ChevronDown size={16} />
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
                                  ? handleChangeVisibility()
                                  : () => {}
                              }
                            >
                              <span
                                className={clsx(
                                  'min-w-[24px] min-h-[24px] p-2 box-content',
                                  {
                                    'text-red-500': current.restricted,
                                  },
                                )}
                              >
                                {current.restricted && <Check />}
                              </span>
                              Restrito
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className="flex items-center hover:bg-zinc-200 px-4 cursor-pointer"
                              onClick={() =>
                                current.restricted
                                  ? handleChangeVisibility()
                                  : () => {}
                              }
                            >
                              <span
                                className={clsx(
                                  'min-w-[24px] min-h-[24px] p-2 box-content',
                                  {
                                    'text-red-500': !current.restricted,
                                  },
                                )}
                              >
                                {!current.restricted && <Check />}
                              </span>
                              Qualquer pessoa com o link
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                      <small className="p-2 block">
                        {current.restricted
                          ? 'Apenas as pessoas com acesso podem abrir com o link'
                          : 'Qualquer pessoa com o link pode se tornar um membro'}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="flex items-center justify-between">
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-3xl text-blue-500 border border-zinc-400 font-semibold transition"
                  onClick={handleCopyLink}
                >
                  {!copied ? (
                    <>
                      <Clipboard size={18} strokeWidth={3} /> Copiar Link
                    </>
                  ) : (
                    <>
                      <Check size={18} strokeWidth={3} /> Link copiado
                    </>
                  )}
                </button>
                <button
                  className="bg-blue-500 px-3 py-2 rounded-3xl text-zinc-100"
                  onClick={() => onOpenChange(false)}
                >
                  Concluído
                </button>
              </footer>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

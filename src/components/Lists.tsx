'use client'

import clsx from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, Share, Trash } from 'lucide-react'

import { ListDTO } from '@/dtos/ListDTO'
import { useLists } from '@/hooks/useLists'
import { CreateListModal } from './CreateListModal'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FormData } from './CreateListForm'

export const Lists = () => {
  const {
    lists,
    loadLists,
    removeList,
    removeItemFromList,
    getRandomItemFromList,
    lastChoosedItem,
    hasItensToChoose,
  } = useLists()
  const pathname = usePathname()
  const accordionContentClass = clsx([
    'overflow-hidden',
    'bg-zinc-100 rounded-b-md',
    'radix-state-open:animate-slideDown radix-state-closed:animate-slideUp',
  ])

  const handleGetRandomItem = (list: ListDTO) => {
    if (hasItensToChoose(list.id!)) {
      getRandomItemFromList(list)
    }
  }

  const handleRemoveList = (listId: string) => {
    removeList(listId)
  }

  const handleRemoveItemFromList = (listId: string, itemId: string) => {
    removeItemFromList(listId, itemId)
  }

  const handleShareList = (listId?: string) => {
    const shareLink = `${pathname}${listId}/invite`
    navigator.clipboard.writeText(shareLink)
  }

  const getListMessage = (listId: string) => {
    if (lastChoosedItem?.item.name) return lastChoosedItem?.item.name
    if (!hasItensToChoose(listId)) {
      return 'Não existe itens a serem escolhidos.'
    }
    return 'Sorteio não realizado'
  }

  useEffect(() => {
    if (lists.length === 0) {
      loadLists()
    }
  }, [lists.length, loadLists])

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-8">
      <ul className="w-full flex flex-col gap-2 items-center">
        <Accordion.Root
          type="single"
          collapsible
          defaultValue={lists[0]?.id}
          className="w-full bg-zinc-200 rounded-md overflow-hidden"
        >
          {lists?.map((list) => (
            <Accordion.Item key={list.id} value={list.id!}>
              <Accordion.Trigger className="w-full flex justify-between group  p-3 bg-red-400 text-zinc-100 font-medium">
                {list.name}
                <ChevronDown className="transform group-radix-state-open:rotate-180 transition duration-300" />
              </Accordion.Trigger>
              <Accordion.Content className={accordionContentClass}>
                <div className="flex gap-2 p-2 mt-1">
                  <button
                    className="p-2 flex bg-blue-400 hover:bg-blue-700 text-white rounded transition"
                    onClick={() => handleShareList(list.id)}
                  >
                    <Share size={22} />
                  </button>
                  <CreateListModal defaultData={list as FormData} update />
                  <button
                    className="ml-auto flex gap-2 p-2 text-sm transition items-center bg-red-500 hover:bg-red-600 rounded text-zinc-100"
                    onClick={() => handleRemoveList(list.id!)}
                  >
                    <Trash size={18} />
                    Excluir Lista
                  </button>
                </div>
                <div className="px-4 pt-6 pb-14 ">
                  <ul className="flex flex-col gap-2 divide-y max-h-[200px] overflow-auto">
                    {list?.itens?.map((item) => (
                      <li
                        key={item.id}
                        className={clsx(
                          'first:pt-0 pt-2 flex justify-between items-center',
                          {
                            'text-zinc-800': !item.choosed,
                            'text-green-500': item.choosed,
                          },
                        )}
                      >
                        {item.name}
                        <button
                          className="bg-red-500 hover:bg-red-600 transition p-2 text-zinc-100 rounded"
                          onClick={() => {
                            if (item.id) {
                              handleRemoveItemFromList(list.id!, item.id)
                            }
                          }}
                        >
                          <Trash size={18} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-col items-center">
                    <button
                      className="p-4 bg-green-500 rounded-lg hover:bg-green-300 transition text-white font-bold disabled:opacity-40"
                      onClick={() => handleGetRandomItem(list)}
                      disabled={!hasItensToChoose(list.id!)}
                    >
                      Realizar sorteio
                    </button>
                    <div className="mt-4 flex flex-col items-center">
                      <span className="text-zinc-800 text-sm mb-2 block">
                        Escolhido:
                      </span>
                      <span className="text-zinc-800 text-xl font-bold text-center">
                        {getListMessage(list.id!)}
                      </span>
                    </div>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </ul>
    </div>
  )
}

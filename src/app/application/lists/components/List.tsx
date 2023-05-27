'use client'

import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLists } from '@/hooks/useLists'
import { useSession } from 'next-auth/react'
import { SearchInput } from '@/components/SearchInput'
import * as Share from './Share'

export const List = () => {
  const { lists, isLoading: isListLoading } = useLists()
  const session = useSession()
  const pathname = usePathname()
  const [inputValue, setInputValue] = useState('')
  const [sharing, setSharing] = useState<{
    showModal: boolean
    listId: string | null
  }>({
    showModal: false,
    listId: null,
  })
  const filteredItens = lists.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase()),
  )
  const isLoading = session?.status === 'loading' || isListLoading

  const handleOnShareList = (opened: boolean, listId?: string) => {
    if (opened && listId) {
      setSharing({ showModal: opened, listId })
    } else {
      setSharing({ showModal: false, listId: null })
    }
  }

  return (
    <div className="w-full flex flex-col mt-10">
      <div className="w-full mb-4">
        <SearchInput
          isLoading={isLoading}
          onChangeValue={setInputValue}
          value={inputValue}
        />
      </div>
      <ul className="w-full flex flex-col pb-4 divide-y">
        {isLoading ? (
          Array.from(Array(5).keys()).map((index) => (
            <li
              key={index}
              className="py-3 px-2 flex items-center justify-between font-semibold animate-pulse"
            >
              <span className="block bg-slate-200 w-[100px] h-[16px]" />
              <div className="flex items-center gap-2">
                <div className="w-[34px] h-[34px] bg-slate-200 rounded-full" />
                <div className="w-[34px] h-[34px] bg-slate-200 rounded-full" />
              </div>
            </li>
          ))
        ) : (
          <>
            {filteredItens.map((list) => (
              <li
                key={list.id}
                className="py-3 px-2 flex items-center justify-between"
              >
                <Link
                  href={`${pathname}/${list.id}`}
                  className="flex flex-1 h-full items-center text-zinc-600 hover:text-zinc-800 transition"
                >
                  <span className="font-semibold">{list.name}</span>
                </Link>
                <div className="flex items-center gap-2">
                  <Share.Button
                    listId={list.id ?? ''}
                    onShare={(listId) => handleOnShareList(true, listId)}
                  />
                  <DeleteButton listId={list.id ?? ''} />
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
      <Share.Container
        listId={sharing.listId}
        opened={sharing.showModal}
        onOpenChange={handleOnShareList}
      />
    </div>
  )
}

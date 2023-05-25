'use client'

import { DeleteButton } from './DeleteButton'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { SearchInput } from '@/components/SearchInput'
import { GetListDTO } from '@/dtos/GetListDto'

type ItensProps = {
  list: GetListDTO
  isLoadingList?: boolean
}

export const Itens = ({ list, isLoadingList = false }: ItensProps) => {
  const session = useSession()
  const [inputValue, setInputValue] = useState('')
  const itensFromList = list?.itens ?? []
  const filteredItens =
    itensFromList.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase()),
    ) ?? []
  const isLoading = session?.status === 'loading' || isLoadingList

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
            {filteredItens.map((item) => (
              <li
                key={item.id}
                className="py-3 px-2 flex items-center justify-between"
              >
                <div className="flex flex-1 h-full items-center text-zinc-600 hover:text-zinc-800 transition">
                  <span
                    className="font-semibold max-w-[80%] truncate"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DeleteButton listId={list.id} itemId={item.id ?? ''} />
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  )
}

'use client'

import { ListDTO } from '@/dtos/ListDTO'
import { ListItemDTO } from '@/dtos/ListItemDTO'
import { useLists } from '@/hooks/useLists'
import clsx from 'clsx'
import { useState } from 'react'

export const Lists = () => {
  const [selectedList, setSelectedList] = useState<null | ListDTO>(null)
  const [currentItem, setCurrentItem] = useState<null | ListItemDTO>(null)
  const { lists } = useLists()

  const getItemClassName = (listId: string) => {
    return clsx('text-white px-2 py-1  hover:bg-zinc-800 transition rounded', {
      'bg-zinc-600': listId !== selectedList?.id,
      'bg-green-600': listId === selectedList?.id,
    })
  }

  const handleSelectList = (list: ListDTO) => {
    setSelectedList(list)
  }

  const handleGetRandomItem = () => {
    const itens = selectedList?.itens
    if (itens && itens.length > 0) {
      const random = Math.floor(Math.random() * itens.length + 1)
      const item = itens[random - 1]
      setCurrentItem(item)
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="flex flex-col gap-2 items-center">
        {lists.map((list) => (
          <li key={list.id}>
            <button
              className={getItemClassName(list.id)}
              onClick={() => handleSelectList(list)}
            >
              {list.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col items-center">
        <button
          className="p-4 bg-green-500 rounded-lg hover:bg-green-300 transition text-white font-bold "
          onClick={handleGetRandomItem}
        >
          Realizar sorteio
        </button>
        <div className="mt-4">
          <span className="text-white text-sm mb-4 block">Escolhido:</span>
          <h1 className="text-white text-xl font-bold">
            {currentItem?.name ?? 'Sorteio não realizado'}
          </h1>
        </div>
      </div>
    </div>
  )
}

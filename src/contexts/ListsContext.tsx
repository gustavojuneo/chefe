import { ListDTO } from '@/dtos/ListDTO'
import {
  storageListRemove,
  storageListsGet,
  storageListsRemoveItem,
  storageListsSave,
} from '@/storage/storageLists'
import { createContext, useCallback, useEffect, useState } from 'react'

export type AuthContextDataProps = {
  lists: ListDTO[]
  createList: (data: ListDTO) => void
  updateList: (data: ListDTO) => void
  removeList: (listId: string) => void
  removeItemFromList: (listId: string, itemId: string) => void
}

type ProviderProps = {
  children: React.ReactNode
}

export const ListsContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export const ListsProvider = ({ children }: ProviderProps) => {
  const [lists, setLists] = useState<ListDTO[]>([])

  const createList = (data: ListDTO) => {
    const newLists = [...lists, data]
    setLists(newLists)
    storageListsSave(newLists)
  }

  const updateList = (data: ListDTO) => {
    const newLists = lists.map((list) => {
      if (list.id === data.id) return data
      return list
    })

    setLists(newLists)
    storageListsSave(newLists)
  }

  const removeList = (listId: string) => {
    const newLists = lists.filter((list) => list.id !== listId)
    setLists(newLists)
    storageListRemove(listId)
  }

  const removeItemFromList = (listId: string, itemId: string) => {
    const list = lists.find((list) => list.id === listId)
    const filteredItens = list?.itens.filter((item) => item.id !== itemId) ?? []
    const newLists = lists.map((list) => {
      if (list.id === listId) return { ...list, itens: filteredItens }
      return list
    })
    setLists(newLists)
    storageListsRemoveItem(listId, itemId)
  }

  const loadLists = useCallback(() => {
    const lists = storageListsGet()
    setLists(lists)
  }, [])

  useEffect(() => {
    loadLists()
  }, [loadLists])

  return (
    <ListsContext.Provider
      value={{ lists, createList, removeList, removeItemFromList, updateList }}
    >
      {children}
    </ListsContext.Provider>
  )
}

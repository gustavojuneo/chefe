import { ListDTO } from '@/dtos/ListDTO'
import { api } from '@/lib/axios'
import {
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

  const createList = async (data: ListDTO) => {
    const response = await api.post('/lists', { data })
    const { list } = response.data
    const formattedList: ListDTO = {
      id: list.id,
      name: list.name,
      itens: list.listItems,
    }

    const newLists = [...lists, formattedList]
    setLists(newLists)
  }

  const updateList = (data: ListDTO) => {
    const newLists = lists.map((list) => {
      if (list.id === data.id) return data
      return list
    })

    setLists(newLists)
    storageListsSave(newLists)
  }

  const removeList = async (listId: string) => {
    const newLists = lists.filter((list) => list.id !== listId)
    await api.delete(`/lists/${listId}`)
    setLists(newLists)
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

  const loadLists = useCallback(async () => {
    const response = await api.get('/lists')
    const { lists } = response.data

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

import { ListDTO } from '@/dtos/ListDTO'
import { storageListsGet, storageListsSave } from '@/storage/storageLists'
import { createContext, useCallback, useEffect, useState } from 'react'

export type AuthContextDataProps = {
  lists: ListDTO[]
  createList: (data: ListDTO) => void
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

  const loadLists = useCallback(() => {
    const lists = storageListsGet()
    setLists(lists)
  }, [])

  useEffect(() => {
    loadLists()
  }, [loadLists])

  return (
    <ListsContext.Provider value={{ lists, createList }}>
      {children}
    </ListsContext.Provider>
  )
}

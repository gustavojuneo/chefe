import { ListDTO } from '@/dtos/ListDTO'
import { ListItemDTO } from '@/dtos/ListItemDTO'
import { api } from '@/lib/axios'
import { createContext, useCallback, useState } from 'react'

type LastChoosedItem = {
  listId: string
  item: ListItemDTO
}

export type AuthContextDataProps = {
  lists: ListDTO[]
  createList: (data: ListDTO) => void
  updateList: (data: ListDTO) => void
  getRandomItemFromList: (list: ListDTO, all?: boolean) => void
  removeList: (listId: string) => void
  removeItemFromList: (listId: string, itemId: string) => Promise<void>
  lastChoosedItem: LastChoosedItem | null
  hasItensToChoose: (listId: string) => boolean
  isLoading: boolean
  loadLists: () => Promise<void>
}

type ProviderProps = {
  children: React.ReactNode
}

export const ListsContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export const ListsProvider = ({ children }: ProviderProps) => {
  const [lists, setLists] = useState<ListDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastChoosedItem, setLastChoosedItem] =
    useState<LastChoosedItem | null>(null)

  const hasItensToChoose = (listId: string) =>
    !!lists
      .find((list) => list.id === listId)
      ?.itens?.some((item) => !item.choosed)

  const createList = async (data: ListDTO) => {
    const response = await api.post('/lists', { data })
    const { list } = response.data
    const formattedList: ListDTO = {
      id: list.id,
      name: list.name,
      itens: list.itens,
    }

    const newLists = [...lists, formattedList]
    setLists(newLists)
  }

  const updateList = async (data: ListDTO) => {
    const response = await api.put(`/lists/${data.id}`, { data })
    const { list } = response.data
    const formattedList: ListDTO = {
      id: list.id,
      name: list.name,
      itens: list.itens,
    }
    const newLists = lists.map((item) =>
      item.id === formattedList.id ? { ...formattedList } : { ...item },
    )

    setLists(newLists)
  }

  const removeList = async (listId: string) => {
    const newLists = lists.filter((list) => list.id !== listId)
    await api.delete(`/lists/${listId}`)
    setLists(newLists)
  }

  const removeItemFromList = async (listId: string, itemId: string) => {
    await api.delete(`/lists/${listId}/item/${itemId}`)
    const list = lists.find((list) => list.id === listId)
    const filteredItens =
      list?.itens?.filter((item) => item.id !== itemId) ?? []
    const newLists = lists.map((list) => {
      if (list.id === listId) return { ...list, itens: filteredItens }
      return list
    })
    setLists(newLists)
  }

  const getRandomItemFromList = async (list: ListDTO, all: boolean = false) => {
    const itens = list?.itens ? [...list?.itens] : []
    if (hasItensToChoose(list.id!) || all) {
      const filteredItens = all ? itens : itens.filter((i) => !i.choosed)
      const random = Math.floor(Math.random() * filteredItens.length + 1)
      const item = filteredItens.sort(() => Math.random() - 0.5)[random - 1]

      if (item) {
        if (!all) {
          item.choosed = true
          await api.patch(`/lists/${list.id}/item/${item.id}/chooseItem`)
          const updatedLists = lists.map((current) =>
            current.id === list.id
              ? {
                  ...current,
                  itens: current.itens?.map((i) =>
                    i.id === item.id
                      ? {
                          ...item,
                        }
                      : { ...i },
                  ),
                }
              : { ...current },
          )
          setLists(updatedLists)
        }
        setLastChoosedItem({ listId: list.id!, item })
      }
    }
  }

  const loadLists = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/lists')
      const { lists } = response.data

      setLists(lists)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <ListsContext.Provider
      value={{
        lists,
        createList,
        removeList,
        removeItemFromList,
        updateList,
        getRandomItemFromList,
        lastChoosedItem,
        hasItensToChoose,
        isLoading,
        loadLists,
      }}
    >
      {children}
    </ListsContext.Provider>
  )
}

import { useRouter } from 'next/navigation'
import { createContext, useCallback, useReducer, useRef, useState } from 'react'
import { GetListDTO } from '@/dtos/GetListDto'
import { ListDTO } from '@/dtos/ListDTO'
import { api } from '@/lib/axios'
import { LastChoosedItem, reducer } from './reducer'
import { ListActionTypes } from './actionTypes'

export type AuthContextDataProps = {
  lists: ListDTO[]
  createList: (data: ListDTO) => Promise<void>
  updateList: (data: ListDTO) => Promise<void>
  getRandomItemFromList: (list: ListDTO, all?: boolean) => void
  removeList: (listId: string, inListPage: boolean) => Promise<void>
  removeItemFromList: (listId: string, itemId: string) => Promise<void>
  lastChoosedItem: LastChoosedItem | null
  hasItensToChoose: (listId: string) => boolean
  isLoading: boolean
  loadLists: () => Promise<void>
  getCurrentList: (id: string) => Promise<void>
  isGetting: boolean
  current: GetListDTO
  previewList: boolean
  changeListVisibility: (listId: string) => Promise<void>
  alreadyLoadListsFirstTime: boolean
}

type ProviderProps = {
  children: React.ReactNode
}

export const ListsContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

const initialState = {
  lists: [] as ListDTO[],
  previewList: false,
  current: {} as GetListDTO,
  lastChoosedItem: null,
}

export const ListsProvider = ({ children }: ProviderProps) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState)
  const alreadyLoadListsFirstTime = useRef(false)
  const [isGetting, setIsGetting] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const { lists, current, lastChoosedItem, previewList } = state

  const hasItensToChoose = (listId: string) => {
    if (current.id) {
      return !!current.itens?.some((item) => !item.choosed)
    }
    return !!lists
      .find((list) => list.id === listId)
      ?.itens?.some((item) => !item.choosed)
  }

  const createList = async (data: ListDTO) => {
    const response = await api.post('/lists', { data })
    const { list } = response.data

    dispatch({ type: ListActionTypes.ADD_NEW_LIST, payload: { list } })
  }

  const updateList = async (data: ListDTO) => {
    const response = await api.put(`/lists/${data.id}`, { data })
    const { list } = response.data
    dispatch({ type: ListActionTypes.UPDATE_LIST, payload: { list } })
  }

  const removeList = async (listId: string, inListPage: boolean = false) => {
    await api.delete(`/lists/${listId}`)

    dispatch({ type: ListActionTypes.REMOVE_LIST, payload: { listId } })
    if (inListPage) {
      router.push('/application/lists')
    }
  }

  const removeItemFromList = async (listId: string, itemId: string) => {
    await api.delete(`/lists/${listId}/item/${itemId}`)

    dispatch({
      type: ListActionTypes.REMOVE_ITEM_FROM_LIST,
      payload: { listId, itemId },
    })
  }

  const changeListVisibility = async (listId: string) => {
    const response = await api.patch(`/lists/${listId}`)
    const { list } = response.data
    dispatch({ type: ListActionTypes.UPDATE_LIST, payload: { list } })
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
          dispatch({
            type: ListActionTypes.UPDATE_ALL_LISTS,
            payload: { lists: updatedLists },
          })
        }
        dispatch({
          type: ListActionTypes.CHOOSE_ITEM,
          payload: {
            choosedItem: item,
            listId: list.id,
          },
        })
      }
    }
  }

  const getCurrentList = useCallback(async (id: string) => {
    try {
      setIsGetting(true)
      const response = await api.get(`/lists/${id}`)
      const { data } = response
      const { list, invited } = data

      dispatch({ type: ListActionTypes.GET_LIST, payload: { list, invited } })
    } catch (err) {
      console.log(err)
    } finally {
      setIsGetting(false)
    }
  }, [])

  const loadLists = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/lists')
      const { lists } = response.data

      dispatch({ type: ListActionTypes.FETCH_LISTS, payload: { lists } })
      alreadyLoadListsFirstTime.current = true
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
        getCurrentList,
        current,
        isGetting,
        previewList,
        changeListVisibility,
        alreadyLoadListsFirstTime: alreadyLoadListsFirstTime.current,
      }}
    >
      {children}
    </ListsContext.Provider>
  )
}

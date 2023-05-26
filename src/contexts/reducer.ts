import { ListDTO } from '@/dtos/ListDTO'
import { ListActionTypes } from './actionTypes'
import { GetListDTO } from '@/dtos/GetListDto'
import { ListItemDTO } from '@/dtos/ListItemDTO'

export type LastChoosedItem = {
  listId: string
  item: ListItemDTO
}

interface ListAction {
  type: ListActionTypes
  payload: any
}

interface State {
  lists: ListDTO[]
  current: GetListDTO
  previewList: boolean
  lastChoosedItem: LastChoosedItem | null
}

export const reducer = (state: State, action: ListAction): State => {
  switch (action.type) {
    case ListActionTypes.FETCH_LISTS: {
      const { lists } = action.payload
      return { ...state, lists }
    }

    case ListActionTypes.GET_LIST: {
      const { list, invited } = action.payload
      return { ...state, current: list, previewList: invited }
    }

    case ListActionTypes.ADD_NEW_LIST: {
      const { list } = action.payload
      const formattedList: ListDTO = {
        id: list.id,
        name: list.name,
        itens: list.itens,
      }

      const newLists = [...state.lists, formattedList]

      return { ...state, lists: newLists }
    }

    case ListActionTypes.UPDATE_LIST: {
      let current = state.current
      const { list } = action.payload
      const formattedList: ListDTO = {
        id: list.id,
        name: list.name,
        itens: list.itens,
      }

      const newLists = state.lists.map((item) =>
        item.id === formattedList.id ? { ...formattedList } : { ...item },
      )

      if (state.current.id === list.id) {
        current = {
          ...current,
          ...formattedList,
        }
      }

      return { ...state, current, lists: newLists }
    }

    case ListActionTypes.UPDATE_ALL_LISTS: {
      const { lists } = action.payload
      const current = lists.find(
        (list: ListDTO) => list.id === state.current.id,
      )
      return { ...state, lists, current: { ...state.current, ...current } }
    }

    case ListActionTypes.CHOOSE_ITEM: {
      const { choosedItem, listId } = action.payload
      return { ...state, lastChoosedItem: { item: choosedItem, listId } }
    }

    case ListActionTypes.REMOVE_LIST: {
      const { listId } = action.payload
      const newLists = state.lists.filter((list) => list.id !== listId)

      return { ...state, lists: newLists }
    }

    case ListActionTypes.REMOVE_ITEM_FROM_LIST: {
      let current = state.current
      const { listId, itemId } = action.payload
      const list = state.lists.find((list) => list.id === listId)
      const filteredItens =
        list?.itens?.filter((item) => item.id !== itemId) ?? []
      const newLists = state.lists.map((list) => {
        if (list.id === listId) return { ...list, itens: filteredItens }
        return list
      })

      if (state.current) {
        current = {
          ...current,
          itens: current.itens?.filter((item) => item.id !== itemId) ?? [],
        }
      }

      return { ...state, current, lists: newLists }
    }
    default:
      return { ...state }
  }
}

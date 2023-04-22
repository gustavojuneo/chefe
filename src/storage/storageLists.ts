import { ListDTO } from '@/dtos/ListDTO'
import { LISTS_STORAGE } from './storageConfig'

export const storageListsSave = (list: any) => {
  localStorage.setItem(LISTS_STORAGE, JSON.stringify(list))
}

export const storageListsGet = () => {
  const storage = localStorage.getItem(LISTS_STORAGE)
  const lists: ListDTO[] = storage ? JSON.parse(storage) : []
  return lists
}

export const storageListRemove = (listId: string) => {
  const storage = localStorage.getItem(LISTS_STORAGE)
  const list: ListDTO[] = storage ? JSON.parse(storage) : []
  const filteredList = list.filter((item) => item.id !== listId)
  localStorage.setItem(LISTS_STORAGE, JSON.stringify(filteredList))
}

export const storageListsRemoveItem = (listId: string, itemId: string) => {
  const storage = localStorage.getItem(LISTS_STORAGE)
  const list: ListDTO[] = storage ? JSON.parse(storage) : []
  const currentList = list.find((item) => item.id === listId)
  const filteredItens =
    currentList?.itens.filter((item) => item.id !== itemId) ?? []
  const newLists = list.map((list) => {
    if (list.id === listId) return { ...list, itens: filteredItens }
    return list
  })

  localStorage.setItem(LISTS_STORAGE, JSON.stringify(newLists))
}

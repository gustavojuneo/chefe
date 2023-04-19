import { LISTS_STORAGE } from './storageConfig'

export const storageListsSave = (list: any) => {
  localStorage.setItem(LISTS_STORAGE, JSON.stringify(list))
}

export const storageListsGet = () => {
  const storage = localStorage.getItem(LISTS_STORAGE)
  const lists: string[] = storage ? JSON.parse(storage) : []
  return lists
}

export const storageListRemove = () => {
  localStorage.removeItem(LISTS_STORAGE)
}

export const storageListsRemoveItem = (itemId: string) => {
  const storage = localStorage.getItem(LISTS_STORAGE)
  const list: string[] = storage ? JSON.parse(storage) : []
  const filteredList = list.filter((item) => item !== itemId)
  localStorage.setItem(LISTS_STORAGE, JSON.stringify(filteredList))
}

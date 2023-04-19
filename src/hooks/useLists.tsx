import { useContext } from 'react'
import { ListsContext } from '@/contexts/ListsContext'

export const useLists = () => useContext(ListsContext)

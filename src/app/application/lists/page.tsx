'use client'

import { Header } from '@/components/Header'
import { List } from './components/List'
import { CreateListModal } from '@/components/CreateListModal'
import { useLists } from '@/hooks/useLists'
import { useEffect } from 'react'

export default function Lists() {
  const { lists, loadLists, isLoading, alreadyLoadListsFirstTime } = useLists()

  useEffect(() => {
    if (lists.length === 0 || !alreadyLoadListsFirstTime) {
      loadLists()
    }
  }, [lists.length, loadLists, alreadyLoadListsFirstTime])

  return (
    <div className="flex flex-col w-full pb-10">
      <Header />
      <div className="flex w-full justify-center gap-2 mt-8">
        <CreateListModal isLoading={isLoading} />
      </div>
      <List />
    </div>
  )
}

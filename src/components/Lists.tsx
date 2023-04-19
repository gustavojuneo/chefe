'use client'

import { useLists } from '@/hooks/useLists'

export const Lists = () => {
  const { lists } = useLists()

  return (
    <ul>
      {lists.map((list) => (
        <li key={list.id} className="text-white">
          {list.name}
        </li>
      ))}
    </ul>
  )
}

'use client'
import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'

import { api } from '@/lib/axios'
import { Itens } from './components/Itens'
import { GetListDTO } from '@/dtos/GetListDto'
import { useRouter } from 'next/navigation'
import { FormData } from '@/components/CreateListForm'
import { CreateListModal } from '@/components/CreateListModal'
import { DeleteButton } from '../components/DeleteButton'

type ListItensProps = {
  params: {
    id: string
  }
}

export default function ListItens({ params }: ListItensProps) {
  const [isLoadingList, setIsLoadingList] = useState(true)
  const [list, setList] = useState<GetListDTO>({} as GetListDTO)
  const router = useRouter()
  const defaultData: FormData = {
    itens: list?.itens?.length ? list.itens : [],
    name: list?.name ?? '',
    id: list?.id ?? '',
  }

  const getList = useCallback(async () => {
    try {
      setIsLoadingList(true)
      const response = await api.get<GetListDTO>(`/lists/${params.id}`)
      const { data } = response
      console.log(data)
      setList(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoadingList(false)
    }
  }, [params.id])

  useEffect(() => {
    getList()
  }, [getList])

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col">
        <button onClick={() => router.back()} className="text-zinc-800">
          <ArrowLeft size={24} />
        </button>
        {isLoadingList ? (
          <div className="animate-pulse self-center">
            <span className="bg-slate-200 block w-[100px] h-[36px] mb-6 rounded" />
          </div>
        ) : (
          <h1 className="text-center font-bold text-3xl mb-6 text-zinc-800 ">
            {list.name}
          </h1>
        )}
      </div>
      <div className="flex w-full justify-center gap-2">
        <CreateListModal
          defaultData={defaultData}
          update
          isLoading={isLoadingList}
        />
        <DeleteButton
          circle={false}
          listId={list.id}
          showLabel
          isLoading={isLoadingList}
        />
      </div>
      <Itens list={list} isLoadingList={isLoadingList} />
    </div>
  )
}

'use client'
import { useCallback, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

import { Itens } from './components/Itens'
import { useRouter } from 'next/navigation'
import { FormData } from '@/components/CreateListForm'
import { CreateListModal } from '@/components/CreateListModal'
import { DeleteButton } from '../components/DeleteButton'
import { useLists } from '@/hooks/useLists'
import { api } from '@/lib/axios'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { ListDTO } from '@/dtos/ListDTO'
import { ShareButton } from '../components/ShareButton'

type ListItensProps = {
  params: {
    id: string
  }
  searchParams: {
    usp: 'sharing'
  }
}

export default function ListItens({ params, searchParams }: ListItensProps) {
  const {
    getCurrentList,
    current: list,
    isGetting: isLoadingList,
    previewList,
    hasItensToChoose,
    getRandomItemFromList,
    lastChoosedItem,
  } = useLists()
  const router = useRouter()
  const defaultData: FormData = {
    itens: list?.itens?.length ? list.itens : [],
    name: list?.name ?? '',
    id: list?.id ?? '',
  }

  const handleGetRandomItem = (list: ListDTO) => {
    if (hasItensToChoose(list.id!)) {
      getRandomItemFromList(list)
    }
  }

  const getListMessage = (listId: string) => {
    if (lastChoosedItem?.item.name) return lastChoosedItem?.item.name
    if (!hasItensToChoose(listId)) {
      return 'Não existe itens a serem escolhidos.'
    }
    return 'Sorteio não realizado'
  }

  const acceptInvite = useCallback(async () => {
    try {
      const response = await api.patch(`lists/${params.id}/invite`)
      const { data } = response
      if (data.message) {
        toast.success(data.message, {
          position: 'top-center',
          closeOnClick: true,
          theme: 'colored',
        })
      }
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err?.response?.data.message, {
          position: 'top-center',
          closeOnClick: true,
          theme: 'colored',
        })
      }
    }
  }, [params.id])

  useEffect(() => {
    getCurrentList(params.id)
  }, [getCurrentList, params.id])

  useEffect(() => {
    if (searchParams.usp === 'sharing') {
      acceptInvite()
    }
  }, [acceptInvite, searchParams.usp])

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col mb-6">
        <button onClick={() => router.back()} className="text-zinc-800">
          <ArrowLeft size={24} />
        </button>
        {isLoadingList ? (
          <div className="animate-pulse self-center h-[36px] mb-6">
            <span className="bg-slate-200 block w-[100px] h-[36px] rounded" />
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
          disabled={previewList}
        />
        <DeleteButton
          circle={false}
          listId={list.id}
          showLabel
          isLoading={isLoadingList}
          inListPage
          disabled={previewList}
        />
        {/* <ShareButton
          circle={false}
          listId={list.id}
          showLabel
          isLoading={isLoadingList}
          disabled={previewList}
        /> */}
      </div>
      <div className="mt-10 flex flex-col items-center">
        <button
          className="p-4 bg-green-500 rounded-lg hover:bg-green-300 transition text-white font-bold disabled:opacity-40"
          onClick={() => handleGetRandomItem(list)}
          disabled={!hasItensToChoose(list.id!)}
        >
          Realizar sorteio
        </button>
        <div className="mt-4 flex flex-col items-center">
          <span className="text-zinc-800 text-sm mb-2 block">Escolhido:</span>
          <span className="text-zinc-800 text-xl font-bold text-center">
            {getListMessage(list.id!)}
          </span>
        </div>
      </div>
      <Itens list={list} isLoadingList={isLoadingList} />
    </div>
  )
}

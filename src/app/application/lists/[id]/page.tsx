'use client'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'

import { Itens } from './components/Itens'
import { FormData } from '@/components/CreateListForm'
import { CreateListModal } from '@/components/CreateListModal'
import { DeleteButton } from '../components/DeleteButton'
import { useLists } from '@/hooks/useLists'
import { ListDTO } from '@/dtos/ListDTO'
import * as Share from '../components/Share'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

type ListItensProps = {
  params: {
    id: string
  }
  searchParams: {
    usp: 'sharing'
  }
}

export default function ListItens({ params, searchParams }: ListItensProps) {
  const { data: session } = useSession()
  const {
    getCurrentList,
    current: list,
    isGetting: isLoadingList,
    previewList,
    hasItensToChoose,
    getRandomItemFromList,
    lastChoosedItem,
    acceptInvite,
  } = useLists()
  const [sharing, setSharing] = useState<{
    showModal: boolean
    listId: string | null
  }>({
    showModal: false,
    listId: null,
  })
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

  const handleOnShareList = (opened: boolean, listId?: string) => {
    if (opened && listId) {
      setSharing({ showModal: opened, listId })
    } else {
      setSharing({ showModal: false, listId: null })
    }
  }

  useEffect(() => {
    getCurrentList(params.id).then(() => {
      if (searchParams.usp === 'sharing') {
        acceptInvite(params.id)
      }
    })
  }, [getCurrentList, params.id, acceptInvite, searchParams.usp])

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col mb-6">
        <Link href="/application/lists" className="text-zinc-800">
          <ArrowLeft size={24} />
        </Link>
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
          label={list.ownerId === session?.user.id ? 'Delete' : 'Sair'}
          isLoading={isLoadingList}
          inListPage
          disabled={previewList}
        />
        <Share.Button
          circle={false}
          listId={list.id}
          showLabel
          isLoading={isLoadingList}
          disabled={previewList}
          onShare={(listId) => handleOnShareList(true, listId)}
        />
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
      <Share.Container
        listId={sharing.listId}
        opened={sharing.showModal}
        onOpenChange={handleOnShareList}
      />
    </div>
  )
}

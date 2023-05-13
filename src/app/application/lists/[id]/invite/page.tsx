'use client'
import { Lists as ListsComponent } from '@/components/Lists'
import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'
import { useCallback, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface PageProps {
  params: {
    id: string
  }
}

export default function Invite({ params }: PageProps) {
  const acceptInvite = useCallback(async () => {
    try {
      await api.patch(`lists/${params.id}/invite`)
      toast.success('Usuário vinculado a lista', {
        position: 'top-center',
        closeOnClick: true,
        theme: 'colored',
      })
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
    acceptInvite()
  }, [acceptInvite])

  return (
    <div className="w-full h-full">
      <ListsComponent />
      <ToastContainer />
    </div>
  )
}

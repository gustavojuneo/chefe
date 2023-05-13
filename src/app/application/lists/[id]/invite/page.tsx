'use client'
import 'react-toastify/dist/ReactToastify.css'
import { isAxiosError } from 'axios'
import { useCallback, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { redirect } from 'next/navigation'

import { Lists as ListsComponent } from '@/components/Lists'
import { api } from '@/lib/axios'

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
      setTimeout(() => {
        redirect('/application/lists')
      }, 1000);
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

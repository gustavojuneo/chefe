'use client'

import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import * as uuid from 'uuid'
import { api } from '@/lib/axios'
import Image from 'next/image'
import Link from 'next/link'

type Notification = {
  id: string
  message: string
  listInvite?: boolean
  owner: {
    name: string
    image: string
  }
}

export default function Notifications() {
  const { status } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [fetching, setFetching] = useState(true)
  const isLoading = status === 'loading' || fetching

  const loadNotifications = useCallback(async () => {
    setFetching(true)
    try {
      const response = await api.get('/users/notifications')
      const { data } = response
      const { invitations } = data.notifications

      const loadedNotifications = invitations
        .map((invitation: any) => {
          return Object.entries(invitation).map(
            ([key, notification]: any) =>
              ({
                ...notification,
                message: `<strong>${notification.owner.name}</strong> te enviou um convite para a lista <strong>${notification.name}</strong>.`,
                listInvite: key === 'list',
              } as Notification),
          ) as Notification[]
        })
        .map((notification: any) => notification[0] ?? [])

      setNotifications(loadedNotifications)
    } finally {
      setFetching(false)
    }
  }, [])

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  return (
    <div className="flex flex-col w-full pb-10">
      <h1 className="text-2xl font-bold">Notificações</h1>
      <ul className="flex flex-col gap-2 mt-8">
        {isLoading
          ? Array.from({ length: 5 }, (x, i) => i).map(() => (
              <li key={uuid.v4()}>
                <div className="flex items-center justify-center gap-3 p-2 animate-pulse">
                  <div className="w-[44px] h-[44px] bg-slate-200 rounded-full" />
                  <span className="text-sm text-justify text-zinc-800 flex-1 h-[20px] bg-slate-200" />
                </div>
              </li>
            ))
          : notifications.map((notification) => (
              <li key={notification.id}>
                {notification.listInvite ? (
                  <Link
                    href={{
                      pathname: `/application/lists/${notification.id}`,
                      query: { usp: 'sharing' },
                    }}
                    className="flex items-center gap-3 hover:bg-zinc-300 p-2 rounded transition"
                    title={notification.message.replace(/<[^>]*>?/gm, '')}
                  >
                    <Image
                      src={notification.owner.image}
                      alt={`Foto de ${notification.owner.name}`}
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                    <span
                      className="text-sm text-justify text-zinc-800 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: notification.message }}
                    />
                  </Link>
                ) : (
                  <div
                    className="flex items-center gap-3"
                    title={notification.message.replace(/<[^>]*>?/gm, '')}
                  >
                    <Image
                      src={notification.owner.image}
                      alt={`Foto de ${notification.owner.name}`}
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                    <span
                      className="text-sm text-justify text-zinc-800 p-2"
                      dangerouslySetInnerHTML={{ __html: notification.message }}
                    />
                  </div>
                )}
              </li>
            ))}
      </ul>
    </div>
  )
}

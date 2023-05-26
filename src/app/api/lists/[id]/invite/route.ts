import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { prismaClient } from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function PATCH(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  const id = params.id

  if (!session) {
    return NextResponse.json(
      { message: 'É necessário estar logado.' },
      { status: 401 },
    )
  }

  const { user } = session

  const list = await prismaClient.list.findFirst({
    include: { members: true, users_invitations: true },
    where: { id },
  })

  if (!list) {
    return NextResponse.json(
      {
        message: 'A Lista não existe',
      },
      { status: 404 },
    )
  }

  const isMember =
    list.members.some((member) => member.userId === user.id) ?? false

  const hasInvite =
    list.users_invitations.some((invitate) => invitate.userId === user.id) ??
    false

  if (list.restricted && list.ownerId !== user.id && !isMember && !hasInvite) {
    return NextResponse.json(
      {
        message: 'Você não é membro desta lista ou não possui um convite.',
      },
      { status: 400 },
    )
  }

  if (isMember || list.ownerId === user.id) {
    return NextResponse.json({}, { status: 200 })
  }

  await prismaClient.list.update({
    where: {
      id,
    },
    data: {
      members: {
        create: {
          userId: session.user.id,
        },
      },
      users_invitations: {
        delete: {
          userId_listId: {
            userId: user.id,
            listId: list.id,
          },
        },
      },
    },
  })

  return NextResponse.json(
    {
      message: 'Agora você é um membro da lista.',
    },
    { status: 201 },
  )
}

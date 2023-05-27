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
        message: 'Você não possui um convite para esta lista.',
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
        delete: hasInvite
          ? {
              userId_listId: {
                userId: user.id,
                listId: list.id,
              },
            }
          : undefined,
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

interface PostBody {
  data: {
    email: string
  }
}

export async function POST(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  const res = await req.json()
  const id = params.id
  const { data } = res as PostBody

  if (!session) {
    return NextResponse.json(
      { message: 'É necessário estar logado.' },
      { status: 401 },
    )
  }

  if (!data.email) {
    return NextResponse.json(
      { message: 'O e-mail é obrigatório.' },
      { status: 400 },
    )
  }

  const list = await prismaClient.list.findFirst({
    where: { id },
    include: { members: true, users_invitations: true },
  })

  if (!list) {
    return NextResponse.json(
      { message: 'A lista não existe.' },
      { status: 400 },
    )
  }

  if (list.ownerId !== session.user.id) {
    return NextResponse.json({ message: 'Operação inválida' }, { status: 400 })
  }

  const invitedUser = await prismaClient.user.findFirst({
    where: { email: data.email },
  })

  if (!invitedUser) {
    return NextResponse.json(
      { message: 'Não existe usuário com este e-mail.' },
      { status: 400 },
    )
  }

  const isMember = session
    ? list.members.some((member) => member.userId === invitedUser.id)
    : false

  if (invitedUser.id === list.ownerId || isMember) {
    return NextResponse.json(
      { message: 'Usuário já faz parte da lista.' },
      { status: 400 },
    )
  }

  const hasInvite =
    list.users_invitations.some(
      (invitate) => invitate.userId === invitedUser.id,
    ) ?? false

  if (hasInvite) {
    return NextResponse.json(
      { message: 'Este usuário já possui um convite para esta lista.' },
      { status: 400 },
    )
  }

  await prismaClient.list.update({
    where: { id },
    include: { itens: true },
    data: {
      users_invitations: {
        create: {
          userId: invitedUser.id,
        },
      },
    },
  })

  return NextResponse.json(
    { message: 'Convite enviado com sucesso!' },
    {
      status: 201,
    },
  )
}

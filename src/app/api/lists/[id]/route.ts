import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prismaClient } from '@/lib/prisma'
import { ListItemDTO } from '@/dtos/ListItemDTO'
import { authOptions } from '../../auth/[...nextauth]/route'
import { ListDTO } from '@/dtos/ListDTO'

export async function GET(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  const id = params.id

  const list = await prismaClient.list.findFirst({
    where: { id },
    include: {
      itens: true,
      members: true,
      _count: { select: { members: true, itens: true } },
    },
  })

  const isMember = session
    ? list?.members.map((member) => member.userId).includes(session.user.id)
    : false

  if (list?.restricted && list?.ownerId !== session?.user.id && !isMember) {
    return NextResponse.json({ message: 'Operação inválida' }, { status: 400 })
  }

  return NextResponse.json(list, {
    status: 200,
  })
}

export async function DELETE(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  const id = params.id

  if (!session) {
    return NextResponse.json(
      { message: 'É necessário estar logado.' },
      { status: 401 },
    )
  }

  const list = await prismaClient.list.findFirst({
    where: { id },
    include: { members: true },
  })

  const isMember = list?.members
    .map((member) => member.userId)
    .includes(session.user.id)

  if (list?.ownerId !== session.user.id && !isMember) {
    return NextResponse.json({ message: 'Operação inválida' }, { status: 400 })
  }

  if (isMember) {
    await prismaClient.membersOnLists.delete({
      where: {
        userId_listId: {
          listId: id,
          userId: session.user.id,
        },
      },
    })
  } else {
    await prismaClient.list.delete({
      where: {
        id,
      },
    })
  }

  return NextResponse.json({
    data: id,
    status: 200,
  })
}

interface PutBody {
  data: ListDTO
}

export async function PUT(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  const res = await req.json()
  const id = params.id
  const { data } = res as PutBody

  if (!session) {
    return NextResponse.json(
      { message: 'É necessário estar logado.' },
      { status: 401 },
    )
  }

  const list = await prismaClient.list.findFirst({
    where: { id },
    include: { members: true },
  })

  const isMember = list?.members
    .map((member) => member.userId)
    .includes(session.user.id)

  if (list?.ownerId !== session.user.id && !isMember) {
    return NextResponse.json({ message: 'Operação inválida' }, { status: 400 })
  }

  const updatedList = await prismaClient.list.update({
    where: { id },
    include: { itens: true },
    data: {
      name: data?.name,
      updated_at: new Date(),
      itens: {
        createMany: data?.itens?.length
          ? {
              data: data?.itens
                ?.filter((item: ListItemDTO) => !item.id)
                .map((item: ListItemDTO) => ({ name: item.name })),
            }
          : undefined,
      },
    },
  })

  return NextResponse.json(
    { list: updatedList },
    {
      status: 201,
    },
  )
}

import { prismaClient } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { ListItemDTO } from '@/dtos/ListItemDTO'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function DELETE(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  const id = params.id

  if (!session) {
    return NextResponse.json(
      { message: 'É Necessário estar logado' },
      { status: 400 },
    )
  }

  const list = await prismaClient.list.findFirst({
    where: { id },
    include: { members: true },
  })

  const isMember = list?.members
    .map((member) => member.userId)
    .includes(session.user.id)

  if (list?.userId !== session.user.id && !isMember) {
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

export async function PUT(req: Request, { params }: any) {
  const res = await req.json()
  const id = params.id
  const { data } = res

  if (!data.name) {
    return NextResponse.json(
      { message: 'Erro ao criar lista, o nome é obrigatório' },
      { status: 400 },
    )
  }

  const list = await prismaClient.list.update({
    where: { id },
    data: {
      name: data.name,
      updated_at: new Date(),
      itens: {
        connectOrCreate: data.itens.map((item: ListItemDTO) => ({
          where: {
            id: item.id,
          },
          create: {
            name: item.name,
          },
        })),
      },
    },
  })

  return NextResponse.json(
    { list },
    {
      status: 201,
    },
  )
}
import { prismaClient } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { ListItemDTO } from '@/dtos/ListItemDTO'

export async function DELETE(req: Request, { params }: any) {
  const id = params.id

  await prismaClient.list.delete({
    where: {
      id,
    },
  })

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
      listItems: {
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

// import { prismaClient } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { ListItemDTO } from '@/dtos/ListItemDTO'
import { prismaClient } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  const lists = await prismaClient.list.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      itens: true,
    },
  })

  return NextResponse.json(
    { lists },
    {
      status: 201,
    },
  )
}

export async function POST(req: Request) {
  const res = await req.json()
  const session = await getServerSession(authOptions)

  const { data } = res

  if (!data.name) {
    return NextResponse.json(
      { message: 'Erro ao criar lista, o nome é obrigatório' },
      { status: 400 },
    )
  }

  const list = await prismaClient.list.create({
    data: {
      name: data.name,
      userId: session?.user?.id ?? '',
      itens: {
        createMany: {
          data: data.itens.map((item: ListItemDTO) => ({
            name: item.name,
          })),
        },
      },
    },
    include: {
      itens: true,
    },
  })

  return NextResponse.json(
    { list },
    {
      status: 201,
    },
  )
}

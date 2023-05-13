import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { prismaClient } from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function PATCH(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  const { id, itemId } = params

  if (!session) {
    return NextResponse.json(
      { message: 'É Necessário estar logado' },
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

  await prismaClient.list.update({
    where: { id },
    data: {
      itens: {
        update: {
          where: { id: itemId },
          data: { choosed: true },
        },
      },
    },
  })

  return NextResponse.json({
    data: itemId,
    status: 200,
  })
}

import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { prismaClient } from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function PATCH(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  const id = params.id

  if (!session) {
    return NextResponse.json(
      { message: 'É necessário estar logado' },
      { status: 401 },
    )
  }

  const memberOnList = await prismaClient.membersOnLists.findFirst({
    where: {
      userId: session.user.id,
    },
  })

  if (memberOnList) {
    return NextResponse.json(
      { message: 'Usuário já esta vinculado a esta lista.' },
      { status: 400 },
    )
  }

  await prismaClient.membersOnLists.create({
    data: {
      listId: id,
      userId: session.user.id,
    },
  })

  return NextResponse.json({
    status: 201,
  })
}

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

  const list = await prismaClient.list.findFirst({
    where: {
      OR: [
        { id, userId: session.user.id },
        {
          AND: [
            { id },
            {
              members: {
                some: {
                  userId: session.user.id,
                },
              },
            },
          ],
        },
      ],
    },
  })

  if (list) {
    return NextResponse.json(
      { message: 'Usuário já esta vinculado a esta lista.' },
      { status: 400 },
    )
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
    },
  })

  return NextResponse.json({
    status: 201,
  })
}

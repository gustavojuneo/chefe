import { prismaClient } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { message: 'É necessário estar logado.' },
      { status: 401 },
    )
  }

  try {
    const notifications = await prismaClient.user.findFirst({
      where: { id: session.user.id },
      select: {
        invitations: {
          select: {
            list: {
              select: {
                owner: { select: { id: true, name: true, image: true } },
                name: true,
                id: true,
              },
            },
          },
        },
      },
    })
    console.log('notifications >>>', notifications)

    return NextResponse.json(
      { notifications },
      {
        status: 200,
      },
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        message: 'Não foi possível carregar as notificações.',
      },
      {
        status: 400,
      },
    )
  }
}

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prismaClient } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

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
        _count: {
          select: {
            invitations: true,
          },
        },
      },
    })

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

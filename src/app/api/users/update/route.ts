import { prismaClient } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

interface PutBody {
  data: {
    email: string
    name: string
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { message: 'É necessário estar logado.' },
      { status: 401 },
    )
  }

  const res = await req.json()
  const { data } = res as PutBody

  if (!data.name) {
    return NextResponse.json(
      { message: 'O campo nome é obrigatório.' },
      { status: 400 },
    )
  }

  try {
    const user = await prismaClient.user.update({
      where: { id: session.user.id },
      data: { name: data.name },
    })
    return NextResponse.json(
      { user, message: 'Perfil atualizado com sucesso!' },
      {
        status: 200,
      },
    )
  } catch (err) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar o perfil, tente novamente mais tarde!',
      },
      {
        status: 400,
      },
    )
  }
}

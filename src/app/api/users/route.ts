import { prismaClient } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const users = await prismaClient.user.findMany()

  return NextResponse.json(
    { data: users },
    {
      status: 200,
    },
  )
}

export async function POST(req: Request) {
  const res = await req.json()
  const { name, email } = res

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
    },
  })
  return NextResponse.json(
    { data: user },
    {
      status: 201,
    },
  )
}

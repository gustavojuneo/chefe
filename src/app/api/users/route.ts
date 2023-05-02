import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany()

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

  const user = await prisma.user.create({
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

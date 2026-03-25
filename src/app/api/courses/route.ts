import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        disciplines: {
          include: {
            calendarImage: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      courses: courses.map((course) => ({
        id: course.id,
        name: course.name,
        disciplinesCount: course.disciplines.length,
        calendarsGenerated: course.disciplines.filter((d) => d.calendarImage).length,
      })),
    })
  } catch (error) {
    console.error('Erro ao listar cursos:', error)
    return NextResponse.json(
      { error: 'Erro ao listar cursos' },
      { status: 500 },
    )
  }
}
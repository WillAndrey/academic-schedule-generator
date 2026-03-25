import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseName = searchParams.get('course')

    if (!courseName) {
      return NextResponse.json(
        { error: 'Nome do curso é obrigatório' },
        { status: 400 },
      )
    }

    const course = await prisma.course.findUnique({
      where: { name: courseName },
      include: {
        disciplines: {
          include: {
            calendarImage: true,
            entries: {
              orderBy: { date: 'asc' },
            },
          },
        },
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Curso não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      course: {
        name: course.name,
        disciplines: course.disciplines.map((d) => ({
          id: d.id,
          name: d.name,
          entriesCount: d.entries.length,
          hasCalendar: !!d.calendarImage,
          calendarImage: d.calendarImage
            ? {
                filename: d.calendarImage.filename,
                url: `/calendars/${d.calendarImage.filename}`,
              }
            : null,
        })),
      },
    })
  } catch (error) {
    console.error('Erro ao obter calendários:', error)
    return NextResponse.json(
      { error: 'Erro ao obter calendários' },
      { status: 500 },
    )
  }
}
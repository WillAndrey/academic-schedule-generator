import { PrismaClient } from '@prisma/client'
import { ExcelRow, parseDate } from '@/utils/validation'
import { generateCalendarImage } from './imageGenerator'

const prisma = new PrismaClient()

/**
 * Salva os dados extraídos do Excel no banco de dados
 */
export async function saveToDatabase(data: ExcelRow[]) {
  const results = {
    courses: 0,
    disciplines: 0,
    entries: 0,
    errors: [] as string[],
  }

  try {
    for (const item of data) {
      try {
        // Cria ou encontra o curso
        const course = await prisma.course.upsert({
          where: { name: item.course },
          update: {},
          create: { name: item.course },
        })

        // Cria ou encontra a disciplina
        const discipline = await prisma.discipline.upsert({
          where: {
            name_courseId: { name: item.discipline, courseId: course.id },
          },
          update: {},
          create: { name: item.discipline, courseId: course.id },
        })

        // Cria a entrada do calendário
        await prisma.calendarEntry.create({
          data: {
            date: parseDate(item.date),
            description: item.description,
            eventType: item.eventType || 'evento',
            disciplineId: discipline.id,
          },
        })

        results.entries++
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido'
        results.errors.push(`Erro ao processar linha: ${message}`)
      }
    }

    results.courses = await prisma.course.count()
    results.disciplines = await prisma.discipline.count()

    return results
  } catch (error) {
    throw new Error(`Erro ao salvar dados no banco: ${error instanceof Error ? error.message : 'Desconhecido'}`)
  }
}

/**
 * Gera imagens dos calendários para todas as disciplinas de um curso
 */
export async function generateCalendarsForCourse(courseName: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { name: courseName },
      include: {
        disciplines: {
          include: {
            entries: {
              orderBy: { date: 'asc' },
            },
          },
        },
      },
    })

    if (!course) {
      throw new Error(`Curso "${courseName}" não encontrado`)
    }

    const results = {
      generated: 0,
      failed: 0,
      errors: [] as string[],
    }

    for (const discipline of course.disciplines) {
      try {
        await generateCalendarImage(discipline)
        results.generated++
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido'
        results.errors.push(`Erro ao gerar calendário de "${discipline.name}": ${message}`)
        results.failed++
      }
    }

    return results
  } catch (error) {
    throw new Error(`Erro ao gerar calendários: ${error instanceof Error ? error.message : 'Desconhecido'}`)
  }
}

/**
 * Obtém todos os calendários gerados de um curso
 */
export async function getCalendarsForCourse(courseName: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { name: courseName },
      include: {
        disciplines: {
          include: {
            calendarImage: true,
          },
        },
      },
    })

    if (!course) {
      throw new Error(`Curso "${courseName}" não encontrado`)
    }

    return course.disciplines
  } catch (error) {
    throw new Error(`Erro ao obter calendários: ${error instanceof Error ? error.message : 'Desconhecido'}`)
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { parseExcel } from '@/services/excelParser'
import { saveToDatabase, generateCalendarsForCourse } from '@/services/databaseService'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file = data.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 },
      )
    }

    if (!file.name.endsWith('.xlsx')) {
      return NextResponse.json(
        { error: 'Apenas arquivos Excel (.xlsx) são permitidos' },
        { status: 400 },
      )
    }

    // Processa o arquivo Excel
    const buffer = await file.arrayBuffer()
    const parseResult = parseExcel(buffer)

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Erro ao validar arquivo Excel',
          validationErrors: parseResult.errors,
        },
        { status: 400 },
      )
    }

    // Salva os dados no banco
    const dbResult = await saveToDatabase(parseResult.data!)

    // Extrai nome do curso da primeira entrada (se existir)
    const courseName = parseResult.data?.[0]?.course

    // Gera as imagens dos calendários
    let calendarResult = { generated: 0, failed: 0, errors: [] as string[] }
    if (courseName) {
      try {
        calendarResult = await generateCalendarsForCourse(courseName)
      } catch (error) {
        console.error('Erro ao gerar calendários:', error)
        // Continua mesmo se a geração de imagens falhar
      }
    }

    return NextResponse.json({
      message: 'Dados processados com sucesso',
      stats: {
        courses: dbResult.courses,
        disciplines: dbResult.disciplines,
        entries: dbResult.entries,
        calendarsGenerated: calendarResult.generated,
        calendarsFailed: calendarResult.failed,
      },
      errors: [...dbResult.errors, ...calendarResult.errors],
    })
  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      {
        error: `Erro ao processar arquivo: ${error instanceof Error ? error.message : 'Desconhecido'}`,
      },
      { status: 500 },
    )
  }
}
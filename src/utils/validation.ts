/**
 * Validação de dados do Excel
 */

export interface ExcelRow {
  course: string
  discipline: string
  date: string
  description: string
  eventType?: string
}

export interface ValidationError {
  row: number
  field: string
  message: string
}

export function validateExcelData(data: any[]): { valid: boolean; errors: ValidationError[]; data?: ExcelRow[] } {
  const errors: ValidationError[] = []
  const validData: ExcelRow[] = []

  if (!data || data.length === 0) {
    return {
      valid: false,
      errors: [{ row: 0, field: 'general', message: 'O arquivo Excel está vazio' }],
    }
  }

  data.forEach((row, index) => {
    const course = extractField(row, ['Curso', 'Course', 'Nome do Curso'])
    const discipline = extractField(row, ['Disciplina', 'Discipline', 'Nome da Disciplina'])
    const date = extractField(row, ['Data', 'Date', 'Data do Evento'])
    const description = extractField(row, ['Descrição', 'Description', 'Evento', 'Event'])
    const eventType = extractField(row, ['Tipo', 'Type', 'Tipo de Evento'])

    if (!course) {
      errors.push({ row: index + 1, field: 'course', message: 'Campo "Curso" é obrigatório' })
    }

    if (!discipline) {
      errors.push({ row: index + 1, field: 'discipline', message: 'Campo "Disciplina" é obrigatório' })
    }

    if (!date) {
      errors.push({ row: index + 1, field: 'date', message: 'Campo "Data" é obrigatório' })
    } else if (!isValidDate(date)) {
      errors.push({ row: index + 1, field: 'date', message: `Data inválida: "${date}". Use formato DD/MM/YYYY ou YYYY-MM-DD` })
    }

    if (!description) {
      errors.push({ row: index + 1, field: 'description', message: 'Campo "Descrição" é obrigatório' })
    }

    if (course && discipline && date && isValidDate(date) && description) {
      validData.push({
        course: String(course).trim(),
        discipline: String(discipline).trim(),
        date: String(date),
        description: String(description).trim(),
        eventType: eventType ? String(eventType).trim() : undefined,
      })
    }
  })

  return {
    valid: errors.length === 0,
    errors,
    data: errors.length === 0 ? validData : undefined,
  }
}

/**
 * Extrai um campo de uma linha, tentando várias variações de nome
 */
function extractField(row: Record<string, any>, possibleNames: string[]): string | null {
  for (const name of possibleNames) {
    const value = row[name]
    if (value !== undefined && value !== null && value !== '') {
      return String(value)
    }
  }
  return null
}

/**
 * Valida se uma string é uma data válida
 */
function isValidDate(dateString: string): boolean {
  // Try DD/MM/YYYY
  const ddmmyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  const match1 = dateString.match(ddmmyy)
  if (match1) {
    const day = parseInt(match1[1])
    const month = parseInt(match1[2])
    const year = parseInt(match1[3])
    return day > 0 && day <= 31 && month > 0 && month <= 12 && year > 1900
  }

  // Try YYYY-MM-DD
  const yyyymmdd = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
  const match2 = dateString.match(yyyymmdd)
  if (match2) {
    const year = parseInt(match2[1])
    const month = parseInt(match2[2])
    const day = parseInt(match2[3])
    return day > 0 && day <= 31 && month > 0 && month <= 12 && year > 1900
  }

  return false
}

/**
 * Converte string de data para Date object
 */
export function parseDate(dateString: string): Date {
  // Try DD/MM/YYYY
  const ddmmyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  const match1 = dateString.match(ddmmyy)
  if (match1) {
    const day = parseInt(match1[1])
    const month = parseInt(match1[2])
    const year = parseInt(match1[3])
    return new Date(year, month - 1, day)
  }

  // Try YYYY-MM-DD
  const yyyymmdd = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
  const match2 = dateString.match(yyyymmdd)
  if (match2) {
    const year = parseInt(match2[1])
    const month = parseInt(match2[2])
    const day = parseInt(match2[3])
    return new Date(year, month - 1, day)
  }

  return new Date(dateString)
}
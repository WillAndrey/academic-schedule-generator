import * as XLSX from 'xlsx'
import { validateExcelData, ExcelRow } from '@/utils/validation'

/**
 * Parseia um arquivo Excel e valida os dados
 */
export function parseExcel(buffer: ArrayBuffer): {
  success: boolean
  data?: ExcelRow[]
  errors: Array<{ row?: number; field?: string; message: string }>
} {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' })

    if (workbook.SheetNames.length === 0) {
      return {
        success: false,
        errors: [{ message: 'O arquivo Excel não contém nenhuma aba' }],
      }
    }

    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    if (!worksheet) {
      return {
        success: false,
        errors: [{ message: `Não foi possível ler a aba "${sheetName}"` }],
      }
    }

    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    // Valida os dados extraídos
    const validation = validateExcelData(jsonData)

    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors,
      }
    }

    return {
      success: true,
      data: validation.data,
      errors: [],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido ao processar Excel'
    return {
      success: false,
      errors: [{ message: `Erro ao processar arquivo: ${message}` }],
    }
  }
}
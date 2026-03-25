import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { Discipline, CalendarEntry } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface DisciplineWithEntries extends Discipline {
  entries: CalendarEntry[]
}

/**
 * Gera uma imagem de calendário a partir de dados de disciplina
 */
export async function generateCalendarImage(discipline: DisciplineWithEntries) {
  const html = generateCalendarHTML(discipline)

  const calendarsDir = path.join(process.cwd(), 'public', 'calendars')
  if (!fs.existsSync(calendarsDir)) {
    fs.mkdirSync(calendarsDir, { recursive: true })
  }

  const filename = `${discipline.id}_${Date.now()}.png`
  const filepath = path.join(calendarsDir, filename)

  let browser: any
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.setViewport({ width: 1200, height: 800 })

    const screenshot = await page.screenshot({ type: 'png' })

    fs.writeFileSync(filepath, screenshot)

    // Salva informações da imagem no banco
    await prisma.calendarImage.upsert({
      where: { disciplineId: discipline.id },
      update: {
        filename,
        filepath,
      },
      create: {
        filename,
        filepath,
        disciplineId: discipline.id,
      },
    })

    return { success: true, filename, filepath }
  } catch (error) {
    throw new Error(`Erro ao gerar imagem: ${error instanceof Error ? error.message : 'Desconhecido'}`)
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

/**
 * Gera o HTML do calendário para renderização
 */
function generateCalendarHTML(discipline: DisciplineWithEntries): string {
  const entries = discipline.entries || []
  const calendarMonths = generateCalendarMonths(entries)

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Calendário - ${discipline.name}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #667eea;
          padding-bottom: 20px;
        }
        .header h1 {
          font-size: 36px;
          color: #333;
          margin-bottom: 10px;
        }
        .header p {
          font-size: 16px;
          color: #666;
        }
        .calendars-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }
        .month-card {
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          background: #f9f9f9;
        }
        .month-card h2 {
          color: #667eea;
          font-size: 22px;
          margin-bottom: 20px;
          text-align: center;
        }
        .calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-bottom: 15px;
        }
        .day-header {
          font-weight: bold;
          text-align: center;
          color: #667eea;
          font-size: 12px;
          padding: 8px;
          background: #eee;
          border-radius: 4px;
        }
        .day-cell {
          min-height: 60px;
          border: 1px solid #ddd;
          padding: 6px;
          font-size: 12px;
          background: white;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .day-cell.other-month {
          background: #f5f5f5;
          color: #ccc;
        }
        .day-cell.today {
          background: #e8f4f8;
          border: 2px solid #667eea;
        }
        .day-number {
          font-weight: bold;
          margin-bottom: 2px;
          color: #333;
        }
        .day-cell.other-month .day-number {
          color: #ccc;
        }
        .events {
          font-size: 10px;
          color: #666;
          margin-top: 2px;
        }
        .event-badge {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 2px 4px;
          border-radius: 2px;
          margin-top: 2px;
          font-size: 9px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .event-badge.prova {
          background: #e74c3c;
        }
        .event-badge.entrega {
          background: #f39c12;
        }
        .event-badge.aula {
          background: #3498db;
        }
        .event-badge.feriado {
          background: #9b59b6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📚 ${discipline.name}</h1>
          <p>Calendário Acadêmico 2026</p>
        </div>
        <div class="calendars-grid">
          ${calendarMonths.map((month) => generateMonthHTML(month, entries)).join('')}
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * Gera a grade de meses do calendário
 */
function generateCalendarMonths(entries: CalendarEntry[]): { month: number; year: number }[] {
  const months = new Set<string>()

  entries.forEach((entry) => {
    const date = new Date(entry.date)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    months.add(key)
  })

  return Array.from(months)
    .sort()
    .map((key) => {
      const [year, month] = key.split('-')
      return { year: parseInt(year), month: parseInt(month) }
    })
}

/**
 * Gera o HTML para um mês
 */
function generateMonthHTML(
  { month, year }: { month: number; year: number },
  entries: CalendarEntry[],
): string {
  const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
    new Date(year, month, 1),
  )

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const monthEntries = entries
    .filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === year && d.getMonth() === month
    })
    .reduce((acc, e) => {
      const day = new Date(e.date).getDate()
      if (!acc[day]) acc[day] = []
      acc[day].push(e)
      return acc
    }, {} as Record<number, CalendarEntry[]>)

  let days = ''

  // Dias do mês anterior
  for (let i = daysInPrevMonth - firstDay + 1; i <= daysInPrevMonth; i++) {
    days += `<div class="day-cell other-month"><div class="day-number">${i}</div></div>`
  }

  // Dias do mês atual
  for (let i = 1; i <= daysInMonth; i++) {
    const dayEvents = monthEntries[i] || []
    const today = new Date()
    const isToday =
      i === today.getDate() && month === today.getMonth() && year === today.getFullYear()

    days += `
      <div class="day-cell ${isToday ? 'today' : ''}">
        <div class="day-number">${i}</div>
        <div class="events">
          ${dayEvents.map((e) => `<div class="event-badge ${e.eventType || 'evento'}">${e.description}</div>`).join('')}
        </div>
      </div>
    `
  }

  // Dias do próximo mês
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
  for (let i = 1; i <= totalCells - (firstDay + daysInMonth); i++) {
    days += `<div class="day-cell other-month"><div class="day-number">${i}</div></div>`
  }

  return `
    <div class="month-card">
      <h2>${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}</h2>
      <div class="calendar">
        <div class="day-header">Dom</div>
        <div class="day-header">Seg</div>
        <div class="day-header">Ter</div>
        <div class="day-header">Qua</div>
        <div class="day-header">Qui</div>
        <div class="day-header">Sex</div>
        <div class="day-header">Sab</div>
        ${days}
      </div>
    </div>
  `
}
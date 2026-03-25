import { CalendarEntry } from '@prisma/client'

interface CalendarProps {
  disciplineName: string
  entries: CalendarEntry[]
}

export default function Calendar({ disciplineName, entries }: CalendarProps) {
  // Simple calendar rendering - list entries for now
  // TODO: Implement full calendar layout
  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="text-xl font-bold mb-4">{disciplineName}</h2>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.id} className="flex justify-between">
            <span>{entry.date.toLocaleDateString('pt-BR')}</span>
            <span>{entry.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
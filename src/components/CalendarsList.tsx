'use client'

import { useEffect, useState } from 'react'

interface Course {
  id: string
  name: string
  disciplinesCount: number
  calendarsGenerated: number
}

export default function CalendarsList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [courseDetails, setCourseDetails] = useState<any>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/courses')
      const data = await res.json()

      if (res.ok) {
        setCourses(data.courses)
      } else {
        setError(data.error || 'Erro ao carregar cursos')
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectCourse = async (courseName: string) => {
    try {
      const res = await fetch(`/api/calendars?course=${encodeURIComponent(courseName)}`)
      const data = await res.json()

      if (res.ok) {
        setSelectedCourse(courseName)
        setCourseDetails(data.course)
      } else {
        setError(data.error || 'Erro ao carregar detalhes')
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Carregando calendários...</p>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Nenhum curso foi processado ainda.</p>
        <p className="text-gray-500 text-sm mt-2">Faça upload de um arquivo Excel para começar.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">❌ Erro</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {!selectedCourse ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">📚 Cursos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => handleSelectCourse(course.name)}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📖 Disciplinas: {course.disciplinesCount}</p>
                  <p>📅 Calendários: {course.calendarsGenerated}/{course.disciplinesCount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        courseDetails && (
          <div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              ← Voltar
            </button>

            <h2 className="text-2xl font-semibold mb-4">{courseDetails.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseDetails.disciplines.map((discipline: any) => (
                <div key={discipline.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">{discipline.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    📌 {discipline.entriesCount} evento(s)
                  </p>

                  {discipline.hasCalendar && discipline.calendarImage ? (
                    <div>
                      <img
                        src={discipline.calendarImage.url}
                        alt={discipline.name}
                        className="w-full rounded mb-4 border border-gray-200"
                      />
                      <a
                        href={discipline.calendarImage.url}
                        download
                        className="block w-full text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        ⬇️ Baixar
                      </a>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded p-4 text-center text-gray-600">
                      <p>Calendário não gerado</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}
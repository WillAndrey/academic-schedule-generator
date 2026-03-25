'use client'

import { useState } from 'react'

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.xlsx')) {
      setError('Por favor, selecione um arquivo Excel (.xlsx)')
      setFile(null)
      return
    }
    setFile(selectedFile)
    setError(null)
    setResult(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        setResult({
          success: true,
          message: data.message,
          stats: data.stats,
        })
        setFile(null)
      } else {
        setError(data.error || 'Erro ao processar arquivo')
        if (data.validationErrors) {
          setResult({
            success: false,
            errors: data.validationErrors,
          })
        }
      }
    } catch (err) {
      console.error(err)
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">📤 Upload de Planilha Excel</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 cursor-pointer transition ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Arraste um arquivo aqui ou clique para selecionar
              </p>
              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <span className="text-blue-500 hover:text-blue-700 font-semibold">
                  Selecionar arquivo
                </span>
              </label>
              <p className="text-sm text-gray-500 mt-2">Excel (.xlsx) apenas</p>
            </div>
          </div>

          {/* File Preview */}
          {file && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Arquivo selecionado:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-sm text-blue-500 hover:text-blue-700 mt-2"
              >
                Remover
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!file || loading}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Processando...
              </>
            ) : (
              <>
                <span>Enviar</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">❌ Erro</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Validation Errors */}
      {result && !result.success && result.errors && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700 font-semibold">⚠️ Erros de Validação</p>
          <div className="mt-2 space-y-1 text-sm text-yellow-600">
            {result.errors.slice(0, 5).map((err: any, idx: number) => (
              <p key={idx}>
                Linha {err.row}: {err.message}
              </p>
            ))}
            {result.errors.length > 5 && (
              <p className="mt-2 font-semibold">... e mais {result.errors.length - 5} erros</p>
            )}
          </div>
        </div>
      )}

      {/* Success Message */}
      {result && result.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700 font-semibold">✅ Sucesso!</p>
          <p className="text-green-600 text-sm mt-1">{result.message}</p>
          {result.stats && (
            <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-gray-600">Cursos</p>
                <p className="text-2xl font-bold text-green-600">{result.stats.courses}</p>
              </div>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-gray-600">Disciplinas</p>
                <p className="text-2xl font-bold text-green-600">{result.stats.disciplines}</p>
              </div>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-gray-600">Eventos</p>
                <p className="text-2xl font-bold text-green-600">{result.stats.entries}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
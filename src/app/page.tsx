import UploadForm from '@/components/UploadForm'
import CalendarsList from '@/components/CalendarsList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">🎓 Automação de Calendários Acadêmicos</h1>
          <p className="text-blue-100">
            Sistema inteligente para criação automática de slides de calendários
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <UploadForm />
          </div>

          {/* Calendars Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <CalendarsList />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold mb-4">📋 Como usar:</h2>
          <ol className="space-y-2 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">1.</span>
              <span>Prepare um arquivo Excel com as colunas: <strong>Curso</strong>, <strong>Disciplina</strong>, <strong>Data</strong>, <strong>Descrição</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">2.</span>
              <span>Faça o upload do arquivo utilizando o painel à esquerda</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3.</span>
              <span>O sistema processará os dados e gerará calendários em imagem automaticamente</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4.</span>
              <span>Visualize e baixe as imagens dos calendários para usar em seus slides</span>
            </li>
          </ol>
        </div>
      </div>
    </main>
  )
}
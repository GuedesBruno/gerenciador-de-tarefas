import { PlusCircle, FolderOpen } from 'phosphor-react'

// Recebe a função 'onCreateProject' como propriedade
export default function EmptyState({ onCreateProject }) {
  return (
    <main className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <FolderOpen 
          weight="thin" 
          size={64} 
          className="mx-auto text-blue-500" 
        />
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Bem-vindo ao Gerenciador de Tarefas
          </h2>
          <p className="text-gray-600">
            Para começar, selecione um projeto existente na barra lateral ou crie um novo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* O onClick agora chama a função recebida */}
          <button
            onClick={onCreateProject}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <PlusCircle size={20} className="mr-2" />
            Criar novo projeto
          </button>
        </div>
      </div>
    </main>
  )
}
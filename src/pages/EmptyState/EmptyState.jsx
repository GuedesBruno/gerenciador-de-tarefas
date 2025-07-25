import { PlusCircle, FolderOpen } from 'phosphor-react'

export default function EmptyState({ onCreateProject }) {
  return (
    <main className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-50">
      <div className="text-center space-y-6 max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <FolderOpen 
            weight="thin" 
            size={64} 
            className="mx-auto text-blue-500 animate-pulse" 
          />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Bem-vindo ao Gerenciador de Tarefas
          </h2>
          <p className="text-gray-600">
            Para começar, selecione um projeto existente ou crie um novo
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCreateProject}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <PlusCircle size={20} className="mr-2" />
            Criar novo projeto
          </button>
          
          <button
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <FolderOpen size={20} className="mr-2" />
            Ver projetos
          </button>
        </div>
      </div>
    </main>
  )
}
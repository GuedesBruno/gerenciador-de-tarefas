import ProjectList from "./ProjectList";

// O componente agora recebe as funções do MainLayout
export default function Sidebar({ onOpenNew, onEditProject }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-700">Projetos</h2>
        {/* O botão "Novo" agora chama a função recebida via props */}
        <button
          className="text-blue-600 text-sm hover:underline"
          onClick={onOpenNew}
        >
          Novo
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {/* Passa a função de editar para a lista */}
        <ProjectList onEditProject={onEditProject} />
      </div>

      {/* O Modal foi removido daqui e movido para o MainLayout */}
    </aside>
  );
}
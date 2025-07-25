// Ícone de Colunas (pode manter ou remover se já tiver em outro lugar)
const ColumnsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M1,2.5a.5.5,0,0,1,.5-.5H6a.5.5,0,0,1,.5.5v11a.5.5,0,0,1-.5.5H1.5a.5.5,0,0,1-.5-.5Zm9,0a.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.5.5v11a.5.5,0,0,1-.5.5H10.5a.5.5,0,0,1-.5-.5Z"/>
  </svg>
);

export default function Topbar({ projetoAtual, onAddTask, onToggleView, viewMode, onManageColumns }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "pausado":
        return "bg-yellow-100 text-yellow-800";
      case "arquivado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-transparent text-transparent";
    }
  };

  return (
    <div className="bg-white shadow-sm border-b p-4">
      <div className="flex items-center justify-between">
        {/* Lado Esquerdo: Nome e Status do Projeto */}
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {projetoAtual?.name || "Nenhum projeto selecionado"}
          </h2>
          {projetoAtual?.status && (
            <span className={`ml-3 px-3 py-1 text-sm rounded-full capitalize ${getStatusColor(projetoAtual.status)}`}>
              {projetoAtual.status}
            </span>
          )}
        </div>

        {/* LADO DIREITO: Container para TODOS os botões */}
        <div className="flex items-center gap-4">
          <button
            onClick={onAddTask}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:bg-gray-400"
            disabled={!projetoAtual?.id}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
            Nova Tarefa
          </button>

          <button
            onClick={onToggleView}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
          >
            {viewMode === "kanban" ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                Ver em Lista
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                Ver em Kanban
              </>
            )}
          </button>

          {/* Botão de Gerenciar Colunas agora está dentro do mesmo grupo */}
          <button
            onClick={onManageColumns}
            className="p-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
            title="Gerenciar Colunas"
          >
            <ColumnsIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
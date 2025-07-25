// Este componente agora recebe 'dragHandleListeners' para a alça de arrasto
export default function TaskCard({ task, onDelete, onEdit, dragHandleListeners }) {
  // Ícone da alça de arrasto
  const DragHandle = () => (
    <div 
      {...dragHandleListeners} 
      className="cursor-grab p-1 text-gray-400 hover:text-gray-600"
      title="Arrastar para mover"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    </div>
  );

  return (
    // O div principal agora tem o evento para EDITAR
    <div onClick={onEdit} className="bg-white p-2 rounded shadow text-sm cursor-pointer">
      <div className="flex justify-between items-start gap-2">
        
        {/* Lado Esquerdo: Alça + Informações */}
        <div className="flex items-start gap-1 flex-1">
          <DragHandle />
          <div className="flex-1">
            <p className="font-bold">{task.title}</p>
            {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
          </div>
        </div>

        {/* Lado Direito: Botão de Excluir */}
        {onDelete && (
           <button
             className="text-red-500 hover:text-red-700 text-xs p-1 flex-shrink-0"
             title="Excluir Tarefa"
             onClick={(e) => {
               e.stopPropagation(); // Impede que o clique dispare a edição
               if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
                 onDelete(task.id);
               }
             }}
           >
             Excluir
           </button>
        )}
      </div>

      <div className="text-xs text-gray-500 mt-2 pl-8">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('pt-BR') : 'Sem prazo'} • {task.responsible || 'Não atribuído'}
      </div>
    </div>
  );
}
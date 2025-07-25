// Função para calcular o progresso
const ProgressBar = ({ subtasks = [] }) => {
  if (!subtasks || subtasks.length === 0) return null;

  const completedCount = subtasks.filter(st => st.isCompleted).length;
  const totalCount = subtasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
        <span>Progresso</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className="bg-blue-500 h-1.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function TaskCard({ task, onDelete, onEdit, dragHandleListeners }) {
  const DragHandle = () => (
    <div {...dragHandleListeners} className="cursor-grab p-1 text-gray-400 hover:text-gray-600" title="Arrastar para mover">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
    </div>
  );

  return (
    <div onClick={onEdit} className="bg-white p-3 rounded-lg shadow text-sm cursor-pointer border hover:border-blue-500">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-1 flex-1">
          <DragHandle />
          <div className="flex-1">
            <p className="font-bold text-gray-800">{task.title}</p>
            {task.description && <p className="text-gray-600 text-xs mt-1">{task.description}</p>}
          </div>
        </div>
        {onDelete && (
           <button
             className="text-red-500 hover:text-red-700 text-xs p-1 flex-shrink-0"
             title="Excluir Tarefa"
             onClick={(e) => { e.stopPropagation(); if (window.confirm("...")) onDelete(task.id); }}
           >
             Excluir
           </button>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-2 pl-8">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('pt-BR') : 'Sem prazo'} • {task.responsible || 'Não atribuído'}
      </div>
      {/* 4. EXIBIR A BARRA DE PROGRESSO */}
      <ProgressBar subtasks={task.subtasks} />
    </div>
  );
}
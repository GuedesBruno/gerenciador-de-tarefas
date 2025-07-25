import { memo } from 'react';

// --- Ícones como componentes ---
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const priorityColors = {
  'Baixa': 'bg-blue-500',
  'Média': 'bg-yellow-500',
  'Alta': 'bg-red-500',
};

const PriorityIndicator = ({ priority }) => {
  if (!priority) return null;
  const colorClass = priorityColors[priority];
  return <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${colorClass}`} title={`Prioridade: ${priority}`}></div>;
};

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
        <div className={`h-1.5 rounded-full ${percentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default memo(function TaskCard({ task, onDelete, onEdit, dragHandleListeners }) {
  const DragHandle = () => (
    <div {...dragHandleListeners} className="cursor-grab p-1 text-gray-400 hover:text-gray-600" title="Arrastar para mover">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
    </div>
  );

  return (
    <div onClick={onEdit} className="relative bg-white p-3 rounded-lg shadow text-sm cursor-pointer border hover:border-blue-500">
      <PriorityIndicator priority={task.priority} />
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-1 flex-1">
          <DragHandle />
          <div className="flex-1">
            <p className="font-bold text-gray-800 pr-4">{task.title}</p>
            {task.description && <p className="text-gray-600 text-xs mt-1">{task.description}</p>}
          </div>
        </div>
        {onDelete && (
           <button
             className="text-red-500 hover:bg-red-100 rounded-full p-1 flex-shrink-0"
             title="Excluir Tarefa"
             onClick={(e) => { e.stopPropagation(); if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) onDelete(task.id); }}
           >
             <TrashIcon />
           </button>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-2 pl-8">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('pt-BR') : 'Sem prazo'} • {task.responsible || 'Não atribuído'}
      </div>
      <ProgressBar subtasks={task.subtasks} />
    </div>
  );
});
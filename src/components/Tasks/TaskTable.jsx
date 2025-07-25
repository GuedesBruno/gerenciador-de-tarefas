import { useTasks } from "../../context/TaskContext";
import { TASK_STATUS, COLUMNS } from "../../constants";

const ProgressBar = ({ subtasks = [] }) => {
  if (!subtasks || subtasks.length === 0) return <span className="text-xs text-gray-400">N/A</span>;
  const completedCount = subtasks.filter(st => st.isCompleted).length;
  const percentage = Math.round((completedCount / subtasks.length) * 100);
  return (
    <div className="w-24">
      <div className="flex justify-between text-xs mb-1"><span className="font-medium">{percentage}%</span></div>
      <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div></div>
    </div>
  );
};

const priorityClasses = {
  'Baixa': 'text-blue-600 bg-blue-100',
  'Média': 'text-yellow-600 bg-yellow-100',
  'Alta': 'text-red-600 bg-red-100',
};

export default function TaskTable({ tasks, onEdit }) {
  const { deleteTask, moveTask } = useTasks();

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Título</th>
            <th className="px-4 py-3 text-left">Progresso</th>
            <th className="px-4 py-3 text-left">Responsável</th>
            <th className="px-4 py-3 text-left">Prazo</th>
            <th className="px-4 py-3 text-left">Prioridade</th> {/* Nova Coluna */}
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((tarefa) => (
            <tr key={tarefa.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{tarefa.title}</td>
              <td className="px-4 py-2"><ProgressBar subtasks={tarefa.subtasks} /></td>
              <td className="px-4 py-2">{tarefa.responsible}</td>
              <td className="px-4 py-2">{tarefa.dueDate}</td>
              {/* Célula da Prioridade */}
              <td className="px-4 py-2">
                {tarefa.priority ? (
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityClasses[tarefa.priority]}`}>
                    {tarefa.priority}
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-4 py-2">
                <select value={tarefa.status} onChange={(e) => moveTask(tarefa.id, e.target.value)} className="border px-2 py-1 rounded-md text-xs bg-white">
                  <option value={TASK_STATUS.TODO}>{COLUMNS[TASK_STATUS.TODO]}</option>
                  <option value={TASK_STATUS.IN_PROGRESS}>{COLUMNS[TASK_STATUS.IN_PROGRESS]}</option>
                  <option value={TASK_STATUS.DONE}>{COLUMNS[TASK_STATUS.DONE]}</option>
                </select>
              </td>
              <td className="px-4 py-2 flex gap-3">
                <button onClick={() => onEdit(tarefa)} className="text-blue-600 hover:underline">Editar</button>
                <button onClick={() => deleteTask(tarefa.id)} className="text-red-600 hover:underline">Excluir</button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr><td colSpan="7" className="px-4 py-6 text-center text-gray-500">Nenhuma tarefa.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
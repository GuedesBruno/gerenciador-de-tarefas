import { useTasks } from "../../context/TaskContext";

export default function TaskTable({ tasks, onEdit }) {
  // Agora também pegamos 'moveTask' do contexto.
  const { deleteTask, moveTask } = useTasks();

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Título</th>
            <th className="px-4 py-3 text-left">Responsável</th>
            <th className="px-4 py-3 text-left">Prazo</th>
            {/* Nova coluna de Status */}
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((tarefa) => (
            <tr key={tarefa.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{tarefa.title}</td>
              <td className="px-4 py-2">{tarefa.responsible}</td>
              <td className="px-4 py-2">{tarefa.dueDate}</td>
              {/* Dropdown para alterar o status */}
              <td className="px-4 py-2">
                <select
                  value={tarefa.status}
                  onChange={(e) => moveTask(tarefa.id, e.target.value)}
                  className="border px-2 py-1 rounded-md text-xs bg-white"
                >
                  <option value="todo">A Fazer</option>
                  <option value="inprogress">Em Andamento</option>
                  <option value="done">Concluído</option>
                </select>
              </td>
              <td className="px-4 py-2 flex gap-3">
                <button
                  onClick={() => onEdit(tarefa)}
                  className="text-blue-600 hover:underline hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTask(tarefa.id)}
                  className="text-red-600 hover:underline hover:text-red-800"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                Nenhuma tarefa encontrada para este projeto.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
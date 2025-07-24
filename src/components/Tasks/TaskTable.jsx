import { useTasks } from "../../context/TaskContext";
import { useSelectedProject } from "../../context/SelectedProjectContext";

export default function TaskTable({ onEdit }) {
  const { tasks, deleteTask } = useTasks();
  const { selectedProjectId } = useSelectedProject();

  const tarefas = tasks.filter((t) => t.projectId === selectedProjectId);

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Título</th>
            <th className="px-4 py-2 text-left">Responsável</th>
            <th className="px-4 py-2 text-left">Prazo</th>
            <th className="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{tarefa.title}</td>
              <td className="px-4 py-2">{tarefa.responsible}</td>
              <td className="px-4 py-2">{tarefa.dueDate}</td>
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
          {tarefas.length === 0 && (
            <tr>
              <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                Nenhuma tarefa cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
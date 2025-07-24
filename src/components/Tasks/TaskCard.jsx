export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-2 rounded shadow text-sm">
      <div className="font-bold">{task.title}</div>
      <div>{task.responsible}</div>
      <div className="text-xs text-gray-500">{new Date(task.dueDate).toLocaleDateString('pt-BR')}</div>
    </div>
  );
}
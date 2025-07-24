import { SortableContext } from "@dnd-kit/sortable";
import { SortableTaskCard } from "./SortableTaskCard";

export default function Column({ id, label, tasks, onEdit, deleteTask }) {
  const taskIds = tasks.map((tarefa) => String(tarefa.id));

  return (
    <SortableContext items={taskIds}>
      <div
        id={id}
        className="bg-gray-100 p-4 rounded min-h-[300px] shadow"
      >
        <h2 className="font-bold text-lg mb-4">{label}</h2>

        {tasks.map((tarefa) => (
          <SortableTaskCard
            key={tarefa.id}
            tarefa={tarefa}
            onEdit={onEdit}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </SortableContext>
  );
}
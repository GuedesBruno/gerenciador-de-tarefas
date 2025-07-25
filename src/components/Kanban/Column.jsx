import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { SortableTaskCard } from "./SortableTaskCard";

export default function Column({ id, label, tasks, onEdit, deleteTask }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-4 rounded min-h-[300px] shadow flex flex-col gap-3">
      <h2 className="font-bold text-lg mb-1">{label}</h2>
      
      {/* O SortableContext agora recebe os objetos de tarefa completos */}
      <SortableContext items={tasks.map(task => String(task.id))}>
        {tasks.map((tarefa) => (
          <SortableTaskCard
            key={String(tarefa.id)}
            tarefa={tarefa}
            onEdit={onEdit}
            onDelete={deleteTask}
          />
        ))}
      </SortableContext>
    </div>
  );
}
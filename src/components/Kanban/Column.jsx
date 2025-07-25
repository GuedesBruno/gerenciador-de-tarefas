import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTaskCard } from "./SortableTaskCard";

export default function Column({ id, label, tasks, onEdit, deleteTask }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef} 
      className="bg-gray-100 p-4 rounded-lg shadow-inner flex flex-col gap-3 min-h-[600px]"
    >
      <h2 className="font-bold text-lg mb-1 sticky top-0 bg-gray-100 py-1">
        {label} ({tasks.length})
      </h2>
      
      <SortableContext 
        items={tasks.map(task => String(task.id))}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2 min-h-full">
          {tasks.map((tarefa) => (
            <SortableTaskCard
              key={String(tarefa.id)}
              tarefa={tarefa}
              onEdit={onEdit}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
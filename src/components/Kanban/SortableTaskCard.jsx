import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "../Tasks/TaskCard";

export function SortableTaskCard({ tarefa, onEdit, onDelete }) {
  const {
    // Agora pegamos o 'attributes' separadamente
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tarefa.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    // O 'ref' e o 'style' ficam no container, mas os listeners vão para o TaskCard
    <div ref={setNodeRef} style={style} {...attributes}>
      <TaskCard 
        task={tarefa} 
        onEdit={() => onEdit(tarefa)} 
        onDelete={onDelete}
        // Passamos apenas os 'listeners' para a alça de arrastar dentro do TaskCard
        dragHandleListeners={listeners}
      />
    </div>
  );
}
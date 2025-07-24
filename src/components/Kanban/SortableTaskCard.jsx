import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableTaskCard({ tarefa, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(tarefa.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`bg-white p-4 mb-3 rounded shadow cursor-grab hover:ring 
        ${isDragging ? "scale-105 ring-2 ring-blue-300" : ""}
      `}
      onClick={() => onEdit(tarefa)}
    >
      <h3 className="font-semibold text-blue-700">{tarefa.title}</h3>
      <p className="text-sm text-gray-700">{tarefa.desc}</p>

      <div className="mt-2 text-xs text-gray-500">
        {tarefa.responsible} • {tarefa.dueDate}
      </div>

      <div className="mt-3 flex justify-end">
        <button
          className="text-red-500 text-sm hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(tarefa.id);
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
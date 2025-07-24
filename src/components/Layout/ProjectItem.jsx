import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSelectedProject } from "../../context/SelectedProjectContext";

export default function ProjectItem({ project, onEdit, onDelete, onArchive }) {
  const { selectedProjectId, setSelectedProjectId } = useSelectedProject();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: String(project.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = selectedProjectId === project.id;

  return (
    <div
      className={`group px-3 py-2 rounded-md flex justify-between items-center hover:bg-gray-100 transition cursor-pointer ${project.status === "arquivado" ? "opacity-50" : ""} ${isSelected ? "bg-blue-50 border border-blue-300" : ""}`}
      onClick={() => setSelectedProjectId(project.id)}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="flex flex-col cursor-grab"
      >
        <span className="text-sm font-medium text-gray-800">{project.name}</span>
        <span className="text-xs text-gray-500 capitalize">{project.status}</span>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition text-xs text-gray-500 items-end">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(project); }}
          className="text-blue-600 hover:text-blue-800 text-[0.7rem] px-1 py-0.5 rounded hover:bg-blue-100"
        >
          Editar
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); if (confirm("Tem certeza que deseja excluir este projeto?")) onDelete(project.id); }}
          className="text-red-600 hover:text-red-800 text-[0.7rem] px-1 py-0.5 rounded hover:bg-red-100"
        >
          Excluir
        </button>
        {project.status !== "arquivado" && (
          <button
            onClick={(e) => { e.stopPropagation(); onArchive(project.id); }}
            className="text-yellow-600 hover:text-yellow-800 text-[0.7rem] px-1 py-0.5 rounded hover:bg-yellow-100"
          >
            Arquivar
          </button>
        )}
      </div>
    </div>
  );
} 
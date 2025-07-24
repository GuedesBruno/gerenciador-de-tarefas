import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSelectedProject } from "../../context/SelectedProjectContext";

// --- Ícones como componentes ---

const DragHandle = (props) => (
  <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="cursor-grab text-gray-400 hover:text-gray-600 flex-shrink-0">
    <path d="M4 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const ArchiveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />
  </svg>
);


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
      ref={setNodeRef}
      style={style}
      className={`group px-2 py-2 rounded-md flex items-center justify-between gap-2 hover:bg-gray-100 transition-colors cursor-pointer ${project.status === "arquivado" ? "opacity-50" : ""} ${isSelected ? "bg-blue-50 border border-blue-300" : ""}`}
      onClick={() => setSelectedProjectId(project.id)}
    >
      {/* Lado Esquerdo: Alça de arrastar e informações do projeto */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div {...attributes} {...listeners}>
          <DragHandle />
        </div>
        <div className="flex flex-col flex-1 truncate">
          <span className="text-sm font-medium text-gray-800 truncate" title={project.name}>{project.name}</span>
          <span className="text-xs text-gray-500 capitalize">{project.status}</span>
        </div>
      </div>

      {/* Lado Direito: Botões de ícone */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(project); }}
          className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
          title="Editar"
        >
          <PencilIcon />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); if (confirm("Tem certeza que deseja excluir este projeto?")) onDelete(project.id); }}
          className="p-1 rounded-full text-red-600 hover:bg-red-100"
          title="Excluir"
        >
          <TrashIcon />
        </button>
        {project.status !== "arquivado" && (
          <button
            onClick={(e) => { e.stopPropagation(); onArchive(project.id); }}
            className="p-1 rounded-full text-yellow-600 hover:bg-yellow-100"
            title="Arquivar"
          >
            <ArchiveIcon />
          </button>
        )}
      </div>
    </div>
  );
}
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
} from "@dnd-kit/sortable";
import { useProjects } from "../../context/ProjectContext";
import ProjectItem from "./ProjectItem";

export default function ProjectList({ onEditProject }) {
  const {
    projects,
    deleteProject,
    archiveProject,
    reorderProjects,
  } = useProjects();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === Number(active.id));
      const newIndex = projects.findIndex((p) => p.id === Number(over.id));
      const reordered = arrayMove(projects, oldIndex, newIndex);
      reorderProjects(reordered);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={projects.map((p) => String(p.id))}>
        <div className="space-y-2">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onEdit={onEditProject}
              onDelete={deleteProject}
              onArchive={archiveProject}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
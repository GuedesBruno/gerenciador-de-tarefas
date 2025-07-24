import Column from "../Kanban/Column";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useTasks } from "../../context/TaskContext";
import { useSelectedProject } from "../../context/SelectedProjectContext";

const columns = {
  todo: "A Fazer",
  inprogress: "Em Andamento",
  done: "Concluído",
};

export default function TaskBoard({ onEdit }) {
  const { tasks, moveTask, deleteTask } = useTasks();
  const { selectedProjectId } = useSelectedProject();

  const sensors = useSensors(useSensor(PointerSensor));
  const tarefas = tasks.filter((t) => t.projectId === selectedProjectId);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id && over?.id && active.id !== over.id) {
      const taskId = parseInt(active.id);
      const newStatus = over.id;
      moveTask(taskId, newStatus);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, label]) => {
          const filtered = tarefas.filter((t) => t.status === status);
          return (
            <Column
              key={status}
              id={status}
              label={label}
              tasks={filtered}
              onEdit={onEdit}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>
    </DndContext>
  );
}
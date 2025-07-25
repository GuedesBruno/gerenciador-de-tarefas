import { useState } from "react";
import Column from "./Column";
import TaskCard from "../Tasks/TaskCard";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { useTasks } from "../../context/TaskContext";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

const columns = {
  todo: "A Fazer",
  inprogress: "Em Andamento",
  done: "Concluído",
};

export default function TaskBoard({ tasks, onEdit, onDelete }) {
  const { moveTask, deleteTask } = useTasks();
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart(event) {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return; // Proteção contra over null

    // Simplificar a lógica de identificação da coluna de destino
    const newStatus = over.id;
    const taskId = active.id;

    if (newStatus && taskId) {
      moveTask(taskId, newStatus);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, label]) => {
          const tasksInColumn = tasks.filter((t) => t.status === status);
          return (
            <Column
              key={status}
              id={status}
              label={label}
              tasks={tasksInColumn}
              onEdit={onEdit}
              // Passamos a função deleteTask para a coluna
              deleteTask={deleteTask}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="shadow-lg">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
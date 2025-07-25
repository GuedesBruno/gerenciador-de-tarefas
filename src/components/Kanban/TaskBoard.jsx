import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import Column from "./Column";
import TaskCard from "../Tasks/TaskCard";
import { useTasks } from "../../context/TaskContext";

const columns = {
  todo: "A Fazer",
  inprogress: "Em Andamento",
  done: "Concluído",
};

export default function TaskBoard({ tasks, onEdit, onDelete }) {
  const { setTasks } = useTasks(); // Usaremos setTasks para a reordenação
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function handleDragStart(event) {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Encontra a tarefa ativa
    const activeTask = tasks.find(t => t.id === activeId);
    if (!activeTask) return;

    // Determina a coluna de destino
    const overColumnId = over.data.current?.sortable?.containerId || over.id;

    setTasks(currentTasks => {
      // Caso 1: Mover para uma coluna DIFERENTE
      if (activeTask.status !== overColumnId) {
        return currentTasks.map(task => 
          task.id === activeId 
            ? { ...task, status: overColumnId }
            : task
        );
      }
      
      // Caso 2: Reordenar na MESMA coluna
      const activeIndex = currentTasks.findIndex(t => t.id === activeId);
      const overIndex = currentTasks.findIndex(t => t.id === overId);
      
      if (activeIndex === -1 || overIndex === -1) return currentTasks;
      
      return arrayMove([...currentTasks], activeIndex, overIndex);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
              deleteTask={onDelete}
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
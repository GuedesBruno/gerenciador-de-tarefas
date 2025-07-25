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
  const { setTasks } = useTasks();
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

    if (!over || active.id === over.id) return;

    setTasks(currentTasks => {
      const activeIndex = currentTasks.findIndex(t => t.id === active.id);
      const overIndex = currentTasks.findIndex(t => t.id === over.id);
      
      const activeTask = currentTasks[activeIndex];
      const overTask = overIndex !== -1 ? currentTasks[overIndex] : null;
      
      const overIsAColumn = columns[over.id];

      // Caso 1: Soltar em uma coluna vazia
      if (overIsAColumn && activeTask.status !== over.id) {
        const newTasks = [...currentTasks];
        newTasks[activeIndex] = { ...activeTask, status: over.id };
        return newTasks;
      }
      
      // Caso 2: Soltar sobre outra tarefa
      if (overTask) {
        // Sub-caso 2.1: Reordenar na mesma coluna
        if (activeTask.status === overTask.status) {
          return arrayMove(currentTasks, activeIndex, overIndex);
        } 
        // Sub-caso 2.2: Mover para outra coluna (soltando em um card)
        else {
          const newTasks = [...currentTasks];
          newTasks[activeIndex] = { ...activeTask, status: overTask.status };
          // Reordena na nova lista com o status já atualizado
          const finalActiveIndex = newTasks.findIndex(t => t.id === active.id);
          const finalOverIndex = newTasks.findIndex(t => t.id === over.id);
          return arrayMove(newTasks, finalActiveIndex, finalOverIndex);
        }
      }
      
      return currentTasks;
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
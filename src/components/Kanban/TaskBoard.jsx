import { useState } from "react";
import Column from "./Column";
import TaskCard from "../Tasks/TaskCard";
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay, arrayMove } from "@dnd-kit/core";
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
    setActiveTask(tasks.find(t => t.id === event.active.id));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find(t => t.id === activeId);
    const overTask = tasks.find(t => t.id === overId);

    if (!activeTask) return;

    setTasks(currentTasks => {
      const activeIndex = currentTasks.findIndex(t => t.id === activeId);
      const overIndex = overTask ? currentTasks.findIndex(t => t.id === overId) : -1;
      
      const overIsAColumn = columns[over.id];

      if (overIsAColumn && activeTask.status !== over.id) {
        currentTasks[activeIndex].status = over.id;
        return [...currentTasks];
      }
      
      if (overTask) {
        if (activeTask.status === overTask.status) {
          return arrayMove(currentTasks, activeIndex, overIndex);
        }
        currentTasks[activeIndex].status = overTask.status;
        return arrayMove(currentTasks, activeIndex, overIndex);
      }

      return currentTasks;
    });
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
        {activeTask ? <div className="shadow-lg"><TaskCard task={activeTask} /></div> : null}
      </DragOverlay>
    </DndContext>
  );
}
import { useState, useEffect } from "react";
import Column from "./Column";
import TaskCard from "../Tasks/TaskCard";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  arrayMove,
} from "@dnd-kit/core";
import { useTasks } from "../../context/TaskContext";
import LoadingSpinner from '../UI/LoadingSpinner';

const columnsConfig = {
  todo: "A Fazer",
  inprogress: "Em Andamento",
  done: "Concluído",
};

export default function TaskBoard({ tasks, onEdit, onDelete }) {
  const { setTasks } = useTasks();
  const [columns, setColumns] = useState({ todo: [], inprogress: [], done: [] });
  const [activeTask, setActiveTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sincroniza o estado local das colunas com as tarefas que vêm de fora
  useEffect(() => {
    setColumns({
      todo: tasks.filter((t) => t.status === "todo"),
      inprogress: tasks.filter((t) => t.status === "inprogress"),
      done: tasks.filter((t) => t.status === "done"),
    });
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  function findTask(id) {
    return tasks.find(t => t.id === id);
  }

  function findColumnIdOfTask(id) {
    if (!id) return null;
    for (const [columnId, tasksInColumn] of Object.entries(columns)) {
      if (tasksInColumn.some(task => task.id === id)) {
        return columnId;
      }
    }
    return null;
  }

  function handleDragStart(event) {
    setActiveTask(findTask(event.active.id));
  }

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumn = findColumnIdOfTask(activeId);
    // Destino pode ser uma coluna ou outro card
    const overColumn = findColumnIdOfTask(overId) || (columnsConfig[overId] ? overId : null);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }

    // Lógica para mover visualmente o card para a nova coluna
    setColumns(prev => {
      const activeItems = prev[activeColumn];
      const overItems = prev[overColumn];
      const activeIndex = activeItems.findIndex(t => t.id === activeId);
      
      const [movedItem] = activeItems.splice(activeIndex, 1);
      overItems.push(movedItem);
      
      return { ...prev };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    
    const activeColumn = findColumnIdOfTask(activeId);
    const overColumn = findColumnIdOfTask(overId) || (columnsConfig[overId] ? overId : null);

    if (!activeColumn || !overColumn || activeId === overId) {
      return;
    }

    // Salva o estado final
    const finalColumns = { ...columns };
    const activeItems = finalColumns[activeColumn];
    
    const activeIndex = activeItems.findIndex(t => t.id === activeId);
    const overIndex = columns[overColumn].findIndex(t => t.id === overId);

    let newTasks;
    // Se mudou de coluna...
    if (activeColumn !== overColumn) {
      newTasks = tasks.map(t => t.id === activeId ? { ...t, status: overColumn } : t);
    } 
    // Se reordenou na mesma coluna...
    else {
      newTasks = arrayMove(tasks, 
        tasks.findIndex(t => t.id === activeId), 
        tasks.findIndex(t => t.id === overId)
      );
    }
    setTasks(newTasks);
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(columnsConfig).map(([columnId, label]) => (
          <Column
            key={columnId}
            id={columnId}
            label={label}
            tasks={columns[columnId]}
            onEdit={onEdit}
            deleteTask={onDelete}
          />
        ))}
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
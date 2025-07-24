import Column from "../Kanban/Column";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useTasks } from "../../context/TaskContext";

const columns = {
  todo: "A Fazer",
  inprogress: "Em Andamento",
  done: "Concluído",
};

// Receba 'tasks' como uma prop, em vez de buscá-lo no contexto aqui.
export default function TaskBoard({ tasks, onEdit }) { 
  const { moveTask, deleteTask } = useTasks(); // Pegue apenas as funções do contexto.
  
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.data.current?.sortable?.containerId || over.id;
    const taskId = parseInt(active.id);
    const task = tasks.find(t => t.id === taskId);

    // Adicione esta linha para depuração
    console.log(`Drag End: Tarefa ID=${taskId}, Status Antigo=${task?.status}, Novo Status=${newStatus}`);

    if (task && task.status !== newStatus) {
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
          // A filtragem agora usa a lista de tarefas ('tasks') recebida via props.
          const filtered = tasks.filter((t) => t.status === status);
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
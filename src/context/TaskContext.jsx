import { createContext, useContext, useState, useCallback } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasksState] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const setTasks = useCallback(
    (tasksOrUpdater) => {
      const newTasks =
        typeof tasksOrUpdater === "function"
          ? tasksOrUpdater(tasks)
          : tasksOrUpdater;

      // Garante que todas as tarefas têm IDs únicos
      const validTasks = newTasks.filter((task) => task.id);

      setTasksState(validTasks);
      localStorage.setItem("tasks", JSON.stringify(validTasks));
    },
    [tasks]
  );

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
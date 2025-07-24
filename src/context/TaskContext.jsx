import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Falha ao carregar tarefas do localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Falha ao salvar tarefas no localStorage", error);
    }
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTask = (taskId, newStatus) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.error(`ERRO: Tarefa com ID ${taskId} não foi encontrada!`);
      return;
    }
    
    const newTasksArray = [...tasks];

    const updatedTask = {
      ...newTasksArray[taskIndex],
      status: newStatus,
    };

    newTasksArray[taskIndex] = updatedTask;

    setTasks(newTasksArray);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, moveTask }}
    >
      {children}
    </TaskContext.Provider> // <-- ERRO CORRIGIDO AQUI
  );
}

export const useTasks = () => useContext(TaskContext);
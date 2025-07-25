import { createContext, useContext, useState, useEffect } from "react";
import * as taskService from '../services/taskService';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => taskService.getTasks());

  useEffect(() => {
    taskService.saveTasks(tasks);
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, { ...newTask, subtasks: newTask.subtasks || [] }]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Exporta todas as funções, incluindo o 'setTasks' para o D&D
  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
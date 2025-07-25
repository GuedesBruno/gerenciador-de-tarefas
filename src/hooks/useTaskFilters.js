import { useState, useMemo } from 'react';

export function useTaskFilters(tasks, viewMode, selectedProjectId) {
  // Adicione verificação de parâmetros
  if (!Array.isArray(tasks)) {
    console.error('tasks não é um array:', tasks);
    return { filteredTasks: [], handleFilter: () => {} };
  }

  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });

  const handleFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredTasks = useMemo(() => {
    const tasksInProject = tasks.filter((t) => t.projectId === selectedProjectId);

    if (!filters.search && !filters.status && !filters.priority) {
      return tasksInProject;
    }

    const commonFiltered = tasksInProject.filter((t) =>
      (t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (t.responsible && t.responsible.toLowerCase().includes(filters.search.toLowerCase()))) &&
      (!filters.priority || t.priority === t.priority)
    );

    if (viewMode === "lista" && filters.status) {
      return commonFiltered.filter((t) => t.status === filters.status);
    }
    
    return commonFiltered;
  }, [tasks, filters, viewMode, selectedProjectId]);

  return { filteredTasks, filters, handleFilter };
}
import { useState, useMemo } from 'react';

export function useTaskFilters(tasks, viewMode, selectedProjectId) {
  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });

  const handleFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredTasks = useMemo(() => {
    // ... toda a lógica da função getFilteredTasks() que está no MainLayout ...
    // iria aqui dentro.
  }, [tasks, filters, viewMode, selectedProjectId]);

  return { filteredTasks, filters, handleFilter };
}
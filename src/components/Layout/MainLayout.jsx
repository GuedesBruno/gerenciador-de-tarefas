import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FilterBar from "./FilterBar";
import TaskBoard from "../Kanban/TaskBoard";
import TaskTable from "../Tasks/TaskTable";
import ModalTask from "../modals/ModalTask";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { useSelectedProject } from "../../context/SelectedProjectContext";

export default function MainLayout() {
  const { tasks } = useTasks();
  const { projects } = useProjects();
  const { selectedProjectId } = useSelectedProject();
  const [viewMode, setViewMode] = useState("kanban");
  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const projetoAtual =
    projects.find((p) => p.id === selectedProjectId) ||
    { name: "Nenhum projeto selecionado", status: "" };

  const handleAddTask = () => {
    if (!selectedProjectId) {
      alert("Por favor, selecione um projeto antes de adicionar uma tarefa.");
      return;
    }
    setEditingTask(null);
    setShowModal(true);
  };

  const handleToggleView = () => {
    setViewMode(viewMode === "kanban" ? "lista" : "kanban");
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  // LÓGICA DE FILTRO CORRIGIDA
  const getFilteredTasks = () => {
    // 1. Filtro base que se aplica a ambas as visualizações
    let baseFilteredTasks = tasks
      .filter((t) => t.projectId === selectedProjectId)
      .filter((t) =>
        t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (t.responsible && t.responsible.toLowerCase().includes(filters.search.toLowerCase()))
      )
      .filter((t) => !filters.priority || t.priority === t.priority);

    // 2. Se a visualização for 'lista', aplica também o filtro de status
    if (viewMode === "lista" && filters.status) {
      return baseFilteredTasks.filter((t) => t.status === filters.status);
    }

    // 3. Para a visualização 'kanban', retorna a lista sem o filtro de status
    return baseFilteredTasks;
  };

  const tasksToShow = getFilteredTasks();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar
          projetoAtual={projetoAtual}
          onAddTask={handleAddTask}
          onToggleView={handleToggleView}
          viewMode={viewMode}
        />
        <FilterBar onFilter={handleFilter} />
        <main className="p-6 overflow-auto bg-gray-50">
          {viewMode === "kanban" ? (
            <TaskBoard tasks={tasksToShow} onEdit={handleEditTask} />
          ) : (
            <TaskTable tasks={tasksToShow} onEdit={handleEditTask} />
          )}
        </main>
      </div>
      {showModal && (
        <ModalTask
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          initialData={editingTask}
        />
      )}
    </div>
  );
}
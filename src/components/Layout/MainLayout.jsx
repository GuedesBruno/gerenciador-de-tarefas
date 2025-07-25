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

  // Lógica de filtragem corrigida e simplificada
  const getFilteredTasks = () => {
    // 1. Pega todas as tarefas do projeto selecionado
    const tasksInProject = tasks.filter((t) => t.projectId === selectedProjectId);

    // 2. Aplica filtros de pesquisa e prioridade
    const commonFiltered = tasksInProject.filter((t) =>
        (t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (t.responsible && t.responsible.toLowerCase().includes(filters.search.toLowerCase()))) &&
        (!filters.priority || t.priority === t.priority)
    );

    // 3. Se for 'lista', aplica também o filtro de status. Senão, retorna a lista filtrada comum.
    if (viewMode === "lista" && filters.status) {
      return commonFiltered.filter((t) => t.status === filters.status);
    }
    return commonFiltered;
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
            // O TaskBoard agora recebe a lista correta, sem o filtro de status
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
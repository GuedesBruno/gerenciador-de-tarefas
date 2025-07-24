import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FilterBar from "./FilterBar";
import TaskBoard from "../Kanban/TaskBoard";
import TaskTable from "../Tasks/TaskTable";
import ModalTask from "../modals/ModalTask";
import { useTasks } from "../../context/TaskContext";
import { useSelectedProject } from "../../context/SelectedProjectContext";

export default function MainLayout() {
  const { tasks } = useTasks();
  const { selectedProjectId, setSelectedProjectId } = useSelectedProject();
  const [viewMode, setViewMode] = useState("kanban");
  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    setEditingTask(null); // Modo criação
    setShowModal(true);
  };

  const handleToggleView = () => {
    setViewMode(viewMode === "kanban" ? "lista" : "kanban");
  };

  const handleEditTask = (task) => {
    setEditingTask(task); // Modo edição
    setShowModal(true);
  };

  const handleFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredTasks = tasks
    .filter((t) => t.projectId === selectedProjectId)
    .filter((t) => 
      t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.responsible.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((t) => !filters.status || t.status === filters.status)
    .filter((t) => !filters.priority || t.priority === filters.priority);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar 
          projetoAtual={tasks.find((t) => t.projectId === selectedProjectId) || { nome: "Nenhum projeto selecionado", status: "" }}
          onAddTask={handleAddTask}
          onToggleView={handleToggleView}
          viewMode={viewMode}
        />
        <FilterBar onFilter={handleFilter} />
        <main className="p-6 overflow-auto bg-gray-50">
          {viewMode === "kanban" ? (
            <TaskBoard onEdit={handleEditTask} />
          ) : (
            <TaskTable onEdit={handleEditTask} />
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
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FilterBar from "./FilterBar";
import TaskBoard from "../Kanban/TaskBoard";
import TaskTable from "../Tasks/TaskTable";
import ModalTask from "../modals/ModalTask";
import ModalProject from "../modals/ModalProject";
import ModalColumns from "../modals/ModalColumns"; // 1. Importar
import EmptyState from "../Ui/EmptyState";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { useSelectedProject } from "../../context/SelectedProjectContext";
import { useTaskFilters } from "../../hooks/useTaskFilters";
import { useTaskAutomation } from "../../hooks/useTaskAutomation";

export default function MainLayout() {
  const { tasks, deleteTask } = useTasks();
  const { projects } = useProjects();
  const { selectedProjectId } = useSelectedProject();
  
  const [viewMode, setViewMode] = useState("kanban");
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showColumnsModal, setShowColumnsModal] = useState(false); // 2. Novo estado

  useTaskAutomation();
  const { filteredTasks, handleFilter } = useTaskFilters(tasks, viewMode, selectedProjectId);

  const projetoAtual = projects.find((p) => p.id === selectedProjectId) || { name: "Nenhum projeto selecionado", status: "" };

  const handleAddTask = () => {
    if (!selectedProjectId) return;
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleOpenNewProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };
  
  const handleToggleView = () => {
    setViewMode(viewMode === "kanban" ? "lista" : "kanban");
  };

  return (
    <div className="flex h-screen">
      <Sidebar onOpenNew={handleOpenNewProject} onEditProject={handleEditProject} />
      
      <div className="flex-1 flex flex-col">
        {!selectedProjectId ? (
          <EmptyState onCreateProject={handleOpenNewProject} />
        ) : (
          <>
            <Topbar
              projetoAtual={projetoAtual}
              onAddTask={handleAddTask}
              onToggleView={handleToggleView}
              viewMode={viewMode}
              onManageColumns={() => setShowColumnsModal(true)} // 3. Passar função
            />
            <FilterBar onFilter={handleFilter} />
            <main className="p-6 overflow-auto bg-gray-50">
              {viewMode === "kanban" ? (
                <TaskBoard tasks={filteredTasks} onEdit={handleEditTask} onDelete={deleteTask} />
              ) : (
                <TaskTable tasks={filteredTasks} onEdit={handleEditTask} />
              )}
            </main>
          </>
        )}
      </div>

      {showTaskModal && <ModalTask isOpen={showTaskModal} onClose={() => setShowTaskModal(false)} initialData={editingTask} />}
      {showProjectModal && <ModalProject isOpen={showProjectModal} onClose={() => setShowProjectModal(false)} initialData={editingProject} />}
      {/* 4. Renderizar o novo modal */}
      {showColumnsModal && <ModalColumns isOpen={showColumnsModal} onClose={() => setShowColumnsModal(false)} projectId={selectedProjectId} />}
    </div>
  );
}
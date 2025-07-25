import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FilterBar from "./FilterBar";
import TaskBoard from "../Kanban/TaskBoard";
import TaskTable from "../Tasks/TaskTable";
import ModalTask from "../modals/ModalTask";
import ModalProject from "../modals/ModalProject";
import EmptyState from "../../components/ui/EmptyState";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { useSelectedProject } from "../../context/SelectedProjectContext";

export default function MainLayout() {
  const { tasks, deleteTask } = useTasks(); // Pegar deleteTask aqui
  const { projects } = useProjects();
  const { selectedProjectId } = useSelectedProject();
  
  const [viewMode, setViewMode] = useState("kanban");
  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const projetoAtual =
    projects.find((p) => p.id === selectedProjectId) ||
    { name: "Nenhum projeto selecionado", status: "" };

  const handleAddTask = () => {
    console.log("Tentando adicionar tarefa...");
    console.log("Projeto selecionado:", selectedProjectId);
    
    if (!selectedProjectId) {
      alert("Por favor, selecione um projeto antes de adicionar uma tarefa.");
      return;
    }
    
    setEditingTask(null);
    setShowTaskModal(true);
    console.log("Modal deveria estar visível agora:", showTaskModal);
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

  const handleFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const tasksToShow = tasks.filter((t) => t.projectId === selectedProjectId);

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
            />
            <FilterBar onFilter={handleFilter} />
            <main className="p-6 overflow-auto bg-gray-50">
              {viewMode === "kanban" ? (
                // Passando a função 'deleteTask' para o TaskBoard
                <TaskBoard tasks={tasksToShow} onEdit={handleEditTask} onDelete={deleteTask} />
              ) : (
                <TaskTable tasks={tasksToShow} onEdit={handleEditTask} />
              )}
            </main>
          </>
        )}
      </div>

      {showTaskModal && (
        <ModalTask
          isOpen={showTaskModal}
          onClose={() => {
            console.log("Fechando modal");
            setShowTaskModal(false);
          }}
          initialData={editingTask}
        />
      )}
      {showProjectModal && (
        <ModalProject
          isOpen={showProjectModal}
          onClose={() => setShowProjectModal(false)}
          initialData={editingProject}
        />
      )}
    </div>
  );
}
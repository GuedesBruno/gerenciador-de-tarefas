import { createContext, useContext, useState, useEffect } from "react";
import { useTasks } from "./TaskContext";
import { useSelectedProject } from "./SelectedProjectContext"; // 1. Importar

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const { setTasks } = useTasks();
  // 2. Pegar o estado e a função do contexto de seleção
  const { selectedProjectId, setSelectedProjectId } = useSelectedProject();

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    const novo = {
      ...project,
      id: Date.now(),
      status: project.status || "ativo",
    };
    setProjects((prev) => [...prev, novo]);
  };

  const updateProject = (updated) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  // 3. FUNÇÃO DE EXCLUSÃO ATUALIZADA
  const deleteProject = (id) => {
    // Limpa a seleção se o projeto excluído for o que estava selecionado
    if (id === selectedProjectId) {
      setSelectedProjectId(null);
    }
    
    setTasks((prevTasks) => prevTasks.filter((task) => task.projectId !== id));
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const archiveProject = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "arquivado" } : p
      )
    );
  };

  const reorderProjects = (newOrder) => {
    setProjects(newOrder);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        archiveProject,
        reorderProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);
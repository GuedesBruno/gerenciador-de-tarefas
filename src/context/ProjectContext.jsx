import { createContext, useContext, useState, useEffect } from "react";
import { useTasks } from "./TaskContext";
import { useSelectedProject } from "./SelectedProjectContext";
import { useColumns } from "./ColumnContext"; // 1. Importar o hook de colunas

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const { setTasks } = useTasks();
  const { selectedProjectId, setSelectedProjectId } = useSelectedProject();
  const { ensureProjectColumns, deleteProjectColumns } = useColumns(); // 2. Pegar a função correta

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // 3. FUNÇÃO DE ADICIONAR PROJETO CORRIGIDA
  const addProject = (project) => {
    const newId = Date.now(); // Gera o ID uma vez para usar em ambos os lugares
    const novo = {
      ...project,
      id: newId,
      status: project.status || "ativo",
    };
    
    // Primeiro, garante que as colunas para este novo ID de projeto sejam criadas
    ensureProjectColumns(newId);
    
    // Depois, adiciona o novo projeto à lista
    setProjects((prev) => [...prev, novo]);
  };

  const updateProject = (updated) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const deleteProject = (id) => {
    if (id === selectedProjectId) {
      setSelectedProjectId(null);
    }
    
    // Deleta as colunas associadas
    deleteProjectColumns(id);
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
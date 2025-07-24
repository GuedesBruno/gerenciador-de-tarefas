import { createContext, useContext, useState, useEffect } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);

  // 🔄 Carregar do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  // 💾 Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // ➕ Criar novo projeto
  const addProject = (project) => {
    const novo = {
      ...project,
      id: Date.now(),
      status: project.status || "ativo",
    };
    setProjects((prev) => [...prev, novo]);
  };

  // ✏️ Atualizar projeto existente
  const updateProject = (updated) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  // 🗑️ Excluir projeto
  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // 📦 Arquivar projeto
  const archiveProject = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "arquivado" } : p
      )
    );
  };

  // 🔀 Reordenar lista de projetos
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
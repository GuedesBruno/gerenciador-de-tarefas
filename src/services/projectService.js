const PROJECTS_STORAGE_KEY = "projects";

/**
 * Carrega os projetos do localStorage.
 * @returns {Array} A lista de projetos.
 */
export const getProjects = () => {
  try {
    const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return savedProjects ? JSON.parse(savedProjects) : [];
  } catch (error) {
    console.error("Falha ao carregar projetos do localStorage", error);
    return [];
  }
};

/**
 * Salva a lista de projetos no localStorage.
 * @param {Array} projects - A lista de projetos a ser salva.
 */
export const saveProjects = (projects) => {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Falha ao salvar projetos no localStorage", error);
  }
};
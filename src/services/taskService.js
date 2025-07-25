const TASKS_STORAGE_KEY = "tasks";

/**
 * Carrega as tarefas do localStorage.
 * @returns {Array} A lista de tarefas.
 */
export const getTasks = () => {
  try {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Falha ao carregar tarefas do localStorage", error);
    return [];
  }
};

/**
 * Salva a lista de tarefas no localStorage.
 * @param {Array} tasks - A lista de tarefas a ser salva.
 */
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Falha ao salvar tarefas no localStorage", error);
  }
};
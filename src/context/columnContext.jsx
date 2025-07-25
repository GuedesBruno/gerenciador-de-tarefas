import { createContext, useContext, useState, useEffect } from "react";

const ColumnContext = createContext();

const COLUMNS_STORAGE_KEY = "columns";

// Colunas padrão para novos projetos
const defaultColumns = [
  { id: 'todo', title: 'A Fazer' },
  { id: 'inprogress', title: 'Em Andamento' },
  { id: 'done', title: 'Concluído' },
];

export function ColumnProvider({ children }) {
  const [columns, setColumns] = useState(() => {
    try {
      const saved = localStorage.getItem(COLUMNS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(COLUMNS_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  // Função para garantir que um projeto tenha colunas. Se não tiver, cria as padrão.
  const ensureProjectColumns = (projectId) => {
    if (!columns[projectId]) {
      setColumns(prev => ({
        ...prev,
        [projectId]: defaultColumns
      }));
    }
  };

  const updateProjectColumns = (projectId, newColumns) => {
    setColumns(prev => ({
      ...prev,
      [projectId]: newColumns
    }));
  };
  
  const deleteProjectColumns = (projectId) => {
    setColumns(prev => {
      const newCols = { ...prev };
      delete newCols[projectId];
      return newCols;
    });
  };

  return (
    <ColumnContext.Provider value={{ columns, ensureProjectColumns, updateProjectColumns, deleteProjectColumns }}>
      {children}
    </ColumnContext.Provider>
  );
}

export const useColumns = () => useContext(ColumnContext);
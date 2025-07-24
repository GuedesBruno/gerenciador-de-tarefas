import { createContext, useContext, useState } from "react";

const SelectedProjectContext = createContext();

export function SelectedProjectProvider({ children }) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  return (
    <SelectedProjectContext.Provider value={{ selectedProjectId, setSelectedProjectId }}>
      {children}
    </SelectedProjectContext.Provider>
  );
}

export const useSelectedProject = () => useContext(SelectedProjectContext);
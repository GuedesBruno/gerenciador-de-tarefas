import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProjectProvider } from "./context/ProjectContext";
import { SelectedProjectProvider } from "./context/SelectedProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { ColumnProvider } from "./context/ColumnContext"; // 1. Importar
import './styles.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SelectedProjectProvider>
      <TaskProvider>
        <ColumnProvider> {/* 2. Adicionar */}
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </ColumnProvider>
      </TaskProvider>
    </SelectedProjectProvider>
  </React.StrictMode>
);
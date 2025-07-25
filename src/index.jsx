import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProjectProvider } from "./context/ProjectContext";
import { SelectedProjectProvider } from "./context/SelectedProjectContext";
import { TaskProvider } from "./context/TaskContext";
import './styles.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ORDEM CORRIGIDA DOS PROVIDERS:
      1. SelectedProjectProvider (não depende de ninguém)
      2. TaskProvider (não depende de ninguém)
      3. ProjectProvider (agora pode acessar o TaskProvider, pois é seu filho)
    */}
    <SelectedProjectProvider>
      <TaskProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </TaskProvider>
    </SelectedProjectProvider>
  </React.StrictMode>
);
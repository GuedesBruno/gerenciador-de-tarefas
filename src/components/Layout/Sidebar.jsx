import { useState } from "react";
import ProjectList from "./ProjectList";
import ModalProject from "../modals/ModalProject";

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleOpenNew = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-700">Projetos</h2>
        <button
          className="text-blue-600 text-sm hover:underline"
          onClick={handleOpenNew}
        >
          Novo
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <ProjectList onEditProject={handleEditProject} />
      </div>

      {showModal && (
        <ModalProject
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          initialData={editingProject}
        />
      )}
    </aside>
  );
}
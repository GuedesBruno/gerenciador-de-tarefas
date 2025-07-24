import { useState, useEffect } from "react";
import { useProjects } from "../../context/ProjectContext";

export default function ModalProject({ isOpen, onClose, initialData }) {
  const { addProject, updateProject } = useProjects();
  const isEditing = Boolean(initialData?.id);

  const [form, setForm] = useState({ name: "", status: "ativo" });

  useEffect(() => {
    if (initialData && isOpen) {
      setForm({
        name: initialData.name || "",
        status: initialData.status || "ativo",
      });
    } else {
      setForm({ name: "", status: "ativo" });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEditing) {
      updateProject({ ...initialData, ...form });
    } else {
      addProject(form);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md w-96 p-6 space-y-5">
        <h2 className="text-base font-semibold text-gray-800">
          {isEditing ? "Editar projeto" : "Novo projeto"}
        </h2>

        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome do projeto"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ativo">Ativo</option>
            <option value="pausado">Pausado</option>
            <option value="arquivado">Arquivado</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isEditing ? "Salvar" : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
}
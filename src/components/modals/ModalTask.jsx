import { useState, useEffect } from "react";
import { useTasks } from "../../context/TaskContext";
import { useSelectedProject } from "../../context/SelectedProjectContext";

export default function ModalTask({ isOpen, onClose, initialData }) {
  const { addTask, updateTask } = useTasks();
  const { selectedProjectId } = useSelectedProject();
  const isEditing = Boolean(initialData?.id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    responsible: "",
    dueDate: "",
    status: "todo",
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        responsible: initialData.responsible || "",
        dueDate: initialData.dueDate || "",
        status: initialData.status || "todo",
      });
    } else {
      setForm({
        title: "",
        description: "",
        responsible: "",
        dueDate: "",
        status: "todo",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

   const handleSave = () => {
    if (!selectedProjectId || !form.title.trim()) return;

    if (isEditing) {
      // Se estiver editando, apenas passa os dados atualizados do formulário.
      updateTask({ ...initialData, ...form });
    } else {
      // Se estiver criando, monta o objeto completo da nova tarefa aqui.
      const newTask = {
        ...form, // Dados do formulário (título, descrição, etc.)
        id: Date.now(), // Gera um novo ID
        status: 'todo', // Define o status inicial explicitamente
        projectId: selectedProjectId, // Associa ao projeto selecionado
      };
      addTask(newTask);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md w-[400px] p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-800">
          {isEditing ? "Editar tarefa" : "Nova tarefa"}
        </h2>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Título</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Digite o título"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descrição da tarefa"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Responsável</label>
          <input
            name="responsible"
            value={form.responsible}
            onChange={handleChange}
            placeholder="Nome ou e-mail"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Prazo</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEditing ? "Salvar" : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
}
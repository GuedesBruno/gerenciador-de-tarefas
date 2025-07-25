import { useState, useEffect } from "react";
import { useTasks } from "../../context/TaskContext";
import { useSelectedProject } from "../../context/SelectedProjectContext";
import { TASK_STATUS } from "../../constants";

export default function ModalTask({ isOpen, onClose, initialData = null }) {
  if (!isOpen) return null;

  // Hooks são chamados aqui, dentro do componente funcional
  const { addTask, updateTask } = useTasks();
  const { selectedProjectId } = useSelectedProject();
  const isEditing = Boolean(initialData?.id);

  const [form, setForm] = useState({});
  const [newSubtask, setNewSubtask] = useState({ title: "", responsible: "" });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        subtasks: initialData.subtasks || [],
      });
    } else {
      setForm({
        title: "", description: "", responsible: "", dueDate: "",
        status: TASK_STATUS.TODO, subtasks: [],
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubtaskChange = (e) => {
    const { name, value } = e.target;
    setNewSubtask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubtask = () => {
    if (!newSubtask.title.trim()) return;
    const subtaskToAdd = {
      id: Date.now(),
      title: newSubtask.title,
      responsible: newSubtask.responsible,
      isCompleted: false,
    };
    setForm(prev => ({
      ...prev,
      subtasks: [...prev.subtasks, subtaskToAdd]
    }));
    setNewSubtask({ title: "", responsible: "" });
  };

  const toggleSubtask = (subtaskId) => {
    setForm(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(st => 
        st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
      )
    }));
  };

  const deleteSubtask = (subtaskId) => {
     setForm(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(st => st.id !== subtaskId)
    }));
  }

  const handleSave = () => {
    if (!selectedProjectId || !form.title.trim()) return;

    if (isEditing) {
      updateTask(form);
    } else {
      addTask({
        ...form,
        id: Date.now(),
        projectId: selectedProjectId,
      });
    }
    onClose();
  };

  // O JSX permanece o mesmo
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800">
          {isEditing ? "Editar Tarefa" : "Nova Tarefa"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Título</label>
            <input name="title" value={form.title || ""} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Responsável</label>
            <input name="responsible" value={form.responsible || ""} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-gray-600">Descrição</label>
            <textarea name="description" value={form.description || ""} onChange={handleChange} rows={3} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Prazo</label>
            <input type="date" name="dueDate" value={form.dueDate || ""} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>
        <hr className="my-4" />
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">Subtarefas</h3>
          <div className="space-y-2">
            {form.subtasks?.map(subtask => (
              <div key={subtask.id} className="flex items-center gap-2 p-2 rounded bg-gray-50 hover:bg-gray-100">
                <input type="checkbox" checked={subtask.isCompleted} onChange={() => toggleSubtask(subtask.id)} />
                <span className={`flex-1 text-sm ${subtask.isCompleted ? 'line-through text-gray-400' : ''}`}>{subtask.title}</span>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">{subtask.responsible || 'Ninguém'}</span>
                <button onClick={() => deleteSubtask(subtask.id)} className="text-red-500 text-xs hover:underline">Excluir</button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input name="title" value={newSubtask.title} onChange={handleSubtaskChange} placeholder="Nova subtarefa..." className="flex-1 border rounded px-3 py-2 text-sm" />
            <input name="responsible" value={newSubtask.responsible} onChange={handleSubtaskChange} placeholder="Responsável (opcional)" className="border rounded px-3 py-2 text-sm" />
            <button onClick={handleAddSubtask} className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Adicionar</button>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
            {isEditing ? "Salvar Alterações" : "Criar Tarefa"}
          </button>
        </div>
      </div>
    </div>
  );
}
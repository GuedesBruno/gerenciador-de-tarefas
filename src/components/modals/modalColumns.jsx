import { useState, useEffect } from "react";
import { useColumns } from "../../context/ColumnContext";

export default function ModalColumns({ isOpen, onClose, projectId }) {
  const { columns, updateProjectColumns } = useColumns();
  const [localColumns, setLocalColumns] = useState([]);

  useEffect(() => {
    if (isOpen && projectId && columns[projectId]) {
      setLocalColumns(columns[projectId]);
    }
  }, [isOpen, projectId, columns]);

  const handleColumnChange = (index, field, value) => {
    const newColumns = [...localColumns];
    newColumns[index][field] = value;
    setLocalColumns(newColumns);
  };

  const addColumn = () => {
    const newColumn = { id: `col-${Date.now()}`, title: "Nova Coluna" };
    setLocalColumns([...localColumns, newColumn]);
  };

  const deleteColumn = (index) => {
    const newColumns = localColumns.filter((_, i) => i !== index);
    setLocalColumns(newColumns);
  };

  const handleSave = () => {
    updateProjectColumns(projectId, localColumns);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Gerenciar Colunas</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {localColumns.map((col, index) => (
            <div key={col.id} className="flex items-center gap-2">
              <input
                type="text"
                value={col.title}
                onChange={(e) => handleColumnChange(index, 'title', e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <button onClick={() => deleteColumn(index)} className="text-red-500 hover:text-red-700 p-1">Excluir</button>
            </div>
          ))}
        </div>
        <button onClick={addColumn} className="w-full mt-2 px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
          + Adicionar Coluna
        </button>
        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
            Salvar Colunas
          </button>
        </div>
      </div>
    </div>
  );
}
import { TASK_STATUS, COLUMNS } from "../../constants";

export default function FilterBar({ onFilter }) {
  return (
    <div className="bg-white p-4 border-b flex flex-wrap items-center gap-4">
      <input 
        type="text" 
        onChange={e => onFilter('search', e.target.value)} 
        placeholder="Pesquisar tarefas..." 
        className="border px-3 py-2 rounded-md w-64 text-sm" 
      />
      <select 
        onChange={e => onFilter('status', e.target.value)} 
        className="border px-3 py-2 rounded-md text-sm"
      >
        <option value="">Todos os status</option>
        <option value={TASK_STATUS.TODO}>{COLUMNS[TASK_STATUS.TODO]}</option>
        <option value={TASK_STATUS.IN_PROGRESS}>{COLUMNS[TASK_STATUS.IN_PROGRESS]}</option>
        <option value={TASK_STATUS.DONE}>{COLUMNS[TASK_STATUS.DONE]}</option>
      </select>
      <select 
        onChange={e => onFilter('priority', e.target.value)} 
        className="border px-3 py-2 rounded-md text-sm"
      >
        <option value="">Todas as prioridades</option>
        <option value="Alta">Alta</option>
        <option value="Média">Média</option>
        <option value="Baixa">Baixa</option>
      </select>
    </div>
  );
}
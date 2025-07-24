export default function FilterBar({ onFilter }) {
  return (
    <div className="bg-white p-4 border-b flex flex-wrap gap-4">
      <input type="text" onChange={e => onFilter('search', e.target.value)} placeholder="Pesquisar..." className="border px-3 py-2 rounded-md w-64" />
      <select onChange={e => onFilter('status', e.target.value)} className="border px-3 py-2 rounded-md">
        <option value="">Todos os status</option>
        <option value="Não Iniciado">Não Iniciado</option>
        <option value="Em Andamento">Em Andamento</option>
        <option value="Concluído">Concluído</option>
      </select>
      <select onChange={e => onFilter('priority', e.target.value)} className="border px-3 py-2 rounded-md">
        <option value="">Todas as prioridades</option>
        <option value="Alta">Alta</option>
        <option value="Média">Média</option>
        <option value="Baixa">Baixa</option>
      </select>
    </div>
  );
}
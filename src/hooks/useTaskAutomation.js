import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

export function useTaskAutomation() {
  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    const checkDueDates = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Zera a hora para comparar apenas o dia

      const oneDay = 24 * 60 * 60 * 1000; // Milissegundos em um dia

      const updatedTasks = tasks.map(task => {
        if (task.dueDate && task.status !== 'done') {
          const dueDate = new Date(task.dueDate);
          const diffDays = Math.round((dueDate - today) / oneDay);

          // Se o prazo é amanhã ou hoje, e a prioridade não for Alta, muda para Alta.
          if (diffDays <= 1 && task.priority !== 'Alta') {
            console.log(`Tarefa "${task.title}" promovida para prioridade Alta.`);
            return { ...task, priority: 'Alta' };
          }
        }
        return task;
      });
      
      // Para evitar um loop infinito, só atualizamos se houver mudanças reais.
      if (JSON.stringify(tasks) !== JSON.stringify(updatedTasks)) {
        setTasks(updatedTasks);
      }
    };

    // Roda a verificação uma vez quando o componente que usa o hook é montado.
    checkDueDates();

  }, [tasks, setTasks]); // Roda sempre que a lista de tarefas mudar.
}   
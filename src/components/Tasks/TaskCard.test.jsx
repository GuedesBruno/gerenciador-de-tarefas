import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';

describe('TaskCard', () => {
  const mockTask = {
    id: 1,
    title: 'Tarefa Teste',
    description: 'Descrição teste',
    priority: 'high',
    status: 'todo'
  };

  test('renderiza o título da tarefa', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('Tarefa Teste')).toBeInTheDocument();
  });
});
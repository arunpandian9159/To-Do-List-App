import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import { Todo } from '../../types';

const mockTodos: Todo[] = [
  {
    id: '1',
    text: 'First todo',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    text: 'Second todo',
    completed: true,
    createdAt: new Date(),
  },
];

describe('TodoList', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all todos when todos array is not empty', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('First todo')).toBeInTheDocument();
    expect(screen.getByText('Second todo')).toBeInTheDocument();
  });

  it('displays empty state when todos array is empty', () => {
    render(
      <TodoList 
        todos={[]} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('No tasks yet!')).toBeInTheDocument();
    expect(screen.getByText('Add a task above to get started.')).toBeInTheDocument();
  });

  it('renders correct number of TodoItem components', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete task/i });
    expect(deleteButtons).toHaveLength(2);
  });

  it('passes correct props to TodoItem components', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Check that both todos are rendered with their text
    expect(screen.getByText('First todo')).toBeInTheDocument();
    expect(screen.getByText('Second todo')).toBeInTheDocument();
    
    // Check that delete buttons have correct aria-labels
    expect(screen.getByRole('button', { name: /delete task: first todo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete task: second todo/i })).toBeInTheDocument();
  });
});
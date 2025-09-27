import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';
import { Todo } from '../../types';

const mockTodo: Todo = {
  id: '1',
  text: 'Test todo',
  completed: false,
  createdAt: new Date(),
};

const mockCompletedTodo: Todo = {
  ...mockTodo,
  completed: true,
};

describe('TodoItem', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo text correctly', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('calls onToggle when todo text is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    fireEvent.click(screen.getByText('Test todo'));
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('calls onToggle when Enter key is pressed', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const todoElement = screen.getByRole('button', { name: /toggle completion/i });
    fireEvent.keyDown(todoElement, { key: 'Enter' });
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('calls onToggle when Space key is pressed', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const todoElement = screen.getByRole('button', { name: /toggle completion/i });
    fireEvent.keyDown(todoElement, { key: ' ' });
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /delete task/i }));
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('applies completed styling when todo is completed', () => {
    render(
      <TodoItem 
        todo={mockCompletedTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const todoText = screen.getByText('Test todo');
    expect(todoText).toHaveClass('line-through', 'text-gray-500');
  });

  it('applies active styling when todo is not completed', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const todoText = screen.getByText('Test todo');
    expect(todoText).toHaveClass('text-gray-800');
    expect(todoText).not.toHaveClass('line-through');
  });

  it('has proper accessibility attributes', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByRole('button', { name: /toggle completion for: test todo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete task: test todo/i })).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Integration Tests', () => {
  it('renders the todo app with title and form', () => {
    render(<App />);
    
    expect(screen.getByText('Todo App')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('displays empty state initially', () => {
    render(<App />);
    
    expect(screen.getByText('No tasks yet!')).toBeInTheDocument();
    expect(screen.getByText('Add a task above to get started.')).toBeInTheDocument();
  });

  it('adds a new todo when form is submitted', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.queryByText('No tasks yet!')).not.toBeInTheDocument();
  });

  it('toggles todo completion status', () => {
    render(<App />);
    
    // Add a todo
    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Toggle completion
    const todoText = screen.getByText('Test todo');
    expect(todoText).toHaveClass('text-gray-800');
    expect(todoText).not.toHaveClass('line-through');
    
    fireEvent.click(todoText);
    
    expect(todoText).toHaveClass('text-gray-500', 'line-through');
  });

  it('deletes a todo when delete button is clicked', () => {
    render(<App />);
    
    // Add a todo
    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Delete the todo
    const deleteButton = screen.getByRole('button', { name: /delete task/i });
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Test todo')).not.toBeInTheDocument();
    expect(screen.getByText('No tasks yet!')).toBeInTheDocument();
  });

  it('handles multiple todos correctly', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    
    // Add multiple todos
    fireEvent.change(input, { target: { value: 'First todo' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    fireEvent.change(input, { target: { value: 'Second todo' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    expect(screen.getByText('First todo')).toBeInTheDocument();
    expect(screen.getByText('Second todo')).toBeInTheDocument();
    
    // Toggle first todo
    fireEvent.click(screen.getByText('First todo'));
    
    expect(screen.getByText('First todo')).toHaveClass('line-through');
    expect(screen.getByText('Second todo')).not.toHaveClass('line-through');
  });

  it('maintains state during multiple operations', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    
    // Add todos
    fireEvent.change(input, { target: { value: 'Todo 1' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    fireEvent.change(input, { target: { value: 'Todo 2' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    fireEvent.change(input, { target: { value: 'Todo 3' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    // Toggle some todos
    fireEvent.click(screen.getByText('Todo 1'));
    fireEvent.click(screen.getByText('Todo 3'));
    
    // Delete middle todo
    const deleteButtons = screen.getAllByRole('button', { name: /delete task/i });
    fireEvent.click(deleteButtons[1]); // Delete "Todo 2"
    
    // Verify final state
    expect(screen.getByText('Todo 1')).toHaveClass('line-through');
    expect(screen.queryByText('Todo 2')).not.toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toHaveClass('line-through');
  });

  it('prevents adding empty todos', () => {
    render(<App />);
    
    const button = screen.getByRole('button', { name: /add task/i });
    
    // Try to add empty todo
    fireEvent.click(button);
    
    expect(screen.getByText('No tasks yet!')).toBeInTheDocument();
    
    // Try to add whitespace-only todo
    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    
    expect(screen.getByText('No tasks yet!')).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(<App />);
    
    // Add a todo using form submission
    const input = screen.getByPlaceholderText('Add a new task...');
    const form = input.closest('form');
    fireEvent.change(input, { target: { value: 'Keyboard todo' } });
    fireEvent.submit(form!);
    
    expect(screen.getByText('Keyboard todo')).toBeInTheDocument();
    
    // Toggle using keyboard
    const todoElement = screen.getByRole('button', { name: /toggle completion/i });
    fireEvent.keyDown(todoElement, { key: 'Enter' });
    
    expect(screen.getByText('Keyboard todo')).toHaveClass('line-through');
  });
});

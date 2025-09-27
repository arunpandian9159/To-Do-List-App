import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodoForm from '../AddTodoForm';

describe('AddTodoForm', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field and add button', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.change(input, { target: { value: 'New task' } });
    
    expect(input).toHaveValue('New task');
  });

  it('calls onAdd with input value when form is submitted', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(button);
    
    expect(mockOnAdd).toHaveBeenCalledWith('New task');
  });

  it('calls onAdd when Enter key is pressed', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.submit(form!);
    
    expect(mockOnAdd).toHaveBeenCalledWith('New task');
  });

  it('clears input field after successful submission', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(button);
    
    expect(input).toHaveValue('');
  });

  it('does not call onAdd when input is empty', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const button = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(button);
    
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('does not call onAdd when input contains only whitespace', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('disables submit button when input is empty', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const button = screen.getByRole('button', { name: /add task/i });
    expect(button).toBeDisabled();
  });

  it('enables submit button when input has valid text', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(input, { target: { value: 'Valid task' } });
    expect(button).toBeEnabled();
  });

  it('prevents form submission when input is invalid', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const form = screen.getByRole('button', { name: /add task/i }).closest('form');
    fireEvent.submit(form!);
    
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    expect(screen.getByLabelText('New task input')).toBeInTheDocument();
    expect(screen.getByLabelText('Add task')).toBeInTheDocument();
  });
});
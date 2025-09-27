import { Todo } from '../types/todo';

// Generate unique ID for new todos
export const generateTodoId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Create a new todo with default values
export const createTodo = (text: string): Todo => {
  return {
    id: generateTodoId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date(),
  };
};

// Toggle completion status of a todo
export const toggleTodoCompletion = (todos: Todo[], id: string): Todo[] => {
  return todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
};

// Remove a todo from the list
export const deleteTodoById = (todos: Todo[], id: string): Todo[] => {
  return todos.filter(todo => todo.id !== id);
};

// Add a new todo to the list
export const addTodoToList = (todos: Todo[], text: string): Todo[] => {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return todos;
  }
  
  const newTodo = createTodo(trimmedText);
  return [...todos, newTodo];
};

// Validate todo text input
export const isValidTodoText = (text: string): boolean => {
  return text.trim().length > 0;
};
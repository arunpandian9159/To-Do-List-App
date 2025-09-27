// Todo data model interface
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Component prop interfaces for type safety
export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface AddTodoFormProps {
  onAdd: (text: string) => void;
}
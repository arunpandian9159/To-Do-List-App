import React from 'react';
import { TodoListProps } from '../types';
import TodoItem from './TodoItem';

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No tasks yet!</p>
        <p className="text-sm mt-2">Add a task above to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
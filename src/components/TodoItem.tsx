import React from 'react';
import { TodoItemProps } from '../types';

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
      <div 
        className="flex-1 cursor-pointer select-none"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        aria-label={`Toggle completion for: ${todo.text}`}
      >
        <span 
          className={`${
            todo.completed 
              ? 'text-gray-500 line-through' 
              : 'text-gray-800'
          } transition-all duration-200`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors"
        aria-label={`Delete task: ${todo.text}`}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
import { FC } from 'react';
import { TodoItemProps } from '../types';

const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className="todo-item">
      <div 
        className={`todo-text ${todo.completed ? 'completed' : 'active'}`}
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
        {todo.text}
      </div>
      <button
        onClick={handleDelete}
        className="delete-button"
        aria-label={`Delete task: ${todo.text}`}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
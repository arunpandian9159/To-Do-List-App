import { FC } from 'react';
import { TodoListProps } from '../types';
import TodoItem from './TodoItem';

const TodoList: FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <h3>No tasks yet!</h3>
        <p>Add a task above to get started.</p>
      </div>
    );
  }

  return (
    <div className="todo-items">
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
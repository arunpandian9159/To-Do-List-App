import { useState } from 'react';
import { Todo } from './types';
import { AddTodoForm, TodoList } from './components';
import { addTodoToList, toggleTodoCompletion, deleteTodoById } from './utils/todoUtils';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    setTodos(prevTodos => addTodoToList(prevTodos, text));
  };

  const handleToggleTodo = (id: string) => {
    setTodos(prevTodos => toggleTodoCompletion(prevTodos, id));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prevTodos => deleteTodoById(prevTodos, id));
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <h1 className="app-title">
          Todo App
        </h1>
        
        <AddTodoForm onAdd={handleAddTodo} />
        
        <TodoList 
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;

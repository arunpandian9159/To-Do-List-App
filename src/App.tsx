import React, { useState } from 'react';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
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

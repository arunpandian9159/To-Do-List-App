import React, { useState } from 'react';
import { AddTodoFormProps } from '../types';
import { isValidTodoText } from '../utils/todoUtils';

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isValidTodoText(inputValue)) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new task..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        aria-label="New task input"
      />
      <button
        type="submit"
        disabled={!isValidTodoText(inputValue)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Add task"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
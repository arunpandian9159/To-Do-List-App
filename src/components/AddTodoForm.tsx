import { FC, useState } from 'react';
import { AddTodoFormProps } from '../types';
import { isValidTodoText } from '../utils/todoUtils';

const AddTodoForm: FC<AddTodoFormProps> = ({ onAdd }) => {
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
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new task..."
        className="todo-input"
        aria-label="New task input"
      />
      <button
        type="submit"
        disabled={!isValidTodoText(inputValue)}
        className="add-button"
        aria-label="Add task"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
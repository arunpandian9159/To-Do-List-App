import {
  generateTodoId,
  createTodo,
  toggleTodoCompletion,
  deleteTodoById,
  addTodoToList,
  isValidTodoText,
} from '../todoUtils';
import { Todo } from '../../types';

describe('todoUtils', () => {
  describe('generateTodoId', () => {
    it('generates unique IDs', () => {
      const id1 = generateTodoId();
      const id2 = generateTodoId();
      
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
    });

    it('generates non-empty IDs', () => {
      const id = generateTodoId();
      expect(id.length).toBeGreaterThan(0);
    });
  });

  describe('createTodo', () => {
    it('creates a todo with correct properties', () => {
      const text = 'Test todo';
      const todo = createTodo(text);
      
      expect(todo.text).toBe(text);
      expect(todo.completed).toBe(false);
      expect(todo.id).toBeDefined();
      expect(todo.createdAt).toBeInstanceOf(Date);
    });

    it('trims whitespace from text', () => {
      const todo = createTodo('  Test todo  ');
      expect(todo.text).toBe('Test todo');
    });

    it('generates unique IDs for different todos', () => {
      const todo1 = createTodo('Todo 1');
      const todo2 = createTodo('Todo 2');
      
      expect(todo1.id).not.toBe(todo2.id);
    });
  });

  describe('toggleTodoCompletion', () => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        text: 'Todo 1',
        completed: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        text: 'Todo 2',
        completed: true,
        createdAt: new Date(),
      },
    ];

    it('toggles completion status of specified todo', () => {
      const result = toggleTodoCompletion(mockTodos, '1');
      
      expect(result[0].completed).toBe(true);
      expect(result[1].completed).toBe(true); // unchanged
    });

    it('toggles completed todo back to incomplete', () => {
      const result = toggleTodoCompletion(mockTodos, '2');
      
      expect(result[0].completed).toBe(false); // unchanged
      expect(result[1].completed).toBe(false);
    });

    it('does not modify other todos', () => {
      const result = toggleTodoCompletion(mockTodos, '1');
      
      expect(result[0].text).toBe('Todo 1');
      expect(result[0].id).toBe('1');
      expect(result[1]).toEqual(mockTodos[1]);
    });

    it('returns unchanged array if todo ID not found', () => {
      const result = toggleTodoCompletion(mockTodos, 'nonexistent');
      
      expect(result).toEqual(mockTodos);
    });

    it('does not mutate original array', () => {
      const originalTodos = [...mockTodos];
      toggleTodoCompletion(mockTodos, '1');
      
      expect(mockTodos).toEqual(originalTodos);
    });
  });

  describe('deleteTodoById', () => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        text: 'Todo 1',
        completed: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        text: 'Todo 2',
        completed: true,
        createdAt: new Date(),
      },
    ];

    it('removes todo with specified ID', () => {
      const result = deleteTodoById(mockTodos, '1');
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('returns unchanged array if todo ID not found', () => {
      const result = deleteTodoById(mockTodos, 'nonexistent');
      
      expect(result).toEqual(mockTodos);
    });

    it('does not mutate original array', () => {
      const originalTodos = [...mockTodos];
      deleteTodoById(mockTodos, '1');
      
      expect(mockTodos).toEqual(originalTodos);
    });

    it('can delete all todos', () => {
      let result = deleteTodoById(mockTodos, '1');
      result = deleteTodoById(result, '2');
      
      expect(result).toHaveLength(0);
    });
  });

  describe('addTodoToList', () => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        text: 'Existing todo',
        completed: false,
        createdAt: new Date(),
      },
    ];

    it('adds new todo to the end of the list', () => {
      const result = addTodoToList(mockTodos, 'New todo');
      
      expect(result).toHaveLength(2);
      expect(result[1].text).toBe('New todo');
      expect(result[1].completed).toBe(false);
    });

    it('does not add empty text', () => {
      const result = addTodoToList(mockTodos, '');
      
      expect(result).toEqual(mockTodos);
    });

    it('does not add whitespace-only text', () => {
      const result = addTodoToList(mockTodos, '   ');
      
      expect(result).toEqual(mockTodos);
    });

    it('trims whitespace from text', () => {
      const result = addTodoToList(mockTodos, '  New todo  ');
      
      expect(result[1].text).toBe('New todo');
    });

    it('does not mutate original array', () => {
      const originalTodos = [...mockTodos];
      addTodoToList(mockTodos, 'New todo');
      
      expect(mockTodos).toEqual(originalTodos);
    });

    it('works with empty todo list', () => {
      const result = addTodoToList([], 'First todo');
      
      expect(result).toHaveLength(1);
      expect(result[0].text).toBe('First todo');
    });
  });

  describe('isValidTodoText', () => {
    it('returns true for valid text', () => {
      expect(isValidTodoText('Valid todo')).toBe(true);
      expect(isValidTodoText('a')).toBe(true);
    });

    it('returns false for empty text', () => {
      expect(isValidTodoText('')).toBe(false);
    });

    it('returns false for whitespace-only text', () => {
      expect(isValidTodoText('   ')).toBe(false);
      expect(isValidTodoText('\t\n')).toBe(false);
    });

    it('returns true for text with leading/trailing whitespace', () => {
      expect(isValidTodoText('  Valid todo  ')).toBe(true);
    });
  });
});
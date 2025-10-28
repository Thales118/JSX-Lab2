/** @jsx createElement */
import { createElement, useState } from './jsx-runtime';

// Interface cho 1 todo item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Interface cho component hiển thị 1 todo
interface TodoItemProps {
  key?: any;
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div
      className="todo-item"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        backgroundColor: '#fff',
        padding: '8px 12px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <label style={{ flexGrow: 1 }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          style={{ marginRight: '8px' }}
        />
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#aaa' : '#333'
          }}
        >
          {todo.text}
        </span>
      </label>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          backgroundColor: '#ff6b6b',
          border: 'none',
          borderRadius: '6px',
          color: '#fff',
          cursor: 'pointer',
          padding: '4px 10px'
        }}
      >
        ✖
      </button>
    </div>
  );
};

// Form thêm todo
interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [getInput, setInput] = useState('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const value = getInput().trim();
    if (!value) return;
    onAdd(value);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <input
        type="text"
        value={getInput()}
        onInput={(e: any) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        style={{
          padding: '8px 12px',
          width: '70%',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: '10px',
          padding: '8px 14px',
          border: 'none',
          backgroundColor: '#4e8cff',
          color: 'white',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Add
      </button>
    </form>
  );
};

// App chính
const TodoApp = () => {
  const [getTodos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...getTodos(), newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      getTodos().map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(getTodos().filter(todo => todo.id !== id));
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '40px auto',
        backgroundColor: '#f7f9fb',
        padding: '20px',
        borderRadius: '12px'
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#4e8cff' }}>📝 Todo List</h2>
      <AddTodoForm onAdd={addTodo} />
      <div>
        {getTodos().map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: '16px', color: '#555' }}>
        Total: {getTodos().length} | Done:{' '}
        {getTodos().filter(t => t.completed).length}
      </p>
    </div>
  );
};

export { TodoApp };

import {
  useState,
} from 'react';

import { useCountStore } from './store/counter';
import { useTodoStore } from './store/todo';
import type { Todo } from './types';

export default function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const { 
    count, 
    increment,
    decrement,
    reset
  } = useCountStore();  
  const {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  } = useTodoStore();
  const handleAdd = () => inputValue.trim() !== '';
  return (
    <div>
      <h1>count is {count}</h1>
      <button onClick={increment}>
        increment
      </button>
      <button onClick={decrement}>
        decrement
      </button>
      <button onClick={reset}>
        reset
      </button>
      <section>
        <h2>Todos {todos.length}</h2>
        <div>
          <input 
          type="text"
          placeholder="Add a new todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && handleAdd()) {
              addTodo(inputValue);
              setInputValue('');
            }
          }}
           />
           <button onClick={() => {
            if (handleAdd()) {
              addTodo(inputValue);
              setInputValue('');
            }
          }}>Add</button>
        </div>
        <ul>
          { todos.map((todo: Todo) => (
            <li key={todo.id}>
              <span onClick={() => toggleTodo(todo.id)}>
                {todo.title}
              </span>
              <button onClick={() => removeTodo(todo.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
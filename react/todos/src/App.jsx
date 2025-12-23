import './stylus/app.styl';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import TodoStats from './components/TodoStats';
import { useEffect, useState } from 'react';
function App() {
  // 子组件共享的数据状态
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  // 子组件修改数据的方法
  const addTodo = (todo) => {
    setTodos([...todos,{
      id: Date.now(),
      todo,
      completed: false,
    }])
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo,
      completed: !todo.completed,
    }: todo))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  return (
    <div className='todo-app'>
      <h1>My Todo List</h1>
      <TodoInput onAdd={addTodo}/>
      <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo}/>
      <TodoStats 
        total={todos.length}
        active={activeCount}
        completed={completedCount}
        onClearCompleted={clearCompleted}
      />
    </div>
  )
}

export default App
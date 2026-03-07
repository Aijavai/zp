import { useTodos } from './hooks/useTodos';

export default App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos();
  return 
  <div>
    <h1>Todos</h1>
  </div>
}
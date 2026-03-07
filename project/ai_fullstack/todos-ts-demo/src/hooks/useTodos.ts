import {
    useState,
    useCallback,
} from 'react';
import type { Todo } from '../types/todo';


export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const addTodo = () => {
        const newTodo: Todo= {
            id: Date.now(),
            title: '',
            completed: false,
        }
        setTodos([...todos, newTodo]);
    }
}
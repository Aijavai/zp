import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo } from '../types/index';

export interface TodoState {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>()(
    persist(
        (set, get) => ({
    todos: [],
    addTodo:(title: string) => set((state) => ({
        todos: [...state.todos, {
            id: Date.now(),
            title: title,
            completed: false,
        }]
    })),
    toggleTodo: (id: number) => set((state) => ({
        todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
    })),
    removeTodo: (id: number) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
    })),
}),{
        name: 'todos',
        partialize: (state) => ({ todos: state.todos }),
    }
))
import { create } from "zustand";
import type { FilterType, Todo } from "../types/todo.types";

type TodoStore = {
  // state
  todos: Todo[];
  filter: FilterType;

  // actions
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  // intial state
  todos: [],
  filter: "all",

  // actions
  addTodo: (title) => {
    set((state) => ({
      todos: [
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: Date.now(),
        },
        ...state.todos,
      ],
    }));
  },
  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  },
  deleteTodo: (id) => {
    set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id)
    }))
  },
  setFilter: (filter) => {
    set({filter})
  },
}));

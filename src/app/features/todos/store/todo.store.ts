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

export const useTodoStore = create<TodoStore>(() => ({
  // intial state
  todos: [],
  filter: "all",

  // actions
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  setFilter: () => {},
}));

import { useMemo, useState } from "react";
import { useTodoStore } from "../features/todos/store/todo.store";

const TodoApp = () => {
  const [title, setTitle] = useState("");

  const addTodo = useTodoStore((state) => state.addTodo);
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo(title);
    setTitle("");
  };

  // 🔥 derived todos
  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  // 🔥 progress calculation
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="max-w-xl mx-auto mt-16 px-4">
      {/* HEADER CARD */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Todo Done</h1>
          <p className="text-sm text-gray-400">keep it up</p>
        </div>

        <div className="h-20 w-20 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold text-xl">
          {completedCount}/{todos.length || 0}
        </div>
      </div>

      {/* INPUT */}
      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write your next task"
          className="flex-1 rounded-full bg-[#111] border border-white/10 px-4 py-3 outline-none focus:border-orange-500"
        />

        <button
          onClick={handleAdd}
          className="h-12 w-12 rounded-full bg-orange-500 text-black text-xl font-bold hover:scale-105 transition"
        >
          +
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-6">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm border transition
              ${
                filter === f
                  ? "bg-orange-500 text-black border-orange-500"
                  : "border-white/15 text-gray-300 hover:border-white/40"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <ul className="space-y-3">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3"
          >
            <div
              onClick={() => toggleTodo(todo.id)}
              className="flex items-center gap-3 cursor-pointer"
            >
              {/* status dot */}
              <div
                className={`h-3 w-3 rounded-full ${
                  todo.completed ? "bg-green-500" : "bg-orange-500"
                }`}
              />

              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </span>
            </div>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
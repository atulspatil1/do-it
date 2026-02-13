import { useEffect, useState } from "react";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./services/todoService";
import type { Todo, TodoInput } from "./types/Todo";
import "./App.css";
import TodoForm from "./components/TodoForm";
import FilterButtons from "./components/FilterButtons";
import TodoList from "./components/TodoList";

type FilterType = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    loadTodos(); //localStorage.setItem('todos', JSON.stringify(todos));
  }, []);

  const loadTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const handleAddTodo = async (title: string) => {
    const newTodo: TodoInput = {
      title: title,
      completed: false,
    };

    await addTodo(newTodo);
    loadTodos();
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    await updateTodo(id, { ...todo, completed: !todo.completed });
    loadTodos();
  };

  const handleUpdateTodo = async (id: number, title: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    await updateTodo(id, { ...todo, title });
    loadTodos();
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <>
      <div className="header-container">
        <h1>Do It</h1>
      </div>
      <div className="main-container">
        <TodoForm onAddTodo={handleAddTodo} />
        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleUpdateTodo}
        />
        <div className="total-todo">
          <p>
            Total todos: {todos.length} | Showing: {filteredTodos.length}
          </p>
        </div>
      </div>
      <div className="footer-container">
        <p>2026</p>
      </div>
    </>
  );
}

export default App;

import axios from "axios";
import type { TodoInput } from "../types/Todo";

const API_URL = "http://localhost:8080/todos";

export const getTodos = () => axios.get(API_URL);

export const addTodo = (todo: TodoInput) => axios.post(API_URL, todo);

export const updateTodo = (id: number, todo: TodoInput) =>
  axios.put(`${API_URL}/${id}`, todo);

export const deleteTodo = (id: number) => axios.delete(`${API_URL}/${id}`);

import api from "./axios";

export const getTodos = async (params) => {
  const res = await api.get("/todos", { params });
  return res.data;
};

export const createTodo = (data) => api.post("/todos", data);
export const updateTodo = (id, data) => api.patch(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
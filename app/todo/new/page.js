"use client";

import TodoForm from "@/components/TodoForm";
import { createTodo } from "@/lib/todos";

export default function NewTodo() {
  return <TodoForm onSubmit={createTodo} />;
}
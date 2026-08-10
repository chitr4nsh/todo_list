"use client";

import TodoForm from "@/app/components/TodoForm";
import { createTodo } from "@/lib/todos";

export default function NewTodo() {
  return <TodoForm onSubmit={createTodo} />;
}
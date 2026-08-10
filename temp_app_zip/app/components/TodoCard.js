"use client";

export default function TodoCard({ todo, onDelete, onToggle }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow flex justify-between">
      <div>
        <h3 className="font-bold">{todo.title}</h3>
        <p className="text-sm">{todo.priority}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => onToggle(todo)}>
          {todo.status === "COMPLETED" ? "Undo" : "Done"}
        </button>
        <button onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </div>
  );
}
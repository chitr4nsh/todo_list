"use client";

import { useState } from "react";

export default function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Title required");
      return;
    }

    onSubmit({ title, priority: "MEDIUM" });
    setTitle("");
    setError("");
  };

  return (
    <div className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
}
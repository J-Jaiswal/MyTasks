// components/TaskForm.js
"use client";

import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />
      <button
        type="submit"
        className="button"
        style={{ backgroundColor: "#28a745" }}
      >
        Add Task
      </button>
    </form>
  );
}

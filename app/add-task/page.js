// app/add-task/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddTask from "../../components/AddTask";

export default function AddTaskPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAddTask = async (newTask) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (res.ok) {
      setMessage("Task added successfully!");
      router.push("/task-list"); // Redirect to task list
    } else {
      setMessage("Failed to add task.");
    }
  };

  return (
    <div className="task-form-container">
      <h1>Add New Task</h1>
      <AddTask onAdd={handleAddTask} />
      {message && <p className="message">{message}</p>}
    </div>
  );
}

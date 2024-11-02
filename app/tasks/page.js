// app/tasks/page.js
"use client";

import { useEffect, useState } from "react";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const task = await res.json();
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const deleteTask = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

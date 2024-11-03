// app/task-list/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TaskList from "../../components/TaskList";

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks/");
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = async (id, updatedTitle) => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: updatedTitle }),
    });
    const updatedTask = await res.json();
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  return (
    <div className="task-container">
      <Link href="/add-task">
        <button className="button add-button">Add New Task</button>
      </Link>
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
}

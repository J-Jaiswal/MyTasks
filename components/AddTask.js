// app/add-task/page.js
import Link from "next/link";
import { useState } from "react";
import "../app/global.css";

const AddTask = () => {
  const [task, setTask] = useState("");
  const [notification, setNotification] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task) return;

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    if (response.ok) {
      setNotification("Task added successfully!");
      setTimeout(() => {
        // Redirect to Task List after showing notification
        window.location.href = "/task-list";
      }, 2000); // Redirects after 2 seconds
    } else {
      setNotification("Failed to add task.");
    }

    setTask("");
  };

  return (
    <div className="task-form-container">
      <h2>Add Task</h2>
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          className="task-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button type="submit" className="button">
          Add Task
        </button>
      </form>
      <Link href="/" passHref>
        <button className="button">Back to Home</button>
      </Link>
      {notification && <p className="notification">{notification}</p>}
    </div>
  );
};

export default AddTask;

import Link from "next/link";
import { useEffect, useState } from "react";
import "../app/global.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    // Refresh the task list
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditTaskValue(task.task);
  };

  const handleUpdate = async (id) => {
    if (!editTaskValue) return; // Prevent empty task updates

    const response = await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, task: editTaskValue }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t))); // Update the local task list
      setEditTaskId(null); // Reset edit state
      setEditTaskValue(""); // Clear input
    }
  };

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editTaskId === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editTaskValue}
                    onChange={(e) => setEditTaskValue(e.target.value)}
                    className="edit-input"
                  />
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="update-button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditTaskId(null)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <span>{task.task}</span>
                  <button
                    onClick={() => handleEdit(task)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li>No tasks available.</li>
        )}
      </ul>
      <Link href="/" passHref>
        <button className="button">Back to Home</button>
      </Link>
    </div>
  );
};

export default TaskList;

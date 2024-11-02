// components/TaskList.js
"use client";

export default function TaskList({ tasks, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <span>{task.title}</span>
          <button onClick={() => onDelete(task.id)} className="delete-button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

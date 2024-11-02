// app/page.js
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Task Management App</h2>
      <div className="home-buttons">
        <Link href="/add-task">
          <button className="button">Add Task</button>
        </Link>
        <Link href="/task-list">
          <button className="button">View Task List</button>
        </Link>
      </div>
    </div>
  );
}

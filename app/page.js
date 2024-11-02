// app/page.js
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to the Task Manager</h1>
      <Link href="/tasks">
        <button className="button">Go to Task List</button>
      </Link>
    </div>
  );
}

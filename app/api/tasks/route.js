import { NextResponse } from "next/server";

let tasks = [
  { id: 1, task: "Sample Task 1" },
  { id: 2, task: "Sample Task 2" },
  { id: 3, task: "Sample Task 3" },
];

// GET all tasks
export async function GET() {
  return NextResponse.json(tasks);
}

// POST a new task
export async function POST(request) {
  const { task } = await request.json();
  const newTask = {
    id: tasks.length + 1,
    task,
  };
  tasks.push(newTask);
  return NextResponse.json(newTask);
}

// DELETE a task
export async function DELETE(request) {
  const { id } = await request.json();
  tasks = tasks.filter((task) => task.id !== id);
  return NextResponse.json({ message: "Task deleted" });
}

// PUT (update) a task
export async function PUT(request) {
  const { id, task } = await request.json();
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex].task = task;
    return NextResponse.json(tasks[taskIndex]);
  }

  return NextResponse.json({ message: "Task not found" }, { status: 404 });
}

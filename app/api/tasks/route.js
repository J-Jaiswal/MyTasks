// app/api/tasks/route.js
let tasks = []; // In-memory storage for tasks

// Handle GET requests
export async function GET() {
  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Handle POST requests
export async function POST(request) {
  try {
    const data = await request.json();
    const newTask = { ...data, id: crypto.randomUUID() };
    tasks.push(newTask);
    return new Response(JSON.stringify(newTask), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST Error:", error);
    return new Response("Error creating task", { status: 500 });
  }
}

// Handle DELETE requests
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    tasks = tasks.filter((task) => task.id !== id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response("Error deleting task", { status: 500 });
  }
}

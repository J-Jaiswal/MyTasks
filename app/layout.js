// app/layout.js
import "../app/global.css";

export const metadata = {
  title: "Task Management",
  description: "A simple task management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Task Management App</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

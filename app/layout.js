// app/layout.js
import "../app/global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Task Manager</h1>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

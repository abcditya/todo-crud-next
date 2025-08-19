// app/page.tsx
import { pool } from "../lib/db";

export default async function Home() {
  // Ambil semua todo dari database
  const { rows: todos } = await pool.query("SELECT * FROM todos ORDER BY id DESC");

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Todo CRUD</h1>

      {/* Form tambah todo */}
      <form action="/api/todos" method="POST" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Tambah todo..."
          required
          style={{ padding: "8px", width: "250px" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: "8px" }}>
          Tambah
        </button>
      </form>

      {/* Daftar todo */}
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}

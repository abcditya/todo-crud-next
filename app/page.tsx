// app/page.tsx
import { pool } from '../lib/db';

export default async function Home() {
  const { rows: todos } = await pool.query("SELECT * FROM todos ORDER BY id DESC");

  return (
    <main>
      <h1>Todo CRUD</h1>
      <form action="/api/todos" method="POST">
        <input type="text" name="title" placeholder="Tambah todo..." />
        <button type="submit">Tambah</button>
      </form>

      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}

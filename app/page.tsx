'use client';
import { useEffect, useState } from 'react';

type Todo = { id: string; title: string; done: boolean; createdAt: string };

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  async function refresh() {
    const res = await fetch('/api/todos', { cache: 'no-store' });
    setTodos(await res.json());
  }
  useEffect(() => { refresh(); }, []);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const created = await res.json();
    setTodos([created, ...todos]);
    setTitle('');
  }

  async function toggle(id: string, done: boolean) {
    const res = await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, done }),
    });
    const updated = await res.json();
    setTodos(todos.map(t => (t.id === id ? updated : t)));
  }

  async function remove(id: string) {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter(t => t.id !== id));
  }

  return (
    <main style={{maxWidth: 720, margin: '24px auto', fontFamily: 'system-ui'}}>
      <h1>Todo CRUD</h1>

      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Tambah todo…"
          required
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Tambah</button>
      </form>

      <ul style={{ display: 'grid', gap: 8, padding: 0, listStyle: 'none' }}>
        {todos.map(t => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id, !t.done)} />
            <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
            <button onClick={() => remove(t.id)} style={{ marginLeft: 'auto' }}>Hapus</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

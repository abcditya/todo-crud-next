"use client";

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title) return;

    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle(""); // reset input
  }

  return (
    <div>
      <h1>Todo CRUD</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tulis todo..."
        />
        <button type="submit">Tambah</button>
      </form>
    </div>
  );
}

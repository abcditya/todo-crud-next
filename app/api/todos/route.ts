// app/api/todos/route.ts
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
};

// GET /api/todos
export async function GET() {
  const { rows } = await pool.query<Todo>('SELECT * FROM "Todo" ORDER BY "createdAt" DESC');
  return NextResponse.json(rows);
}

// POST /api/todos  { title }
export async function POST(req: Request) {
  const { title } = await req.json();
  const { rows } = await pool.query<Todo>(
    'INSERT INTO "Todo" ("title") VALUES ($1) RETURNING *',
    [title]
  );
  return NextResponse.json(rows[0], { status: 201 });
}

// PUT /api/todos  { id, done }
export async function PUT(req: Request) {
  const { id, done } = await req.json();
  const { rows } = await pool.query<Todo>(
    'UPDATE "Todo" SET "done"=$1 WHERE "id"=$2 RETURNING *',
    [done, id]
  );
  return NextResponse.json(rows[0]);
}

// DELETE /api/todos  { id }
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await pool.query('DELETE FROM "Todo" WHERE "id"=$1', [id]);
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { pool } from '../../../lib/db';


// GET semua todos
export async function GET() {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  return NextResponse.json(result.rows);
}

// POST tambah todo
export async function POST(req: Request) {
  const { text } = await req.json();
  const result = await pool.query(
    "INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *",
    [text, false]
  );
  return NextResponse.json(result.rows[0]);
}

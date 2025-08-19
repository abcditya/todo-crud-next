// lib/db.ts
import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var _pool: Pool | undefined;
}

export const pool =
  global._pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // aman untuk Vercel Postgres
  });

if (!global._pool) global._pool = pool;

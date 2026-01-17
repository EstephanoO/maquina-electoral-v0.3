import { getPool } from "@/src/db/sql";

export type UserRecord = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export async function findUserByEmail(email: string) {
  const pool = getPool();
  const result = await pool.query<UserRecord>(
    "SELECT id, email, password_hash, created_at FROM public.users WHERE email = $1",
    [email],
  );
  return result.rows[0] ?? null;
}

export async function createUser(email: string, passwordHash: string) {
  const pool = getPool();
  const result = await pool.query<UserRecord>(
    "INSERT INTO public.users (email, password_hash) VALUES ($1, $2) RETURNING id, email, password_hash, created_at",
    [email, passwordHash],
  );
  return result.rows[0];
}

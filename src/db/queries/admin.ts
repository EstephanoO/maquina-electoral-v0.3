import { getPool } from "@/src/db/sql";

export type AdminProfileRecord = {
  user_id: string;
  email: string;
  profile: unknown;
  updated_at: string;
};

export async function listAdminOnboardingProfiles() {
  const pool = getPool();
  const result = await pool.query<AdminProfileRecord>(
    "SELECT onboarding_profiles.user_id, users.email, onboarding_profiles.profile, onboarding_profiles.updated_at FROM public.onboarding_profiles JOIN public.users ON users.id = onboarding_profiles.user_id ORDER BY onboarding_profiles.updated_at DESC",
  );
  return result.rows;
}

export type AdminDeletedClient = {
  user: { id: string; email: string; created_at: string } | null;
  profile: { user_id: string; updated_at: string } | null;
};

export async function deleteAdminClient(userId: string): Promise<AdminDeletedClient> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const profileResult = await client.query<{
      user_id: string;
      updated_at: string;
    }>(
      "DELETE FROM public.onboarding_profiles WHERE user_id = $1 RETURNING user_id, updated_at",
      [userId],
    );
    const userResult = await client.query<{
      id: string;
      email: string;
      created_at: string;
    }>(
      "DELETE FROM public.users WHERE id = $1 RETURNING id, email, created_at",
      [userId],
    );
    await client.query("COMMIT");
    return {
      user: userResult.rows[0] ?? null,
      profile: profileResult.rows[0] ?? null,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

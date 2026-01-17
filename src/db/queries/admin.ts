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

import { getPool } from "@/src/db/sql";
import type { OnboardingProfile } from "@/src/db/onboarding-schema";

export type OnboardingProfileRecord = {
  user_id: string;
  profile: OnboardingProfile;
  updated_at: string;
};

export async function upsertOnboardingProfile(
  userId: string,
  profile: OnboardingProfile,
) {
  const pool = getPool();
  const result = await pool.query<OnboardingProfileRecord>(
    "INSERT INTO public.onboarding_profiles (user_id, profile) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET profile = EXCLUDED.profile, updated_at = now() RETURNING user_id, profile, updated_at",
    [userId, profile],
  );
  return result.rows[0];
}

export async function getOnboardingProfile(userId: string) {
  const pool = getPool();
  const result = await pool.query<OnboardingProfileRecord>(
    "SELECT user_id, profile, updated_at FROM public.onboarding_profiles WHERE user_id = $1",
    [userId],
  );
  return result.rows[0] ?? null;
}

export async function listOnboardingProfiles() {
  const pool = getPool();
  const result = await pool.query<OnboardingProfileRecord>(
    "SELECT user_id, profile, updated_at FROM public.onboarding_profiles ORDER BY updated_at DESC",
  );
  return result.rows;
}

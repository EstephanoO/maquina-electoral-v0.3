import { NextResponse } from "next/server";
import { z } from "zod";
import { OnboardingProfileSchema } from "@/src/db/onboarding-schema";
import {
  getOnboardingProfile,
  listOnboardingProfiles,
  upsertOnboardingProfile,
} from "@/src/db/queries/onboarding";

const QuerySchema = z.object({
  userId: z.string().min(1),
});

const SaveSchema = z.object({
  userId: z.string().min(1),
  profile: OnboardingProfileSchema,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    const list = await listOnboardingProfiles();
    return NextResponse.json({ profiles: list });
  }

  const parsed = QuerySchema.safeParse({ userId });
  if (!parsed.success) {
    return NextResponse.json({ error: "userId invalido" }, { status: 400 });
  }

  const profile = await getOnboardingProfile(parsed.data.userId);
  return NextResponse.json({ profile });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = SaveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalido" }, { status: 400 });
  }

  const saved = await upsertOnboardingProfile(
    parsed.data.userId,
    parsed.data.profile,
  );
  return NextResponse.json({ profile: saved });
}

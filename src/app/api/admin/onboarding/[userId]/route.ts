import { NextResponse } from "next/server";
import { getOnboardingProfile, updateOnboardingProfile } from "@/src/db/queries/onboarding";
import { deleteAdminClient } from "@/src/db/queries/admin";

type RouteContext = { params: Promise<{ userId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { userId } = await context.params;
  const profile = await getOnboardingProfile(userId);
  return NextResponse.json({ profile });
}

export async function PUT(request: Request, context: RouteContext) {
  const { userId } = await context.params;
  const body = await request.json();
  const updated = await updateOnboardingProfile(userId, body.profile);
  return NextResponse.json({ profile: updated });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { userId } = await context.params;
  const deleted = await deleteAdminClient(userId);
  return NextResponse.json({ deleted });
}

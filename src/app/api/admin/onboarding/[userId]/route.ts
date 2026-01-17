import { NextResponse } from "next/server";
import { getOnboardingProfile, updateOnboardingProfile } from "@/src/db/queries/onboarding";
import { deleteAdminClient } from "@/src/db/queries/admin";

export async function GET(
  _request: Request,
  { params }: { params: { userId: string } },
) {
  const profile = await getOnboardingProfile(params.userId);
  return NextResponse.json({ profile });
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const body = await request.json();
  const updated = await updateOnboardingProfile(params.userId, body.profile);
  return NextResponse.json({ profile: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { userId: string } },
) {
  const deleted = await deleteAdminClient(params.userId);
  return NextResponse.json({ deleted });
}

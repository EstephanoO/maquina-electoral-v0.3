import { NextResponse } from "next/server";
import { listAdminOnboardingProfiles } from "@/src/db/queries/admin";

export async function GET() {
  const profiles = await listAdminOnboardingProfiles();
  return NextResponse.json({ profiles });
}

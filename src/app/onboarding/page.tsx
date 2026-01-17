"use client";

import { OnboardingFlow } from "@/src/ui/onboarding/OnboardingFlow";
import { ProtectedRoute } from "@/src/ui/auth/ProtectedRoute";

export default function OnboardingPage() {
  return (
    <ProtectedRoute requiredRole="cliente">
      <OnboardingFlow />
    </ProtectedRoute>
  );
}

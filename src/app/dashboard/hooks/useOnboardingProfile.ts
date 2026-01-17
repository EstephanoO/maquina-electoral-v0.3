"use client";

import { useEffect, useState } from "react";
import type { OnboardingContext } from "@/src/onboarding/types";
import { OnboardingContextSchema } from "@/src/onboarding/types";
import { authStorage } from "@/src/auth/storage";

export function useOnboardingProfile() {
  const [state, setState] = useState<
    | { status: "idle" }
    | { status: "ready"; payload: OnboardingContext }
    | { status: "missing" }
    | { status: "error" }
  >({ status: "idle" });

  useEffect(() => {
    const session = authStorage.load();
    if (!session) {
      setState({ status: "error" });
      return;
    }

    fetch(`/api/onboarding?userId=${session.userId}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("error");
        }
        const data = await response.json();
        if (!data.profile) {
          setState({ status: "missing" });
          return;
        }
        const parsed = OnboardingContextSchema.safeParse(data.profile.profile);
        if (!parsed.success) {
          setState({ status: "error" });
          return;
        }
        setState({ status: "ready", payload: parsed.data });
      })
      .catch(() => {
        setState({ status: "error" });
      });
  }, []);

  return state;
}

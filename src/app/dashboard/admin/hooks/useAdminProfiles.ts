"use client";

import { useEffect, useState } from "react";

export type AdminProfile = {
  user_id: string;
  email: string;
  profile: Record<string, unknown>;
  updated_at: string;
};

export function useAdminProfiles() {
  const [state, setState] = useState<
    | { status: "idle" }
    | { status: "ready"; payload: AdminProfile[] }
    | { status: "error" }
  >({ status: "idle" });

  useEffect(() => {
    fetch("/api/admin/onboarding")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("error");
        }
        const data = await response.json();
        setState({ status: "ready", payload: data.profiles ?? [] });
      })
      .catch(() => {
        setState({ status: "error" });
      });
  }, []);

  return state;
}

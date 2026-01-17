"use client";

import { useEffect, useState, useCallback } from "react";

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

  const refresh = useCallback(() => {
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

  useEffect(() => {
    refresh();
  }, [refresh]);

  const remove = useCallback(async (userId: string) => {
    await fetch(`/api/admin/onboarding/${userId}`, { method: "DELETE" });
    refresh();
  }, [refresh]);

  const update = useCallback(
    async (userId: string, profile: Record<string, unknown>) => {
      await fetch(`/api/admin/onboarding/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });
      refresh();
    },
    [refresh],
  );

  return { ...state, refresh, remove, update };
}

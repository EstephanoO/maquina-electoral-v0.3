"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStorage } from "@/src/auth/storage";

export function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: "cliente" | "admin";
}) {
  const router = useRouter();

  useEffect(() => {
    const session = authStorage.load();
    if (!session) {
      router.replace("/login");
      return;
    }
    if (requiredRole && session.role !== requiredRole) {
      router.replace(session.role === "admin" ? "/dashboard/admin" : "/dashboard");
    }
  }, [requiredRole, router]);

  return <>{children}</>;
}

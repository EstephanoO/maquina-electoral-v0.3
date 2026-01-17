import { authStorage } from "@/src/auth/storage";

export type SessionLabel = {
  email: string;
  role: "cliente" | "admin";
};

export function getSessionLabel(): SessionLabel | null {
  const session = authStorage.load();
  if (!session) return null;
  return {
    email: session.email,
    role: session.role,
  };
}

import { z } from "zod";

export const AuthSessionSchema = z.object({
  userId: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["cliente", "admin"]),
  token: z.string().min(1),
  createdAt: z.string().min(1),
});

export type AuthSession = z.infer<typeof AuthSessionSchema>;

const STORAGE_KEY = "authSession";

export const authStorage = {
  load(): AuthSession | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = AuthSessionSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  },
  save(session: AuthSession) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },
  clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  },
};

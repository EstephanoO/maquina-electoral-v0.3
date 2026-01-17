"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authStorage } from "@/src/auth/storage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, mode }),
    });

    if (!response.ok) {
      return;
    }

    const session = await response.json();
    authStorage.save({
      userId: session.userId,
      email: session.email,
      role: session.role,
      token: session.token,
      createdAt: session.createdAt,
    });

    if (session.role === "admin") {
      router.push("/dashboard/admin");
      return;
    }

    const onboardingResponse = await fetch(
      `/api/onboarding?userId=${session.userId}`,
    );
    if (!onboardingResponse.ok) {
      router.push("/onboarding");
      return;
    }
    const onboardingData = await onboardingResponse.json();
    if (!onboardingData.profile) {
      router.push("/onboarding");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-zinc-800/80 bg-black/40 p-6 space-y-5"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Acceso
          </p>
          <h1 className="text-3xl text-white font-semibold">Ingresar</h1>
          <p className="text-sm text-zinc-400">
            Crea tu cuenta o ingresa para continuar al onboarding.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="login-email" className="text-sm text-zinc-300">
            Correo
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-zinc-800/80 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="login-password" className="text-sm text-zinc-300">
            Clave
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-zinc-800/80 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm text-zinc-300">Modo</legend>
          <div className="flex gap-2">
            {(["register", "login"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                aria-pressed={mode === item}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm ${
                  mode === item
                    ? "border-blue-500 bg-blue-500/10 text-blue-200"
                    : "border-zinc-800/80 bg-black/30 text-zinc-300"
                }`}
              >
                {item === "register" ? "Crear cuenta" : "Ingresar"}
              </button>
            ))}
          </div>
        </fieldset>


        <button
          type="submit"
          className="w-full rounded-full bg-amber-500 py-3 text-sm font-semibold text-black"
        >
          {mode === "login" ? "Entrar" : "Registrar"}
        </button>
        <p className="text-xs text-zinc-500 text-center">
          Admin: admin@goberna.com · admin123
        </p>
      </form>
    </div>
  );
}

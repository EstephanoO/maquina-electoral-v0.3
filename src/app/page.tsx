import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">
            Maquina Electoral
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">
            Onboarding estrategico para campañas modernas
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-400">
            Configura tu plan de campaña con un flujo guiado y profesional antes de
            entrar al war room.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition hover:bg-amber-400"
            >
              Crear cuenta y empezar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

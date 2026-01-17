"use client";

import { useRouter } from "next/navigation";
import { padronData } from "@/src/db/constants/padron";
import { ProtectedRoute } from "@/src/ui/auth/ProtectedRoute";
import { authStorage } from "@/src/auth/storage";
import { getSessionLabel } from "@/src/ui/auth/session";
import { partidosData } from "@/src/db/constants/partidos2";
import { useOnboardingProfile } from "@/src/app/dashboard/hooks/useOnboardingProfile";

export default function DashboardPage() {
  const router = useRouter();
  const session = getSessionLabel();
  const data = useOnboardingProfile();

  return (
    <ProtectedRoute requiredRole="cliente">
      <div className="min-h-screen bg-background text-foreground px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Dashboard
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-white">
                Resumen de onboarding
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <span>Contexto nacional desde el padrón electoral.</span>
                {session && (
                  <span className="rounded-full border border-zinc-800/80 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em]">
                    {session.email} · {session.role}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                authStorage.clear();
                router.push("/login");
              }}
              className="w-full sm:w-auto rounded-full border border-zinc-800/80 px-4 py-2 text-sm text-zinc-300 hover:border-amber-500/40"
            >
              Cerrar sesión
            </button>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-5">
              <p className="text-sm text-zinc-400">Electores</p>
              <p className="text-2xl font-semibold text-white">
                {padronData.national.region.data.summary.totalElectores.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-5">
              <p className="text-sm text-zinc-400">Mujeres</p>
              <p className="text-2xl font-semibold text-white">
                {padronData.national.region.data.summary.mujeres.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-5">
              <p className="text-sm text-zinc-400">Hombres</p>
              <p className="text-2xl font-semibold text-white">
                {padronData.national.region.data.summary.hombres.toLocaleString()}
              </p>
            </div>
          </div>

          {data.status === "error" && (
            <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-6 text-zinc-300">
              No encontramos datos guardados. Vuelve al onboarding.
            </div>
          )}

          {data.status === "ready" && (
            <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    Candidato
                  </p>
                  <p className="text-lg text-white">
                    {String(data.payload?.campaignProfile?.firstName || "")} {" "}
                    {String(data.payload?.campaignProfile?.lastName || "")}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {String(data.payload?.campaignProfile?.residence || "")}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    Partido
                  </p>
                  {(() => {
                    const partyId = String(data.payload?.politicalParty || "");
                    const party = partidosData.items.find(
                      (item) => item.TxCodOp === partyId,
                    );
                    if (!party) {
                      return <p className="text-sm text-zinc-400">Sin partido</p>;
                    }
                    return (
                      <div className="flex items-center gap-3">
                        <img
                          src={party.logoUrl}
                          alt={party.TxDesOp}
                          className="h-10 w-10 rounded-full border border-zinc-800/70 bg-black/40 object-contain"
                          loading="lazy"
                        />
                        <span className="text-sm text-zinc-200">
                          {party.TxDesOp}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <section className="rounded-2xl border border-zinc-800/80 bg-black/50 p-4 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                      Agenda
                    </p>
                    <h2 className="text-lg text-white">Operación diaria</h2>
                    <p className="text-sm text-zinc-400">
                      Calendario político, tablero de tareas y administración del
                      equipo con recordatorios activos.
                    </p>
                  </div>
                  <div className="grid gap-3 text-xs text-zinc-400">
                    <div className="rounded-xl border border-zinc-800/80 bg-black/40 p-3">
                      Calendario estratégico: 3 eventos clave esta semana.
                    </div>
                    <div className="rounded-xl border border-zinc-800/80 bg-black/40 p-3">
                      Board táctico: 8 tareas en curso, 2 bloqueadas.
                    </div>
                    <div className="rounded-xl border border-zinc-800/80 bg-black/40 p-3">
                      Equipo: 5 responsables con recordatorios pendientes.
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-zinc-800/80 bg-black/50 p-4 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                      Social
                    </p>
                    <h2 className="text-lg text-white">Radar de redes</h2>
                    <p className="text-sm text-zinc-400">
                      Apify + Gemini para scraping, análisis total y KPIs de
                      Instagram, Facebook y TikTok.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-zinc-800/80 bg-black/40 p-3 text-xs text-zinc-400">
                      Cliente: 12.4k seguidores · 4.1% engagement.
                    </div>
                    <div className="rounded-xl border border-zinc-800/80 bg-black/40 p-3 text-xs text-zinc-400">
                      Competencia: 3 adversarios monitoreados con picos recientes.
                    </div>
                    <div className="rounded-xl border border-zinc-800/80 bg-black/40 p-3 text-xs text-zinc-400">
                      Hallazgos: narrativa positiva 62%, negativa 18%.
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-zinc-800/80 bg-black/50 p-4 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                      GeoHub
                    </p>
                    <h2 className="text-lg text-white">Mapa de campaña</h2>
                    <p className="text-sm text-zinc-400">
                      Dashboard estilo ArcGIS para territorio, zonas calientes y
                      rutas prioritarias.
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/80 bg-gradient-to-br from-blue-500/10 via-black/40 to-amber-500/10 p-4">
                    <div className="h-32 w-full rounded-xl border border-blue-500/30 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(0,0,0,0.8))]" />
                    <p className="mt-3 text-xs text-zinc-400">
                      Vista territorial simulada, lista para integrar capas.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}

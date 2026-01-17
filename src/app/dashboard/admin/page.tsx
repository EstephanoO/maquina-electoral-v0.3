"use client";

import { padronData } from "@/src/db/constants/padron";
import { ProtectedRoute } from "@/src/ui/auth/ProtectedRoute";
import { authStorage } from "@/src/auth/storage";
import { useRouter } from "next/navigation";
import { useAdminProfiles } from "@/src/app/dashboard/admin/hooks/useAdminProfiles";

export default function AdminDashboardPage() {
  const router = useRouter();
  const profiles = useAdminProfiles();

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-background text-foreground px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Admin
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-white">
                Dashboard admin
              </h1>
              <p className="text-sm text-zinc-400">
                Vista básica con el padrón nacional como contexto.
              </p>
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

          <section className="rounded-2xl border border-zinc-800/80 bg-black/40 p-6 space-y-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Clientes
              </p>
              <h2 className="text-xl text-white font-semibold">
                Lista de candidatos monitoreados
              </h2>
              <p className="text-sm text-zinc-400">
                Onboardings recientes y planes activos en campaña.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {profiles.status === "ready" &&
                profiles.payload.map((profile) => {
                  const payload = profile.profile as Record<string, unknown>;
                  const campaign = (payload.campaignProfile || {}) as Record<
                    string,
                    string
                  >;
                  const campaignName = `${campaign.firstName || ""} ${campaign.lastName || ""}`.trim();
                  const politicalParty = String(
                    payload.politicalParty || "Sin partido",
                  );
                  const politicalLevel = String(
                    payload.politicalLevel || "Sin nivel",
                  );
                  const politicalRole = String(payload.politicalRole || "Sin rol");
                  const campaignStrategy = String(
                    payload.campaignStrategy || "Sin estrategia",
                  );
                  return (
                    <div
                      key={profile.user_id}
                      className="rounded-xl border border-zinc-800/80 bg-black/50 p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg text-white">
                            {campaignName || "Sin nombre"}
                          </p>
                          <p className="text-sm text-zinc-400">
                            {politicalParty}
                          </p>
                          <p className="text-xs text-zinc-500">{profile.email}</p>
                        </div>
                        <span className="rounded-full border border-zinc-800/80 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-400">
                          {politicalLevel}
                        </span>
                      </div>
                      <div className="grid gap-2 text-xs text-zinc-400">
                        <p>Rol: {politicalRole}</p>
                        <p>
                          Residencia: {String(campaign.residence || "Sin residencia")}
                        </p>
                        <p>Estrategia: {campaignStrategy}</p>
                      </div>
                    </div>
                  );
                })}
              {profiles.status === "error" && (
                <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-4 text-sm text-zinc-400">
                  No se pudo cargar la lista de onboarding.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}

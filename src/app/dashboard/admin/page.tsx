"use client";

import { padronData } from "@/src/db/constants/padron";
import { ProtectedRoute } from "@/src/ui/auth/ProtectedRoute";
import { authStorage } from "@/src/auth/storage";
import { useRouter } from "next/navigation";
import { useAdminProfiles } from "@/src/app/dashboard/admin/hooks/useAdminProfiles";

export default function AdminDashboardPage() {
  const router = useRouter();
  const profiles = useAdminProfiles();
  const isLoading = profiles.status === "idle";

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
              {isLoading && (
                <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-4 text-sm text-zinc-400">
                  Cargando clientes...
                </div>
              )}
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
                  const adminConfig = (payload.adminConfig || {}) as Record<
                    string,
                    string
                  >;
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
                          {adminConfig.status && (
                            <p className="text-xs text-amber-200/80">
                              Estado: {adminConfig.status}
                            </p>
                          )}
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
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const nextProfile = {
                              ...payload,
                              adminConfig: {
                                status: "configurado",
                                updatedAt: new Date().toISOString(),
                              },
                            };
                            profiles.update(profile.user_id, nextProfile);
                          }}
                          className="rounded-full border border-blue-500/50 bg-blue-500/10 px-3 py-1 text-xs text-blue-200"
                        >
                          Configurar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const nextParty = window.prompt(
                              "Partido político",
                              politicalParty,
                            );
                            if (!nextParty) return;
                            const nextProfile = {
                              ...payload,
                              politicalParty: nextParty,
                            };
                            profiles.update(profile.user_id, nextProfile);
                          }}
                          className="rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-xs text-amber-200"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              !window.confirm(
                                "Seguro que deseas borrar este cliente?",
                              )
                            ) {
                              return;
                            }
                            profiles.remove(profile.user_id);
                          }}
                          className="rounded-full border border-red-500/50 bg-red-500/10 px-3 py-1 text-xs text-red-200"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  );
                })}
              {profiles.status === "error" && (
                <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-4 text-sm text-zinc-400">
                  No se pudo cargar la lista de onboarding.
                </div>
              )}
              {profiles.status === "ready" && profiles.payload.length === 0 && (
                <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-4 text-sm text-zinc-400">
                  Aun no hay clientes con onboarding guardado.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}

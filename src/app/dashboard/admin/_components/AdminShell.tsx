"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { padronData } from "@/src/db/constants/padron";
import { ProtectedRoute } from "@/src/ui/auth/ProtectedRoute";
import { authStorage } from "@/src/auth/storage";
import { useAdminProfiles } from "@/src/app/dashboard/admin/hooks/useAdminProfiles";

type AdminShellProps = {
  title: string;
  subtitle: string;
  mapLabel: string;
  mapSubtitle: string;
  sidePanel: ReactNode;
};

export function AdminShell({
  title,
  subtitle,
  mapLabel,
  mapSubtitle,
  sidePanel,
}: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const profiles = useAdminProfiles();
  const isLoading = profiles.status === "idle";
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const readyProfiles = profiles.status === "ready" ? profiles.payload : [];
  const activeProfile =
    readyProfiles.find((profile) => profile.user_id === selectedProfileId) ??
    readyProfiles[0];
  const activePayload = (activeProfile?.profile || {}) as Record<string, unknown>;
  const campaign = (activePayload.campaignProfile || {}) as Record<string, string>;
  const campaignName = `${campaign.firstName || ""} ${campaign.lastName || ""}`.trim();
  const politicalParty = String(activePayload.politicalParty || "Sin partido");
  const politicalLevel = String(activePayload.politicalLevel || "Sin nivel");
  const politicalRole = String(activePayload.politicalRole || "Sin rol");
  const campaignStrategy = String(activePayload.campaignStrategy || "Sin estrategia");
  const adminConfig = (activePayload.adminConfig || {}) as Record<string, string>;

  const navItems = [
    { label: "Home", href: "/dashboard/admin" },
    { label: "Social", href: "/dashboard/admin/social" },
    { label: "GeoHub", href: "/dashboard/admin/geohub" },
  ];

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen w-full bg-black text-zinc-100 lg:h-screen lg:overflow-hidden">
        <div className="flex min-h-screen flex-col lg:h-full lg:flex-row">
          <aside className="flex w-full flex-col border-b border-zinc-900 bg-[#050505] lg:w-[320px] lg:border-b-0 lg:border-r">
            <div className="border-b border-zinc-900 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.4em] text-zinc-500">
                Admin Command
              </p>
              <p className="text-lg font-semibold text-white">Clientes</p>
              <p className="text-xs text-zinc-500">
                Centro operativo y configuracion avanzada.
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-2 border-b border-zinc-900 px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full border px-3 py-1 transition ${
                      isActive
                        ? "border-blue-500/60 bg-blue-500/10 text-blue-200"
                        : "border-transparent text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                Clientes activos
              </p>
              <button
                type="button"
                className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-[11px] text-blue-200 transition hover:border-blue-400"
              >
                Nuevo
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-4 lg:pb-6">
              {isLoading && (
                <div className="rounded-lg border border-zinc-800/80 bg-black/40 p-3 text-xs text-zinc-500">
                  Cargando clientes...
                </div>
              )}
              {profiles.status === "ready" && profiles.payload.length === 0 && (
                <div className="rounded-lg border border-zinc-800/80 bg-black/40 p-3 text-xs text-zinc-500">
                  Aun no hay clientes con onboarding guardado.
                </div>
              )}
              {profiles.status === "error" && (
                <div className="rounded-lg border border-zinc-800/80 bg-black/40 p-3 text-xs text-zinc-500">
                  No se pudo cargar la lista de onboarding.
                </div>
              )}
              {profiles.status === "ready" &&
                profiles.payload.map((profile) => {
                  const payload = profile.profile as Record<string, unknown>;
                  const profileCampaign = (payload.campaignProfile || {}) as Record<
                    string,
                    string
                  >;
                  const profileName = `${profileCampaign.firstName || ""} ${
                    profileCampaign.lastName || ""
                  }`.trim();
                  const profileParty = String(payload.politicalParty || "Sin partido");
                  const isActive = profile.user_id === activeProfile?.user_id;

                  return (
                    <button
                      key={profile.user_id}
                      type="button"
                      onClick={() => setSelectedProfileId(profile.user_id)}
                      className={`mb-3 w-full rounded-lg border px-3 py-3 text-left transition ${
                        isActive
                          ? "border-blue-500/60 bg-blue-500/10"
                          : "border-zinc-900 bg-black/40 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {profileName || "Sin nombre"}
                          </p>
                          <p className="text-xs text-zinc-400">{profileParty}</p>
                          <p className="text-[11px] text-zinc-500">{profile.email}</p>
                        </div>
                        <span className="rounded-full border border-zinc-800/80 bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                          {String(payload.politicalLevel || "Nivel")}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedProfileId(profile.user_id);
                            setIsConfigOpen(true);
                          }}
                          className="rounded-full border border-blue-500/50 bg-blue-500/10 px-2 py-1 text-blue-200"
                        >
                          Configurar
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            const nextParty = window.prompt(
                              "Partido politico",
                              profileParty,
                            );
                            if (!nextParty) return;
                            profiles.update(profile.user_id, {
                              ...payload,
                              politicalParty: nextParty,
                            });
                          }}
                          className="rounded-full border border-zinc-800/80 px-2 py-1 text-zinc-400 transition hover:border-zinc-600"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            if (
                              !window.confirm(
                                "Seguro que deseas borrar este cliente?",
                              )
                            ) {
                              return;
                            }
                            profiles.remove(profile.user_id);
                          }}
                          className="rounded-full border border-zinc-800/80 px-2 py-1 text-zinc-400 transition hover:border-red-500/60 hover:text-red-200"
                        >
                          Borrar
                        </button>
                      </div>
                    </button>
                  );
                })}
            </div>

              <div className="border-t border-zinc-900 px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    authStorage.clear();
                    router.push("/login");
                  }}
                  className="w-full rounded-full border border-zinc-800/80 px-3 py-2 text-xs text-zinc-400 transition hover:border-amber-500/50"
                >
                  Cerrar sesion
                </button>
              </div>

          </aside>

          <main className="flex flex-1 flex-col bg-[#040404]">
            <header className="flex flex-col gap-2 border-b border-zinc-900 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-500">
                  Admin War Room
                </p>
                <p className="text-base font-semibold text-white sm:text-lg">
                  {title}
                </p>
                <p className="text-xs text-zinc-400">{subtitle}</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-full border border-zinc-800/80 px-3 py-1 text-zinc-400 transition hover:border-zinc-700"
                >
                  Sync
                </button>
                <button
                  type="button"
                  className="rounded-full border border-blue-500/50 bg-blue-500/10 px-3 py-1 text-blue-200 transition hover:border-blue-500"
                >
                  Brief
                </button>
              </div>
            </header>

            <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_360px]">
              <section className="relative min-h-[420px] overflow-hidden border-b border-zinc-900 lg:min-h-0 lg:border-b-0 lg:border-r">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(234,179,8,0.14),_transparent_55%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.025)_1px,_transparent_1px),linear-gradient(0deg,_rgba(255,255,255,0.025)_1px,_transparent_1px)] bg-[size:48px_48px] opacity-70" />
                <div className="relative flex h-full flex-col gap-4 p-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        label: "Electores",
                        value:
                          padronData.national.region.data.summary.totalElectores.toLocaleString(),
                      },
                      {
                        label: "Mujeres",
                        value: padronData.national.region.data.summary.mujeres.toLocaleString(),
                      },
                      {
                        label: "Hombres",
                        value: padronData.national.region.data.summary.hombres.toLocaleString(),
                      },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-center gap-4 rounded-full border border-zinc-800/60 bg-black/50 px-4 py-2 text-xs text-zinc-300 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                      >
                        <span className="uppercase tracking-[0.3em] text-[10px] text-zinc-500">
                          {metric.label}
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {mapLabel}
                      </p>
                      <p className="text-xs text-zinc-400">{mapSubtitle}</p>
                      {adminConfig.status && (
                        <p className="text-[11px] text-amber-200/80">
                          Estado: {adminConfig.status}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsConfigOpen(true)}
                      className="rounded-full border border-blue-500/50 bg-blue-500/10 px-3 py-1 text-xs text-blue-200 transition hover:border-blue-400"
                    >
                      Configurar cliente
                    </button>
                  </div>
                </div>
              </section>

              <aside className="flex flex-col gap-3 bg-[#060606] px-4 py-4 lg:border-l lg:border-zinc-900">
                {sidePanel}
              </aside>
            </div>
          </main>
        </div>
      </div>

      {isConfigOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                  Configuracion avanzada
                </p>
                <p className="text-lg font-semibold text-white">
                  {campaignName || "Cliente"}
                </p>
                <p className="text-xs text-zinc-500">
                  Nivel {politicalLevel} - {politicalParty}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsConfigOpen(false)}
                className="rounded-full border border-zinc-800/80 px-3 py-1 text-xs text-zinc-400"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-4 grid gap-3 text-xs text-zinc-300">
              <div className="grid gap-3 rounded-xl border border-zinc-800/80 bg-black/50 px-4 py-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                    Estado operativo
                  </p>
                  <select
                    defaultValue={adminConfig.status || "Monitoreo"}
                    className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                  >
                    <option>Monitoreo</option>
                    <option>Activo</option>
                    <option>Prioridad alta</option>
                    <option>En pausa</option>
                  </select>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span>Ritmo de update</span>
                    <span className="text-blue-200">Cada 30 min</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                    Estrategia
                  </p>
                  <input
                    defaultValue={campaignStrategy}
                    placeholder="Estrategia principal"
                    className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                  />
                  <input
                    defaultValue={politicalRole}
                    placeholder="Rol politico"
                    className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                  />
                  <input
                    defaultValue={String(campaign.residence || "")}
                    placeholder="Residencia"
                    className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                  />
                </div>
              </div>

              <div className="grid gap-3 rounded-xl border border-zinc-800/80 bg-black/50 px-4 py-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                    Redes propias
                  </p>
                  <input
                    placeholder="@cuenta principal"
                    className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                  />
                  <input
                    placeholder="Canal alterno"
                    className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                    Rivales monitoreados
                  </p>
                  <textarea
                    rows={3}
                    placeholder="Lista de cuentas adversarias"
                    className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                  />
                </div>
              </div>

              <div className="grid gap-3 rounded-xl border border-zinc-800/80 bg-black/50 px-4 py-3 md:grid-cols-3">
                {[
                  { label: "Crisis center", value: "Activo" },
                  { label: "Alertas 24/7", value: "Habilitadas" },
                  { label: "Dashboard VIP", value: "Restringido" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                      {item.label}
                    </p>
                    <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-black/70 px-3 py-2">
                      <span className="text-xs text-zinc-300">{item.value}</span>
                      <span className="text-[10px] text-blue-200">Editar</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-black/50 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                  Identidad y idioma
                </p>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="admin-language"
                      className="text-[10px] uppercase tracking-[0.3em] text-zinc-500"
                    >
                      Idioma
                    </label>
                    <select
                      id="admin-language"
                      className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                    >
                      <option>Espanol</option>
                      <option>Ingles</option>
                      <option>Portugues</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="admin-timezone"
                      className="text-[10px] uppercase tracking-[0.3em] text-zinc-500"
                    >
                      Zona horaria
                    </label>
                    <select
                      id="admin-timezone"
                      className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                    >
                      <option>GMT-6</option>
                      <option>GMT-5</option>
                      <option>GMT-4</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="admin-operator"
                      className="text-[10px] uppercase tracking-[0.3em] text-zinc-500"
                    >
                      Nombre del operador
                    </label>
                    <input
                      id="admin-operator"
                      defaultValue={campaignName || ""}
                      placeholder="Nombre visible"
                      className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="admin-alias"
                      className="text-[10px] uppercase tracking-[0.3em] text-zinc-500"
                    >
                      Alias de usuario
                    </label>
                    <input
                      id="admin-alias"
                      defaultValue="Admin War Room"
                      placeholder="Alias"
                      className="w-full rounded-lg border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-zinc-200"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                  Ultima actualizacion: {adminConfig.updatedAt || "Sin datos"}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-zinc-800/80 px-3 py-1 text-xs text-zinc-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-xs text-amber-200"
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}

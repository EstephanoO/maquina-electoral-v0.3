"use client";

import { AdminShell } from "@/src/app/dashboard/admin/_components/AdminShell";

type ProfileTile = {
  label: string;
  value: string;
  tone?: "base" | "accent";
};

const profileTiles: ProfileTile[] = [
  { label: "Nivel", value: "Gobernador", tone: "accent" },
  { label: "Partido", value: "Alianza Pacifica" },
  { label: "Idioma", value: "Espanol (MX)" },
  { label: "Usuario", value: "Admin - War Room" },
];

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Home Admin"
      subtitle="Perfil, configuracion de idioma y controles de cliente."
      mapLabel="Perfil estrategico"
      mapSubtitle="Panel de configuracion general y resumen de cuenta."
      sidePanel={
        <div className="space-y-3">
          <div className="rounded-xl border border-blue-500/30 bg-black/50 px-4 py-4 shadow-[0_0_24px_rgba(37,99,235,0.15)]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              Perfil operativo
            </p>
            <p className="text-lg font-semibold text-white">Estado central</p>
            <p className="text-xs text-zinc-300">
              Ajustes principales, idioma y accesos activos del equipo.
            </p>
            <div className="mt-3 grid gap-2 text-xs text-zinc-300">
              {profileTiles.map((tile) => (
                <div
                  key={tile.label}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
                    tile.tone === "accent"
                      ? "border-blue-500/40 bg-blue-500/10 text-blue-200"
                      : "border-zinc-800/80 bg-black/60"
                  }`}
                >
                  <span>{tile.label}</span>
                  <span>{tile.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/70 bg-black/40 px-4 py-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                Configuracion de idioma
              </p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                Preferencias
              </span>
            </div>
            <div className="mt-3 space-y-2 text-xs text-zinc-300">
              <div className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-black/60 px-3 py-2">
                <span>Lenguaje principal</span>
                <span className="text-blue-200">Espanol</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-black/60 px-3 py-2">
                <span>Region</span>
                <span>Mexico</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-black/60 px-3 py-2">
                <span>Zona horaria</span>
                <span className="text-zinc-400">GMT-6</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/70 bg-black/40 px-4 py-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                Seguridad de usuario
              </p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                Proteccion
              </span>
            </div>
            <div className="mt-3 grid gap-2 text-xs text-zinc-300">
              <button
                type="button"
                className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-amber-200"
              >
                Actualizar credenciales
              </button>
              <button
                type="button"
                className="rounded-lg border border-zinc-800/80 bg-black/60 px-3 py-2 text-zinc-300"
              >
                Sesiones activas
              </button>
              <button
                type="button"
                className="rounded-lg border border-zinc-800/80 bg-black/60 px-3 py-2 text-zinc-300"
              >
                Alertas de inicio
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}

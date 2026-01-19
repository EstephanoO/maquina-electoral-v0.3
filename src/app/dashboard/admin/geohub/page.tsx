"use client";

import { AdminShell } from "@/src/app/dashboard/admin/_components/AdminShell";

const layers = [
  "Participacion historica",
  "Riesgo de desercion",
  "Densidad urbana",
  "Infraestructura clave",
  "Base territorial 2026",
];

const catalog = [
  "Cartografia territorial 2025",
  "Heatmap de conversion por distrito",
  "Logistica de brigadas y rutas",
  "Radar de adversarios por zona",
  "Cobertura de centros de comando",
];

export default function AdminGeoHubPage() {
  return (
    <AdminShell
      title="GeoHub Catalogo"
      subtitle="Mapas estrategicos y capas activas para operaciones territoriales."
      mapLabel="GeoHub"
      mapSubtitle="Catalogo de mapas y capas disponibles."
      sidePanel={
        <div className="space-y-3">
          <div className="rounded-xl border border-blue-500/30 bg-black/50 px-4 py-4 shadow-[0_0_24px_rgba(37,99,235,0.15)]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              Catalogo de mapas
            </p>
            <div className="mt-3 space-y-2 text-xs text-zinc-400">
              {catalog.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-zinc-800/80 bg-black/60 px-3 py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/70 bg-black/40 px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              Capas activas
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              {layers.map((layer) => (
                <span
                  key={layer}
                  className="rounded-full border border-blue-500/40 bg-blue-500/10 px-2 py-1 text-blue-200"
                >
                  {layer}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/70 bg-black/40 px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              Herramientas
            </p>
            <div className="mt-3 grid gap-2 text-xs text-zinc-300">
              <button
                type="button"
                className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-amber-200"
              >
                Activar modo crisis territorial
              </button>
              <button
                type="button"
                className="rounded-lg border border-zinc-800/80 bg-black/60 px-3 py-2 text-zinc-300"
              >
                Exportar capa prioritaria
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}

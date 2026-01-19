"use client";

import { AdminShell } from "@/src/app/dashboard/admin/_components/AdminShell";

const enemies = [
  "Frente Alterno - 78k menciones",
  "Movimiento Azul - 54k menciones",
  "Alianza Norte - 33k menciones",
  "Union Patriotica - 29k menciones",
];

export default function AdminSocialPage() {
  return (
    <AdminShell
      title="Social Overview"
      subtitle="Monitoreo de redes, sentimiento y adversarios digitales."
      mapLabel="Radar social"
      mapSubtitle="Flujos de conversacion y calor mediatico en tiempo real."
      sidePanel={
        <div className="space-y-3">
          <div className="rounded-xl border border-blue-500/30 bg-black/50 px-4 py-4 shadow-[0_0_24px_rgba(37,99,235,0.15)]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              Overview social
            </p>
            <div className="mt-3 grid gap-2 text-xs text-zinc-300">
              <div className="flex items-center justify-between">
                <span>Alcance semanal</span>
                <span className="text-blue-200">+18.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Interacciones clave</span>
                <span className="text-blue-200">24.8k</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sentimiento positivo</span>
                <span className="text-amber-200">62%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Riesgo de crisis</span>
                <span className="text-amber-200">Medio</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/70 bg-black/40 px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              Redes sociales enemigas
            </p>
            <div className="mt-3 grid gap-2 text-xs text-zinc-400">
              {enemies.map((item) => (
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
              Comandos rapidos
            </p>
            <div className="mt-3 grid gap-2 text-xs text-zinc-300">
              <button
                type="button"
                className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-blue-200"
              >
                Activar escucha 24/7
              </button>
              <button
                type="button"
                className="rounded-lg border border-zinc-800/80 bg-black/60 px-3 py-2 text-zinc-300"
              >
                Exportar reporte social
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}

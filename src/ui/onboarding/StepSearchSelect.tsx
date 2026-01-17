"use client";

import { motion } from "motion/react";
import { Search, CheckCircle2 } from "lucide-react";
import { useMemo, useState, useCallback } from "react";
import type { FlowOption } from "@/src/onboarding/types";

const SELECTION_DELAY_MS = 250;

interface StepSearchSelectProps {
  title: string;
  subtitle?: string;
  guideText?: string;
  options: FlowOption[];
  onNext: (selectedId: string) => void;
}

export function StepSearchSelect({
  title,
  subtitle,
  guideText,
  options,
  onNext,
}: StepSearchSelectProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(normalized),
    );
  }, [options, query]);

  const handleSelect = useCallback(
    (id: string) => {
      setSelected(id);
      setTimeout(() => onNext(id), SELECTION_DELAY_MS);
    },
    [onNext],
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-white leading-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-400 mb-3 sm:mb-4"
        >
          {subtitle}
        </motion.p>
      )}

      {guideText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/20 rounded-xl"
        >
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {guideText}
          </p>
        </motion.div>
      )}

      <div className="mb-5 sm:mb-6">
        <label
          htmlFor="party-search"
          className="text-sm font-medium text-zinc-300 block mb-2"
        >
          Buscar partido
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            id="party-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Escribe el nombre del partido"
            className="w-full rounded-2xl border border-zinc-800/80 bg-black/50 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            aria-describedby="party-search-helper"
          />
        </div>
        <p id="party-search-helper" className="mt-2 text-xs text-zinc-500">
          Busca por nombre oficial o palabras clave del partido.
        </p>
      </div>

      <div className="max-h-[380px] overflow-y-auto rounded-2xl border border-zinc-800/80 bg-black/40 p-3 sm:p-4 space-y-2">
        {filteredOptions.length === 0 && query.trim().length > 0 && (
          <div className="rounded-xl border border-dashed border-zinc-800/80 bg-black/30 px-4 py-6 text-center">
            <p className="text-sm text-zinc-300">Sin resultados</p>
            <p className="text-xs text-zinc-500 mt-1">
              No encontramos partidos con ese nombre. Prueba con otra búsqueda.
            </p>
          </div>
        )}
        {filteredOptions.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                isSelected
                  ? "border-amber-500 bg-amber-500/10 text-amber-200"
                  : "border-zinc-800/80 bg-zinc-950/70 text-zinc-200 hover:border-amber-500/40"
              }`}
              aria-pressed={isSelected}
            >
              <span className="flex items-center gap-3">
                {option.logoUrl && (
                  <img
                    src={option.logoUrl}
                    alt={option.label}
                    className="h-8 w-8 rounded-full border border-zinc-800/70 bg-black/40 object-contain"
                    loading="lazy"
                  />
                )}
                <span>{option.label}</span>
              </span>
              {isSelected && (
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

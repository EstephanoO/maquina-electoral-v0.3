"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { Search, CheckCircle2 } from "lucide-react";
import { useMemo, useState, useCallback, useEffect } from "react";
import type { FlowOption } from "@/src/onboarding/types";

const SELECTION_DELAY_MS = 0;
const INITIAL_RESULT_LIMIT = 40;

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
  const [showAllResults, setShowAllResults] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(normalized),
    );
  }, [options, query]);

  const visibleOptions = useMemo(() => {
    if (showAllResults) return filteredOptions;
    return filteredOptions.slice(0, INITIAL_RESULT_LIMIT);
  }, [filteredOptions, showAllResults]);

  const hasMoreResults = filteredOptions.length > visibleOptions.length;

  useEffect(() => {
    if (!options.length) return;
    if (!shouldReduceMotion) return;
    if (visibleOptions.length === 0) {
      setShowAllResults(false);
    }
  }, [options.length, shouldReduceMotion, visibleOptions.length]);


  const handleSelect = useCallback(
    (id: string) => {
      setSelected(id);
      if (SELECTION_DELAY_MS === 0) {
        onNext(id);
        return;
      }
      setTimeout(() => onNext(id), SELECTION_DELAY_MS);
    },
    [onNext],
  );

  const isLoading = options.length === 0;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -50 }}
        transition={shouldReduceMotion ? undefined : { duration: 0.4 }}
        className="w-full max-w-4xl"
      >
        <m.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.03 }}
          className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-white leading-tight"
        >
          {title}
        </m.h2>

        {subtitle && (
          <m.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.08 }}
            className="text-base sm:text-lg text-zinc-400 mb-3 sm:mb-4"
          >
            {subtitle}
          </m.p>
        )}

        {guideText && (
          <m.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.12 }}
            className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/20 rounded-xl"
          >
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {guideText}
            </p>
          </m.div>
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
              onChange={(event) => {
                setQuery(event.target.value);
                setShowAllResults(false);
              }}
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
          {isLoading && (
            <div className="rounded-xl border border-dashed border-zinc-800/80 bg-black/30 px-4 py-6 text-center">
              <p className="text-sm text-zinc-300">Cargando partidos...</p>
              <p className="text-xs text-zinc-500 mt-1">
                Estamos preparando el catalogo electoral.
              </p>
            </div>
          )}
          {!isLoading &&
            filteredOptions.length === 0 &&
            query.trim().length > 0 && (
              <div className="rounded-xl border border-dashed border-zinc-800/80 bg-black/30 px-4 py-6 text-center">
                <p className="text-sm text-zinc-300">Sin resultados</p>
                <p className="text-xs text-zinc-500 mt-1">
                  No encontramos partidos con ese nombre. Prueba con otra búsqueda.
                </p>
              </div>
            )}
          {hasMoreResults && !showAllResults && (
            <div className="rounded-xl border border-zinc-800/80 bg-black/30 px-4 py-3 text-xs text-zinc-400">
              Mostrando las primeras {visibleOptions.length}. Usa el buscador o
              despliega la lista completa.
            </div>
          )}
          {visibleOptions.map((option) => {
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
                  {option.logoUrl ? (
                    <Image
                      src={option.logoUrl}
                      alt={option.label}
                      width={32}
                      height={32}
                      sizes="32px"
                      className="h-8 w-8 rounded-full border border-zinc-800/70 bg-black/40 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="h-8 w-8 rounded-full border border-dashed border-zinc-800/70 bg-black/40"
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
          {hasMoreResults && (
            <button
              type="button"
              onClick={() => setShowAllResults((prev) => !prev)}
              className="w-full rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200 transition hover:border-amber-500/70"
            >
              {showAllResults
                ? "Mostrar menos"
                : `Mostrar todos (${filteredOptions.length})`}
            </button>
          )}
        </div>
      </m.div>
    </LazyMotion>
  );
}

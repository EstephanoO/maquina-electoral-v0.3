"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { StrategyAssignment } from "@/src/onboarding/types";

interface DragDropConfig {
  campaignTypes: {
    OFICIAL: { movable: string[] };
    NO_OFICIAL: { movable: string[] };
  };
  rules: {
    allowBothCampaigns: boolean;
    requireAtLeastOne: boolean;
  };
}

interface StepDragDropProps {
  title: string;
  subtitle?: string;
  guideText?: string;
  dragDropConfig: DragDropConfig;
  onNext: (assignments: StrategyAssignment[]) => void;
}

const STRATEGY_LABELS: Record<string, string> = {
  territorial: "Territorial",
  digital: "Digital",
  movilizacion: "Movilizacion",
  alianzas: "Alianzas",
  legal: "Legal",
};

export function StepDragDrop({
  title,
  subtitle,
  guideText,
  dragDropConfig,
  onNext,
}: StepDragDropProps) {
  const [left, setLeft] = useState<string[]>(
    dragDropConfig.campaignTypes.OFICIAL.movable,
  );
  const [right, setRight] = useState<string[]>(
    dragDropConfig.campaignTypes.NO_OFICIAL.movable,
  );

  const availableStrategies = useMemo(() => {
    const assigned = new Set([...left, ...right]);
    return Object.keys(STRATEGY_LABELS).filter(
      (strategy) => !assigned.has(strategy),
    );
  }, [left, right]);

  const moveToLeft = (strategy: string) => {
    setLeft((prev) => [...prev, strategy]);
    setRight((prev) => prev.filter((item) => item !== strategy));
  };

  const moveToRight = (strategy: string) => {
    setRight((prev) => [...prev, strategy]);
    setLeft((prev) => prev.filter((item) => item !== strategy));
  };

  const buildAssignments = (): StrategyAssignment[] => {
    return [
      ...left.map((strategy) => ({
        strategy: strategy as StrategyAssignment["strategy"],
        campaignType: "OFICIAL" as const,
      })),
      ...right.map((strategy) => ({
        strategy: strategy as StrategyAssignment["strategy"],
        campaignType: "NO_OFICIAL" as const,
      })),
    ];
  };

  const handleSubmit = () => {
    const assignments = buildAssignments();
    if (dragDropConfig.rules.requireAtLeastOne && assignments.length === 0) {
      return;
    }
    onNext(assignments);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-zinc-400 mb-3 sm:mb-4">
          {subtitle}
        </p>
      )}
      {guideText && (
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/20 rounded-xl">
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {guideText}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-4">
          <p className="text-sm font-semibold text-amber-400 mb-3">
            Frente oficial
          </p>
          <div className="space-y-2">
            {left.map((strategy) => (
              <button
                key={`left-${strategy}`}
                type="button"
                onClick={() => moveToRight(strategy)}
                className="w-full rounded-xl border border-zinc-800/80 bg-zinc-950/80 px-3 py-2 text-left text-sm text-zinc-200 hover:border-blue-500/40"
              >
                {STRATEGY_LABELS[strategy] ?? strategy}
              </button>
            ))}
            {left.length === 0 && (
              <p className="text-xs text-zinc-500">Sin asignaciones.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4">
          <p className="text-sm font-semibold text-zinc-300 mb-3">
            Disponible
          </p>
          <div className="space-y-2">
            {availableStrategies.map((strategy) => (
              <button
                key={`available-${strategy}`}
                type="button"
                onClick={() => moveToLeft(strategy)}
                className="w-full rounded-xl border border-zinc-800/80 bg-black/60 px-3 py-2 text-left text-sm text-zinc-300 hover:border-amber-500/40"
              >
                {STRATEGY_LABELS[strategy] ?? strategy}
              </button>
            ))}
            {availableStrategies.length === 0 && (
              <p className="text-xs text-zinc-500">Todo asignado.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-4">
          <p className="text-sm font-semibold text-blue-400 mb-3">
            Frente no oficial
          </p>
          <div className="space-y-2">
            {right.map((strategy) => (
              <button
                key={`right-${strategy}`}
                type="button"
                onClick={() => moveToLeft(strategy)}
                className="w-full rounded-xl border border-zinc-800/80 bg-zinc-950/80 px-3 py-2 text-left text-sm text-zinc-200 hover:border-amber-500/40"
              >
                {STRATEGY_LABELS[strategy] ?? strategy}
              </button>
            ))}
            {right.length === 0 && (
              <p className="text-xs text-zinc-500">Sin asignaciones.</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-6 w-full rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-base font-semibold text-black shadow-lg shadow-amber-500/30"
      >
        Confirmar asignaciones
      </button>
    </motion.div>
  );
}

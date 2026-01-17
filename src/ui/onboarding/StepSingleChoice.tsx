"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import type { FlowOption } from "@/src/onboarding/types";
import { getIcon } from "./icon-map";

const SELECTION_DELAY_MS = 400;

interface StepSingleChoiceProps {
  title: string;
  subtitle?: string;
  options: FlowOption[];
  guideText?: string;
  onNext: (selectedId: string) => void;
}

export function StepSingleChoice({
  title,
  subtitle,
  options,
  guideText,
  onNext,
}: StepSingleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      setSelected(id);
      setTimeout(() => {
        onNext(id);
      }, SELECTION_DELAY_MS);
    },
    [onNext],
  );

  useEffect(() => {
    if (selected && !options.some((option) => option.value === selected)) {
      setSelected(null);
    }
  }, [options, selected]);

  const handleOptionClick = useCallback(
    (optionValue: string) => {
      handleSelect(optionValue);
    },
    [handleSelect],
  );

  const handleMouseEnter = useCallback((optionValue: string) => {
    setHoveredId(optionValue);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {options.map((option, index) => {
          const Icon = getIcon(option.icon);
          const isSelected = selected === option.value;

          return (
            <motion.button
              key={option.value}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={() => handleMouseEnter(option.value)}
              onMouseLeave={handleMouseLeave}
              aria-pressed={isSelected}
              className={`relative p-4 sm:p-6 rounded-2xl border-2 text-left transition-all overflow-hidden group min-h-[140px] sm:min-h-[160px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                isSelected
                  ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500 shadow-xl shadow-amber-500/20"
                  : "bg-black/40 border-zinc-800/80 hover:border-amber-500/50 hover:bg-black/60 backdrop-blur-sm"
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl ${
                      isSelected
                        ? "bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30"
                        : "bg-zinc-900/70 group-hover:bg-amber-500/20 border border-zinc-800/80"
                    } transition-all`}
                  >
                    {Icon && (
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          isSelected ? "text-black" : "text-amber-400"
                        }`}
                      />
                    )}
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      scale: isSelected ? 1 : 0,
                      rotate: isSelected ? 0 : 180,
                    }}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                  </motion.div>
                </div>

                <h3
                  className={`text-lg sm:text-xl mb-4 ${
                    isSelected ? "text-amber-400" : "text-white"
                  } transition-colors leading-tight`}
                >
                  {option.label}
                </h3>
                {option.description && (
                  <p className="text-xs sm:text-sm text-zinc-400">
                    {option.description}
                  </p>
                )}
              </div>

              {isSelected && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "motion/react";
import { Check, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import type { FlowOption } from "@/src/onboarding/types";
import { getIcon } from "./icon-map";

const DEFAULT_MAX_SELECTIONS = 999;
const DEFAULT_MIN_SELECTIONS = 1;

interface StepMultipleChoiceProps {
  title: string;
  subtitle?: string;
  options: FlowOption[];
  guideText?: string;
  maxSelections?: number;
  minSelections?: number;
  onNext: (selectedIds: string[]) => void;
}

export function StepMultipleChoice({
  title,
  subtitle,
  options,
  guideText,
  maxSelections = DEFAULT_MAX_SELECTIONS,
  minSelections = DEFAULT_MIN_SELECTIONS,
  onNext,
}: StepMultipleChoiceProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleToggle = useCallback(
    (id: string) => {
      setSelected((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        if (prev.length >= maxSelections) {
          return prev;
        }
        return [...prev, id];
      });
    },
    [maxSelections],
  );

  const handleNext = useCallback(() => {
    if (selected.length >= minSelections) {
      onNext(selected);
    }
  }, [selected, minSelections, onNext]);

  const handleOptionClick = useCallback(
    (optionValue: string) => {
      handleToggle(optionValue);
    },
    [handleToggle],
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
          className="text-base sm:text-lg text-zinc-400 mb-2"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-zinc-400">
            {selected.length} seleccionado{selected.length !== 1 ? "s" : ""}
          </span>
          {maxSelections < DEFAULT_MAX_SELECTIONS && (
            <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
              max. {maxSelections}
            </span>
          )}
          {minSelections > 1 && (
            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
              min. {minSelections}
            </span>
          )}
        </div>
      </motion.div>

      {guideText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/20 rounded-xl"
        >
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {guideText}
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {options.map((option, index) => {
          const Icon = getIcon(option.icon);
          const isSelected = selected.includes(option.value);
          const isDisabled = !isSelected && selected.length >= maxSelections;
          const isHovered = hoveredId === option.value;

          return (
            <motion.button
              key={option.value}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{
                scale: isDisabled ? 1 : 1.02,
                y: isDisabled ? 0 : -2,
              }}
              whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={() => handleMouseEnter(option.value)}
              onMouseLeave={handleMouseLeave}
              disabled={isDisabled}
              aria-pressed={isSelected}
              className={`relative p-4 sm:p-6 rounded-2xl border-2 text-left transition-all overflow-hidden group min-h-[180px] sm:min-h-[200px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                isSelected
                  ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500 shadow-xl shadow-amber-500/20"
                  : isDisabled
                    ? "bg-black/20 border-zinc-900/60 opacity-40 cursor-not-allowed"
                    : "bg-black/40 border-zinc-800/80 hover:border-blue-500/50 hover:bg-black/60 backdrop-blur-sm"
              }`}
            >
              {!isDisabled && (
                <motion.div
                  className={`absolute inset-0 ${
                    isSelected
                      ? "bg-gradient-to-br from-amber-500/10 to-amber-600/5"
                      : "bg-gradient-to-br from-blue-500/10 to-blue-600/5"
                  } opacity-0 group-hover:opacity-100 transition-opacity`}
                  initial={false}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl ${
                      isSelected
                        ? "bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30"
                        : isDisabled
                          ? "bg-zinc-900/40"
                          : "bg-zinc-900/70 group-hover:bg-blue-500/20 border border-zinc-800/80"
                    } transition-all`}
                  >
                    {Icon && (
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          isSelected
                            ? "text-black"
                            : isDisabled
                              ? "text-zinc-600"
                              : "text-blue-400"
                        }`}
                      />
                    )}
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      scale: isSelected ? 1 : 0.8,
                      backgroundColor: isSelected
                        ? "rgba(245, 158, 11, 1)"
                        : "rgba(39, 39, 42, 0.6)",
                    }}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 border-zinc-700/60"
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                    )}
                  </motion.div>
                </div>

                <h3
                  className={`text-lg sm:text-xl mb-1.5 sm:mb-2 ${
                    isSelected
                      ? "text-amber-400"
                      : isDisabled
                        ? "text-zinc-600"
                        : "text-white"
                  } transition-colors leading-tight`}
                >
                  {option.label}
                </h3>

                {option.description && (
                  <p
                    className={`text-xs sm:text-sm ${
                      isDisabled ? "text-zinc-600" : "text-zinc-400"
                    } mb-2 sm:mb-3 leading-snug`}
                  >
                    {option.description}
                  </p>
                )}

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: isHovered || isSelected ? "auto" : 0,
                    opacity: isHovered || isSelected ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 sm:pt-3 border-t border-zinc-800/70">
                    {option.detailedDescription && (
                      <p className="text-xs text-zinc-500 mb-2 sm:mb-3 leading-relaxed">
                        {option.detailedDescription}
                      </p>
                    )}

                    {option.benefits && option.benefits.length > 0 && (
                      <div className="space-y-1 sm:space-y-1.5">
                        {option.benefits.map((benefit) => (
                          <div
                            key={benefit}
                            className="flex items-center gap-2 text-xs"
                          >
                            <div
                              className={`w-1 h-1 rounded-full flex-shrink-0 ${
                                isSelected ? "bg-amber-500" : "bg-blue-500"
                              }`}
                            />
                            <span className="text-zinc-400">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
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

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: selected.length > 0 ? 1.02 : 1 }}
        whileTap={{ scale: selected.length > 0 ? 0.98 : 1 }}
        onClick={handleNext}
        disabled={selected.length < minSelections}
        className={`w-full px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 transition-all border-2 text-base sm:text-lg touch-manipulation ${
          selected.length >= minSelections
            ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-2xl hover:shadow-amber-500/20 active:shadow-amber-500/40 border-amber-400/50 text-black font-medium"
            : "bg-zinc-900/40 border-zinc-800/80 opacity-40 cursor-not-allowed text-zinc-500"
        }`}
      >
        <span>Continuar con la configuración</span>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
    </motion.div>
  );
}

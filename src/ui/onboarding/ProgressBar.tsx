"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import type { OnboardingStep } from "@/src/onboarding/types";

const PROGRESS_BAR_ANIMATION_DURATION = 0.5;
const SHIMMER_ANIMATION_DURATION = 2;
const STEP_INDICATOR_ANIMATION_DELAY = 0.05;
const STEP_INDICATOR_PULSE_DURATION = 0.5;
const STEP_INDICATOR_PULSE_REPEAT_DELAY = 1;
const STEP_COUNTER_ANIMATION_DELAY = 0.3;

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  hiddenStepIds?: string[];
  onboardingSteps?: OnboardingStep[];
}

export function ProgressBar({
  currentStep,
  totalSteps,
  hiddenStepIds = [],
  onboardingSteps,
}: ProgressBarProps) {
  const shouldReduceMotion = useReducedMotion();
  let visibleStepCount = 0;
  let visibleCurrentStep = 0;

  if (onboardingSteps) {
    for (let i = 0; i < onboardingSteps.length; i += 1) {
      if (!hiddenStepIds.includes(onboardingSteps[i].id)) {
        visibleStepCount += 1;
      }
    }

    let visibleIndex = 0;
    for (let i = 0; i < onboardingSteps.length; i += 1) {
      const step = onboardingSteps[i];
      if (i === currentStep) {
        visibleCurrentStep = visibleIndex;
        break;
      }
      if (!hiddenStepIds.includes(step.id)) {
        visibleIndex += 1;
      }
    }
  } else {
    visibleStepCount = totalSteps - hiddenStepIds.length;
    visibleCurrentStep = currentStep;
  }

  const progress = ((visibleCurrentStep + 1) / visibleStepCount) * 100;

  return (
    <div className="w-full">
      <div className="relative h-1.5 sm:h-2 bg-zinc-900/60 rounded-full overflow-hidden mb-3 sm:mb-4 border border-zinc-800">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600"
            initial={shouldReduceMotion ? false : { width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={shouldReduceMotion ? undefined : {
              duration: PROGRESS_BAR_ANIMATION_DURATION,
              ease: "easeOut" as const,
            }}
          >
            {!shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: SHIMMER_ANIMATION_DURATION,
                  repeat: Infinity,
                  ease: "linear" as const,
                }}
              />
            )}
          </motion.div>

      </div>

      <div className="flex justify-between items-center">
        {Array.from({ length: visibleStepCount }).map((_, stepIndex) => {
          const stepNumber = stepIndex + 1;
          return (
            <motion.div
              key={`visible-step-${stepNumber}`}
              className="flex flex-col items-center gap-1"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { delay: stepIndex * STEP_INDICATOR_ANIMATION_DELAY }
              }
            >
              <motion.div
                className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 ${
                  stepIndex <= visibleCurrentStep
                    ? "bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400/50 shadow-lg shadow-amber-500/20"
                    : "bg-zinc-900/60 border-zinc-800"
                }`}
                animate={
                  shouldReduceMotion || stepIndex !== visibleCurrentStep
                    ? { scale: 1 }
                    : { scale: [1, 1.1, 1] }
                }
                transition={
                  shouldReduceMotion || stepIndex !== visibleCurrentStep
                    ? undefined
                    : {
                        duration: STEP_INDICATOR_PULSE_DURATION,
                        repeat: Infinity,
                        repeatDelay: STEP_INDICATOR_PULSE_REPEAT_DELAY,
                      }
                }
              >
                {stepIndex < visibleCurrentStep ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                ) : (
                  <span
                    className={`text-[10px] sm:text-xs ${
                      stepIndex === visibleCurrentStep
                        ? "text-black font-semibold"
                        : "text-zinc-500"
                    }`}
                  >
                    {stepNumber}
                  </span>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="text-center mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-400"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          shouldReduceMotion ? undefined : { delay: STEP_COUNTER_ANIMATION_DELAY }
        }
      >
        Fase {visibleCurrentStep + 1} de {visibleStepCount}
      </motion.div>
    </div>
  );
}

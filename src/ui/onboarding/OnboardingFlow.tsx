"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";

import type { OnboardingContext } from "@/src/onboarding/types";
import { getRoleOptionsByLevel, onboardingSteps } from "@/src/onboarding/steps";
import { partidosData } from "@/src/db/constants/partidos2";
import { createLocalStorageAdapter } from "@/src/onboarding/storage";
import { OnboardingTransformer } from "@/src/onboarding/transformer";
import { createClientRecord, clientStorage } from "@/src/db/constants/clients";
import { authStorage } from "@/src/auth/storage";

import { WelcomeScreen } from "./WelcomeScreen";
import { ProgressBar } from "./ProgressBar";
import { StepInfo } from "./StepInfo";
import { StepSingleChoice } from "./StepSingleChoice";
import { StepMultipleChoice } from "./StepMultipleChoice";
import { StepForm } from "./StepForm";
import { StepSearchSelect } from "./StepSearchSelect";
import { CompletionScreen } from "./CompletionScreen";
import { AnimatedBackground } from "./AnimatedBackground";

const DEFAULT_MAX_SELECTIONS = 999;
const DEFAULT_MIN_SELECTIONS = 1;

const PARTY_OPTIONS = partidosData.items.map((party) => ({
  value: party.TxCodOp,
  label: party.TxDesOp,
  logoUrl: party.logoUrl,
}));

const storage = createLocalStorageAdapter();

export function OnboardingFlow() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingContext>({});
  const router = useRouter();

  const currentStep = onboardingSteps[currentStepIndex];
  const canGoBack = currentStepIndex > 0 && !showWelcome && !isComplete;

  useEffect(() => {
    const stored = storage.load();
    if (stored) {
      setOnboardingData(stored);
    }
  }, []);

  useEffect(() => {
    if (!showWelcome) {
      storage.save(onboardingData);
    }
  }, [onboardingData, showWelcome]);

  const handleStart = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const handleStepData = useCallback(
    (stepData?: unknown) => {
      if (!currentStep) return;

      if (stepData !== undefined) {
        setOnboardingData((prev) => ({
          ...prev,
          [currentStep.id]: stepData,
        }));
      }

      if (currentStep.id === "politicalLevel") {
        setOnboardingData((prev) => {
          const next = { ...prev };
          delete next.politicalRole;
          delete next.politicalParty;
          return next;
        });
      }

      if (currentStep.id === "politicalRole") {
        setOnboardingData((prev) => {
          const next = { ...prev };
          delete next.politicalParty;
          return next;
        });
      }

      if (currentStep.id === "campaignStrategy") {
        setOnboardingData((prev) => {
          const next = { ...prev };
          delete next.strategyAssignments;
          delete next.strategyCombination;
          return next;
        });
      }

      setCurrentStepIndex((prev) => {
        const nextIndex = Math.min(prev + 1, onboardingSteps.length - 1);
        return nextIndex;
      });

      const isLastStep = currentStepIndex + 1 >= onboardingSteps.length;
      const shouldSkipCombination =
        currentStep.id === "campaignStrategy" && stepData !== "MIXTO";

      if (shouldSkipCombination) {
        setCurrentStepIndex((prev) => {
          const jumpIndex = Math.min(prev + 2, onboardingSteps.length - 1);
          return jumpIndex;
        });
      }

      if (isLastStep || shouldSkipCombination) {
        const finalIndex = shouldSkipCombination
          ? currentStepIndex + 2
          : currentStepIndex + 1;
        if (finalIndex >= onboardingSteps.length) {
          setIsComplete(true);
        }
      }
    },
    [currentStep, currentStepIndex],
  );

  const handleBack = useCallback(() => {
    if (!canGoBack) return;
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, [canGoBack]);

  const handleFinish = useCallback(async () => {
    const campaignPlan = OnboardingTransformer.toCampaignPlan(onboardingData);
    storage.save(onboardingData);
    storage.savePlan(campaignPlan);
    const clientRecord = createClientRecord(campaignPlan);
    clientStorage.save(clientRecord);

    const session = authStorage.load();
    if (session) {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.userId, profile: onboardingData }),
      });
    }

    router.push("/dashboard");
  }, [onboardingData, router]);

  const getStepKey = useCallback(
    (step: typeof currentStep) => {
      if (!step) return "";
      if (step.id === "politicalRole" && onboardingData.politicalLevel) {
        return `${step.id}-${onboardingData.politicalLevel}`;
      }
      if (step.id === "strategyCombination" && onboardingData.campaignStrategy) {
        return `${step.id}-${onboardingData.campaignStrategy}`;
      }
      return step.id;
    },
    [onboardingData.politicalLevel, onboardingData.campaignStrategy],
  );

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (!currentStep) {
    return <div className="text-white">Error: Step not found</div>;
  }

  return (
    <AnimatedBackground>
      <div className="max-w-4xl mx-auto py-10 sm:py-14">
        {!isComplete && (
          <div className="mb-6 sm:mb-8">
            <motion.button
              type="button"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors mb-4 sm:mb-6 group touch-manipulation min-h-[44px]"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Volver</span>
            </motion.button>
            <ProgressBar
              currentStep={currentStepIndex}
              totalSteps={onboardingSteps.length}
              onboardingSteps={onboardingSteps}
            />
          </div>
        )}

        <div className="flex items-center justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <CompletionScreen key="complete" onFinish={handleFinish} />
            ) : (
              <motion.div
                key={getStepKey(currentStep)}
                className="w-full flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep.type === "info" && (
                  <StepInfo
                    title={currentStep.title}
                    onNext={() => handleStepData()}
                  />
                )}
                {currentStep.id === "politicalParty" && (
                  <StepSearchSelect
                    title={currentStep.title}
                    subtitle={currentStep.subtitle}
                    options={PARTY_OPTIONS}
                    guideText={currentStep.guideText}
                    onNext={(selectedId) => handleStepData(selectedId)}
                  />
                )}
                {currentStep.type === "single-select" &&
                  currentStep.id !== "politicalParty" && (
                    <StepSingleChoice
                      title={currentStep.title}
                      subtitle={currentStep.subtitle}
                      options={(() => {
                        if (currentStep.id === "politicalRole") {
                          return getRoleOptionsByLevel(
                            onboardingData.politicalLevel,
                          );
                        }
                        if (currentStep.id === "strategyCombination") {
                          return onboardingData.campaignStrategy === "MIXTO"
                            ? currentStep.options || []
                            : [];
                        }
                        return currentStep.options || [];
                      })()}
                      guideText={currentStep.guideText}
                      onNext={(selectedId) => handleStepData(selectedId)}
                    />
                  )}
                {currentStep.type === "multi-select" && currentStep.options && (
                  <StepMultipleChoice
                    title={currentStep.title}
                    subtitle={currentStep.subtitle}
                    options={currentStep.options}
                    guideText={currentStep.guideText}
                    maxSelections={DEFAULT_MAX_SELECTIONS}
                    minSelections={DEFAULT_MIN_SELECTIONS}
                    onNext={(selectedIds) => handleStepData(selectedIds)}
                  />
                )}
                {currentStep.type === "form" && currentStep.fields && (
                  <StepForm
                    title={currentStep.title}
                    subtitle={currentStep.subtitle}
                    guideText={currentStep.guideText}
                    fields={currentStep.fields}
                    onNext={(formData) => handleStepData(formData)}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedBackground>
  );
}

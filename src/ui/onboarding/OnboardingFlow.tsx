"use client";

import { Suspense, lazy, useState, useCallback, useEffect, useRef } from "react";
import type { ComponentProps } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";

import type { FlowOption, OnboardingContext } from "@/src/onboarding/types";
import { getRoleOptionsByLevel, onboardingSteps } from "@/src/onboarding/steps";
import { createLocalStorageAdapter } from "@/src/onboarding/storage";
import { OnboardingTransformer } from "@/src/onboarding/transformer";
import { createClientRecord, clientStorage } from "@/src/db/constants/clients";
import { authStorage } from "@/src/auth/storage";

import { ProgressBar } from "./ProgressBar";
import { StepInfo } from "./StepInfo";
import { StepSingleChoice } from "./StepSingleChoice";
import { AnimatedBackground } from "./AnimatedBackground";

type StepSearchSelectProps = ComponentProps<
  typeof import("./StepSearchSelect").StepSearchSelect
>;

type StepMultipleChoiceProps = ComponentProps<
  typeof import("./StepMultipleChoice").StepMultipleChoice
>;

type StepFormProps = ComponentProps<typeof import("./StepForm").StepForm>;

type CompletionScreenProps = ComponentProps<
  typeof import("./CompletionScreen").CompletionScreen
>;

type StepSearchSelectValue = Parameters<StepSearchSelectProps["onNext"]>[0];
type StepMultipleChoiceValue = Parameters<StepMultipleChoiceProps["onNext"]>[0];
type StepFormValue = Parameters<StepFormProps["onNext"]>[0];

const StepSearchSelect = lazy(() =>
  import("./StepSearchSelect").then((mod) => ({
    default: mod.StepSearchSelect,
  })),
);
const StepMultipleChoice = lazy(
  () =>
    import("./StepMultipleChoice").then((mod) => ({
      default: mod.StepMultipleChoice,
    })),
);
const StepForm = lazy(
  () => import("./StepForm").then((mod) => ({ default: mod.StepForm })),
);
const CompletionScreen = lazy(
  () => import("./CompletionScreen").then((mod) => ({
    default: mod.CompletionScreen,
  })),
);

const StepLoading = () => (
  <div className="w-full max-w-4xl rounded-3xl border border-zinc-800/80 bg-black/40 px-6 py-10 text-center text-sm text-zinc-400 animate-pulse">
    Cargando paso...
  </div>
);

const DEFAULT_MAX_SELECTIONS = 999;
const DEFAULT_MIN_SELECTIONS = 1;

const PARTY_OPTIONS: FlowOption[] = [];
let partyOptionsPromise: Promise<FlowOption[]> | null = null;

const loadPartyOptions = async (): Promise<FlowOption[]> => {
  if (PARTY_OPTIONS.length) {
    return PARTY_OPTIONS;
  }
  if (!partyOptionsPromise) {
    partyOptionsPromise = import("@/src/db/constants/partidos2").then(
      (mod) =>
        mod.partidosData.items.map((party) => ({
          value: party.TxCodOp,
          label: party.TxDesOp,
          logoUrl: party.logoUrl,
        })),
    );
  }
  const options = await partyOptionsPromise;
  PARTY_OPTIONS.push(...options);
  return PARTY_OPTIONS;
};

const storage = createLocalStorageAdapter();

export function OnboardingFlow() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingContext>(() =>
    storage.load() || {},
  );
  const [partyOptions, setPartyOptions] = useState<FlowOption[]>(PARTY_OPTIONS);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const currentStep = onboardingSteps[currentStepIndex];
  const canGoBack = currentStepIndex > 0 && !isComplete;

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      storage.save(onboardingData);
    }, 300);
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [onboardingData]);

  useEffect(() => {
    if (currentStep?.id !== "politicalParty") return;
    let isActive = true;
    loadPartyOptions()
      .then((options) => {
        if (isActive) {
          setPartyOptions(options);
        }
      })
      .catch(() => null);
    return () => {
      isActive = false;
    };
  }, [currentStep?.id]);

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

  if (!currentStep) {
    return <div className="text-white">Error: Step not found</div>;
  }

  return (
    <AnimatedBackground>
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">

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

        <div className="flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <Suspense fallback={<StepLoading />}>
                <CompletionScreen key="complete" onFinish={handleFinish} />
              </Suspense>
            ) : (
              <motion.div
                key={getStepKey(currentStep)}
                className="w-full flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Suspense fallback={<StepLoading />}>
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
                      options={partyOptions}
                      guideText={currentStep.guideText}
                      onNext={(selectedId: StepSearchSelectValue) =>
                        handleStepData(selectedId)
                      }
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
                        onNext={(selectedId: StepSearchSelectValue) =>
                          handleStepData(selectedId)
                        }
                      />
                    )}
                  {currentStep.type === "multi-select" &&
                    currentStep.options && (
                      <StepMultipleChoice
                        title={currentStep.title}
                        subtitle={currentStep.subtitle}
                        options={currentStep.options}
                        guideText={currentStep.guideText}
                        maxSelections={DEFAULT_MAX_SELECTIONS}
                        minSelections={DEFAULT_MIN_SELECTIONS}
                        onNext={(selectedIds: StepMultipleChoiceValue) =>
                          handleStepData(selectedIds)
                        }
                      />
                    )}
                  {currentStep.type === "form" && currentStep.fields && (
                    <StepForm
                      title={currentStep.title}
                      subtitle={currentStep.subtitle}
                      guideText={currentStep.guideText}
                      fields={currentStep.fields}
                      onNext={(formData: StepFormValue) =>
                        handleStepData(formData)
                      }
                    />
                  )}
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </AnimatedBackground>
  );
}

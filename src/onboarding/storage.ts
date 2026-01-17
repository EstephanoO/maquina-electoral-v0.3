import type { OnboardingContext } from "./types";
import type { CampaignPlan } from "./transformer";

export type OnboardingStorage = {
  load: () => OnboardingContext | null;
  save: (data: OnboardingContext) => void;
  loadPlan: () => CampaignPlan | null;
  savePlan: (data: CampaignPlan) => void;
  clear: () => void;
};

export const storageKeys = {
  onboarding: "onboardingData",
  campaignPlan: "campaignPlan",
} as const;

export function createLocalStorageAdapter(): OnboardingStorage {
  return {
    load: () => {
      if (typeof window === "undefined") return null;
      const raw = window.localStorage.getItem(storageKeys.onboarding);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as OnboardingContext;
      } catch {
        return null;
      }
    },
    save: (data) => {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(storageKeys.onboarding, JSON.stringify(data));
    },
    loadPlan: () => {
      if (typeof window === "undefined") return null;
      const raw = window.localStorage.getItem(storageKeys.campaignPlan);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as CampaignPlan;
      } catch {
        return null;
      }
    },
    savePlan: (data) => {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(
        storageKeys.campaignPlan,
        JSON.stringify(data),
      );
    },
    clear: () => {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem(storageKeys.onboarding);
      window.localStorage.removeItem(storageKeys.campaignPlan);
    },
  };
}

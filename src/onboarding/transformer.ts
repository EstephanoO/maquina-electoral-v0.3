import type { OnboardingContext, StrategyAssignment } from "./types";

export type CampaignPlan = {
  politicalLevel?: string;
  role?: string;
  politicalRole?: string;
  politicalParty?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
  birthPlace?: string;
  residence?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  primaryStrategy?: string;
  strategyCombination?: string;
  assignments?: StrategyAssignment[];
};

export const OnboardingTransformer = {
  toCampaignPlan(context: OnboardingContext): CampaignPlan {
    return {
      politicalLevel: context.politicalLevel,
      role: context.role,
      politicalRole: context.politicalRole,
      politicalParty: context.politicalParty,
      firstName: context.campaignProfile?.firstName,
      lastName: context.campaignProfile?.lastName,
      birthDate: context.campaignProfile?.birthDate,
      gender: context.campaignProfile?.gender,
      birthPlace: context.campaignProfile?.birthPlace,
      residence: context.campaignProfile?.residence,
      facebookUrl: context.campaignProfile?.facebookUrl,
      tiktokUrl: context.campaignProfile?.tiktokUrl,
      instagramUrl: context.campaignProfile?.instagramUrl,
      primaryStrategy: context.campaignStrategy,
      strategyCombination: context.strategyCombination,
      assignments: context.strategyAssignments,
    };
  },
};

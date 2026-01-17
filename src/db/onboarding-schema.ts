import { z } from "zod";

export const OnboardingProfileSchema = z.object({
  role: z.string().optional(),
  politicalLevel: z.string().optional(),
  politicalRole: z.string().optional(),
  politicalParty: z.string().optional(),
  campaignStrategy: z.string().optional(),
  strategyCombination: z.string().optional(),
  strategyAssignments: z.array(z.any()).optional(),
  campaignProfile: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      birthDate: z.string().optional(),
      gender: z.string().optional(),
      birthPlace: z.string().optional(),
      residence: z.string().optional(),
      facebookUrl: z.string().optional(),
      tiktokUrl: z.string().optional(),
      instagramUrl: z.string().optional(),
    })
    .optional(),
});

export type OnboardingProfile = z.infer<typeof OnboardingProfileSchema>;

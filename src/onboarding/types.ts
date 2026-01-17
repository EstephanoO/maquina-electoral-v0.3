import { z } from "zod";

export const PoliticalLevelSchema = z.enum([
  "GOBIERNO_LOCAL",
  "PARLAMENTARIO",
  "PRESIDENCIAL",
]);

export const RoleSchema = z.enum(["candidato", "estratega"]);

export const PoliticalRoleSchema = z.enum([
  "gobernador_regional",
  "alcalde_provincial",
  "alcalde_distrital",
  "senador_nacional",
  "senador_distrito_multiple",
  "diputado",
  "parlamentario_andino",
  "presidente",
]);

export const StrategySchema = z.enum([
  "territorial",
  "digital",
  "movilizacion",
  "alianzas",
  "legal",
]);

export const CampaignStrategySchema = z.enum([
  "RACIONAL",
  "EMOTIVA",
  "INSTINTIVA",
  "MIXTO",
]);

export const CampaignTypeSchema = z.enum(["OFICIAL", "NO_OFICIAL"]);

export const StepTypeSchema = z.enum([
  "info",
  "single-select",
  "multi-select",
  "form",
  "drag-drop",
]);

export const StrategyAssignmentSchema = z.object({
  strategy: StrategySchema,
  campaignType: CampaignTypeSchema,
});

export const OnboardingContextSchema = z.object({
  role: RoleSchema.optional(),
  politicalLevel: PoliticalLevelSchema.optional(),
  politicalRole: PoliticalRoleSchema.optional(),
  politicalParty: z.string().min(1).optional(),
  campaignStrategy: CampaignStrategySchema.optional(),
  strategyCombination: z.string().min(1).optional(),
  strategyAssignments: z.array(StrategyAssignmentSchema).optional(),
  campaignProfile: z
    .object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      birthDate: z.string().min(1),
      gender: z.string().min(1),
      birthPlace: z.string().min(1),
      residence: z.string().min(1),
      facebookUrl: z.string().optional(),
      tiktokUrl: z.string().optional(),
      instagramUrl: z.string().optional(),
    })
    .optional(),
});

export type PoliticalLevel = z.infer<typeof PoliticalLevelSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type PoliticalRole = z.infer<typeof PoliticalRoleSchema>;
export type Strategy = z.infer<typeof StrategySchema>;
export type CampaignStrategy = z.infer<typeof CampaignStrategySchema>;
export type CampaignType = z.infer<typeof CampaignTypeSchema>;
export type StepType = z.infer<typeof StepTypeSchema>;
export type StrategyAssignment = z.infer<typeof StrategyAssignmentSchema>;
export type OnboardingContext = z.infer<typeof OnboardingContextSchema>;

export type FlowOption = {
  value: string;
  label: string;
  description?: string;
  detailedDescription?: string;
  benefits?: string[];
  icon?: string;
  logoUrl?: string;
};

export type OnboardingOption = FlowOption;

export type FormField = {
  id:
    | "firstName"
    | "lastName"
    | "birthDate"
    | "gender"
    | "birthPlace"
    | "residence"
    | "facebookUrl"
    | "tiktokUrl"
    | "instagramUrl";
  label: string;
  type: "text" | "select" | "date";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
};

export type OnboardingStep = {
  id: keyof OnboardingContext | "intro" | "strategyCombination";
  title: string;
  subtitle?: string;
  guideText?: string;
  type: StepType;
  options?: FlowOption[];
  fields?: FormField[];
};

import type { CampaignPlan } from "@/src/onboarding/transformer";

export type SocialWeeklyStats = {
  likes: number;
  comentarios: number;
  compartidos: number;
  publicaciones: number;
};

export type SocialMeta = {
  seguidores: number;
  interacciones: number;
};

export type SocialChannel = {
  url: string;
  ultima_publicacion: string;
  likes: number;
  comentarios: number;
  compartidos: number;
  seguidores: number;
  semana_pasada: SocialWeeklyStats;
  meta: SocialMeta;
};

export type ClientSocials = {
  facebook?: SocialChannel | null;
  instagram?: SocialChannel | null;
  tiktok?: SocialChannel | null;
};

export type ClientRecord = CampaignPlan & {
  id: string;
  createdAt: string;
  lastUpdated?: string;
  socials?: ClientSocials;
};

export const clients: ClientRecord[] = [
  {
    id: "isaac-escobedo-2026",
    createdAt: "2026-01-16T10:30:00.000Z",
    role: "candidato",
    politicalLevel: "PARLAMENTARIO",
    politicalRole: "diputado",
    politicalParty: "Juntos por la Juventud",
    firstName: "Isaac",
    lastName: "Escobedo",
    residence: "Lima, Perú",
    facebookUrl: "https://www.facebook.com/isaacescobedocomas",
    primaryStrategy: "RACIONAL",
  },
  {
    id: "guillermo-aliaga-2026",
    createdAt: "2026-01-15T09:15:00.000Z",
    role: "candidato",
    politicalLevel: "PARLAMENTARIO",
    politicalRole: "senador_nacional",
    politicalParty: "Partido Democrático Somos Perú",
    firstName: "Guillermo",
    lastName: "Aliaga",
    residence: "Lima, Perú",
    facebookUrl: "https://www.facebook.com/GuilloAliaga",
    primaryStrategy: "EMOTIVA",
  },
];

export const CLIENTS_UPDATED_EVENT = "mv.clients.updated";

const nowIso = () => new Date().toISOString();

const CLIENT_STORAGE_KEY = "mv.onboarding.clients";

const buildClientId = (plan: CampaignPlan) => {
  const label = [plan.firstName, plan.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const slug = label
    ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "cliente";
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${slug}-${crypto.randomUUID()}`;
  }
  return `${slug}-${Date.now()}`;
};

export const createClientRecord = (plan: CampaignPlan): ClientRecord => {
  const timestamp = nowIso();
  return {
    id: buildClientId(plan),
    createdAt: timestamp,
    lastUpdated: timestamp,
    ...plan,
  };
};

export type ClientStorageAdapter = {
  load: () => ClientRecord[];
  save: (client: ClientRecord) => ClientRecord[];
  hasClients: () => boolean;
  reset?: () => void;
};

const localStorageAdapter: ClientStorageAdapter = {
  load: () => {
    if (typeof window === "undefined") {
      return [];
    }

    const raw = window.localStorage.getItem(CLIENT_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as ClientRecord[]) : [];
    } catch {
      return [];
    }
  },
  save: (client) => {
    if (typeof window === "undefined") {
      return [];
    }

    const stored = localStorageAdapter.load();
    const next = [client, ...stored.filter((item) => item.id !== client.id)];
    window.localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CLIENTS_UPDATED_EVENT));
    return next;
  },
  hasClients: () => {
    return localStorageAdapter.load().length > 0;
  },
  reset: () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(CLIENT_STORAGE_KEY);
    window.dispatchEvent(new Event(CLIENTS_UPDATED_EVENT));
  },
};

let activeClientStorage: ClientStorageAdapter = localStorageAdapter;

export const clientStorage = {
  load: () => activeClientStorage.load(),
  save: (client: ClientRecord) => activeClientStorage.save(client),
  hasClients: () => activeClientStorage.hasClients(),
  setAdapter: (adapter: ClientStorageAdapter) => {
    activeClientStorage = adapter;
  },
  resetAdapter: () => {
    activeClientStorage = localStorageAdapter;
  },
  reset: () => activeClientStorage.reset?.(),
};

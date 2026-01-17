import {
  Compass,
  Sparkles,
  Map as MapIcon,
  Globe,
  Shield,
  Megaphone,
  Target,
  Radar,
  Users,
  Network,
  Scale,
  Building,
  Home,
  Landmark,
  Layers,
  Crown,
} from "lucide-react";

export const iconMap = {
  compass: Compass,
  sparkles: Sparkles,
  map: MapIcon,
  globe: Globe,
  shield: Shield,
  megaphone: Megaphone,
  target: Target,
  radar: Radar,
  users: Users,
  network: Network,
  scale: Scale,
  building: Building,
  home: Home,
  landmark: Landmark,
  layers: Layers,
  crown: Crown,
};

export type IconKey = keyof typeof iconMap;

export function getIcon(key?: string) {
  if (!key) return null;
  return iconMap[key as IconKey] ?? null;
}

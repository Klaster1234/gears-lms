import {
  Wrench,
  Recycle,
  Salad,
  Package,
  Leaf,
  RotateCcw,
  GraduationCap,
  Bike,
  TreePine,
  UtensilsCrossed,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PlaceCategory } from '@prisma/client';

export type CategoryConfig = {
  value: PlaceCategory;
  labelKey: string;
  color: string;
  colorBg: string;
  colorRing: string;
  icon: LucideIcon;
};

export const CATEGORY_CONFIG: Record<PlaceCategory, CategoryConfig> = {
  REPAIR: {
    value: 'REPAIR',
    labelKey: 'quests.categories.repair',
    color: '#F59E0B',
    colorBg: 'bg-amber-100',
    colorRing: 'ring-amber-300',
    icon: Wrench,
  },
  SECOND_HAND: {
    value: 'SECOND_HAND',
    labelKey: 'quests.categories.secondHand',
    color: '#A78BFA',
    colorBg: 'bg-violet-100',
    colorRing: 'ring-violet-300',
    icon: Recycle,
  },
  VEGAN: {
    value: 'VEGAN',
    labelKey: 'quests.categories.vegan',
    color: '#10B981',
    colorBg: 'bg-emerald-100',
    colorRing: 'ring-emerald-300',
    icon: Salad,
  },
  NO_PACKAGE: {
    value: 'NO_PACKAGE',
    labelKey: 'quests.categories.noPackage',
    color: '#0EA5E9',
    colorBg: 'bg-sky-100',
    colorRing: 'ring-sky-300',
    icon: Package,
  },
  ECO: {
    value: 'ECO',
    labelKey: 'quests.categories.eco',
    color: '#22C55E',
    colorBg: 'bg-green-100',
    colorRing: 'ring-green-300',
    icon: Leaf,
  },
  RECYCLING: {
    value: 'RECYCLING',
    labelKey: 'quests.categories.recycling',
    color: '#84CC16',
    colorBg: 'bg-lime-100',
    colorRing: 'ring-lime-300',
    icon: RotateCcw,
  },
  EDUCATION: {
    value: 'EDUCATION',
    labelKey: 'quests.categories.education',
    color: '#3B82F6',
    colorBg: 'bg-blue-100',
    colorRing: 'ring-blue-300',
    icon: GraduationCap,
  },
  MOBILITY: {
    value: 'MOBILITY',
    labelKey: 'quests.categories.mobility',
    color: '#06B6D4',
    colorBg: 'bg-cyan-100',
    colorRing: 'ring-cyan-300',
    icon: Bike,
  },
  TOURISM: {
    value: 'TOURISM',
    labelKey: 'quests.categories.tourism',
    color: '#F472B6',
    colorBg: 'bg-pink-100',
    colorRing: 'ring-pink-300',
    icon: TreePine,
  },
  GASTRONOMY: {
    value: 'GASTRONOMY',
    labelKey: 'quests.categories.gastronomy',
    color: '#FB923C',
    colorBg: 'bg-orange-100',
    colorRing: 'ring-orange-300',
    icon: UtensilsCrossed,
  },
};

export const ALL_CATEGORIES = Object.values(CATEGORY_CONFIG);

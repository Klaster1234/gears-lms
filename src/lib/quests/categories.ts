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
  /** Deep, earthy hex — used for the marker face. Pairs with cream borders. */
  color: string;
  /** Soft tint for filter pills + popup category chip. */
  colorBg: string;
  colorRing: string;
  icon: LucideIcon;
  /** Glyph rendered inside the map marker. Emoji keeps it lightweight + papercut-warm. */
  glyph: string;
};

// Palette tuned to match the G.E.A.R.S. brand (warm cream + deep forest +
// gold accents). Hexes are deeper than Tailwind defaults so they read as
// "earthy hand-cut paper" instead of "stock map pins". When you tweak,
// keep contrast ≥ 4.5:1 against white text and against the cream BG.
export const CATEGORY_CONFIG: Record<PlaceCategory, CategoryConfig> = {
  REPAIR: {
    value: 'REPAIR',
    labelKey: 'quests.categories.repair',
    color: '#B45309', // amber 700 — warm copper
    colorBg: 'bg-amber-100',
    colorRing: 'ring-amber-300',
    icon: Wrench,
    glyph: '🔧',
  },
  SECOND_HAND: {
    value: 'SECOND_HAND',
    labelKey: 'quests.categories.secondHand',
    color: '#6D28D9', // violet 700 — vintage
    colorBg: 'bg-violet-100',
    colorRing: 'ring-violet-300',
    icon: Recycle,
    glyph: '👕',
  },
  VEGAN: {
    value: 'VEGAN',
    labelKey: 'quests.categories.vegan',
    color: '#047857', // emerald 700 — leaf
    colorBg: 'bg-emerald-100',
    colorRing: 'ring-emerald-300',
    icon: Salad,
    glyph: '🥗',
  },
  NO_PACKAGE: {
    value: 'NO_PACKAGE',
    labelKey: 'quests.categories.noPackage',
    color: '#0E7490', // cyan 800 — clean water
    colorBg: 'bg-sky-100',
    colorRing: 'ring-sky-300',
    icon: Package,
    glyph: '🥫',
  },
  ECO: {
    value: 'ECO',
    labelKey: 'quests.categories.eco',
    color: '#064E3B', // brand primary forest
    colorBg: 'bg-green-100',
    colorRing: 'ring-green-300',
    icon: Leaf,
    glyph: '🌿',
  },
  RECYCLING: {
    value: 'RECYCLING',
    labelKey: 'quests.categories.recycling',
    color: '#4D7C0F', // lime 700 — moss
    colorBg: 'bg-lime-100',
    colorRing: 'ring-lime-300',
    icon: RotateCcw,
    glyph: '♻️',
  },
  EDUCATION: {
    value: 'EDUCATION',
    labelKey: 'quests.categories.education',
    color: '#1E40AF', // blue 800 — EU blue
    colorBg: 'bg-blue-100',
    colorRing: 'ring-blue-300',
    icon: GraduationCap,
    glyph: '📚',
  },
  MOBILITY: {
    value: 'MOBILITY',
    labelKey: 'quests.categories.mobility',
    color: '#0F766E', // teal 700 — movement
    colorBg: 'bg-cyan-100',
    colorRing: 'ring-cyan-300',
    icon: Bike,
    glyph: '🚴',
  },
  TOURISM: {
    value: 'TOURISM',
    labelKey: 'quests.categories.tourism',
    color: '#9D174D', // pink 800 — warm rose
    colorBg: 'bg-pink-100',
    colorRing: 'ring-pink-300',
    icon: TreePine,
    glyph: '🌲',
  },
  GASTRONOMY: {
    value: 'GASTRONOMY',
    labelKey: 'quests.categories.gastronomy',
    color: '#C2410C', // orange 700 — warm spice
    colorBg: 'bg-orange-100',
    colorRing: 'ring-orange-300',
    icon: UtensilsCrossed,
    glyph: '🍽️',
  },
};

export const ALL_CATEGORIES = Object.values(CATEGORY_CONFIG);

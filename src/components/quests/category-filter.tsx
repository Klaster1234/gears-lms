'use client';

import { useTranslations } from 'next-intl';
import { useId } from 'react';
import type { PlaceCategory } from '@prisma/client';
import { ALL_CATEGORIES } from '@/lib/quests/categories';

type Props = {
  selected: PlaceCategory[];
  onChange: (next: PlaceCategory[]) => void;
};

export function CategoryFilter({ selected, onChange }: Props) {
  const t = useTranslations('quests');
  const id = useId();

  const toggle = (cat: PlaceCategory) => {
    if (selected.includes(cat)) {
      onChange(selected.filter(c => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  };

  const clearAll = () => onChange([]);

  const showingAll = selected.length === 0;

  return (
    <div className="space-y-3" aria-labelledby={`${id}-label`}>
      <div className="flex items-center justify-between gap-3">
        <h3 id={`${id}-label`} className="text-sm font-medium text-[#1A1A2E]">
          {t('filters.title')}
        </h3>
        {!showingAll && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-[#0D9488] hover:underline"
          >
            {t('filters.showAll')}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map(config => {
          const Icon = config.icon;
          const isActive = selected.includes(config.value);
          const isHighlighted = showingAll || isActive;
          return (
            <button
              key={config.value}
              type="button"
              onClick={() => toggle(config.value)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                isHighlighted
                  ? 'text-white shadow-sm'
                  : 'bg-white text-[#1A1A2E]/60 border border-[#E5E2DB] hover:border-[#0D9488]/40'
              }`}
              style={
                isHighlighted ? { backgroundColor: config.color } : undefined
              }
            >
              <Icon className="size-3.5" />
              {t(`categories.${categoryKey(config.value)}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function categoryKey(c: PlaceCategory): string {
  switch (c) {
    case 'SECOND_HAND':
      return 'secondHand';
    case 'NO_PACKAGE':
      return 'noPackage';
    default:
      return c.toLowerCase();
  }
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { PlaceCategory } from '@prisma/client';
import { MapViewLoader } from './map-view-loader';
import { CategoryFilter } from './category-filter';
import { PlaceList } from './place-list';
import type { Place } from '@/lib/quests/queries';

type Props = {
  places: Place[];
};

export function QuestsExplorer({ places }: Props) {
  const t = useTranslations('quests');
  const [selected, setSelected] = useState<PlaceCategory[]>([]);
  const [view, setView] = useState<'map' | 'list'>('map');

  const visible =
    selected.length === 0
      ? places
      : places.filter(p => selected.includes(p.category));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <CategoryFilter selected={selected} onChange={setSelected} />
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs text-[#1A1A2E]/60">
            {t('filters.resultsCount', { count: visible.length })}
          </span>
          <div className="md:hidden inline-flex rounded-full bg-[#ECFDF5] p-0.5">
            <button
              type="button"
              onClick={() => setView('map')}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                view === 'map'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-[#064E3B]'
              }`}
            >
              {t('actions.showMap')}
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                view === 'list'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-[#064E3B]'
              }`}
            >
              {t('actions.showList')}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:block ${view === 'map' ? '' : 'hidden'}`}>
        <MapViewLoader places={places} selectedCategories={selected} />
      </div>

      <div className={`md:block ${view === 'list' ? '' : 'hidden md:block'}`}>
        <PlaceList places={visible} />
      </div>
    </div>
  );
}

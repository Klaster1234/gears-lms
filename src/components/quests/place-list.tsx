'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ExternalLink, MapPin } from 'lucide-react';
import { CATEGORY_CONFIG } from '@/lib/quests/categories';
import type { Place } from '@/lib/quests/queries';

type Props = {
  places: Place[];
};

export function PlaceList({ places }: Props) {
  const t = useTranslations('quests');
  const locale = useLocale() as 'en' | 'pl' | 'sk';

  if (places.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#E5E2DB] p-8 text-center text-sm text-[#1A1A2E]/60">
        {t('filters.empty')}
      </div>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {places.map(place => {
        const config = CATEGORY_CONFIG[place.category];
        const Icon = config.icon;
        const description =
          locale === 'pl'
            ? place.descriptionPl
            : locale === 'sk'
              ? place.descriptionSk
              : place.descriptionEn;
        const name =
          locale === 'en' && place.nameEn
            ? place.nameEn
            : locale === 'sk' && place.nameSk
              ? place.nameSk
              : place.name;
        const address = [place.street, place.houseNumber]
          .filter(Boolean)
          .join(' ');

        return (
          <li
            key={place.id}
            className="rounded-2xl border border-[#E5E2DB] bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white"
                style={{ backgroundColor: config.color }}
              >
                <Icon className="size-3.5" />
                {t(`categories.${categoryKey(place.category)}`)}
              </div>
            </div>
            <h3 className="font-display text-lg leading-tight text-[#064E3B] mb-2">
              {name}
            </h3>
            {(address || place.city) && (
              <p className="flex items-center gap-1 text-xs text-[#1A1A2E]/60 mb-3">
                <MapPin className="size-3" />
                {address}
                {address && place.city ? ', ' : ''}
                {place.city}
              </p>
            )}
            {description && (
              <p className="text-sm text-[#1A1A2E]/80 mb-3 line-clamp-3">
                {description}
              </p>
            )}
            {place.website && (
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#0D9488] hover:underline"
              >
                {t('actions.visitWebsite')}
                <ExternalLink className="size-3" />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function categoryKey(c: string): string {
  switch (c) {
    case 'SECOND_HAND':
      return 'secondHand';
    case 'NO_PACKAGE':
      return 'noPackage';
    default:
      return c.toLowerCase();
  }
}

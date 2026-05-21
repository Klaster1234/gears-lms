'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { type LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { PlaceCategory } from '@prisma/client';
import { CATEGORY_CONFIG } from '@/lib/quests/categories';
import type { Place } from '@/lib/quests/queries';

const GLIWICE_CENTER: [number, number] = [50.2945, 18.6714];

function createCategoryIcon(category: PlaceCategory) {
  const config = CATEGORY_CONFIG[category];
  const html = `<div style="
    background: ${config.color};
    width: 32px;
    height: 32px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  "><div style="
    transform: rotate(45deg);
    color: white;
    font-weight: bold;
    font-size: 10px;
  ">●</div></div>`;

  return L.divIcon({
    html,
    className: 'quest-place-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

function FitBounds({ places }: { places: Place[] }) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    if (places.length === 0) {
      fitted.current = false;
      return;
    }
    if (fitted.current) return;

    const bounds: LatLngBoundsExpression = places.map(p => [p.lat, p.lng]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    fitted.current = true;
  }, [map, places]);

  return null;
}

type Props = {
  places: Place[];
  selectedCategories: PlaceCategory[];
  height?: string;
};

export function MapView({ places, selectedCategories, height = '600px' }: Props) {
  const t = useTranslations('quests');
  const locale = useLocale() as 'en' | 'pl' | 'sk';

  const visible = useMemo(() => {
    if (selectedCategories.length === 0) return places;
    return places.filter(p => selectedCategories.includes(p.category));
  }, [places, selectedCategories]);

  const getDescription = (place: Place) => {
    if (locale === 'pl') return place.descriptionPl;
    if (locale === 'sk') return place.descriptionSk;
    return place.descriptionEn;
  };

  const getName = (place: Place) => {
    if (locale === 'en' && place.nameEn) return place.nameEn;
    if (locale === 'sk' && place.nameSk) return place.nameSk;
    return place.name;
  };

  return (
    <MapContainer
      center={GLIWICE_CENTER}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height, width: '100%' }}
      className="rounded-2xl border border-[#E5E2DB] overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds places={visible} />
      {visible.map(place => {
        const description = getDescription(place);
        const name = getName(place);
        const address = [place.street, place.houseNumber].filter(Boolean).join(' ');
        return (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCategoryIcon(place.category)}
          >
            <Popup minWidth={240} maxWidth={320}>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wide text-[#0D9488] font-semibold">
                  {t(`categories.${categoryKey(place.category)}`)}
                </div>
                <h3 className="font-display text-lg leading-tight text-[#064E3B]">
                  {name}
                </h3>
                {(address || place.city) && (
                  <p className="text-xs text-[#1A1A2E]/70">
                    {address}
                    {address && place.city ? ', ' : ''}
                    {place.city}
                  </p>
                )}
                {description && (
                  <p className="text-sm text-[#1A1A2E]/80">{description}</p>
                )}
                {place.website && (
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0D9488] hover:underline"
                  >
                    {t('actions.visitWebsite')}
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
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

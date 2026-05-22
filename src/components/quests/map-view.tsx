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
  // Round papercut-style marker: deep earthy fill, cream stroke, small drop
  // shadow. The glyph rides centered inside; the little stem at the bottom
  // gives it just enough "pin" so it points at the location without being
  // a generic Google Maps teardrop.
  const html = `<div class="qp-marker" style="--qp-fill: ${config.color};">
    <div class="qp-marker-body">
      <span class="qp-marker-glyph" role="img" aria-hidden="true">${config.glyph}</span>
    </div>
    <div class="qp-marker-stem"></div>
  </div>`;

  return L.divIcon({
    html,
    className: 'quest-place-marker',
    iconSize: [36, 44],
    iconAnchor: [18, 42],
    popupAnchor: [0, -36],
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
      className="rounded-2xl border border-[#E5E2DB] overflow-hidden quest-map"
    >
      {/* CartoDB Positron — light, neutral basemap that lets the deep
          earthy markers carry the colour without competing. Free, no
          API key, OSM-attributed. */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &middot; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
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

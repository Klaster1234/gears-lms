'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L, { type LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import type { PlaceCategory } from '@prisma/client';
import { CATEGORY_CONFIG } from '@/lib/quests/categories';
import type { Place } from '@/lib/quests/queries';

// Gliwice rynek. Default starting view is zoomed into the city since
// the project lives there; the "Cały Śląsk" segment expands to all places.
const GLIWICE_CENTER: [number, number] = [50.2945, 18.6714];
const GLIWICE_RADIUS_KM = 25; // covers Gliwice + Knurów + Zabrze + Bytom + nearby

type FocusMode = 'gliwice' | 'silesia';

// Haversine distance in km between two lat/lng points.
function distanceKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const sa =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a[0] * Math.PI) / 180) *
      Math.cos((b[0] * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(sa));
}

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

// Cluster bubble styled to match brand. Three size tiers based on count.
function createClusterIcon(cluster: L.MarkerCluster) {
  const count = cluster.getChildCount();
  const tier = count < 10 ? 'sm' : count < 50 ? 'md' : 'lg';
  return L.divIcon({
    html: `<div class="qp-cluster qp-cluster-${tier}"><span>${count}</span></div>`,
    className: 'qp-cluster-wrap',
    iconSize: L.point(44, 44),
  });
}

/**
 * Manages markers via leaflet.markercluster (not exposed by react-leaflet).
 * Re-runs when the visible places change (filter, focus mode).
 */
function ClusteredMarkers({
  places,
  getName,
  getDescription,
  t,
  categoryKey,
}: {
  places: Place[];
  getName: (p: Place) => string;
  getDescription: (p: Place) => string | null;
  t: (key: string) => string;
  categoryKey: (c: PlaceCategory) => string;
}) {
  const map = useMap();

  useEffect(() => {
    const group = L.markerClusterGroup({
      iconCreateFunction: createClusterIcon,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 50,
      chunkedLoading: true,
    });

    for (const place of places) {
      const marker = L.marker([place.lat, place.lng], {
        icon: createCategoryIcon(place.category),
      });
      const name = getName(place);
      const description = getDescription(place);
      const address = [place.street, place.houseNumber].filter(Boolean).join(' ');
      const websiteLink = place.website
        ? `<a href="${place.website}" target="_blank" rel="noopener noreferrer" class="text-xs text-[#0D9488] hover:underline">${t('actions.visitWebsite')}</a>`
        : '';
      const addressLine =
        address || place.city
          ? `<p class="text-xs text-[#1A1A2E]/70">${address}${address && place.city ? ', ' : ''}${place.city ?? ''}</p>`
          : '';
      const descLine = description
        ? `<p class="text-sm text-[#1A1A2E]/80">${description}</p>`
        : '';
      marker.bindPopup(
        `<div class="space-y-2" style="min-width:240px;max-width:320px;">
          <div class="text-xs uppercase tracking-wide text-[#0D9488] font-semibold">${t(`categories.${categoryKey(place.category)}`)}</div>
          <h3 class="font-display text-lg leading-tight text-[#064E3B]">${name}</h3>
          ${addressLine}
          ${descLine}
          ${websiteLink}
        </div>`,
      );
      group.addLayer(marker);
    }

    map.addLayer(group);
    return () => {
      map.removeLayer(group);
    };
  }, [map, places, getName, getDescription, t, categoryKey]);

  return null;
}

/**
 * Re-frames the map when the focus mode flips. In 'gliwice' mode we zoom
 * onto Gliwice rynek; in 'silesia' mode we fly to the bounds of every
 * visible place so the whole region is covered.
 */
function FocusController({
  mode,
  places,
}: {
  mode: FocusMode;
  places: Place[];
}) {
  const map = useMap();

  useEffect(() => {
    if (mode === 'gliwice') {
      map.flyTo(GLIWICE_CENTER, 12, { duration: 0.8 });
      return;
    }
    if (places.length === 0) return;
    const bounds: LatLngBoundsExpression = places.map(p => [p.lat, p.lng]);
    map.flyToBounds(bounds, { padding: [40, 40], maxZoom: 11, duration: 0.8 });
  }, [map, mode, places]);

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
  const [focus, setFocus] = useState<FocusMode>('gliwice');

  // Filter by category first
  const categoryFiltered = useMemo(() => {
    if (selectedCategories.length === 0) return places;
    return places.filter(p => selectedCategories.includes(p.category));
  }, [places, selectedCategories]);

  // Further filter by focus mode. "Gliwice" mode keeps only places within
  // ~25 km of the rynek so the cluster numbers + map zoom feel honest.
  const visible = useMemo(() => {
    if (focus === 'silesia') return categoryFiltered;
    return categoryFiltered.filter(
      p => distanceKm(GLIWICE_CENTER, [p.lat, p.lng]) <= GLIWICE_RADIUS_KM,
    );
  }, [categoryFiltered, focus]);

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

  const gliwiceCount = useMemo(
    () =>
      categoryFiltered.filter(
        p => distanceKm(GLIWICE_CENTER, [p.lat, p.lng]) <= GLIWICE_RADIUS_KM,
      ).length,
    [categoryFiltered],
  );
  const totalCount = categoryFiltered.length;

  return (
    <div className="relative">
      {/* Focus segment — sits above the map, brand-styled */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-1 rounded-full border border-[#E5E2DB] bg-white/95 backdrop-blur p-1 shadow-md">
        <button
          type="button"
          onClick={() => setFocus('gliwice')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
            focus === 'gliwice'
              ? 'bg-[#064E3B] text-white'
              : 'text-[#064E3B] hover:bg-[#ECFDF5]'
          }`}
        >
          {t('focus.gliwice')} <span className="opacity-70">({gliwiceCount})</span>
        </button>
        <button
          type="button"
          onClick={() => setFocus('silesia')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
            focus === 'silesia'
              ? 'bg-[#064E3B] text-white'
              : 'text-[#064E3B] hover:bg-[#ECFDF5]'
          }`}
        >
          {t('focus.silesia')} <span className="opacity-70">({totalCount})</span>
        </button>
      </div>

      <MapContainer
        center={GLIWICE_CENTER}
        zoom={12}
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
        <FocusController mode={focus} places={visible} />
        <ClusteredMarkers
          places={visible}
          getName={getName}
          getDescription={getDescription}
          t={t}
          categoryKey={categoryKey}
        />
      </MapContainer>
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


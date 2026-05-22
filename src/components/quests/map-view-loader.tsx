'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type { MapView } from './map-view';

const MapViewDynamic = dynamic<ComponentProps<typeof MapView>>(
  () => import('./map-view').then(mod => mod.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full rounded-2xl bg-[#ECFDF5] border border-[#E5E2DB] flex items-center justify-center">
        <div className="text-[#064E3B]/60 text-sm font-medium">Loading map…</div>
      </div>
    ),
  },
);

export function MapViewLoader(props: ComponentProps<typeof MapView>) {
  return <MapViewDynamic {...props} />;
}

'use client';

import { modules } from '@/data/modules';
import { ModuleCard } from './module-card';

export function ModuleGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((module, index) => (
        <ModuleCard key={module.id} module={module} index={index} />
      ))}
    </div>
  );
}

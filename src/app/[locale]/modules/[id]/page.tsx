import { notFound } from 'next/navigation';
import { getModuleById, modules } from '@/data/modules';
import { ModuleDetailClient } from './module-detail-client';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function ModuleDetailPage({ params }: Props) {
  const { id } = await params;
  const module = getModuleById(id);

  if (!module) {
    notFound();
  }

  // Find previous and next modules
  const currentIndex = modules.findIndex((m) => m.id === id);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <ModuleDetailClient
      module={module}
      prevModule={prevModule}
      nextModule={nextModule}
    />
  );
}

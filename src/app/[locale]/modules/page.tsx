import { useTranslations } from 'next-intl';
import { ModuleGrid } from '@/components/modules/module-grid';

export default function ModulesPage() {
  const t = useTranslations('common');
  return (
    <section className="min-h-screen bg-[#FAFAF5]">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            Learning {t('nav.modules')}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#1A1A2E]/60 sm:text-lg">
            Explore 10 interactive modules covering sustainable living, zero waste,
            circular economy, and green competences. Learn at your own pace and
            track your progress.
          </p>
        </div>

        {/* Module grid */}
        <ModuleGrid />
      </div>
    </section>
  );
}

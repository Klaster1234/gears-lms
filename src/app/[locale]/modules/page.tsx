import { useTranslations } from 'next-intl';

export default function ModulesPage() {
  const t = useTranslations('common');
  return (
    <main className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-forest-600">{t('nav.modules')}</h1>
        <p className="mt-4 text-lg text-charcoal/70">Modules page - coming soon</p>
      </div>
    </main>
  );
}

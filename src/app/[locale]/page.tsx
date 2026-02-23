import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('landing');
  return (
    <main className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-forest-600">{t('hero.title')}</h1>
        <p className="mt-4 text-xl text-charcoal/70">{t('hero.subtitle')}</p>
      </div>
    </main>
  );
}

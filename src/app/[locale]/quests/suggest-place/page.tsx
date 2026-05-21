import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ChevronLeft } from 'lucide-react';
import { SuggestPlaceForm } from '@/components/quests/suggest-place-form';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quests.suggest' });
  return {
    title: `${t('title')} · G.E.A.R.S.`,
    description: t('intro'),
  };
}

export default async function SuggestPlacePage() {
  const t = await getTranslations('quests.suggest');

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <Link
          href="/quests"
          className="mb-6 inline-flex items-center gap-1 text-sm text-[#0D9488] hover:underline"
        >
          <ChevronLeft className="size-4" />
          {t('back')}
        </Link>

        <header className="mb-8">
          <h1 className="font-display text-3xl text-[#064E3B] tracking-tight leading-tight mb-3">
            {t('title')}
          </h1>
          <p className="text-[#1A1A2E]/70 leading-relaxed">{t('intro')}</p>
        </header>

        <SuggestPlaceForm />
      </div>
    </div>
  );
}

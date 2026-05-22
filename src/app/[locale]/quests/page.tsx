import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Plus } from 'lucide-react';
import { getActivePlaces, getPublishedQuests } from '@/lib/quests/queries';
import { QuestsExplorer } from '@/components/quests/quests-explorer';
import { QuestCard } from '@/components/quests/quest-card';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quests' });
  return {
    title: `${t('title')} · G.E.A.R.S.`,
    description: t('tagline'),
  };
}

export default async function QuestsPage() {
  const [places, quests] = await Promise.all([
    getActivePlaces(),
    getPublishedQuests({ upcomingOnly: true }),
  ]);

  const t = await getTranslations('quests');

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <header className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-medium text-[#064E3B] mb-4">
            <span className="size-1.5 rounded-full bg-[#10B981]" />
            {t('badge')}
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[#064E3B] tracking-tight leading-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-[#1A1A2E]/70 leading-relaxed">
            {t('intro')}
          </p>
        </header>

        {/* Upcoming quests */}
        {quests.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl text-[#064E3B]">
                {t('sections.upcoming')}
              </h2>
              <Link
                href="/quests/suggest-place"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0D9488] hover:underline"
              >
                <Plus className="size-4" />
                {t('actions.suggestPlace')}
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {quests.map(quest => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </section>
        )}

        {quests.length === 0 && (
          <section className="mb-16 rounded-2xl border border-dashed border-[#E5E2DB] p-8 text-center">
            <p className="text-sm text-[#1A1A2E]/70 mb-3">
              {t('sections.noUpcoming')}
            </p>
            <Link
              href="/quests/suggest-place"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0D9488] hover:underline"
            >
              <Plus className="size-4" />
              {t('actions.suggestPlace')}
            </Link>
          </section>
        )}

        {/* Map + places */}
        <section>
          <div className="mb-6">
            <h2 className="font-display text-2xl text-[#064E3B] mb-2">
              {t('sections.places')}
            </h2>
            <p className="text-sm text-[#1A1A2E]/60">
              {t('sections.placesIntro')}
            </p>
          </div>
          <QuestsExplorer places={places} />
        </section>

        {places.length === 0 && (
          <p className="mt-6 text-center text-sm text-[#1A1A2E]/50">
            {t('sections.placesEmpty')}
          </p>
        )}
      </div>
    </div>
  );
}

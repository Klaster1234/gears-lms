import { notFound } from 'next/navigation';
import { getTranslations, getFormatter } from 'next-intl/server';
import { Calendar, Clock, MapPin, Users, ChevronLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getQuestBySlug } from '@/lib/quests/queries';
import { RegistrationForm } from '@/components/quests/registration-form';
import { CATEGORY_CONFIG } from '@/lib/quests/categories';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const quest = await getQuestBySlug(slug);
  if (!quest) return {};
  const title =
    locale === 'en' && quest.titleEn
      ? quest.titleEn
      : locale === 'sk' && quest.titleSk
        ? quest.titleSk
        : quest.titlePl;
  return {
    title: `${title} · G.E.A.R.S. Quests`,
    description:
      (locale === 'en' && quest.descriptionEn) ||
      (locale === 'sk' && quest.descriptionSk) ||
      quest.descriptionPl ||
      undefined,
  };
}

export default async function QuestDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const quest = await getQuestBySlug(slug);
  if (!quest || !quest.isPublished) notFound();

  const t = await getTranslations('quests');
  const format = await getFormatter();

  const title =
    locale === 'en' && quest.titleEn
      ? quest.titleEn
      : locale === 'sk' && quest.titleSk
        ? quest.titleSk
        : quest.titlePl;

  const description =
    locale === 'en'
      ? quest.descriptionEn
      : locale === 'sk'
        ? quest.descriptionSk
        : quest.descriptionPl;

  const taken = quest._count.registrations;
  const max = quest.maxParticipants;
  const hardLimit = max + 2;
  const isFull = taken >= hardLimit;
  const isWaitlist = taken >= max && taken < hardLimit;

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Link
          href="/quests"
          className="mb-6 inline-flex items-center gap-1 text-sm text-[#0D9488] hover:underline"
        >
          <ChevronLeft className="size-4" />
          {t('quest.backToList')}
        </Link>

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-[#064E3B] tracking-tight leading-tight mb-4">
            {title}
          </h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#1A1A2E]/70">
            {quest.scheduledAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 text-[#0D9488]" />
                {format.dateTime(quest.scheduledAt, {
                  weekday: 'long',
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
            {quest.durationMinutes && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4 text-[#0D9488]" />
                {Math.round((quest.durationMinutes / 60) * 10) / 10}h
              </span>
            )}
            {quest.meetingPoint && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-[#0D9488]" />
                {quest.meetingPoint.name}, {quest.meetingPoint.city}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 ${
                isWaitlist ? 'text-amber-700' : ''
              }`}
            >
              <Users className="size-4 text-[#0D9488]" />
              {taken} / {max}
              {isWaitlist && (
                <span className="ml-1 font-medium">{t('quest.waitlistOpen')}</span>
              )}
            </span>
          </div>
        </header>

        {description && (
          <section className="prose prose-stone max-w-none mb-10 text-[#1A1A2E]/85">
            <p className="text-lg leading-relaxed">{description}</p>
          </section>
        )}

        {/* Stops */}
        {quest.stops.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-2xl text-[#064E3B] mb-4">
              {t('quest.stops')}
            </h2>
            <ol className="space-y-3">
              {quest.stops.map((stop) => {
                const config = CATEGORY_CONFIG[stop.place.category];
                const Icon = config.icon;
                const placeName =
                  locale === 'en' && stop.place.nameEn
                    ? stop.place.nameEn
                    : locale === 'sk' && stop.place.nameSk
                      ? stop.place.nameSk
                      : stop.place.name;
                const taskText =
                  locale === 'en'
                    ? stop.taskEn
                    : locale === 'sk'
                      ? stop.taskSk
                      : stop.taskPl;

                return (
                  <li
                    key={stop.id}
                    className="rounded-2xl border border-[#E5E2DB] bg-white p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: config.color }}
                      >
                        <span className="text-sm font-bold">
                          {stop.position}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                            style={{ backgroundColor: config.color }}
                          >
                            <Icon className="size-3" />
                            {t(`categories.${categoryKey(stop.place.category)}`)}
                          </span>
                          {stop.estimatedMinutes && (
                            <span className="text-xs text-[#1A1A2E]/60">
                              ~{stop.estimatedMinutes} min
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-lg text-[#064E3B] leading-tight mb-1">
                          {placeName}
                        </h3>
                        {taskText && (
                          <p className="text-sm text-[#1A1A2E]/75 leading-relaxed">
                            {taskText}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {/* Registration */}
        <section className="rounded-2xl border border-[#E5E2DB] bg-[#FAF8F0] p-6 md:p-8">
          <h2 className="font-display text-2xl text-[#064E3B] mb-2">
            {t('registration.heading')}
          </h2>
          <p className="text-sm text-[#1A1A2E]/70 mb-6">
            {t('registration.intro')}
          </p>
          {isFull ? (
            <p className="rounded-md bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
              {t('registration.fullMessage')}
            </p>
          ) : (
            <RegistrationForm questId={quest.id} questSlug={quest.slug} />
          )}
        </section>
      </div>
    </div>
  );
}

function categoryKey(c: string): string {
  switch (c) {
    case 'SECOND_HAND':
      return 'secondHand';
    case 'NO_PACKAGE':
      return 'noPackage';
    default:
      return c.toLowerCase();
  }
}

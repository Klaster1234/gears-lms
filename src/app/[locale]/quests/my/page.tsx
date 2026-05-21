import { redirect } from 'next/navigation';
import { getTranslations, getFormatter } from 'next-intl/server';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import { getUserRegistrations } from '@/lib/quests/queries';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quests.myQuests' });
  return {
    title: `${t('title')} · G.E.A.R.S.`,
  };
}

export default async function MyQuestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const { locale } = await params;
  const [registrations, t, format] = await Promise.all([
    getUserRegistrations(session.user.id),
    getTranslations('quests.myQuests'),
    getFormatter(),
  ]);

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="font-display text-4xl text-[#064E3B] tracking-tight leading-tight mb-3">
            {t('title')}
          </h1>
          <p className="text-[#1A1A2E]/70">{t('intro')}</p>
        </header>

        {registrations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E5E2DB] p-10 text-center">
            <p className="text-[#1A1A2E]/70 mb-4">{t('empty')}</p>
            <Link
              href="/quests"
              className="inline-flex items-center gap-1 rounded-full bg-[#064E3B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0D9488] transition-colors"
            >
              {t('browse')}
              <ChevronRight className="size-4" />
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {registrations.map(reg => {
              const title =
                locale === 'en' && reg.quest.titleEn
                  ? reg.quest.titleEn
                  : locale === 'sk' && reg.quest.titleSk
                    ? reg.quest.titleSk
                    : reg.quest.titlePl;

              const statusBadge = (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    reg.status === 'WAITLIST'
                      ? 'bg-amber-100 text-amber-800'
                      : reg.status === 'CONFIRMED'
                        ? 'bg-green-100 text-green-800'
                        : reg.status === 'ATTENDED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {t(`status.${reg.status.toLowerCase()}`)}
                </span>
              );

              return (
                <li
                  key={reg.id}
                  className="rounded-2xl border border-[#E5E2DB] bg-white p-5 hover:border-[#0D9488]/40 transition-colors"
                >
                  <Link
                    href={`/quests/${reg.quest.slug}`}
                    className="block"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h2 className="font-display text-lg text-[#064E3B] leading-tight">
                        {title}
                      </h2>
                      {statusBadge}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#1A1A2E]/60">
                      {reg.quest.scheduledAt && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3.5" />
                          {format.dateTime(reg.quest.scheduledAt, {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                      {reg.quest.durationMinutes && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {Math.round((reg.quest.durationMinutes / 60) * 10) / 10}h
                        </span>
                      )}
                      {reg.quest.meetingPoint && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {reg.quest.meetingPoint.city}
                        </span>
                      )}
                      <span className="text-[#1A1A2E]/40">
                        {t('registeredOn', {
                          date: format.dateTime(reg.createdAt, {
                            day: '2-digit',
                            month: 'short',
                          }),
                        })}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

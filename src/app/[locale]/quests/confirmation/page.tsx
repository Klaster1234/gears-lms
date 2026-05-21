import { getTranslations } from 'next-intl/server';
import { CheckCircle2, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';

type Props = {
  searchParams: Promise<{ status?: string; quest?: string }>;
};

export const dynamic = 'force-dynamic';

export default async function ConfirmationPage({ searchParams }: Props) {
  const { status = 'pending', quest } = await searchParams;
  const t = await getTranslations('quests.confirmation');

  const isWaitlist = status === 'waitlist';

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-xl px-6 lg:px-8">
        <div className="rounded-2xl border border-[#E5E2DB] bg-white p-8 md:p-10 text-center">
          {isWaitlist ? (
            <Clock className="mx-auto size-16 text-amber-500 mb-4" />
          ) : (
            <CheckCircle2 className="mx-auto size-16 text-[#10B981] mb-4" />
          )}
          <h1 className="font-display text-3xl text-[#064E3B] mb-3">
            {isWaitlist ? t('waitlistTitle') : t('confirmedTitle')}
          </h1>
          <p className="text-[#1A1A2E]/75 mb-6 leading-relaxed">
            {isWaitlist ? t('waitlistMessage') : t('confirmedMessage')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {quest && (
              <Link
                href={`/quests/${quest}`}
                className="inline-flex items-center justify-center rounded-full bg-[#064E3B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0D9488] transition-colors"
              >
                {t('backToQuest')}
              </Link>
            )}
            <Link
              href="/quests"
              className="inline-flex items-center justify-center rounded-full border border-[#E5E2DB] bg-white px-5 py-2.5 text-sm font-medium text-[#064E3B] hover:border-[#0D9488] transition-colors"
            >
              {t('exploreMore')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

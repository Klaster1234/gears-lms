'use client';

import { useTranslations, useLocale, useFormatter } from 'next-intl';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { QuestSummary } from '@/lib/quests/queries';

type Props = {
  quest: QuestSummary;
};

export function QuestCard({ quest }: Props) {
  const t = useTranslations('quests');
  const locale = useLocale() as 'en' | 'pl' | 'sk';
  const format = useFormatter();

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
  const isFull = taken >= max;
  const inOverflow = taken >= max && taken < max + 2;

  return (
    <Link
      href={`/quests/${quest.slug}`}
      className="group block rounded-2xl border border-[#E5E2DB] bg-white p-6 shadow-sm hover:shadow-lg hover:border-[#0D9488]/40 transition-all"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-[#1A1A2E]/60">
          {quest.scheduledAt && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              {format.dateTime(quest.scheduledAt, {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          )}
          {quest.meetingPoint?.city && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {quest.meetingPoint.city}
            </span>
          )}
        </div>

        <h3 className="font-display text-xl leading-tight text-[#064E3B] group-hover:text-[#0D9488] transition-colors">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-[#1A1A2E]/70 line-clamp-2">{description}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-[#1A1A2E]/60 pt-2 border-t border-[#E5E2DB]/60">
          {quest.durationMinutes && (
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {Math.round(quest.durationMinutes / 60 * 10) / 10}h
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1 ${
              isFull ? 'text-amber-700' : ''
            }`}
          >
            <Users className="size-3.5" />
            {taken} / {max}
            {inOverflow && (
              <span className="ml-1 text-amber-700 font-medium">
                {t('quest.waitlistOpen')}
              </span>
            )}
          </span>
        </div>

        <div className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#0D9488] group-hover:gap-2 transition-all">
          {t('actions.viewQuest')}
          <ChevronRight className="size-4" />
        </div>
      </div>
    </Link>
  );
}

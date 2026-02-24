'use client';

import { useTranslations } from 'next-intl';
import {
  BookOpen,
  Info,
  AlertTriangle,
  Lightbulb,
  Flag,
  MapPin,
  Leaf,
} from 'lucide-react';
import type { LessonSection, CalloutVariant } from '@/types';

interface LessonContentProps {
  sections: LessonSection[];
}

/* ── Callout styling map ──────────────────────────────────────────────── */

const calloutStyles: Record<
  CalloutVariant,
  { border: string; bg: string; iconBg: string; text: string; icon: React.ElementType }
> = {
  info: {
    border: 'border-[#0D9488]',
    bg: 'bg-[#0D9488]/5',
    iconBg: 'bg-[#0D9488]/10',
    text: 'text-[#0D9488]',
    icon: Info,
  },
  warning: {
    border: 'border-[#D97706]',
    bg: 'bg-[#D97706]/5',
    iconBg: 'bg-[#D97706]/10',
    text: 'text-[#D97706]',
    icon: AlertTriangle,
  },
  tip: {
    border: 'border-[#059669]',
    bg: 'bg-[#059669]/5',
    iconBg: 'bg-[#059669]/10',
    text: 'text-[#059669]',
    icon: Lightbulb,
  },
  eu: {
    border: 'border-[#2563EB]',
    bg: 'bg-[#2563EB]/5',
    iconBg: 'bg-[#2563EB]/10',
    text: 'text-[#2563EB]',
    icon: Flag,
  },
};

/* ── Section renderers ────────────────────────────────────────────────── */

function IntroductionSection({ titleKey, bodyKey }: { titleKey: string; bodyKey: string }) {
  const t = useTranslations();
  return (
    <div className="rounded-xl border-l-4 border-[#0D9488] bg-[#0D9488]/5 p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D9488]/10 shrink-0 mt-0.5">
          <BookOpen className="size-4 text-[#0D9488]" />
        </div>
        <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
          {t(titleKey)}
        </h3>
      </div>
      <div className="ml-11 space-y-3">
        {t(bodyKey)
          .split('\n\n')
          .map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-[#1A1A2E]/80 first:italic first:text-[#1A1A2E]/90"
            >
              {paragraph}
            </p>
          ))}
      </div>
    </div>
  );
}

function TextSection({ titleKey, bodyKey }: { titleKey: string; bodyKey: string }) {
  const t = useTranslations();
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-[#1A1A2E] mb-3">
        {t(titleKey)}
      </h3>
      <div className="space-y-3">
        {t(bodyKey)
          .split('\n\n')
          .map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-[#1A1A2E]/80">
              {paragraph}
            </p>
          ))}
      </div>
    </div>
  );
}

function CalloutSection({
  variant,
  titleKey,
  bodyKey,
}: {
  variant: CalloutVariant;
  titleKey: string;
  bodyKey: string;
}) {
  const t = useTranslations();
  const style = calloutStyles[variant];
  const Icon = style.icon;

  return (
    <div className={`rounded-xl border-l-4 ${style.border} ${style.bg} p-5 sm:p-6`}>
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.iconBg} shrink-0 mt-0.5`}
        >
          <Icon className={`size-4 ${style.text}`} />
        </div>
        <h4 className="font-display text-base font-semibold text-[#1A1A2E]">
          {t(titleKey)}
        </h4>
      </div>
      <div className="ml-11 space-y-3">
        {t(bodyKey)
          .split('\n\n')
          .map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-[#1A1A2E]/80">
              {paragraph}
            </p>
          ))}
      </div>
    </div>
  );
}

function StatisticSection({
  figures,
}: {
  figures: { valueKey: string; labelKey: string; sourceKey?: string }[];
}) {
  const t = useTranslations();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {figures.map((figure, i) => (
        <div
          key={i}
          className="rounded-xl border border-border/60 bg-white p-5 text-center"
        >
          <p className="text-2xl sm:text-3xl font-bold text-[#064E3B] mb-1">
            {t(figure.valueKey)}
          </p>
          <p className="text-xs text-[#1A1A2E]/70 leading-snug mb-2">
            {t(figure.labelKey)}
          </p>
          {figure.sourceKey && (
            <p className="text-[10px] text-muted-foreground italic">
              {t(figure.sourceKey)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function CaseStudySection({
  titleKey,
  locationKey,
  bodyKey,
}: {
  titleKey: string;
  locationKey: string;
  bodyKey: string;
}) {
  const t = useTranslations();
  return (
    <div className="rounded-xl border-l-4 border-[#064E3B] bg-[#064E3B]/5 p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#064E3B]/10 shrink-0 mt-0.5">
          <MapPin className="size-4 text-[#064E3B]" />
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-[#1A1A2E]">
            {t(titleKey)}
          </h4>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-xs font-medium">
            {t(locationKey)}
          </span>
        </div>
      </div>
      <div className="ml-11 mt-3 space-y-3">
        {t(bodyKey)
          .split('\n\n')
          .map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-[#1A1A2E]/80">
              {paragraph}
            </p>
          ))}
      </div>
    </div>
  );
}

function TipListSection({
  titleKey,
  items,
}: {
  titleKey: string;
  items: { textKey: string }[];
}) {
  const t = useTranslations();
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-[#1A1A2E] mb-4">
        {t(titleKey)}
      </h3>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#059669]/10 text-[#059669] text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <Leaf className="size-4 text-[#059669] shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed text-[#1A1A2E]/80">
                {t(item.textKey)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */

export function LessonContent({ sections }: LessonContentProps) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <div key={index}>
          {index > 0 && (
            <div className="border-t border-border/40 mb-8" />
          )}
          {section.type === 'introduction' && (
            <IntroductionSection titleKey={section.titleKey} bodyKey={section.bodyKey} />
          )}
          {section.type === 'text' && (
            <TextSection titleKey={section.titleKey} bodyKey={section.bodyKey} />
          )}
          {section.type === 'callout' && (
            <CalloutSection
              variant={section.variant}
              titleKey={section.titleKey}
              bodyKey={section.bodyKey}
            />
          )}
          {section.type === 'statistic' && (
            <StatisticSection figures={section.figures} />
          )}
          {section.type === 'case-study' && (
            <CaseStudySection
              titleKey={section.titleKey}
              locationKey={section.locationKey}
              bodyKey={section.bodyKey}
            />
          )}
          {section.type === 'tip-list' && (
            <TipListSection titleKey={section.titleKey} items={section.items} />
          )}
        </div>
      ))}
    </div>
  );
}

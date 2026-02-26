'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, BookOpen, Puzzle, PenLine, LinkIcon, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { greenCompAreas } from '@/data/greencomp';
import type { Module } from '@/types';

const moduleIllustrations: Record<number, string> = {
  1: '/art/mod-sustainability.png',
  2: '/art/mod-zerowaste.png',
  3: '/art/mod-composting.png',
  4: '/art/mod-shopping.png',
  5: '/art/mod-circular.png',
  6: '/art/mod-fashion.png',
  7: '/art/mod-greenwashing.png',
  8: '/art/mod-energy.png',
  9: '/art/mod-community.png',
  10: '/art/mod-ecoanxiety.png',
};

const areaToKey: Record<string, string> = {
  'embodying-values': 'embodyingValues',
  'embracing-complexity': 'embracingComplexity',
  'envisioning-futures': 'envisioningFutures',
  'acting-for-sustainability': 'actingForSustainability',
};

const steps = [
  { key: 'learn' as const, labelKey: 'learn', icon: BookOpen },
  { key: 'practice' as const, labelKey: 'practice', icon: Puzzle },
  { key: 'reflect' as const, labelKey: 'reflect', icon: PenLine },
  { key: 'resources' as const, labelKey: 'resources', icon: LinkIcon },
];

interface ModuleHeaderProps {
  module: Module;
}

export function ModuleHeader({ module }: ModuleHeaderProps) {
  const t = useTranslations('modules');
  const tg = useTranslations('greencomp.areas');
  const tt = useTranslations('modules.tabs');
  const hydrated = useStoreHydration();
  const moduleProgress = useLearningStore((s) => s.moduleProgress[module.id]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const stepStatus = {
    learn: moduleProgress?.learnCompleted ?? false,
    practice: moduleProgress?.practiceCompleted ?? false,
    reflect: moduleProgress?.reflectCompleted ?? false,
    resources: moduleProgress?.quizPassed ?? false,
  };

  const completedSteps = Object.values(stepStatus).filter(Boolean).length;

  const areaData = module.greenCompAreas
    .map((areaId) => greenCompAreas.find((a) => a.id === areaId))
    .filter(Boolean);

  return (
    <div ref={ref} className="relative border-b border-[#E5E2DB] bg-white pb-8 overflow-hidden">
      {/* Background illustration - right side decorative */}
      {moduleIllustrations[module.number] && (
        <div className="pointer-events-none absolute -right-12 top-0 bottom-0 hidden w-[320px] select-none opacity-[0.06] lg:block">
          <Image
            src={moduleIllustrations[module.number]}
            alt=""
            fill
            className="object-cover object-center"
            sizes="320px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        </div>
      )}

      {/* Large watermark module number */}
      <span className="pointer-events-none absolute -top-8 -right-4 font-display text-[12rem] leading-none text-[#064E3B] opacity-[0.03] select-none sm:text-[16rem]">
        {String(module.number).padStart(2, '0')}
      </span>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Module number label + meta */}
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-[#0D9488]"
          >
            {t('moduleLabel', { number: String(module.number).padStart(2, '0') })}
          </motion.p>

          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-1.5 text-[13px] text-[#1A1A2E]/35"
          >
            <Clock className="size-3.5" />
            ~{module.estimatedMinutes} min
          </motion.span>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl text-[#1A1A2E] sm:text-4xl lg:text-5xl max-w-3xl"
        >
          {t(`${module.number}.title`)}
        </motion.h1>

        {/* GreenComp area badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5 flex flex-wrap items-center gap-2"
        >
          {areaData.map((area) => {
            const areaKey = areaToKey[area!.id];
            return (
              <Badge
                key={area!.id}
                className="rounded-full border-0 px-3 py-1 text-[11px] font-normal text-white"
                style={{ backgroundColor: area!.color }}
              >
                {areaKey ? tg(`${areaKey}.title`) : area!.id}
              </Badge>
            );
          })}
        </motion.div>

        {/* Step progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          {hydrated ? (
            <div className="flex items-center gap-1.5 text-[13px] text-[#1A1A2E]/45 mb-4">
              <span className="font-medium text-[#1A1A2E]/70">
                {t('stepsLabel', { current: Math.min(completedSteps + 1, 4), total: 4 })}
              </span>
              <span className="mx-1 text-[#E5E2DB]">/</span>
              <span>{t('stepsCompletedCount', { count: completedSteps })}</span>
            </div>
          ) : (
            <div className="h-5 mb-4" />
          )}

          <div className="flex gap-2 sm:gap-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const done = hydrated && stepStatus[step.key];
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
                  className={`flex flex-1 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                    done
                      ? 'border-[#064E3B]/20 bg-[#064E3B]/[0.04] text-[#064E3B]'
                      : 'border-[#E5E2DB] bg-[#FAF8F0]/50 text-[#1A1A2E]/35'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="size-4 text-[#064E3B] shrink-0" />
                  ) : (
                    <Icon className="size-4 shrink-0" />
                  )}
                  <span className="hidden sm:inline">{tt(step.labelKey)}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

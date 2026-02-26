'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing';
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

interface ModuleCardProps {
  module: Module;
  index: number;
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  const t = useTranslations('modules');
  const tg = useTranslations('greencomp.areas');
  const hydrated = useStoreHydration();
  const moduleProgress = useLearningStore((s) => s.moduleProgress[module.id]);

  // Calculate completion percentage based on 4 steps
  const stepsCompleted = moduleProgress
    ? [
        moduleProgress.learnCompleted,
        moduleProgress.practiceCompleted,
        moduleProgress.reflectCompleted,
        moduleProgress.quizPassed,
      ].filter(Boolean).length
    : 0;
  const completionPercent = (stepsCompleted / 4) * 100;

  // Determine status
  const isCompleted = stepsCompleted === 4;
  const isInProgress = stepsCompleted > 0 && !isCompleted;

  // Get GreenComp area data for badges
  const areaData = module.greenCompAreas
    .map((areaId) => greenCompAreas.find((a) => a.id === areaId))
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <Link href={`/modules/${module.id}`} className="group block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white transition-all duration-500 hover:border-[#064E3B]/20 hover:shadow-[0_20px_60px_-15px_rgba(6,78,59,0.08)]">
          {/* Illustration banner */}
          {moduleIllustrations[module.number] && (
            <div className="relative h-32 w-full overflow-hidden bg-[#FAF8F0]">
              <Image
                src={moduleIllustrations[module.number]}
                alt=""
                fill
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
            </div>
          )}

          <div className="relative p-7 lg:p-8">
            {/* Large watermark number */}
            <span className="pointer-events-none absolute -top-3 -right-1 font-display text-[7rem] leading-none text-[#064E3B] opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]">
              {String(module.number).padStart(2, '0')}
            </span>

            {/* Status indicator - top right */}
            {hydrated && (
              <div className="absolute top-4 right-6">
                {isCompleted ? (
                  <div className="flex items-center gap-1.5 text-[#064E3B]">
                    <CheckCircle2 className="size-5" />
                    <span className="text-xs font-medium tracking-wide uppercase">{t('done')}</span>
                  </div>
                ) : isInProgress ? (
                  <Badge className="rounded-full border-0 bg-[#F59E0B]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#D97706]">
                    {t('inProgress')}
                  </Badge>
                ) : null}
              </div>
            )}

            {/* Module number label */}
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#0D9488]">
              {t('moduleLabel', { number: String(module.number).padStart(2, '0') })}
            </p>

          {/* Title */}
          <h3 className="mb-3 font-display text-xl leading-tight text-[#1A1A2E] lg:text-[22px]">
            {t(`${module.number}.title`)}
          </h3>

          {/* Description */}
          <p className="mb-5 text-[14px] leading-relaxed text-[#1A1A2E]/50 line-clamp-2">
            {t(`${module.number}.description`)}
          </p>

          {/* GreenComp area badges */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {areaData.map((area) => {
              const areaKey = areaToKey[area!.id];
              return (
                <Badge
                  key={area!.id}
                  className="rounded-full border-0 px-2.5 py-0.5 text-[10px] font-normal text-white"
                  style={{ backgroundColor: area!.color }}
                >
                  {areaKey ? tg(`${areaKey}.title`) : area!.id}
                </Badge>
              );
            })}
          </div>

          {/* Bottom section: time + progress */}
          <div className="mt-auto space-y-3 border-t border-[#E5E2DB]/60 pt-4">
            <div className="flex items-center gap-1.5 text-[13px] text-[#1A1A2E]/40">
              <Clock className="size-3.5" />
              <span>~{module.estimatedMinutes} min</span>
            </div>

            {/* Progress bar */}
            {hydrated ? (
              <div className="space-y-1.5">
                <div className="h-1 w-full overflow-hidden rounded-full bg-[#064E3B]/[0.06]">
                  <div
                    className="h-full rounded-full bg-[#064E3B] transition-all duration-700 ease-out"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <p className="text-[11px] font-medium tracking-wide text-[#1A1A2E]/35">
                  {t('stepsCompleted', { count: stepsCompleted })}
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="h-1 w-full rounded-full bg-[#064E3B]/[0.06]" />
                <p className="text-[11px] text-[#1A1A2E]/35">&nbsp;</p>
              </div>
            )}
          </div>

          </div>

          {/* Bottom accent line on hover */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#064E3B] transition-all duration-500 group-hover:w-full" />
        </div>
      </Link>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { greenCompAreas } from '@/data/greencomp';
import type { Module } from '@/types';

// English fallback titles for modules
const moduleTitles: Record<number, string> = {
  1: 'Introduction to Sustainability & the 5R Principles',
  2: 'Understanding Waste & the Zero Waste Mindset',
  3: 'Composting for Households & Communities',
  4: 'Sustainable Shopping: Food, Fashion & Beyond',
  5: 'Circular Economy Basics',
  6: 'Fast Fashion vs. Slow Fashion',
  7: 'Green Consumption & Ethical Choices',
  8: 'Energy & Resource Efficiency in Daily Life',
  9: 'Community Action & Collective Impact',
  10: 'Understanding and Managing Eco-Anxiety',
};

const moduleDescriptions: Record<number, string> = {
  1: 'Learn about the foundations of sustainability and how the 5R principles guide everyday choices.',
  2: 'Explore waste generation, its environmental impact, and how to adopt a zero waste lifestyle.',
  3: 'Discover practical composting techniques for reducing organic waste at home and in your community.',
  4: 'Make informed decisions about food, fashion, and consumer goods for a sustainable future.',
  5: 'Understand how a circular economy keeps resources in use and eliminates waste by design.',
  6: 'Compare the environmental and social impacts of fast fashion with sustainable fashion alternatives.',
  7: 'Develop critical thinking skills for ethical consumption and recognising greenwashing.',
  8: 'Learn practical ways to reduce energy use and resource consumption in your daily routines.',
  9: 'Explore how collective efforts and community initiatives drive meaningful environmental change.',
  10: 'Understand eco-anxiety, build emotional resilience, and channel concern into positive action.',
};

interface ModuleCardProps {
  module: Module;
  index: number;
}

export function ModuleCard({ module, index }: ModuleCardProps) {
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

  // English titles for GreenComp areas
  const areaNames: Record<string, string> = {
    'embodying-values': 'Embodying Values',
    'embracing-complexity': 'Embracing Complexity',
    'envisioning-futures': 'Envisioning Futures',
    'acting-for-sustainability': 'Acting for Sustainability',
  };

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
        <div className="relative h-full overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white p-7 transition-all duration-500 hover:border-[#064E3B]/20 hover:shadow-[0_20px_60px_-15px_rgba(6,78,59,0.08)] lg:p-8">
          {/* Large watermark number */}
          <span className="pointer-events-none absolute -top-3 -right-1 font-display text-[7rem] leading-none text-[#064E3B] opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]">
            {String(module.number).padStart(2, '0')}
          </span>

          {/* Status indicator - top right */}
          {hydrated && (
            <div className="absolute top-6 right-6">
              {isCompleted ? (
                <div className="flex items-center gap-1.5 text-[#064E3B]">
                  <CheckCircle2 className="size-5" />
                  <span className="text-xs font-medium tracking-wide uppercase">Done</span>
                </div>
              ) : isInProgress ? (
                <Badge className="rounded-full border-0 bg-[#F59E0B]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#D97706]">
                  In Progress
                </Badge>
              ) : null}
            </div>
          )}

          {/* Module number label */}
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#0D9488]">
            Module {String(module.number).padStart(2, '0')}
          </p>

          {/* Title */}
          <h3 className="mb-3 font-display text-xl leading-tight text-[#1A1A2E] lg:text-[22px]">
            {moduleTitles[module.number] ?? module.titleKey}
          </h3>

          {/* Description */}
          <p className="mb-5 text-[14px] leading-relaxed text-[#1A1A2E]/50 line-clamp-2">
            {moduleDescriptions[module.number] ?? ''}
          </p>

          {/* GreenComp area badges */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {areaData.map((area) => (
              <Badge
                key={area!.id}
                className="rounded-full border-0 px-2.5 py-0.5 text-[10px] font-normal text-white"
                style={{ backgroundColor: area!.color }}
              >
                {areaNames[area!.id] ?? area!.id}
              </Badge>
            ))}
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
                  {stepsCompleted} of 4 steps completed
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="h-1 w-full rounded-full bg-[#064E3B]/[0.06]" />
                <p className="text-[11px] text-[#1A1A2E]/35">&nbsp;</p>
              </div>
            )}
          </div>

          {/* Bottom accent line on hover */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#064E3B] transition-all duration-500 group-hover:w-full" />
        </div>
      </Link>
    </motion.div>
  );
}

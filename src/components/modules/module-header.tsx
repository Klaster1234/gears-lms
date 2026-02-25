'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, BookOpen, Puzzle, PenLine, LinkIcon, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { greenCompAreas } from '@/data/greencomp';
import type { Module } from '@/types';

// English fallback titles
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

const areaNames: Record<string, string> = {
  'embodying-values': 'Embodying Values',
  'embracing-complexity': 'Embracing Complexity',
  'envisioning-futures': 'Envisioning Futures',
  'acting-for-sustainability': 'Acting for Sustainability',
};

const steps = [
  { key: 'learn' as const, label: 'Learn', icon: BookOpen },
  { key: 'practice' as const, label: 'Practice', icon: Puzzle },
  { key: 'reflect' as const, label: 'Reflect', icon: PenLine },
  { key: 'resources' as const, label: 'Resources', icon: LinkIcon },
];

interface ModuleHeaderProps {
  module: Module;
}

export function ModuleHeader({ module }: ModuleHeaderProps) {
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
            Module {String(module.number).padStart(2, '0')}
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
          {moduleTitles[module.number] ?? module.titleKey}
        </motion.h1>

        {/* GreenComp area badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5 flex flex-wrap items-center gap-2"
        >
          {areaData.map((area) => (
            <Badge
              key={area!.id}
              className="rounded-full border-0 px-3 py-1 text-[11px] font-normal text-white"
              style={{ backgroundColor: area!.color }}
            >
              {areaNames[area!.id] ?? area!.id}
            </Badge>
          ))}
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
                Step {Math.min(completedSteps + 1, 4)} of 4
              </span>
              <span className="mx-1 text-[#E5E2DB]">/</span>
              <span>{completedSteps} completed</span>
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
                  <span className="hidden sm:inline">{step.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

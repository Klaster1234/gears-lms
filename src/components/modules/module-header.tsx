'use client';

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
    <div className="border-b border-border/60 bg-card pb-6">
      <div className="container mx-auto px-4">
        {/* Module number + title */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2E7D32] text-white font-display font-bold text-xl shrink-0">
            {String(module.number).padStart(2, '0')}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl font-bold tracking-tight text-[#1A1A2E] sm:text-3xl">
              {moduleTitles[module.number] ?? module.titleKey}
            </h1>

            {/* GreenComp area badges + time */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {areaData.map((area) => (
                <Badge
                  key={area!.id}
                  className="text-xs px-2.5 py-0.5 font-normal text-white"
                  style={{ backgroundColor: area!.color }}
                >
                  {areaNames[area!.id] ?? area!.id}
                </Badge>
              ))}
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="size-3.5" />
                ~{module.estimatedMinutes} min
              </span>
            </div>
          </div>
        </div>

        {/* Step progress indicator */}
        <div className="mt-6">
          {hydrated ? (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <span className="font-medium text-[#1A1A2E]">
                Step {Math.min(completedSteps + 1, 4)} of 4
              </span>
              <span className="mx-1">&middot;</span>
              <span>{completedSteps} completed</span>
            </div>
          ) : (
            <div className="h-5 mb-3" />
          )}

          <div className="flex gap-2 sm:gap-3">
            {steps.map((step) => {
              const Icon = step.icon;
              const done = hydrated && stepStatus[step.key];
              return (
                <div
                  key={step.key}
                  className={`flex flex-1 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    done
                      ? 'border-[#2E7D32]/30 bg-[#E8F5E9] text-[#2E7D32]'
                      : 'border-border/60 bg-muted/40 text-muted-foreground'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="size-4 text-[#2E7D32] shrink-0" />
                  ) : (
                    <Icon className="size-4 shrink-0" />
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

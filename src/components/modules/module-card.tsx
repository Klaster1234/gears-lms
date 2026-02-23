'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="h-full"
    >
      <Link href={`/modules/${module.id}`} className="block h-full">
        <Card className="h-full cursor-pointer transition-shadow duration-300 hover:shadow-lg border-border/60 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              {/* Module number badge */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2E7D32] text-white font-display font-bold text-lg shrink-0">
                {String(module.number).padStart(2, '0')}
              </div>

              {/* Status indicator */}
              {hydrated && (
                <div className="shrink-0">
                  {isCompleted ? (
                    <div className="flex items-center gap-1 text-[#2E7D32]">
                      <CheckCircle2 className="size-5" />
                    </div>
                  ) : isInProgress ? (
                    <Badge className="bg-[#F59E0B] text-white text-[10px] px-2 py-0.5">
                      In Progress
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground text-[10px] px-2 py-0.5">
                      Not Started
                    </Badge>
                  )}
                </div>
              )}
            </div>

            <CardTitle className="text-base font-semibold leading-tight mt-2">
              {moduleTitles[module.number] ?? module.titleKey}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 pt-0">
            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {moduleDescriptions[module.number] ?? ''}
            </p>

            {/* GreenComp area badges */}
            <div className="flex flex-wrap gap-1.5">
              {areaData.map((area) => (
                <Badge
                  key={area!.id}
                  className="text-[10px] px-2 py-0.5 font-normal text-white"
                  style={{ backgroundColor: area!.color }}
                >
                  {areaNames[area!.id] ?? area!.id}
                </Badge>
              ))}
            </div>

            {/* Estimated time */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-3.5" />
              <span>~{module.estimatedMinutes} min</span>
            </div>

            {/* Progress bar */}
            {hydrated ? (
              <div className="space-y-1.5">
                <Progress value={completionPercent} className="h-1.5" />
                <p className="text-xs text-muted-foreground">
                  {stepsCompleted} of 4 steps completed
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-primary/20" />
                <p className="text-xs text-muted-foreground">&nbsp;</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

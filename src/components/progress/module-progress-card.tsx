'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, BookOpen, Wrench, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from '@/i18n/routing';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { modules } from '@/data/modules';

// English fallback titles
const moduleTitles: Record<number, string> = {
  1: 'Introduction to 5R Principles',
  2: 'Waste Segregation & Zero Waste',
  3: 'Composting & Organic Waste',
  4: 'Sustainable Shopping',
  5: 'Circular Economy',
  6: 'Fast vs. Slow Fashion',
  7: 'Green Consumption & Eco-labels',
  8: 'Energy Efficiency & Footprint',
  9: 'Community Action',
  10: 'Eco-Anxiety & Wellbeing',
};

interface StepIndicatorProps {
  label: string;
  completed: boolean;
  icon: React.ReactNode;
}

function StepIndicator({ label, completed, icon }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={completed ? 'text-[#2E7D32]' : 'text-muted-foreground/40'}>
        {completed ? <CheckCircle2 className="size-4" /> : icon}
      </div>
      <span
        className={`text-xs ${
          completed ? 'text-[#2E7D32] font-medium' : 'text-muted-foreground/60'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function ModuleProgressCards() {
  const hydrated = useStoreHydration();
  const moduleProgress = useLearningStore((s) => s.moduleProgress);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {modules.map((mod, index) => {
        const progress = hydrated ? moduleProgress[mod.id] : undefined;

        const stepsCompleted = progress
          ? [
              progress.learnCompleted,
              progress.practiceCompleted,
              progress.reflectCompleted,
            ].filter(Boolean).length
          : 0;

        // Calculate progress percentage: learn=33%, practice=66%, reflect=100%
        const completionPercent = Math.round((stepsCompleted / 3) * 100);
        const isCompleted =
          progress?.learnCompleted &&
          progress?.practiceCompleted &&
          progress?.reflectCompleted &&
          progress?.quizPassed;

        return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/modules/${mod.id}`} className="block h-full">
              <Card className="h-full cursor-pointer transition-shadow duration-300 hover:shadow-lg border-border/60">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    {/* Module number badge */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold text-sm ${
                        isCompleted
                          ? 'bg-[#2E7D32] text-white'
                          : stepsCompleted > 0
                            ? 'bg-[#F59E0B] text-white'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {String(mod.number).padStart(2, '0')}
                    </div>
                    <CardTitle className="text-sm font-semibold leading-tight pt-1">
                      {moduleTitles[mod.number] ?? mod.titleKey}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 pt-0">
                  {/* Step indicators */}
                  {hydrated && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                      <StepIndicator
                        label="Learn"
                        completed={progress?.learnCompleted ?? false}
                        icon={<BookOpen className="size-4" />}
                      />
                      <StepIndicator
                        label="Practice"
                        completed={progress?.practiceCompleted ?? false}
                        icon={<Wrench className="size-4" />}
                      />
                      <StepIndicator
                        label="Reflect"
                        completed={progress?.reflectCompleted ?? false}
                        icon={<MessageSquare className="size-4" />}
                      />
                    </div>
                  )}

                  {/* Quiz score */}
                  {hydrated && progress?.quizScore != null && (
                    <div className="flex items-center gap-1.5">
                      {progress.quizPassed ? (
                        <CheckCircle2 className="size-4 text-[#2E7D32]" />
                      ) : (
                        <XCircle className="size-4 text-red-500" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          progress.quizPassed ? 'text-[#2E7D32]' : 'text-red-500'
                        }`}
                      >
                        {progress.quizScore}% ({progress.quizPassed ? 'Pass' : 'Fail'})
                      </span>
                    </div>
                  )}

                  {/* Progress bar */}
                  {hydrated ? (
                    <Progress value={completionPercent} className="h-1.5" />
                  ) : (
                    <div className="h-1.5 w-full rounded-full bg-primary/20" />
                  )}
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

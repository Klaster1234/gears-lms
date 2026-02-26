'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, BookOpen, Wrench, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from '@/i18n/routing';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { modules } from '@/data/modules';

interface StepIndicatorProps {
  label: string;
  completed: boolean;
  icon: React.ReactNode;
}

function StepIndicator({ label, completed, icon }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={completed ? 'text-[#064E3B]' : 'text-muted-foreground/40'}>
        {completed ? <CheckCircle2 className="size-4" /> : icon}
      </div>
      <span
        className={`text-xs ${
          completed ? 'text-[#064E3B] font-medium' : 'text-muted-foreground/60'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function ModuleProgressCards() {
  const t = useTranslations('modules');
  const tt = useTranslations('modules.tabs');
  const hydrated = useStoreHydration();
  const moduleProgress = useLearningStore((s) => s.moduleProgress);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/modules/${mod.id}`} className="block h-full">
              <Card className="h-full cursor-pointer border border-[#E5E2DB] bg-white rounded-2xl transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(6,78,59,0.08)]">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    {/* Module number badge */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold text-sm ${
                        isCompleted
                          ? 'bg-[#064E3B] text-white'
                          : stepsCompleted > 0
                            ? 'bg-[#D97706] text-white'
                            : 'bg-[#FAF8F0] text-[#1A1A2E]/40 border border-[#E5E2DB]'
                      }`}
                    >
                      {String(mod.number).padStart(2, '0')}
                    </div>
                    <CardTitle className="text-sm font-semibold leading-tight pt-1 text-[#1A1A2E]">
                      {t(`${mod.number}.title`)}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 pt-0">
                  {/* Step indicators */}
                  {hydrated && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                      <StepIndicator
                        label={tt('learn')}
                        completed={progress?.learnCompleted ?? false}
                        icon={<BookOpen className="size-4" />}
                      />
                      <StepIndicator
                        label={tt('practice')}
                        completed={progress?.practiceCompleted ?? false}
                        icon={<Wrench className="size-4" />}
                      />
                      <StepIndicator
                        label={tt('reflect')}
                        completed={progress?.reflectCompleted ?? false}
                        icon={<MessageSquare className="size-4" />}
                      />
                    </div>
                  )}

                  {/* Quiz score */}
                  {hydrated && progress?.quizScore != null && (
                    <div className="flex items-center gap-1.5">
                      {progress.quizPassed ? (
                        <CheckCircle2 className="size-4 text-[#064E3B]" />
                      ) : (
                        <XCircle className="size-4 text-red-500" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          progress.quizPassed ? 'text-[#064E3B]' : 'text-red-500'
                        }`}
                      >
                        {progress.quizScore}%
                      </span>
                    </div>
                  )}

                  {/* Progress bar */}
                  {hydrated ? (
                    <Progress value={completionPercent} className="h-1.5" />
                  ) : (
                    <div className="h-1.5 w-full rounded-full bg-[#E5E2DB]" />
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

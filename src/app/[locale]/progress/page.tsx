'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Link } from '@/i18n/routing';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { OverallProgress } from '@/components/progress/overall-progress';
import { ModuleProgressCards } from '@/components/progress/module-progress-card';
import { GreenCompBadges } from '@/components/progress/greencomp-badges';

const TOTAL_MODULES = 10;

export default function ProgressPage() {
  const hydrated = useStoreHydration();
  const certificateEarned = useLearningStore((s) => s.certificateEarned);
  const completedModules = useLearningStore((s) => s.completedModules);
  const resetProgress = useLearningStore((s) => s.resetProgress);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const completedCount = hydrated ? completedModules.length : 0;
  const remaining = TOTAL_MODULES - completedCount;

  const handleReset = () => {
    resetProgress();
    setResetDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold font-display text-[#1A1A2E] sm:text-4xl">
            Your Learning Progress
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your journey through the G.E.A.R.S. programme
          </p>
        </motion.div>

        {/* Overall progress ring */}
        <section className="mb-12">
          <OverallProgress />
        </section>

        <Separator className="mb-12" />

        {/* Module Progress section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-2xl font-bold font-display text-[#1A1A2E] mb-6"
          >
            Module Progress
          </motion.h2>
          <ModuleProgressCards />
        </section>

        <Separator className="mb-12" />

        {/* GreenComp Competences section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-2xl font-bold font-display text-[#1A1A2E] mb-6"
          >
            GreenComp Competences
          </motion.h2>
          <GreenCompBadges />
        </section>

        <Separator className="mb-12" />

        {/* Certificate CTA */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-xl border bg-card p-8 text-center"
          >
            <Award className="mx-auto size-12 text-[#F59E0B] mb-4" />
            {hydrated && certificateEarned ? (
              <>
                <h3 className="text-xl font-bold font-display text-[#2E7D32] mb-2">
                  Congratulations!
                </h3>
                <p className="text-muted-foreground mb-6">
                  You have completed all 10 modules. Generate your certificate now!
                </p>
                <Button asChild size="lg" className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                  <Link href="/certificate">
                    Generate Your Certificate
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold font-display text-[#1A1A2E] mb-2">
                  Certificate of Completion
                </h3>
                <p className="text-muted-foreground mb-4">
                  Complete {remaining} more module{remaining !== 1 ? 's' : ''} to earn your
                  certificate
                </p>
                <div className="mx-auto max-w-xs">
                  <Progress value={hydrated ? (completedCount / TOTAL_MODULES) * 100 : 0} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {completedCount} / {TOTAL_MODULES} modules
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </section>

        {/* Reset Progress button */}
        <div className="text-center">
          <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-muted-foreground">
                <RotateCcw className="size-4 mr-1" />
                Reset Progress
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset All Progress?</DialogTitle>
                <DialogDescription>
                  This will permanently erase all your learning progress, quiz results,
                  reflections, and certificate data. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setResetDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReset}
                >
                  Yes, Reset Everything
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

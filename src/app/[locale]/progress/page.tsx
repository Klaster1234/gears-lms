'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProgressPage() {
  const hydrated = useStoreHydration();
  const certificateEarned = useLearningStore((s) => s.certificateEarned);
  const completedModules = useLearningStore((s) => s.completedModules);
  const resetProgress = useLearningStore((s) => s.resetProgress);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const completedCount = hydrated ? completedModules.length : 0;
  const remaining = TOTAL_MODULES - completedCount;

  const modulesRef = useRef(null);
  const greencompRef = useRef(null);
  const certRef = useRef(null);
  const modulesInView = useInView(modulesRef, { once: true, margin: '-60px' });
  const greencompInView = useInView(greencompRef, { once: true, margin: '-60px' });
  const certInView = useInView(certRef, { once: true, margin: '-60px' });

  const handleReset = () => {
    resetProgress();
    setResetDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F0] pt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ---- Page Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="pt-16 pb-16 md:pt-20 md:pb-20"
        >
          {/* Animated accent line + label */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="h-[2px] bg-[#064E3B]"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#064E3B]">
              Dashboard
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-[#1A1A2E] sm:text-5xl lg:text-6xl leading-[1.1]">
            Your Learning<br />Progress
          </h1>
          <p className="mt-4 text-lg text-[#1A1A2E]/50 max-w-xl">
            Track your journey through the G.E.A.R.S. programme
          </p>
        </motion.div>

        {/* ---- Overall progress ring ---- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mb-20 rounded-2xl border border-[#E5E2DB] bg-white p-10 md:p-14"
        >
          <OverallProgress />
        </motion.section>

        {/* ---- Module Progress section ---- */}
        <section ref={modulesRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={modulesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={modulesInView ? { width: 48 } : {}}
                transition={{ duration: 0.8, ease }}
                className="h-[2px] bg-[#047857]"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#047857]">
                Modules
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-[#1A1A2E] sm:text-4xl">
              Module Progress
            </h2>
          </motion.div>
          <ModuleProgressCards />
        </section>

        <Separator className="mb-20 bg-[#E5E2DB]" />

        {/* ---- GreenComp Competences section ---- */}
        <section ref={greencompRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={greencompInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={greencompInView ? { width: 48 } : {}}
                transition={{ duration: 0.8, ease }}
                className="h-[2px] bg-[#0D9488]"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D9488]">
                Competences
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-[#1A1A2E] sm:text-4xl">
              GreenComp Competences
            </h2>
          </motion.div>
          <GreenCompBadges />
        </section>

        <Separator className="mb-20 bg-[#E5E2DB]" />

        {/* ---- Certificate CTA ---- */}
        <section ref={certRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={certInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white p-10 md:p-14"
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#ECFDF5] to-transparent rounded-bl-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF5] border border-[#064E3B]/10">
                <Award className="size-8 text-[#D97706]" />
              </div>

              {hydrated && certificateEarned ? (
                <>
                  <h3 className="font-display text-2xl font-bold text-[#064E3B] mb-3">
                    Congratulations!
                  </h3>
                  <p className="text-[#1A1A2E]/50 mb-8 max-w-md">
                    You have completed all 10 modules. Generate your certificate now!
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#064E3B] hover:bg-[#047857] text-white px-8 transition-colors duration-300"
                  >
                    <Link href="/certificate">
                      Generate Your Certificate
                      <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold text-[#1A1A2E] mb-3">
                    Certificate of Completion
                  </h3>
                  <p className="text-[#1A1A2E]/50 mb-6 max-w-md">
                    Complete {remaining} more module{remaining !== 1 ? 's' : ''} to earn your
                    certificate
                  </p>
                  <div className="mx-auto max-w-xs w-full">
                    <Progress value={hydrated ? (completedCount / TOTAL_MODULES) * 100 : 0} className="h-2 mb-3" />
                    <p className="text-xs text-[#1A1A2E]/40 font-medium">
                      {completedCount} / {TOTAL_MODULES} modules
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </section>

        {/* ---- Reset Progress button ---- */}
        <div className="pb-20 flex justify-start">
          <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-[#1A1A2E]/40 border-[#E5E2DB] hover:text-[#1A1A2E]/60 hover:bg-[#FAF8F0]"
              >
                <RotateCcw className="size-4 mr-1" />
                Reset Progress
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Reset All Progress?</DialogTitle>
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

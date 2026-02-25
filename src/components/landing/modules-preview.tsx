'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/i18n/routing';
import { modules } from '@/data/modules';
import { ArrowRight } from 'lucide-react';

const areaColors: Record<string, string> = {
  'embodying-values': '#064E3B',
  'embracing-complexity': '#0D9488',
  'envisioning-futures': '#D97706',
  'acting-for-sustainability': '#047857',
};

const moduleTitles: Record<number, string> = {
  1: 'Introduction to the 5R Principle',
  2: 'Waste Sorting & Zero Waste',
  3: 'Composting at Home',
  4: 'Sustainable Shopping',
  5: 'Circular Economy',
  6: 'Fast vs. Slow Fashion',
  7: 'Green Consumption & Labels',
  8: 'Energy Efficiency at Home',
  9: 'Community Action',
  10: 'Eco-Anxiety & Wellbeing',
};

export function ModulesPreviewSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#064E3B] py-32 lg:py-40">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/20 to-transparent" />
        {/* Subtle rotating ring */}
        <div className="absolute -right-[200px] top-1/2 -translate-y-1/2">
          <div className="animate-spin-slow h-[600px] w-[600px] rounded-full border border-[#34D399]/5" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 h-[2px] bg-[#34D399]"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#6EE7B7]"
            >
              Curriculum
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl text-white sm:text-5xl"
            >
              10 Modules to Transform Your Habits
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/modules"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#6EE7B7] transition-colors hover:text-white"
            >
              View all modules
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Module cards - horizontal scroll */}
        <div className="relative -mx-6 lg:-mx-8">
          <div className="scroll-hidden flex gap-4 overflow-x-auto px-6 pb-4 lg:px-8">
            {modules.map((module, index) => {
              const primaryColor = areaColors[module.greenCompAreas[0]] || '#064E3B';
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex-shrink-0"
                >
                  <Link
                    href={`/modules/${module.id}`}
                    className="group flex h-full w-[280px] flex-col rounded-xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/10 sm:w-[300px]"
                  >
                    {/* Number + icon row */}
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-display text-4xl text-white/10">
                        {String(module.number).padStart(2, '0')}
                      </span>
                      <span className="text-2xl">{module.icon}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-base font-medium leading-snug text-white/90 transition-colors duration-300 group-hover:text-white">
                      {moduleTitles[module.number] || `Module ${module.number}`}
                    </h3>

                    {/* Meta row */}
                    <div className="mt-auto flex items-center gap-3 pt-6">
                      <span className="text-sm text-white/40">
                        ~{module.estimatedMinutes} min
                      </span>
                      <div
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: primaryColor === '#064E3B' ? '#34D399' : primaryColor === '#047857' ? '#6EE7B7' : primaryColor }}
                      >
                        {module.greenCompAreas[0]
                          .split('-')
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(' ')}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#34D399] opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Start module
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute top-0 right-0 hidden h-full w-24 bg-gradient-to-l from-[#064E3B] to-transparent md:block" />
          <div className="pointer-events-none absolute top-0 left-0 hidden h-full w-8 bg-gradient-to-r from-[#064E3B] to-transparent md:block" />
        </div>
      </div>
    </section>
  );
}

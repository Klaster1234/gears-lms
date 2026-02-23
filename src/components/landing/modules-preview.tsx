'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { modules } from '@/data/modules';
import { Clock, ChevronRight } from 'lucide-react';

// GreenComp area color map
const areaColors: Record<string, { bg: string; text: string; label: string }> = {
  'embodying-values': { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]', label: 'Values' },
  'embracing-complexity': { bg: 'bg-[#E0F7FA]', text: 'text-[#33AEB4]', label: 'Complexity' },
  'envisioning-futures': { bg: 'bg-[#FFF8E1]', text: 'text-[#F59E0B]', label: 'Futures' },
  'acting-for-sustainability': { bg: 'bg-[#E8F5E9]', text: 'text-[#1B5E20]', label: 'Action' },
};

// Hardcoded English titles as fallback (since i18n keys aren't in messages yet)
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
  return (
    <section className="bg-[#FAFAF5] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-[#1A1A2E] sm:text-4xl">
            10 Modules to Transform Your Habits
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A1A2E]/60">
            From waste reduction to community action, each module builds your sustainability competences step by step.
          </p>
        </motion.div>

        {/* Scrollable container */}
        <div className="relative">
          <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-6 scrollbar-thin md:-mx-0 md:px-0">
            {modules.map((module, index) => {
              const primaryArea = module.greenCompAreas[0];
              const areaStyle = areaColors[primaryArea] || areaColors['embodying-values'];

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="flex-shrink-0"
                >
                  <Link
                    href={`/modules/${module.id}`}
                    className="group flex h-full w-64 flex-col rounded-2xl border border-[#D1D5DB]/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#2E7D32]/8 sm:w-72"
                  >
                    {/* Module number */}
                    <div className="mb-4 flex items-start justify-between">
                      <span className="font-display text-4xl font-bold text-[#2E7D32]/15">
                        {String(module.number).padStart(2, '0')}
                      </span>
                      <span className="text-2xl">{module.icon}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-display text-base font-semibold leading-snug text-[#1A1A2E] group-hover:text-[#2E7D32]">
                      {moduleTitles[module.number] || `Module ${module.number}`}
                    </h3>

                    {/* Meta */}
                    <div className="mt-auto flex items-center gap-3 pt-4">
                      <div className="flex items-center gap-1 text-sm text-[#1A1A2E]/50">
                        <Clock className="h-3.5 w-3.5" />
                        {module.estimatedMinutes} min
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${areaStyle.bg} ${areaStyle.text}`}
                      >
                        {areaStyle.label}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium text-[#2E7D32] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Start module
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Fade edges on desktop to hint scrolling */}
          <div className="pointer-events-none absolute top-0 right-0 hidden h-full w-16 bg-gradient-to-l from-[#FAFAF5] to-transparent md:block" />
        </div>
      </div>
    </section>
  );
}

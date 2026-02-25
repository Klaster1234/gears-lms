'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ModuleGrid } from '@/components/modules/module-grid';

export default function ModulesPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="min-h-screen bg-[#FAF8F0] pt-16">
      {/* Decorative background element */}
      <svg
        className="pointer-events-none absolute -top-20 right-0 h-[500px] w-[500px] text-[#064E3B] opacity-[0.02]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M100 10 C50 10, 10 60, 10 110 C10 160, 50 190, 100 190 C100 190, 100 110, 100 10 Z" />
      </svg>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Premium section header - left-aligned */}
        <div ref={headerRef} className="mb-16 max-w-2xl pt-16 lg:pt-24">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 h-[2px] bg-[#064E3B]"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#0D9488]"
          >
            Curriculum
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl text-[#1A1A2E] sm:text-5xl lg:text-6xl"
          >
            Learning Modules
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 text-[16px] leading-relaxed text-[#1A1A2E]/55"
          >
            Ten carefully crafted modules covering sustainability, zero waste,
            circular economy, and green competences. Progress at your own rhythm
            through learn, practice, reflect, and quiz stages.
          </motion.p>
        </div>

        {/* Module grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pb-24"
        >
          <ModuleGrid />
        </motion.div>
      </div>
    </section>
  );
}

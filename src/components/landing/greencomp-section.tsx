'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { greenCompAreas } from '@/data/greencomp';

const areaTitles: Record<string, string> = {
  'embodying-values': 'Embodying Sustainability Values',
  'embracing-complexity': 'Embracing Complexity',
  'envisioning-futures': 'Envisioning Sustainable Futures',
  'acting-for-sustainability': 'Acting for Sustainability',
};

const competenceTitles: Record<string, string> = {
  'valuing-sustainability': 'Valuing Sustainability',
  'supporting-fairness': 'Supporting Fairness',
  'promoting-nature': 'Promoting Nature',
  'systems-thinking': 'Systems Thinking',
  'critical-thinking': 'Critical Thinking',
  'problem-framing': 'Problem Framing',
  'futures-literacy': 'Futures Literacy',
  'adaptability': 'Adaptability',
  'exploratory-thinking': 'Exploratory Thinking',
  'political-agency': 'Political Agency',
  'collective-action': 'Collective Action',
  'individual-initiative': 'Individual Initiative',
};

export function GreenCompSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAF8F0] py-32 lg:py-40">
      {/* Decorative circle */}
      <div className="pointer-events-none absolute -left-[300px] top-1/2 -translate-y-1/2">
        <div className="animate-spin-slow h-[700px] w-[700px] rounded-full border border-[#064E3B]/[0.04]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
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
            EU Framework
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl text-[#1A1A2E] sm:text-5xl"
          >
            Built on GreenComp
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 text-lg leading-relaxed text-[#1A1A2E]/55"
          >
            Our curriculum aligns with GreenComp, the European sustainability
            competence framework — 4 areas, 12 competences.
          </motion.p>
        </div>

        {/* Cards - 2x2 grid with asymmetric sizing */}
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {greenCompAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white p-8 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(6,78,59,0.08)] lg:p-10 ${
                index === 0 || index === 3 ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                style={{ backgroundColor: area.color }}
              />

              {/* Icon + Title row */}
              <div className="mb-6 flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${area.color}12` }}
                >
                  {area.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: area.color }}
                  >
                    {areaTitles[area.id] || area.id}
                  </h3>
                </div>
              </div>

              {/* Competences */}
              <div className="flex flex-wrap gap-2">
                {area.competences.map((comp) => (
                  <span
                    key={comp.id}
                    className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 group-hover:shadow-sm"
                    style={{
                      backgroundColor: `${area.color}08`,
                      color: area.color,
                    }}
                  >
                    {competenceTitles[comp.id] || comp.id}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { greenCompAreas } from '@/data/greencomp';

const areaIllustrations: Record<string, string> = {
  'embodying-values': '/art/gc-values.png',
  'embracing-complexity': '/art/gc-complexity.png',
  'envisioning-futures': '/art/gc-futures.png',
  'acting-for-sustainability': '/art/gc-acting.png',
};

const areaToKey: Record<string, string> = {
  'embodying-values': 'embodyingValues',
  'embracing-complexity': 'embracingComplexity',
  'envisioning-futures': 'envisioningFutures',
  'acting-for-sustainability': 'actingForSustainability',
};

const compToKey: Record<string, string> = {
  'valuing-sustainability': 'valuingSustainability',
  'supporting-fairness': 'supportingFairness',
  'promoting-nature': 'promotingNature',
  'systems-thinking': 'systemsThinking',
  'critical-thinking': 'criticalThinking',
  'problem-framing': 'problemFraming',
  'futures-literacy': 'futuresLiteracy',
  'adaptability': 'adaptability',
  'exploratory-thinking': 'exploratoryThinking',
  'political-agency': 'politicalAgency',
  'collective-action': 'collectiveAction',
  'individual-initiative': 'individualInitiative',
};

export function GreenCompSection() {
  const t = useTranslations('landing.greencomp');
  const tg = useTranslations('greencomp');
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
            {t('sectionLabel')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl text-[#1A1A2E] sm:text-5xl"
          >
            {t('sectionTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 text-lg leading-relaxed text-[#1A1A2E]/55"
          >
            {t('sectionDescription')}
          </motion.p>
        </div>

        {/* Cards - 2x2 grid with asymmetric sizing */}
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {greenCompAreas.map((area, index) => {
            const areaKey = areaToKey[area.id];
            return (
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
                {/* Background illustration */}
                <div className="pointer-events-none absolute -right-8 -bottom-8 h-[180px] w-[180px] opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.10]">
                  <Image
                    src={areaIllustrations[area.id] || ''}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="180px"
                  />
                </div>

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
                      {areaKey ? tg(`areas.${areaKey}.title`) : area.id}
                    </h3>
                  </div>
                </div>

                {/* Competences */}
                <div className="flex flex-wrap gap-2">
                  {area.competences.map((comp) => {
                    const compKey = compToKey[comp.id];
                    return (
                      <span
                        key={comp.id}
                        className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 group-hover:shadow-sm"
                        style={{
                          backgroundColor: `${area.color}08`,
                          color: area.color,
                        }}
                      >
                        {compKey ? tg(`competences.${compKey}`) : comp.id}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

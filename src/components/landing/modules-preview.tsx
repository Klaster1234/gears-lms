'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { modules } from '@/data/modules';
import { ArrowRight } from 'lucide-react';

const moduleIllustrations: Record<number, string> = {
  1: '/art/mod-sustainability.png',
  2: '/art/mod-zerowaste.png',
  3: '/art/mod-composting.png',
  4: '/art/mod-shopping.png',
  5: '/art/mod-circular.png',
  6: '/art/mod-fashion.png',
  7: '/art/mod-greenwashing.png',
  8: '/art/mod-energy.png',
  9: '/art/mod-community.png',
  10: '/art/mod-ecoanxiety.png',
};

const areaColors: Record<string, string> = {
  'embodying-values': '#064E3B',
  'embracing-complexity': '#0D9488',
  'envisioning-futures': '#D97706',
  'acting-for-sustainability': '#047857',
};

const areaToKey: Record<string, string> = {
  'embodying-values': 'embodyingValues',
  'embracing-complexity': 'embracingComplexity',
  'envisioning-futures': 'envisioningFutures',
  'acting-for-sustainability': 'actingForSustainability',
};

export function ModulesPreviewSection() {
  const t = useTranslations('landing.modulesPreview');
  const tm = useTranslations('modules');
  const tg = useTranslations('greencomp.areas');
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
              {t('sectionLabel')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl text-white sm:text-5xl"
            >
              {t('sectionTitle')}
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
              {t('viewAll')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Module cards - full grid, all 10 visible */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {modules.map((module, index) => {
            const primaryColor = areaColors[module.greenCompAreas[0]] || '#064E3B';
            const areaKey = areaToKey[module.greenCompAreas[0]];
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={`/modules/${module.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/8 bg-white/5 p-5 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/10"
                >
                  {/* Background illustration */}
                  {moduleIllustrations[module.number] && (
                    <div className="pointer-events-none absolute -right-4 -top-4 h-[120px] w-[120px] opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.15]">
                      <Image
                        src={moduleIllustrations[module.number]}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>
                  )}

                  {/* Number + icon row */}
                  <div className="relative mb-4 flex items-center justify-between">
                    <span className="font-display text-3xl text-white/10">
                      {String(module.number).padStart(2, '0')}
                    </span>
                    <span className="text-xl">{module.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-sm font-medium leading-snug text-white/90 transition-colors duration-300 group-hover:text-white">
                    {tm(`${module.number}.title`)}
                  </h3>

                  {/* Meta row */}
                  <div className="mt-auto flex items-center gap-2 pt-4">
                    <span className="text-xs text-white/40">
                      ~{module.estimatedMinutes} min
                    </span>
                    <div
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <span
                      className="truncate text-xs font-medium"
                      style={{ color: primaryColor === '#064E3B' ? '#34D399' : primaryColor === '#047857' ? '#6EE7B7' : primaryColor }}
                    >
                      {areaKey ? tg(`${areaKey}.title`) : module.greenCompAreas[0]}
                    </span>
                  </div>

                  {/* Hover arrow */}
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#34D399] opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {t('startModule')}
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

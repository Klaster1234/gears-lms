'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { LOGOS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

const pyramidLevels = [
  { label: 'Refuse', width: 'w-36', color: 'from-[#0D3B12] to-[#1B5E20]' },
  { label: 'Reduce', width: 'w-44', color: 'from-[#1B5E20] to-[#256427]' },
  { label: 'Reuse', width: 'w-52', color: 'from-[#256427] to-[#2E7D32]' },
  { label: 'Repurpose', width: 'w-60', color: 'from-[#2E7D32] to-[#4CAF50]' },
  { label: 'Recycle', width: 'w-68', color: 'from-[#4CAF50] to-[#66BB6A]' },
];

export function HeroSection() {
  const t = useTranslations('landing');

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-[#E8F5E9] opacity-40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-[#C8E6C9] opacity-30 blur-3xl" />
        {/* Leaf-like decorative SVG shapes */}
        <svg
          className="absolute top-20 left-8 h-16 w-16 text-[#A5D6A7] opacity-20"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 5 C25 5, 5 30, 5 55 C5 80, 25 95, 50 95 C50 95, 50 55, 50 5 Z" />
        </svg>
        <svg
          className="absolute right-12 bottom-32 h-20 w-20 rotate-45 text-[#81C784] opacity-15"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 5 C25 5, 5 30, 5 55 C5 80, 25 95, 50 95 C50 95, 50 55, 50 5 Z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <Image
                src={LOGOS.greenExplorers}
                alt="Green Explorers"
                width={120}
                height={120}
                className="h-24 w-auto drop-shadow-md md:h-28"
                priority
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl font-bold tracking-tight text-[#1A1A2E] sm:text-5xl md:text-6xl"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-3 font-display text-xl font-medium text-[#2E7D32] sm:text-2xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#1A1A2E]/70 lg:mx-0"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8"
            >
              <Link
                href="/modules"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#2E7D32]/25 transition-all duration-300 hover:bg-[#1B5E20] hover:shadow-xl hover:shadow-[#2E7D32]/30"
              >
                {t('hero.cta')}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Inverted Pyramid visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="flex flex-col items-center gap-2">
              <p className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-[#2E7D32]/60">
                The 5R Hierarchy
              </p>
              {pyramidLevels.map((level, index) => (
                <motion.div
                  key={level.label}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.12,
                    ease: 'easeOut',
                  }}
                  className={`${level.width} flex h-11 items-center justify-center rounded-lg bg-gradient-to-r ${level.color} text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  {level.label}
                </motion.div>
              ))}
              <div className="mt-2 flex items-center gap-2 text-xs text-[#1A1A2E]/50">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                Most preferred to least preferred
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

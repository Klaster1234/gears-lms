'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Puzzle, Award } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  accent: string;
}

const features: Feature[] = [
  {
    icon: BookOpen,
    number: '10',
    title: 'Interactive Modules',
    description:
      'A comprehensive sustainability curriculum — from waste reduction and circular economy to energy efficiency and community action.',
    accent: '#064E3B',
  },
  {
    icon: Puzzle,
    number: '50+',
    title: 'Quizzes & Activities',
    description:
      'Engage with multiple-choice quizzes, drag-and-drop sorting, real-world scenarios, and interactive games built for adults.',
    accent: '#0D9488',
  },
  {
    icon: Award,
    number: '1',
    title: 'Certificate of Completion',
    description:
      'Complete all modules to earn your Green Explorers certificate, recognised under the Erasmus+ programme.',
    accent: '#D97706',
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAF8F0] py-32 lg:py-40">
      {/* Decorative leaf SVG top-right */}
      <svg
        className="pointer-events-none absolute -top-20 -right-20 h-[400px] w-[400px] text-[#064E3B] opacity-[0.03]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M100 10 C50 10, 10 60, 10 110 C10 160, 50 190, 100 190 C100 190, 100 110, 100 10 Z" />
      </svg>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header - asymmetric layout */}
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
            What you&apos;ll learn
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl text-[#1A1A2E] sm:text-5xl lg:text-6xl"
          >
            Everything you need to go green
          </motion.h2>
        </div>

        {/* Feature cards - asymmetric grid */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative ${index === 1 ? 'md:translate-y-8' : ''}`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white p-8 transition-all duration-500 hover:border-[#064E3B]/20 hover:shadow-[0_20px_60px_-15px_rgba(6,78,59,0.08)] lg:p-10">
                {/* Large number watermark */}
                <span
                  className="pointer-events-none absolute -top-4 -right-2 font-display text-[8rem] leading-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.07]"
                  style={{ color: feature.accent }}
                >
                  {feature.number}
                </span>

                {/* Icon */}
                <div
                  className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.accent}10` }}
                >
                  <feature.icon
                    className="h-6 w-6"
                    style={{ color: feature.accent }}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl font-semibold text-[#1A1A2E]">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] leading-relaxed text-[#1A1A2E]/55">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: feature.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

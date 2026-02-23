'use client';

import { motion } from 'framer-motion';
import { BookOpen, Puzzle, Award } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const features: Feature[] = [
  {
    icon: BookOpen,
    title: '10 Interactive Modules',
    description:
      'A comprehensive sustainability curriculum covering waste reduction, circular economy, energy efficiency, community action, and more.',
    color: 'text-[#2E7D32]',
    bgColor: 'bg-[#E8F5E9]',
  },
  {
    icon: Puzzle,
    title: 'Quizzes & Activities',
    description:
      'Engage with multiple-choice quizzes, drag-and-drop sorting, A/B comparisons, real-world scenarios, and interactive games.',
    color: 'text-[#33AEB4]',
    bgColor: 'bg-[#E0F7FA]',
  },
  {
    icon: Award,
    title: 'Certificate of Completion',
    description:
      'Complete all modules and quizzes to earn your Green Explorers certificate, recognized under the Erasmus+ programme.',
    color: 'text-[#F59E0B]',
    bgColor: 'bg-[#FFF8E1]',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function FeaturesSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-[#1A1A2E] sm:text-4xl">
            Everything you need to go green
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A1A2E]/60">
            Self-paced learning designed for adults who want to make a real difference in their everyday sustainability practices.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-8 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative rounded-2xl border border-[#E8F5E9] bg-white p-8 transition-all duration-300 hover:shadow-lg hover:shadow-[#2E7D32]/8"
            >
              {/* Icon circle */}
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${feature.bgColor} transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>

              <h3 className="mb-3 font-display text-xl font-semibold text-[#1A1A2E]">
                {feature.title}
              </h3>

              <p className="leading-relaxed text-[#1A1A2E]/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

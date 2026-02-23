'use client';

import { motion } from 'framer-motion';
import { greenCompAreas } from '@/data/greencomp';

// Hardcoded English titles since i18n keys aren't in messages yet
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function GreenCompSection() {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-4 py-1.5 text-sm font-medium text-[#2E7D32]">
            <span>EU Framework</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-[#1A1A2E] sm:text-4xl">
            Built on GreenComp
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A1A2E]/60">
            Our curriculum is aligned with GreenComp, the European sustainability competence framework, ensuring you develop the skills that matter most.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {greenCompAreas.map((area) => (
            <motion.div
              key={area.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: `${area.color}30` }}
            >
              {/* Color accent top bar */}
              <div
                className="absolute top-0 left-0 h-1 w-full"
                style={{ backgroundColor: area.color }}
              />

              {/* Icon */}
              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${area.color}15` }}
              >
                {area.icon}
              </div>

              {/* Title */}
              <h3
                className="mb-4 font-display text-lg font-semibold"
                style={{ color: area.color }}
              >
                {areaTitles[area.id] || area.id}
              </h3>

              {/* Competences list */}
              <ul className="space-y-2">
                {area.competences.map((comp) => (
                  <li
                    key={comp.id}
                    className="flex items-start gap-2 text-sm text-[#1A1A2E]/70"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: area.color }}
                    />
                    {competenceTitles[comp.id] || comp.id}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

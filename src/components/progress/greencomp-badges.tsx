'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { greenCompAreas } from '@/data/greencomp';
import { modules } from '@/data/modules';

// English fallback names for areas
const areaNames: Record<string, string> = {
  'embodying-values': 'Embodying Values',
  'embracing-complexity': 'Embracing Complexity',
  'envisioning-futures': 'Envisioning Futures',
  'acting-for-sustainability': 'Acting for Sustainability',
};

// English fallback names for competences
const competenceNames: Record<string, string> = {
  'valuing-sustainability': 'Valuing Sustainability',
  'supporting-fairness': 'Supporting Fairness',
  'promoting-nature': 'Promoting Nature',
  'systems-thinking': 'Systems Thinking',
  'critical-thinking': 'Critical Thinking',
  'problem-framing': 'Problem Framing',
  'futures-literacy': 'Futures Literacy',
  adaptability: 'Adaptability',
  'exploratory-thinking': 'Exploratory Thinking',
  'political-agency': 'Political Agency',
  'collective-action': 'Collective Action',
  'individual-initiative': 'Individual Initiative',
};

// Icons for competences (simple text-based icons)
const competenceIcons: Record<string, string> = {
  'valuing-sustainability': '\u{2665}',
  'supporting-fairness': '\u{2696}',
  'promoting-nature': '\u{1F33F}',
  'systems-thinking': '\u{1F504}',
  'critical-thinking': '\u{1F50D}',
  'problem-framing': '\u{1F9E9}',
  'futures-literacy': '\u{1F52E}',
  adaptability: '\u{1F30A}',
  'exploratory-thinking': '\u{1F4A1}',
  'political-agency': '\u{1F3DB}',
  'collective-action': '\u{1F91D}',
  'individual-initiative': '\u{1F680}',
};

/**
 * A competence badge is earned when at least one module
 * that maps to it has been completed.
 */
function useEarnedCompetences(): Set<string> {
  const hydrated = useStoreHydration();
  const isModuleCompleted = useLearningStore((s) => s.isModuleCompleted);

  if (!hydrated) return new Set();

  const earned = new Set<string>();
  for (const mod of modules) {
    if (isModuleCompleted(mod.id)) {
      for (const comp of mod.greenCompCompetences) {
        earned.add(comp);
      }
    }
  }
  return earned;
}

export function GreenCompBadges() {
  const hydrated = useStoreHydration();
  const earned = useEarnedCompetences();

  return (
    <div className="space-y-10">
      {greenCompAreas.map((area, areaIndex) => (
        <motion.div
          key={area.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: areaIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Area header */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-1 w-10 rounded-full"
              style={{ backgroundColor: area.color }}
            />
            <h3
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: area.color }}
            >
              {areaNames[area.id] ?? area.id}
            </h3>
          </div>

          {/* Competence cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {area.competences.map((comp, compIndex) => {
              const isEarned = hydrated && earned.has(comp.id);

              return (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: areaIndex * 0.1 + compIndex * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`flex items-center gap-3 rounded-2xl border p-4 transition-all duration-300 ${
                    isEarned
                      ? 'border-transparent shadow-sm'
                      : 'border-[#E5E2DB] opacity-50 grayscale'
                  }`}
                  style={
                    isEarned
                      ? { backgroundColor: `${area.color}12`, borderColor: `${area.color}35` }
                      : undefined
                  }
                >
                  {/* Icon / lock */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
                      isEarned ? 'text-white' : 'bg-[#FAF8F0] text-[#1A1A2E]/30 border border-[#E5E2DB]'
                    }`}
                    style={isEarned ? { backgroundColor: area.color } : undefined}
                  >
                    {isEarned ? (
                      competenceIcons[comp.id] ?? '\u{2713}'
                    ) : (
                      <Lock className="size-4" />
                    )}
                  </div>

                  {/* Competence name */}
                  <span
                    className={`text-sm font-medium ${
                      isEarned ? 'text-[#1A1A2E]' : 'text-[#1A1A2E]/40'
                    }`}
                  >
                    {competenceNames[comp.id] ?? comp.id}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

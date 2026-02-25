'use client';

import { motion } from 'framer-motion';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';

export function OverallProgress() {
  const hydrated = useStoreHydration();
  const overallProgress = useLearningStore((s) => s.overallProgress);
  const completedModules = useLearningStore((s) => s.completedModules);

  const percentage = hydrated ? Math.round(overallProgress) : 0;
  const completedCount = hydrated ? completedModules.length : 0;

  // SVG circle parameters
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E5E2DB"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          {hydrated && (
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#064E3B"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: progressOffset }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {hydrated ? (
            <motion.span
              className="text-4xl font-bold font-display text-[#064E3B]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {percentage}%
            </motion.span>
          ) : (
            <span className="text-4xl font-bold font-display text-muted-foreground">
              --%
            </span>
          )}
        </div>
      </div>
      <p className="text-lg text-[#1A1A2E]/60">
        {hydrated ? (
          <>
            <span className="font-semibold text-[#1A1A2E]">{completedCount}</span> of{' '}
            <span className="font-semibold text-[#1A1A2E]">10</span> modules completed
          </>
        ) : (
          <span>&nbsp;</span>
        )}
      </p>
    </div>
  );
}

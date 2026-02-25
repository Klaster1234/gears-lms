'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface QuizResultProps {
  score: number;
  total: number;
  passed: boolean;
  onRetry: () => void;
  onContinue?: () => void;
}

function ConfettiDot({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 8 + Math.random() * 8,
        height: 8 + Math.random() * 8,
        backgroundColor: color,
        left: `${x}%`,
        top: '40%',
      }}
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -80 - Math.random() * 60, -40 - Math.random() * 40, 20],
        x: [0, (Math.random() - 0.5) * 100],
        scale: [0, 1.2, 1, 0.5],
        rotate: [0, Math.random() * 360],
      }}
      transition={{
        duration: 1.8,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

const confettiColors = ['#064E3B', '#059669', '#6EE7B7', '#D97706', '#0D9488', '#FBBF24'];

export function QuizResult({ score, total, passed, onRetry, onContinue }: QuizResultProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (passed) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [passed]);

  const generateDots = useCallback(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.6,
      x: 10 + Math.random() * 80,
      color: confettiColors[i % confettiColors.length],
    }));
  }, []);

  const [dots] = useState(generateDots);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card className="relative overflow-hidden">
        {/* Confetti layer */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {dots.map((dot) => (
                <ConfettiDot key={dot.id} delay={dot.delay} x={dot.x} color={dot.color} />
              ))}
            </div>
          )}
        </AnimatePresence>

        <CardContent className="flex flex-col items-center text-center py-8 relative z-0">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
          >
            {passed ? (
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#064E3B]/10 mb-4">
                <Trophy className="size-10 text-[#064E3B]" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-4">
                <XCircle className="size-10 text-red-500" />
              </div>
            )}
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl font-bold text-[#1A1A2E] mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {passed ? 'Great job!' : 'Keep trying!'}
          </motion.h3>

          {/* Score */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-3xl font-bold mb-1">
              <span className={passed ? 'text-[#064E3B]' : 'text-red-500'}>{score}</span>
              <span className="text-muted-foreground"> / {total}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {percentage}% correct
            </p>
          </motion.div>

          {/* Status message */}
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              passed
                ? 'bg-[#064E3B]/10 text-[#064E3B]'
                : 'bg-red-50 text-red-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {passed ? (
              <>
                <CheckCircle2 className="size-4" />
                Practice completed
              </>
            ) : (
              <>
                <XCircle className="size-4" />
                Score 60% or higher to pass
              </>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              variant="outline"
              onClick={onRetry}
            >
              <RotateCcw className="size-4" />
              {passed ? 'Retake' : 'Retry'}
            </Button>
            {passed && onContinue && (
              <Button
                className="bg-[#064E3B] hover:bg-[#043927] text-white"
                onClick={onContinue}
              >
                Continue
                <ArrowRight className="size-4" />
              </Button>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

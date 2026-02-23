'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizResult } from './quiz-result';
import { t } from '@/lib/quiz-text';
import type { ScenarioQuestion } from '@/types';

interface ScenarioQuizProps {
  scenarios: ScenarioQuestion[];
  passingScore: number;
  onComplete: (result: {
    answers: Record<string, string>;
    score: number;
    totalQuestions: number;
    passed: boolean;
  }) => void;
}

export function ScenarioQuiz({ scenarios, passingScore, onComplete }: ScenarioQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = scenarios[currentIndex];
  const isAnswered = selectedOption !== null;
  const progressPercent = ((currentIndex + 1) / scenarios.length) * 100;

  const handleSelect = useCallback(
    (optionKey: string) => {
      if (isAnswered || !scenario) return;
      setSelectedOption(optionKey);

      const option = scenario.options.find((o) => o.key === optionKey);
      const newAnswers = { ...answers, [scenario.id]: optionKey };
      setAnswers(newAnswers);

      if (option?.isOptimal) {
        setCorrectCount((prev) => prev + 1);
      }
    },
    [isAnswered, scenario, answers]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      const allAnswers = { ...answers, [scenario.id]: selectedOption! };
      const totalCorrect = Object.entries(allAnswers).reduce((acc, [id, optKey]) => {
        const s = scenarios.find((sc) => sc.id === id);
        const opt = s?.options.find((o) => o.key === optKey);
        return opt?.isOptimal ? acc + 1 : acc;
      }, 0);
      const passed = (totalCorrect / scenarios.length) * 100 >= passingScore;
      onComplete({
        answers: allAnswers,
        score: totalCorrect,
        totalQuestions: scenarios.length,
        passed,
      });
      setFinished(true);
    }
  }, [currentIndex, scenarios, selectedOption, answers, scenario, passingScore, onComplete]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setCorrectCount(0);
    setFinished(false);
  }, []);

  if (finished) {
    const totalCorrect = Object.entries(answers).reduce((acc, [id, optKey]) => {
      const s = scenarios.find((sc) => sc.id === id);
      const opt = s?.options.find((o) => o.key === optKey);
      return opt?.isOptimal ? acc + 1 : acc;
    }, 0);
    const passed = (totalCorrect / scenarios.length) * 100 >= passingScore;

    return (
      <QuizResult
        score={totalCorrect}
        total={scenarios.length}
        passed={passed}
        onRetry={handleRetry}
      />
    );
  }

  if (!scenario) return null;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Scenario {currentIndex + 1} of {scenarios.length}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {/* Scenario description */}
          <div className="rounded-lg border-l-4 border-[#33AEB4] bg-[#33AEB4]/5 p-5">
            <div className="flex items-start gap-3">
              <MessageSquare className="size-5 text-[#33AEB4] mt-0.5 shrink-0" />
              <p className="text-[#1A1A2E] font-medium">{t(scenario.scenarioKey)}</p>
            </div>
          </div>

          {/* Option cards */}
          <div className="space-y-3">
            {scenario.options.map((option) => {
              const isSelected = selectedOption === option.key;
              const isOptimal = option.isOptimal;

              let borderColor = 'border-border';
              let bgColor = '';
              let icon = null;

              if (isAnswered) {
                if (isOptimal) {
                  borderColor = 'border-[#2E7D32]';
                  bgColor = 'bg-[#2E7D32]/5';
                  icon = (
                    <CheckCircle2 className="size-5 text-[#2E7D32] shrink-0" />
                  );
                } else if (isSelected) {
                  borderColor = 'border-[#F59E0B]';
                  bgColor = 'bg-[#F59E0B]/5';
                  icon = (
                    <AlertTriangle className="size-5 text-[#F59E0B] shrink-0" />
                  );
                }
              }

              return (
                <div key={option.key}>
                  <button
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelect(option.key)}
                    className={`w-full text-left`}
                  >
                    <Card
                      className={`transition-all border-2 ${borderColor} ${bgColor} ${
                        !isAnswered ? 'hover:border-[#33AEB4]/50 hover:shadow cursor-pointer' : 'cursor-default'
                      } ${isSelected && !isAnswered ? 'border-[#33AEB4] bg-[#33AEB4]/5' : ''}`}
                    >
                      <CardContent className="flex items-center gap-3 py-3">
                        <span className="text-sm font-medium text-[#1A1A2E] flex-1">
                          {t(option.key)}
                        </span>
                        {icon}
                      </CardContent>
                    </Card>
                  </button>

                  {/* Feedback for each option when answered */}
                  <AnimatePresence>
                    {isAnswered && (isSelected || isOptimal) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`text-xs mt-1.5 ml-2 pl-3 border-l-2 py-1 ${
                            isOptimal
                              ? 'text-[#1B5E20] border-[#2E7D32]'
                              : 'text-[#92400E] border-[#F59E0B]'
                          }`}
                        >
                          {t(option.feedbackKey)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
          <Button
            className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
            onClick={handleNext}
          >
            {currentIndex < scenarios.length - 1 ? (
              <>
                Next
                <ArrowRight className="size-4" />
              </>
            ) : (
              'See Results'
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
}

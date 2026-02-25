'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizResult } from './quiz-result';
import { useTranslations } from 'next-intl';
import type { MCQQuestion } from '@/types';

interface MCQQuizProps {
  questions: MCQQuestion[];
  passingScore: number;
  onComplete: (result: {
    answers: Record<string, string>;
    score: number;
    totalQuestions: number;
    passed: boolean;
  }) => void;
}

export function MCQQuiz({ questions, passingScore, onComplete }: MCQQuizProps) {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const isCorrect = selectedAnswer === question?.correctAnswer;
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const handleCheck = useCallback(() => {
    if (!selectedAnswer || !question) return;
    setIsChecked(true);
    const newAnswers = { ...answers, [question.id]: selectedAnswer };
    setAnswers(newAnswers);
    if (selectedAnswer === question.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  }, [selectedAnswer, question, answers]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsChecked(false);
    } else {
      // Quiz finished
      const finalCorrect =
        correctCount + (isChecked && isCorrect ? 0 : 0);
      // correctCount was already updated in handleCheck
      const totalCorrect = Object.entries({ ...answers, [question.id]: selectedAnswer! }).reduce(
        (acc, [id, ans]) => {
          const q = questions.find((qq) => qq.id === id);
          return q && ans === q.correctAnswer ? acc + 1 : acc;
        },
        0
      );
      const passed = (totalCorrect / questions.length) * 100 >= passingScore;
      const result = {
        answers: { ...answers, [question.id]: selectedAnswer! },
        score: totalCorrect,
        totalQuestions: questions.length,
        passed,
      };
      onComplete(result);
      setFinished(true);
    }
  }, [currentIndex, questions, selectedAnswer, isChecked, isCorrect, correctCount, answers, question, passingScore, onComplete]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsChecked(false);
    setAnswers({});
    setCorrectCount(0);
    setFinished(false);
  }, []);

  if (finished) {
    const totalCorrect = Object.entries(answers).reduce((acc, [id, ans]) => {
      const q = questions.find((qq) => qq.id === id);
      return q && ans === q.correctAnswer ? acc + 1 : acc;
    }, 0);
    const passed = (totalCorrect / questions.length) * 100 >= passingScore;

    return (
      <QuizResult
        score={totalCorrect}
        total={questions.length}
        passed={passed}
        onRetry={handleRetry}
      />
    );
  }

  if (!question) return null;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="pt-2">
              {/* Question text */}
              <h3 className="text-lg font-semibold text-[#1A1A2E] mb-6">
                {t(question.questionKey)}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option.value;
                  const isOptionCorrect = option.value === question.correctAnswer;

                  let borderColor = 'border-border';
                  let bgColor = 'bg-background';
                  let textColor = 'text-[#1A1A2E]';

                  if (isChecked) {
                    if (isOptionCorrect) {
                      borderColor = 'border-[#064E3B]';
                      bgColor = 'bg-[#064E3B]/5';
                      textColor = 'text-[#064E3B]';
                    } else if (isSelected && !isOptionCorrect) {
                      borderColor = 'border-red-400';
                      bgColor = 'bg-red-50';
                      textColor = 'text-red-600';
                    }
                  } else if (isSelected) {
                    borderColor = 'border-[#0D9488]';
                    bgColor = 'bg-[#0D9488]/5';
                    textColor = 'text-[#0D9488]';
                  }

                  return (
                    <button
                      key={option.key}
                      type="button"
                      disabled={isChecked}
                      onClick={() => setSelectedAnswer(option.value)}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${borderColor} ${bgColor} ${textColor} ${
                        !isChecked ? 'hover:border-[#0D9488]/50 cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      {/* Radio indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? isChecked
                              ? isOptionCorrect
                                ? 'border-[#064E3B] bg-[#064E3B]'
                                : 'border-red-400 bg-red-400'
                              : 'border-[#0D9488] bg-[#0D9488]'
                            : isChecked && isOptionCorrect
                              ? 'border-[#064E3B] bg-[#064E3B]'
                              : 'border-muted-foreground/30'
                        }`}
                      >
                        {(isSelected || (isChecked && isOptionCorrect)) && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>

                      <span className="text-sm font-medium flex-1">{t(option.key)}</span>

                      {/* Feedback icons */}
                      {isChecked && isOptionCorrect && (
                        <CheckCircle2 className="size-5 text-[#064E3B] shrink-0" />
                      )}
                      {isChecked && isSelected && !isOptionCorrect && (
                        <XCircle className="size-5 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {isChecked && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`mt-4 p-4 rounded-lg text-sm ${
                        isCorrect
                          ? 'bg-[#064E3B]/10 text-[#043927]'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {isCorrect ? (
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 mt-0.5 shrink-0" />
                          <span>{t(question.feedbackKey)}</span>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <XCircle className="size-4 mt-0.5 shrink-0" />
                          <span>
                            Incorrect. The correct answer is{' '}
                            <strong>
                              {t(
                                question.options.find(
                                  (o) => o.value === question.correctAnswer
                                )?.key ?? ''
                              )}
                            </strong>
                            .
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        {!isChecked ? (
          <Button
            className="bg-[#0D9488] hover:bg-[#0F766E] text-white"
            disabled={!selectedAnswer}
            onClick={handleCheck}
          >
            Check Answer
          </Button>
        ) : (
          <Button
            className="bg-[#064E3B] hover:bg-[#043927] text-white"
            onClick={handleNext}
          >
            {currentIndex < questions.length - 1 ? (
              <>
                Next
                <ArrowRight className="size-4" />
              </>
            ) : (
              'See Results'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

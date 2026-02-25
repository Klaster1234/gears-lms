'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizResult } from './quiz-result';
import { useTranslations } from 'next-intl';
import type { ABQuestion } from '@/types';

interface ABComparisonQuizProps {
  questions: ABQuestion[];
  passingScore: number;
  onComplete: (result: {
    answers: Record<string, string>;
    score: number;
    totalQuestions: number;
    passed: boolean;
  }) => void;
}

export function ABComparisonQuiz({
  questions,
  passingScore,
  onComplete,
}: ABComparisonQuizProps) {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question?.correctAnswer;
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = useCallback(
    (choice: 'A' | 'B') => {
      if (isAnswered || !question) return;
      setSelectedAnswer(choice);
      const newAnswers = { ...answers, [question.id]: choice };
      setAnswers(newAnswers);
      if (choice === question.correctAnswer) {
        setCorrectCount((prev) => prev + 1);
      }
    },
    [isAnswered, question, answers]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      const totalCorrect = Object.entries({
        ...answers,
        [question.id]: selectedAnswer!,
      }).reduce((acc, [id, ans]) => {
        const q = questions.find((qq) => qq.id === id);
        return q && ans === q.correctAnswer ? acc + 1 : acc;
      }, 0);
      const passed = (totalCorrect / questions.length) * 100 >= passingScore;
      onComplete({
        answers: { ...answers, [question.id]: selectedAnswer! },
        score: totalCorrect,
        totalQuestions: questions.length,
        passed,
      });
      setFinished(true);
    }
  }, [currentIndex, questions, selectedAnswer, answers, question, passingScore, onComplete]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
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

  const renderOptionCard = (
    label: 'A' | 'B',
    textKey: string
  ) => {
    const isThisSelected = selectedAnswer === label;
    const isThisCorrect = label === question.correctAnswer;

    let borderStyle = 'border-border hover:border-[#0D9488]/50';
    let bgStyle = '';

    if (isAnswered) {
      if (isThisCorrect) {
        borderStyle = 'border-[#064E3B] border-2';
        bgStyle = 'bg-[#064E3B]/5';
      } else if (isThisSelected) {
        borderStyle = 'border-red-400 border-2';
        bgStyle = 'bg-red-50';
      } else {
        borderStyle = 'border-border opacity-60';
      }
    } else if (isThisSelected) {
      borderStyle = 'border-[#0D9488] border-2';
      bgStyle = 'bg-[#0D9488]/5';
    }

    return (
      <button
        type="button"
        disabled={isAnswered}
        onClick={() => handleSelect(label)}
        className={`flex-1 text-left ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
      >
        <Card
          className={`h-full transition-all ${borderStyle} ${bgStyle} ${
            !isAnswered ? 'hover:shadow-md' : ''
          }`}
        >
          <CardContent className="pt-2">
            {/* Label badge */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                  isAnswered && isThisCorrect
                    ? 'bg-[#064E3B] text-white'
                    : isAnswered && isThisSelected
                      ? 'bg-red-400 text-white'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {label}
              </span>
              {isAnswered && isThisCorrect && (
                <CheckCircle2 className="size-5 text-[#064E3B]" />
              )}
              {isAnswered && isThisSelected && !isThisCorrect && (
                <XCircle className="size-5 text-red-500" />
              )}
            </div>

            <p className="text-sm font-medium text-[#1A1A2E]">{t(textKey)}</p>
          </CardContent>
        </Card>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Comparison {currentIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Question prompt */}
      <h3 className="text-lg font-semibold text-[#1A1A2E] text-center">
        Which is the more sustainable choice?
      </h3>

      {/* A/B cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {renderOptionCard('A', question.optionAKey)}
          {renderOptionCard('B', question.optionBKey)}
        </motion.div>
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`p-4 rounded-lg text-sm ${
                isCorrect
                  ? 'bg-[#064E3B]/10 text-[#043927]'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="size-4 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="size-4 mt-0.5 shrink-0" />
                )}
                <span>{t(question.feedbackKey)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
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
        </motion.div>
      )}
    </div>
  );
}

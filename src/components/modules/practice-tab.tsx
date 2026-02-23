'use client';

import { useCallback, useState } from 'react';
import { Puzzle } from 'lucide-react';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { getQuizByModuleId } from '@/data/quizzes';
import { MCQQuiz } from '@/components/quiz/mcq-quiz';
import { DragDropQuiz } from '@/components/quiz/dragdrop-quiz';
import { ABComparisonQuiz } from '@/components/quiz/ab-comparison-quiz';
import { ScenarioQuiz } from '@/components/quiz/scenario-quiz';
import { GuidedForm } from '@/components/quiz/guided-form';
import { ExternalActivity } from '@/components/quiz/external-activity';
import { QuizResult } from '@/components/quiz/quiz-result';
import type { Module } from '@/types';

interface PracticeTabProps {
  module: Module;
}

export function PracticeTab({ module }: PracticeTabProps) {
  const hydrated = useStoreHydration();
  const submitQuiz = useLearningStore((s) => s.submitQuiz);
  const completePractice = useLearningStore((s) => s.completePractice);
  const quizResult = useLearningStore((s) => s.quizResults[module.id]);
  const practiceCompleted = useLearningStore(
    (s) => s.moduleProgress[module.id]?.practiceCompleted ?? false
  );

  const [retaking, setRetaking] = useState(false);

  const quizData = getQuizByModuleId(module.id);

  const handleQuizComplete = useCallback(
    (result: {
      answers: Record<string, string>;
      score: number;
      totalQuestions: number;
      passed: boolean;
    }) => {
      submitQuiz(module.id, result);
    },
    [module.id, submitQuiz]
  );

  const handlePracticeComplete = useCallback(() => {
    completePractice(module.id);
    // For external/guided-form, also submit a "quiz" result so quizPassed is set
    submitQuiz(module.id, {
      answers: {},
      score: 1,
      totalQuestions: 1,
      passed: true,
    });
  }, [module.id, completePractice, submitQuiz]);

  const handleRetake = useCallback(() => {
    setRetaking(true);
  }, []);

  if (!hydrated) {
    return <div className="h-40" />;
  }

  if (!quizData) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Puzzle className="size-12 text-muted-foreground/40 mb-4" />
        <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">
          No Quiz Available
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Practice content for this module is not yet available.
        </p>
      </div>
    );
  }

  // Show previous result if already passed and not retaking
  if (quizResult && quizResult.passed && !retaking) {
    return (
      <QuizResult
        score={quizResult.score}
        total={quizResult.totalQuestions}
        passed={quizResult.passed}
        onRetry={handleRetake}
      />
    );
  }

  // Render quiz based on type
  switch (quizData.type) {
    case 'mcq':
      if (!quizData.mcq) return null;
      return (
        <MCQQuiz
          key={retaking ? 'retake' : 'initial'}
          questions={quizData.mcq}
          passingScore={quizData.passingScore}
          onComplete={handleQuizComplete}
        />
      );

    case 'dragdrop':
      if (!quizData.dragdrop) return null;
      return (
        <DragDropQuiz
          key={retaking ? 'retake' : 'initial'}
          quiz={quizData.dragdrop}
          passingScore={quizData.passingScore}
          onComplete={handleQuizComplete}
        />
      );

    case 'ab-comparison':
      if (!quizData.ab) return null;
      return (
        <ABComparisonQuiz
          key={retaking ? 'retake' : 'initial'}
          questions={quizData.ab}
          passingScore={quizData.passingScore}
          onComplete={handleQuizComplete}
        />
      );

    case 'scenario':
      if (!quizData.scenarios) return null;
      return (
        <ScenarioQuiz
          key={retaking ? 'retake' : 'initial'}
          scenarios={quizData.scenarios}
          passingScore={quizData.passingScore}
          onComplete={handleQuizComplete}
        />
      );

    case 'guided-form':
      if (!quizData.guidedForm) return null;
      return (
        <GuidedForm
          key={retaking ? 'retake' : 'initial'}
          steps={quizData.guidedForm}
          onComplete={handlePracticeComplete}
        />
      );

    case 'external': {
      const descKey =
        module.id === 'fast-slow-fashion'
          ? 'quizzes.module6.description'
          : module.id === 'energy-efficiency'
            ? 'quizzes.module8.description'
            : undefined;

      return (
        <ExternalActivity
          url={quizData.externalUrl ?? ''}
          titleKey={quizData.externalTitle ?? ''}
          descriptionKey={descKey}
          alreadyCompleted={practiceCompleted}
          onComplete={handlePracticeComplete}
        />
      );
    }

    default:
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Puzzle className="size-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">
            Quiz Coming Soon
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Interactive practice exercises for this module are being prepared.
          </p>
        </div>
      );
  }
}

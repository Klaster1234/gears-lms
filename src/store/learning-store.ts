import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ModuleProgress {
  learnCompleted: boolean;
  practiceCompleted: boolean;
  reflectCompleted: boolean;
  quizScore: number | null;
  quizPassed: boolean;
}

export interface QuizResult {
  answers: Record<string, string>;
  score: number;
  totalQuestions: number;
  completedAt: string;
  passed: boolean;
}

export interface Reflection {
  text: string;
  actionPlan: string;
  savedAt: string;
}

const TOTAL_MODULES = 10;

const defaultModuleProgress: ModuleProgress = {
  learnCompleted: false,
  practiceCompleted: false,
  reflectCompleted: false,
  quizScore: null,
  quizPassed: false,
};

// ─── Store Interface ─────────────────────────────────────────────────────────

interface LearningState {
  completedModules: string[];
  currentModule: string | null;
  moduleProgress: Record<string, ModuleProgress>;
  quizResults: Record<string, QuizResult>;
  reflections: Record<string, Reflection>;
  certificateEarned: boolean;
  certificateName: string;
  overallProgress: number;
}

interface LearningActions {
  setCurrentModule: (moduleId: string | null) => void;
  completeLearn: (moduleId: string) => void;
  completePractice: (moduleId: string) => void;
  submitQuiz: (moduleId: string, result: Omit<QuizResult, 'completedAt'>) => void;
  saveReflection: (moduleId: string, text: string, actionPlan: string) => void;
  setCertificateName: (name: string) => void;
  resetProgress: () => void;
  getModuleProgress: (moduleId: string) => ModuleProgress;
  isModuleCompleted: (moduleId: string) => boolean;
}

type LearningStore = LearningState & LearningActions;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calculateOverallProgress(moduleProgress: Record<string, ModuleProgress>): number {
  const completedCount = Object.values(moduleProgress).filter(
    (p) => p.learnCompleted && p.practiceCompleted && p.quizPassed && p.reflectCompleted
  ).length;
  return (completedCount / TOTAL_MODULES) * 100;
}

function getCompletedModuleIds(moduleProgress: Record<string, ModuleProgress>): string[] {
  return Object.entries(moduleProgress)
    .filter(([, p]) => p.learnCompleted && p.practiceCompleted && p.quizPassed && p.reflectCompleted)
    .map(([id]) => id);
}

function ensureModuleProgress(
  progress: Record<string, ModuleProgress>,
  moduleId: string
): Record<string, ModuleProgress> {
  if (progress[moduleId]) return progress;
  return { ...progress, [moduleId]: { ...defaultModuleProgress } };
}

// ─── Initial State ───────────────────────────────────────────────────────────

const initialState: LearningState = {
  completedModules: [],
  currentModule: null,
  moduleProgress: {},
  quizResults: {},
  reflections: {},
  certificateEarned: false,
  certificateName: '',
  overallProgress: 0,
};

// ─── Store ───────────────────────────────────────────────────────────────────

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentModule: (moduleId: string | null) => {
        set({ currentModule: moduleId });
      },

      completeLearn: (moduleId: string) => {
        set((state) => {
          const progress = ensureModuleProgress(state.moduleProgress, moduleId);
          const updated = {
            ...progress,
            [moduleId]: { ...progress[moduleId], learnCompleted: true },
          };
          const completedModules = getCompletedModuleIds(updated);
          const overallProgress = calculateOverallProgress(updated);
          return {
            moduleProgress: updated,
            completedModules,
            overallProgress,
            certificateEarned: completedModules.length >= TOTAL_MODULES,
          };
        });
      },

      completePractice: (moduleId: string) => {
        set((state) => {
          const progress = ensureModuleProgress(state.moduleProgress, moduleId);
          const updated = {
            ...progress,
            [moduleId]: { ...progress[moduleId], practiceCompleted: true },
          };
          const completedModules = getCompletedModuleIds(updated);
          const overallProgress = calculateOverallProgress(updated);
          return {
            moduleProgress: updated,
            completedModules,
            overallProgress,
            certificateEarned: completedModules.length >= TOTAL_MODULES,
          };
        });
      },

      submitQuiz: (moduleId: string, result: Omit<QuizResult, 'completedAt'>) => {
        const quizResult: QuizResult = {
          ...result,
          completedAt: new Date().toISOString(),
        };

        set((state) => {
          const progress = ensureModuleProgress(state.moduleProgress, moduleId);
          const updated = {
            ...progress,
            [moduleId]: {
              ...progress[moduleId],
              quizScore: result.score,
              quizPassed: result.passed,
              practiceCompleted: result.passed ? true : progress[moduleId].practiceCompleted,
            },
          };
          const completedModules = getCompletedModuleIds(updated);
          const overallProgress = calculateOverallProgress(updated);
          return {
            moduleProgress: updated,
            quizResults: { ...state.quizResults, [moduleId]: quizResult },
            completedModules,
            overallProgress,
            certificateEarned: completedModules.length >= TOTAL_MODULES,
          };
        });
      },

      saveReflection: (moduleId: string, text: string, actionPlan: string) => {
        const reflection: Reflection = {
          text,
          actionPlan,
          savedAt: new Date().toISOString(),
        };

        set((state) => {
          const progress = ensureModuleProgress(state.moduleProgress, moduleId);
          const updated = {
            ...progress,
            [moduleId]: { ...progress[moduleId], reflectCompleted: true },
          };
          const completedModules = getCompletedModuleIds(updated);
          const overallProgress = calculateOverallProgress(updated);
          return {
            moduleProgress: updated,
            reflections: { ...state.reflections, [moduleId]: reflection },
            completedModules,
            overallProgress,
            certificateEarned: completedModules.length >= TOTAL_MODULES,
          };
        });
      },

      setCertificateName: (name: string) => {
        set({ certificateName: name });
      },

      resetProgress: () => {
        set({ ...initialState });
      },

      getModuleProgress: (moduleId: string): ModuleProgress => {
        const state = get();
        return state.moduleProgress[moduleId] ?? { ...defaultModuleProgress };
      },

      isModuleCompleted: (moduleId: string): boolean => {
        const state = get();
        const progress = state.moduleProgress[moduleId];
        if (!progress) return false;
        return (
          progress.learnCompleted &&
          progress.practiceCompleted &&
          progress.quizPassed &&
          progress.reflectCompleted
        );
      },
    }),
    {
      name: 'gears-learning-progress',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// ─── Hydration Hook ──────────────────────────────────────────────────────────

export function useStoreHydration(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}

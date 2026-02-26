'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useLearningStore } from '@/store/learning-store';

const DEBOUNCE_MS = 2000;

export function useProgressSync() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const hasSynced = useRef(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load progress from server on login
  useEffect(() => {
    if (!isAuthenticated || hasSynced.current) return;

    async function loadFromServer() {
      try {
        const res = await fetch('/api/progress');
        if (!res.ok) return;

        const { data } = await res.json();

        if (data) {
          // Server has progress — hydrate the Zustand store with it
          useLearningStore.setState({
            completedModules: data.completedModules ?? [],
            moduleProgress: data.moduleProgress ?? {},
            quizResults: data.quizResults ?? {},
            reflections: data.reflections ?? {},
            certificateEarned: data.certificateEarned ?? false,
            overallProgress: data.overallProgress ?? 0,
          });
        } else {
          // No server progress — upload localStorage data if any
          const state = useLearningStore.getState();
          if (
            state.overallProgress > 0 ||
            Object.keys(state.moduleProgress).length > 0
          ) {
            await saveToServer(state);
          }
        }

        hasSynced.current = true;
      } catch (error) {
        console.error('Failed to load progress from server:', error);
      }
    }

    loadFromServer();
  }, [isAuthenticated]);

  // Subscribe to store changes and save to server (debounced)
  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribe = useLearningStore.subscribe((state) => {
      if (!hasSynced.current) return;

      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        saveToServer(state);
      }, DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [isAuthenticated]);
}

async function saveToServer(state: {
  completedModules: string[];
  moduleProgress: Record<string, unknown>;
  quizResults: Record<string, unknown>;
  reflections: Record<string, unknown>;
  certificateEarned: boolean;
  certificateName: string;
  overallProgress: number;
}) {
  try {
    await fetch('/api/progress', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        progressData: {
          completedModules: state.completedModules,
          moduleProgress: state.moduleProgress,
          quizResults: state.quizResults,
          reflections: state.reflections,
          certificateEarned: state.certificateEarned,
          overallProgress: state.overallProgress,
        },
        certificateName: state.certificateName,
        certificateEarned: state.certificateEarned,
      }),
    });
  } catch (error) {
    console.error('Failed to save progress to server:', error);
  }
}

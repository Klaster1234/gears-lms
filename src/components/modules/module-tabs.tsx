'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Puzzle, PenLine, LinkIcon, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { LearnTab } from './learn-tab';
import { PracticeTab } from './practice-tab';
import { ReflectTab } from './reflect-tab';
import { ResourcesTab } from './resources-tab';
import type { Module } from '@/types';

interface ModuleTabsProps {
  module: Module;
}

const tabDefs = [
  { value: 'learn', label: 'Learn', icon: BookOpen },
  { value: 'practice', label: 'Practice', icon: Puzzle },
  { value: 'reflect', label: 'Reflect', icon: PenLine },
  { value: 'resources', label: 'Resources', icon: LinkIcon },
] as const;

export function ModuleTabs({ module }: ModuleTabsProps) {
  const hydrated = useStoreHydration();
  const moduleProgress = useLearningStore((s) => s.moduleProgress[module.id]);
  const [activeTab, setActiveTab] = useState('learn');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const stepStatus = {
    learn: moduleProgress?.learnCompleted ?? false,
    practice: moduleProgress?.practiceCompleted ?? false,
    reflect: moduleProgress?.reflectCompleted ?? false,
    resources: moduleProgress?.quizPassed ?? false,
  };

  const updateIndicator = useCallback(() => {
    const activeIndex = tabDefs.findIndex((t) => t.value === activeTab);
    const tabEl = tabRefs.current[activeIndex];
    const containerEl = containerRef.current;
    if (tabEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const tabRect = tabEl.getBoundingClientRect();
      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Custom tab bar */}
      <div className="relative mb-10">
        <div
          ref={containerRef}
          className="relative flex gap-1 border-b border-[#E5E2DB]"
        >
          {tabDefs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;
            const completed = hydrated && stepStatus[tab.value as keyof typeof stepStatus];

            return (
              <button
                key={tab.value}
                ref={(el) => { tabRefs.current[i] = el; }}
                onClick={() => setActiveTab(tab.value)}
                className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-[#064E3B]'
                    : 'text-[#1A1A2E]/35 hover:text-[#1A1A2E]/60'
                }`}
              >
                {completed ? (
                  <CheckCircle2 className="size-4 text-[#064E3B] shrink-0" />
                ) : (
                  <Icon
                    className={`size-4 shrink-0 transition-colors duration-300 ${
                      isActive ? 'text-[#064E3B]' : ''
                    }`}
                  />
                )}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}

          {/* Animated underline indicator */}
          <motion.div
            className="absolute bottom-0 h-[2px] bg-[#064E3B]"
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 35,
            }}
          />
        </div>
      </div>

      {/* Tab content with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <TabsContent value="learn" className="mt-0">
            <LearnTab module={module} />
          </TabsContent>

          <TabsContent value="practice" className="mt-0">
            <PracticeTab module={module} />
          </TabsContent>

          <TabsContent value="reflect" className="mt-0">
            <ReflectTab module={module} />
          </TabsContent>

          <TabsContent value="resources" className="mt-0">
            <ResourcesTab module={module} />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
}

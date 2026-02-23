'use client';

import { BookOpen, Puzzle, PenLine, LinkIcon, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { LearnTab } from './learn-tab';
import type { Module } from '@/types';

interface ModuleTabsProps {
  module: Module;
}

export function ModuleTabs({ module }: ModuleTabsProps) {
  const hydrated = useStoreHydration();
  const moduleProgress = useLearningStore((s) => s.moduleProgress[module.id]);

  const stepStatus = {
    learn: moduleProgress?.learnCompleted ?? false,
    practice: moduleProgress?.practiceCompleted ?? false,
    reflect: moduleProgress?.reflectCompleted ?? false,
    resources: moduleProgress?.quizPassed ?? false,
  };

  const tabs = [
    { value: 'learn', label: 'Learn', icon: BookOpen, completed: stepStatus.learn },
    { value: 'practice', label: 'Practice', icon: Puzzle, completed: stepStatus.practice },
    { value: 'reflect', label: 'Reflect', icon: PenLine, completed: stepStatus.reflect },
    { value: 'resources', label: 'Resources', icon: LinkIcon, completed: stepStatus.resources },
  ];

  return (
    <Tabs defaultValue="learn" className="w-full">
      <TabsList className="w-full grid grid-cols-4 h-auto p-1 bg-muted/60">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-1.5 py-2.5 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {hydrated && tab.completed ? (
                <CheckCircle2 className="size-4 text-[#2E7D32] shrink-0" />
              ) : (
                <Icon className="size-4 shrink-0" />
              )}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      <TabsContent value="learn" className="mt-6">
        <LearnTab module={module} />
      </TabsContent>

      <TabsContent value="practice" className="mt-6">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Puzzle className="size-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">Quiz Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Interactive practice exercises for this module are being prepared.
            Check back soon to test your knowledge!
          </p>
        </div>
      </TabsContent>

      <TabsContent value="reflect" className="mt-6">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <PenLine className="size-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">Reflection Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Guided reflection prompts for this module are being developed.
            You will be able to journal your thoughts and create action plans here.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="resources" className="mt-6">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <LinkIcon className="size-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">Resources Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Additional reading materials, downloads, and reference links for this module
            will be available here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

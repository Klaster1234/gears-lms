'use client';

import { CheckCircle2, Target, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { VideoEmbed } from './video-embed';
import { LessonContent } from './lesson-content';
import { getLessonByModuleId } from '@/data/lessons';
import type { Module } from '@/types';

// Learning objectives for each module (English)
const learningObjectives: Record<number, string[]> = {
  1: [
    'Understand the concept of sustainability and why it matters today',
    'Identify the 5R principles: Refuse, Reduce, Reuse, Recycle, Rot',
    'Apply the 5R hierarchy to everyday decisions',
    'Recognise your own impact on natural systems',
  ],
  2: [
    'Understand how waste is generated and where it ends up',
    'Explain the environmental impact of different waste types',
    'Describe the zero waste philosophy and its core principles',
    'Identify practical steps toward reducing personal waste',
  ],
  3: [
    'Understand the science behind composting',
    'Set up a composting system suitable for your living situation',
    'Identify what can and cannot be composted',
    'Explain how composting benefits your community and environment',
  ],
  4: [
    'Make informed and sustainable food purchasing decisions',
    'Evaluate fashion choices through a sustainability lens',
    'Recognise greenwashing in marketing and advertising',
    'Calculate the true cost of consumer goods beyond their price tag',
  ],
  5: [
    'Define the circular economy and contrast it with the linear model',
    'Identify examples of circular economy practices in daily life',
    'Understand the role of design in eliminating waste',
    'Explain how materials can be kept in use for longer',
  ],
  6: [
    'Compare the environmental impacts of fast and slow fashion',
    'Understand the social issues behind fast fashion production',
    'Identify sustainable fashion alternatives and brands',
    'Develop strategies for building a more sustainable wardrobe',
  ],
  7: [
    'Critically evaluate product claims and certifications',
    'Distinguish between genuine sustainability efforts and greenwashing',
    'Make ethical consumption choices based on evidence',
    'Understand your power as a consumer to drive positive change',
  ],
  8: [
    'Identify the main energy consumers in a household',
    'Calculate and interpret your ecological footprint',
    'Implement practical energy-saving strategies at home',
    'Understand the link between daily habits and resource consumption',
  ],
  9: [
    'Recognise the power of collective action for environmental change',
    'Identify successful community-led sustainability initiatives',
    'Develop a plan for community engagement on sustainability issues',
    'Understand how local actions contribute to global impact',
  ],
  10: [
    'Understand what eco-anxiety is and recognise its symptoms',
    'Develop emotional resilience strategies for climate concerns',
    'Channel environmental worry into positive, constructive action',
    'Support others who experience eco-anxiety',
  ],
};

// Fallback external link titles
const linkTitleFallbacks: Record<string, string> = {
  'modules.2.links.glideApp': 'GEARS Interactive App',
  'modules.2.links.canvaPresentation': 'Module Presentation',
  'modules.6.links.threadsGame': 'Threads - Fast Fashion Game',
  'modules.8.links.footprintCalculator': 'Ecological Footprint Calculator',
};

interface LearnTabProps {
  module: Module;
}

export function LearnTab({ module }: LearnTabProps) {
  const hydrated = useStoreHydration();
  const completeLearn = useLearningStore((s) => s.completeLearn);
  const learnCompleted = useLearningStore(
    (s) => s.moduleProgress[module.id]?.learnCompleted ?? false
  );

  const objectives = learningObjectives[module.number] ?? [];
  const lesson = getLessonByModuleId(module.id);

  return (
    <div className="space-y-8">
      {/* Learning objectives */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Target className="size-5 text-[#064E3B]" />
          <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
            Learning Objectives
          </h3>
        </div>
        <ul className="space-y-2 ml-1">
          {objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A2E]/80">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#064E3B] shrink-0" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Lesson content (rich educational article) */}
      {lesson && (
        <>
          <Separator />
          <LessonContent sections={lesson.sections} />
        </>
      )}

      <Separator />

      {/* Videos */}
      {module.videos.length > 0 && (
        <section>
          <h3 className="font-display text-lg font-semibold text-[#1A1A2E] mb-4">
            Video Content
          </h3>
          <div className="space-y-6">
            {module.videos.map((video) => (
              <VideoEmbed key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}

      {module.videos.length > 0 && module.externalLinks.length > 0 && (
        <Separator />
      )}

      {/* External links */}
      {module.externalLinks.length > 0 && (
        <section>
          <h3 className="font-display text-lg font-semibold text-[#1A1A2E] mb-4">
            External Resources
          </h3>
          <div className="space-y-3">
            {module.externalLinks.map((link, i) => {
              const title = linkTitleFallbacks[link.titleKey] ?? link.titleKey;
              return (
                <Card key={i} className="border-border/60">
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D9488]/10 text-[#0D9488] shrink-0">
                      <ExternalLink className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1A1A2E] text-sm truncate">{title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{link.type}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        Launch
                        <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <Separator />

      {/* Mark as Read button */}
      <div className="flex justify-center py-2">
        {hydrated ? (
          learnCompleted ? (
            <div className="flex items-center gap-2 text-[#064E3B] font-medium">
              <CheckCircle2 className="size-5" />
              <span>Learning material completed</span>
            </div>
          ) : (
            <Button
              size="lg"
              className="bg-[#064E3B] hover:bg-[#043927] text-white"
              onClick={() => completeLearn(module.id)}
            >
              <CheckCircle2 className="size-4" />
              Mark as Read
            </Button>
          )
        ) : (
          <div className="h-10" />
        )}
      </div>
    </div>
  );
}

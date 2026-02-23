'use client';

import { CheckCircle2, Target, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { VideoEmbed } from './video-embed';
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

// Key concepts for each module
const keyConcepts: Record<number, string> = {
  1: 'Sustainability means meeting our present needs without compromising the ability of future generations to meet theirs. The 5R framework (Refuse, Reduce, Reuse, Recycle, Rot) provides a practical hierarchy for making more sustainable daily choices.',
  2: 'Zero waste is a philosophy that encourages redesigning resource life cycles so all products are reused, and no waste is sent to landfills or incinerators. It starts with rethinking how we consume.',
  3: 'Composting transforms organic waste into nutrient-rich soil. It reduces landfill methane emissions, enriches garden soil, and closes the nutrient cycle in nature.',
  4: 'Sustainable shopping considers the full lifecycle of products, from raw materials to disposal. True cost includes environmental, social, and health impacts beyond the price tag.',
  5: 'The circular economy replaces the "take-make-dispose" model with systems designed to keep resources in use, extract maximum value, and regenerate natural systems.',
  6: 'Fast fashion produces cheap clothing quickly, causing enormous environmental damage and social exploitation. Slow fashion prioritises quality, ethical production, and timeless design.',
  7: 'Green consumption requires critical thinking to separate genuine sustainability efforts from greenwashing. Look for transparent supply chains, credible certifications, and measurable impact.',
  8: 'Every resource we consume has an environmental footprint. Small changes in daily habits, such as reducing energy use, conserving water, and choosing efficient appliances, create significant cumulative impact.',
  9: 'Individual actions matter, but collective action multiplies impact. Community initiatives, policy advocacy, and collaborative projects are essential for systemic environmental change.',
  10: 'Eco-anxiety is a rational emotional response to environmental threats. Managing it involves acknowledging feelings, building community connections, taking meaningful action, and practising self-compassion.',
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
  const concept = keyConcepts[module.number] ?? '';

  return (
    <div className="space-y-8">
      {/* Learning objectives */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Target className="size-5 text-[#2E7D32]" />
          <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
            Learning Objectives
          </h3>
        </div>
        <ul className="space-y-2 ml-1">
          {objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A2E]/80">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2E7D32] shrink-0" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </section>

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

      {module.videos.length > 0 && (module.externalLinks.length > 0 || concept) && (
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#33AEB4]/10 text-[#33AEB4] shrink-0">
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

      {module.externalLinks.length > 0 && concept && <Separator />}

      {/* Key concepts callout */}
      {concept && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="size-5 text-[#F59E0B]" />
            <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
              Key Concepts
            </h3>
          </div>
          <div className="rounded-lg border-l-4 border-[#F59E0B] bg-[#F59E0B]/5 p-4">
            <p className="text-sm text-[#1A1A2E]/80 leading-relaxed">{concept}</p>
          </div>
        </section>
      )}

      <Separator />

      {/* Mark as Read button */}
      <div className="flex justify-center py-2">
        {hydrated ? (
          learnCompleted ? (
            <div className="flex items-center gap-2 text-[#2E7D32] font-medium">
              <CheckCircle2 className="size-5" />
              <span>Learning material completed</span>
            </div>
          ) : (
            <Button
              size="lg"
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
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

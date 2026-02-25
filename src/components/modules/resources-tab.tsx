'use client';

import {
  Play,
  ExternalLink,
  Video,
  BookOpen,
  Gamepad2,
  Calculator,
  Presentation,
  Smartphone,
  ArrowRight,
  FolderOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { modules } from '@/data/modules';
import type { Module, VideoResource, ExternalLink as ExternalLinkType } from '@/types';

// ─── Video title fallbacks ──────────────────────────────────────────────────

const videoTitleFallbacks: Record<string, string> = {
  'modules.1.videos.intro5r': 'Introduction to the 5R Hierarchy',
  'modules.1.videos.short5r': '5R Principles in 60 Seconds',
  'modules.3.videos.composting': 'How to Start Composting',
  'modules.8.videos.energy1': 'Understanding Home Energy Use',
  'modules.8.videos.energy2': 'Energy Saving Tips',
  'modules.8.videos.energy3': 'Renewable Energy Basics',
  'modules.8.videos.energy4': 'Smart Home Energy Management',
  'modules.10.videos.ecoAnxiety': 'Understanding Eco-Anxiety',
};

// ─── External link title fallbacks ──────────────────────────────────────────

const linkTitleFallbacks: Record<string, string> = {
  'modules.2.links.glideApp': 'GEARS Interactive App',
  'modules.2.links.canvaPresentation': 'Module Presentation',
  'modules.6.links.threadsGame': 'Threads - Sustainable Fashion Game',
  'modules.8.links.footprintCalculator': 'Ecological Footprint Calculator',
};

// ─── Module title fallbacks ─────────────────────────────────────────────────

const moduleTitles: Record<number, string> = {
  1: 'Introduction to Sustainability & the 5R Principles',
  2: 'Understanding Waste & the Zero Waste Mindset',
  3: 'Composting for Households & Communities',
  4: 'Sustainable Shopping: Food, Fashion & Beyond',
  5: 'Circular Economy Basics',
  6: 'Fast Fashion vs. Slow Fashion',
  7: 'Green Consumption & Ethical Choices',
  8: 'Energy & Resource Efficiency in Daily Life',
  9: 'Community Action & Collective Impact',
  10: 'Understanding and Managing Eco-Anxiety',
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function getVideoTypeBadge(type: VideoResource['type']) {
  switch (type) {
    case 'youtube':
      return { label: 'YouTube', color: 'bg-[#FF0000]/10 text-[#FF0000]' };
    case 'youtube-short':
      return { label: 'YouTube Short', color: 'bg-[#FF0000]/10 text-[#FF0000]' };
    case 'facebook':
      return { label: 'Facebook', color: 'bg-[#1877F2]/10 text-[#1877F2]' };
    case 'external':
      return { label: 'External', color: 'bg-[#0D9488]/10 text-[#0D9488]' };
    default:
      return { label: 'Video', color: 'bg-muted text-muted-foreground' };
  }
}

function getLinkTypeInfo(type: ExternalLinkType['type']) {
  switch (type) {
    case 'app':
      return { label: 'App', icon: Smartphone, color: 'bg-[#064E3B]/10 text-[#064E3B]' };
    case 'game':
      return { label: 'Game', icon: Gamepad2, color: 'bg-[#7C3AED]/10 text-[#7C3AED]' };
    case 'calculator':
      return { label: 'Calculator', icon: Calculator, color: 'bg-[#F59E0B]/10 text-[#F59E0B]' };
    case 'presentation':
      return { label: 'Presentation', icon: Presentation, color: 'bg-[#0D9488]/10 text-[#0D9488]' };
    default:
      return { label: 'Link', icon: ExternalLink, color: 'bg-muted text-muted-foreground' };
  }
}

function getRelatedModules(currentModule: Module): Module[] {
  const currentAreas = new Set(currentModule.greenCompAreas);
  return modules
    .filter((m) => m.id !== currentModule.id)
    .map((m) => ({
      module: m,
      overlap: m.greenCompAreas.filter((area) => currentAreas.has(area)).length,
    }))
    .filter((item) => item.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
    .map((item) => item.module);
}

// ─── Component ──────────────────────────────────────────────────────────────

interface ResourcesTabProps {
  module: Module;
}

export function ResourcesTab({ module }: ResourcesTabProps) {
  const hasVideos = module.videos.length > 0;
  const hasLinks = module.externalLinks.length > 0;
  const relatedModules = getRelatedModules(module);
  const hasNoResources = !hasVideos && !hasLinks;

  return (
    <div className="space-y-8">
      {/* Empty state */}
      {hasNoResources && relatedModules.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FolderOpen className="size-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-[#1A1A2E] mb-2">
            No Additional Resources
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            There are no extra resources for this module yet. Check back later for
            supplementary materials.
          </p>
        </div>
      )}

      {/* Video resources */}
      {hasVideos && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Video className="size-5 text-[#FF0000]" />
            <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
              Video Resources
            </h3>
          </div>
          <div className="space-y-3">
            {module.videos.map((video) => {
              const title = videoTitleFallbacks[video.titleKey] ?? video.titleKey;
              const badge = getVideoTypeBadge(video.type);
              return (
                <Card key={video.id} className="border-border/60">
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF0000]/10 text-[#FF0000] shrink-0">
                      <Play className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1A1A2E] text-sm truncate">{title}</p>
                      <Badge
                        variant="secondary"
                        className={`mt-1 text-[10px] px-1.5 py-0 ${badge.color}`}
                      >
                        {badge.label}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        <Play className="size-3.5" />
                        Watch
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {hasVideos && hasLinks && <Separator />}

      {/* External links */}
      {hasLinks && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ExternalLink className="size-5 text-[#0D9488]" />
            <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
              External Links
            </h3>
          </div>
          <div className="space-y-3">
            {module.externalLinks.map((link, i) => {
              const title = linkTitleFallbacks[link.titleKey] ?? link.titleKey;
              const info = getLinkTypeInfo(link.type);
              const LinkIcon = info.icon;
              return (
                <Card key={i} className="border-border/60">
                  <CardContent className="flex items-center gap-4 py-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${info.color}`}
                    >
                      <LinkIcon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1A1A2E] text-sm truncate">{title}</p>
                      <Badge
                        variant="secondary"
                        className={`mt-1 text-[10px] px-1.5 py-0 ${info.color}`}
                      >
                        {info.label}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        Open
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

      {/* Related modules */}
      {relatedModules.length > 0 && (
        <>
          {(hasVideos || hasLinks) && <Separator />}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="size-5 text-[#064E3B]" />
              <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
                Related Modules
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Modules that share GreenComp competency areas with this one.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedModules.map((related) => {
                const title = moduleTitles[related.number] ?? related.titleKey;
                return (
                  <Card key={related.id} className="border-border/60 hover:shadow-md transition-shadow">
                    <CardContent className="py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#064E3B]/10 text-[#064E3B] font-display font-bold text-sm shrink-0">
                          {String(related.number).padStart(2, '0')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#1A1A2E] text-sm leading-tight line-clamp-2">
                            {title}
                          </p>
                          <a
                            href={`/modules/${related.id}`}
                            className="inline-flex items-center gap-1 text-xs text-[#064E3B] hover:text-[#043927] font-medium mt-2"
                          >
                            Explore
                            <ArrowRight className="size-3" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* Friendly message when only related modules exist */}
      {hasNoResources && relatedModules.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            No additional videos or links are available for this module, but you can
            explore related modules above.
          </p>
        </div>
      )}
    </div>
  );
}

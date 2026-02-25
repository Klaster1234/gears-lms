'use client';

import { ExternalLink, Play, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { VideoResource } from '@/types';

// Fallback video titles in English
const videoTitleFallbacks: Record<string, string> = {
  'modules.1.videos.intro5r': 'Introduction to the 5R Principles',
  'modules.1.videos.short5r': '5R Principles - Quick Overview',
  'modules.3.videos.composting': 'Composting Basics',
  'modules.8.videos.energy1': 'Understanding Energy Efficiency',
  'modules.8.videos.energy2': 'Saving Energy at Home',
  'modules.8.videos.energy3': 'Renewable Energy Sources',
  'modules.8.videos.energy4': 'Your Carbon Footprint',
  'modules.10.videos.ecoAnxiety': 'Understanding Eco-Anxiety',
};

interface VideoEmbedProps {
  video: VideoResource;
}

export function VideoEmbed({ video }: VideoEmbedProps) {
  const title = videoTitleFallbacks[video.titleKey] ?? video.titleKey;

  if (video.type === 'external') {
    return (
      <Card className="border-border/60">
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0D9488]/10 text-[#0D9488] shrink-0">
            <ExternalLink className="size-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-[#1A1A2E] truncate">{title}</h4>
            <p className="text-sm text-muted-foreground">External resource</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              Launch
              <ExternalLink className="size-3.5" />
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (video.type === 'youtube-short') {
    return (
      <div className="flex flex-col items-center gap-2">
        <h4 className="font-medium text-[#1A1A2E] text-sm">{title}</h4>
        <div className="relative mx-auto w-full max-w-[320px]">
          {/* Phone-like frame */}
          <div className="rounded-2xl border-4 border-[#1A1A2E]/10 bg-[#1A1A2E] p-1 shadow-lg">
            <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '9/16' }}>
              <iframe
                src={video.embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (video.type === 'facebook') {
    return (
      <div className="space-y-2">
        <h4 className="font-medium text-[#1A1A2E] text-sm">{title}</h4>
        <Card className="border-border/60">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1877F2]/10 text-[#1877F2] shrink-0">
              <Video className="size-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#1A1A2E]">{title}</p>
              <p className="text-sm text-muted-foreground">Video on Facebook</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                <Play className="size-3.5" />
                Watch
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Standard YouTube embed (16:9)
  return (
    <div className="space-y-2">
      <h4 className="font-medium text-[#1A1A2E] text-sm">{title}</h4>
      <div className="relative w-full overflow-hidden rounded-lg border border-border/60 shadow-sm" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={video.embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}

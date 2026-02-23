'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ModuleHeader } from '@/components/modules/module-header';
import { ModuleTabs } from '@/components/modules/module-tabs';
import type { Module } from '@/types';

// English fallback titles
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

interface ModuleDetailClientProps {
  module: Module;
  prevModule: Module | null;
  nextModule: Module | null;
}

export function ModuleDetailClient({
  module,
  prevModule,
  nextModule,
}: ModuleDetailClientProps) {
  return (
    <section className="min-h-screen bg-[#FAFAF5]">
      {/* Header */}
      <div className="bg-card pt-8 pb-0">
        <div className="container mx-auto px-4 mb-6">
          <Link
            href="/modules"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#2E7D32] transition-colors"
          >
            <ChevronLeft className="size-4" />
            All Modules
          </Link>
        </div>
        <ModuleHeader module={module} />
      </div>

      {/* Tabs content */}
      <div className="container mx-auto px-4 py-8">
        <ModuleTabs module={module} />
      </div>

      {/* Navigation */}
      <div className="border-t border-border/60 bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {prevModule ? (
              <Button variant="outline" asChild>
                <Link href={`/modules/${prevModule.id}`}>
                  <ChevronLeft className="size-4" />
                  <span className="hidden sm:inline">
                    Module {prevModule.number}: {moduleTitles[prevModule.number]?.split(':')[0] ?? 'Previous'}
                  </span>
                  <span className="sm:hidden">Previous</span>
                </Link>
              </Button>
            ) : (
              <div />
            )}

            {nextModule ? (
              <Button variant="outline" asChild>
                <Link href={`/modules/${nextModule.id}`}>
                  <span className="hidden sm:inline">
                    Module {nextModule.number}: {moduleTitles[nextModule.number]?.split(':')[0] ?? 'Next'}
                  </span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

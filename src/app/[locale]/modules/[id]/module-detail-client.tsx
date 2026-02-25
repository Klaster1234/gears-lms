'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="min-h-screen bg-[#FAF8F0] pt-16">
      {/* Header area */}
      <div className="bg-white pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pt-8 pb-6"
          >
            <Link
              href="/modules"
              className="group inline-flex items-center gap-2 text-sm text-[#1A1A2E]/40 transition-colors duration-300 hover:text-[#064E3B]"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-medium uppercase tracking-[0.15em] text-[12px]">
                All Modules
              </span>
            </Link>
          </motion.div>
        </div>

        <ModuleHeader module={module} />
      </div>

      {/* Tabs content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <ModuleTabs module={module} />
      </div>

      {/* Bottom navigation between modules */}
      <div className="border-t border-[#E5E2DB] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-stretch">
            {/* Previous module */}
            {prevModule ? (
              <Link
                href={`/modules/${prevModule.id}`}
                className="group flex flex-1 items-center gap-4 py-6 pr-6 transition-colors duration-300 hover:bg-[#FAF8F0]"
              >
                <ChevronLeft className="size-5 shrink-0 text-[#1A1A2E]/25 transition-all duration-300 group-hover:text-[#064E3B] group-hover:-translate-x-1" />
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1A1A2E]/30 mb-1">
                    Previous
                  </p>
                  <p className="text-sm font-medium text-[#1A1A2E]/70 truncate transition-colors duration-300 group-hover:text-[#064E3B]">
                    <span className="hidden sm:inline">
                      Module {prevModule.number}:&nbsp;
                    </span>
                    {moduleTitles[prevModule.number]?.split(':')[0] ?? 'Previous'}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {/* Divider */}
            {prevModule && nextModule && (
              <div className="w-px bg-[#E5E2DB]" />
            )}

            {/* Next module */}
            {nextModule ? (
              <Link
                href={`/modules/${nextModule.id}`}
                className="group flex flex-1 items-center justify-end gap-4 py-6 pl-6 text-right transition-colors duration-300 hover:bg-[#FAF8F0]"
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1A1A2E]/30 mb-1">
                    Next
                  </p>
                  <p className="text-sm font-medium text-[#1A1A2E]/70 truncate transition-colors duration-300 group-hover:text-[#064E3B]">
                    <span className="hidden sm:inline">
                      Module {nextModule.number}:&nbsp;
                    </span>
                    {moduleTitles[nextModule.number]?.split(':')[0] ?? 'Next'}
                  </p>
                </div>
                <ChevronRight className="size-5 shrink-0 text-[#1A1A2E]/25 transition-all duration-300 group-hover:text-[#064E3B] group-hover:translate-x-1" />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

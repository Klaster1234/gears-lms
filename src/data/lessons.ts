import type { Lesson } from '@/types';

export const lessons: Lesson[] = [
  // ─── Module 1: Introduction to Sustainability & the 5R Principles ──────────
  {
    moduleId: 'intro-5r',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module1.intro.title',
        bodyKey: 'lessons.module1.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module1.whatIs5r.title',
        bodyKey: 'lessons.module1.whatIs5r.body',
      },
      {
        type: 'callout',
        variant: 'info',
        titleKey: 'lessons.module1.hierarchy.title',
        bodyKey: 'lessons.module1.hierarchy.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module1.stats.wastePerCapita.value',
            labelKey: 'lessons.module1.stats.wastePerCapita.label',
            sourceKey: 'lessons.module1.stats.wastePerCapita.source',
          },
          {
            valueKey: 'lessons.module1.stats.recyclingRate.value',
            labelKey: 'lessons.module1.stats.recyclingRate.label',
            sourceKey: 'lessons.module1.stats.recyclingRate.source',
          },
          {
            valueKey: 'lessons.module1.stats.circularRate.value',
            labelKey: 'lessons.module1.stats.circularRate.label',
            sourceKey: 'lessons.module1.stats.circularRate.source',
          },
        ],
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module1.caseStudy.title',
        locationKey: 'lessons.module1.caseStudy.location',
        bodyKey: 'lessons.module1.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module1.tips.title',
        items: [
          { textKey: 'lessons.module1.tips.item1' },
          { textKey: 'lessons.module1.tips.item2' },
          { textKey: 'lessons.module1.tips.item3' },
          { textKey: 'lessons.module1.tips.item4' },
          { textKey: 'lessons.module1.tips.item5' },
          { textKey: 'lessons.module1.tips.item6' },
        ],
      },
    ],
  },

  // ─── Module 2: Understanding Waste & the Zero Waste Mindset ────────────────
  {
    moduleId: 'waste-zero-waste',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module2.intro.title',
        bodyKey: 'lessons.module2.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module2.wasteOrigins.title',
        bodyKey: 'lessons.module2.wasteOrigins.body',
      },
      {
        type: 'callout',
        variant: 'warning',
        titleKey: 'lessons.module2.environmental.title',
        bodyKey: 'lessons.module2.environmental.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module2.stats.totalWaste.value',
            labelKey: 'lessons.module2.stats.totalWaste.label',
            sourceKey: 'lessons.module2.stats.totalWaste.source',
          },
          {
            valueKey: 'lessons.module2.stats.landfillRate.value',
            labelKey: 'lessons.module2.stats.landfillRate.label',
            sourceKey: 'lessons.module2.stats.landfillRate.source',
          },
          {
            valueKey: 'lessons.module2.stats.foodWaste.value',
            labelKey: 'lessons.module2.stats.foodWaste.label',
            sourceKey: 'lessons.module2.stats.foodWaste.source',
          },
        ],
      },
      {
        type: 'text',
        titleKey: 'lessons.module2.zeroWaste.title',
        bodyKey: 'lessons.module2.zeroWaste.body',
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module2.caseStudy.title',
        locationKey: 'lessons.module2.caseStudy.location',
        bodyKey: 'lessons.module2.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module2.tips.title',
        items: [
          { textKey: 'lessons.module2.tips.item1' },
          { textKey: 'lessons.module2.tips.item2' },
          { textKey: 'lessons.module2.tips.item3' },
          { textKey: 'lessons.module2.tips.item4' },
          { textKey: 'lessons.module2.tips.item5' },
          { textKey: 'lessons.module2.tips.item6' },
        ],
      },
    ],
  },

  // ─── Module 3: Composting for Households & Communities ─────────────────────
  {
    moduleId: 'composting',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module3.intro.title',
        bodyKey: 'lessons.module3.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module3.science.title',
        bodyKey: 'lessons.module3.science.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module3.systems.title',
        bodyKey: 'lessons.module3.systems.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module3.stats.bioWaste.value',
            labelKey: 'lessons.module3.stats.bioWaste.label',
            sourceKey: 'lessons.module3.stats.bioWaste.source',
          },
          {
            valueKey: 'lessons.module3.stats.methane.value',
            labelKey: 'lessons.module3.stats.methane.label',
            sourceKey: 'lessons.module3.stats.methane.source',
          },
          {
            valueKey: 'lessons.module3.stats.compostBenefit.value',
            labelKey: 'lessons.module3.stats.compostBenefit.label',
            sourceKey: 'lessons.module3.stats.compostBenefit.source',
          },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        titleKey: 'lessons.module3.whatToCompost.title',
        bodyKey: 'lessons.module3.whatToCompost.body',
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module3.caseStudy.title',
        locationKey: 'lessons.module3.caseStudy.location',
        bodyKey: 'lessons.module3.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module3.tips.title',
        items: [
          { textKey: 'lessons.module3.tips.item1' },
          { textKey: 'lessons.module3.tips.item2' },
          { textKey: 'lessons.module3.tips.item3' },
          { textKey: 'lessons.module3.tips.item4' },
          { textKey: 'lessons.module3.tips.item5' },
          { textKey: 'lessons.module3.tips.item6' },
        ],
      },
    ],
  },
];

export function getLessonByModuleId(moduleId: string): Lesson | undefined {
  return lessons.find((l) => l.moduleId === moduleId);
}

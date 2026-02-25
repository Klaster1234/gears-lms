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
  // ─── Module 4: Sustainable Shopping: Food, Fashion & Beyond ───────────────
  {
    moduleId: 'sustainable-shopping',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module4.intro.title',
        bodyKey: 'lessons.module4.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module4.lifecycle.title',
        bodyKey: 'lessons.module4.lifecycle.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module4.foodChoices.title',
        bodyKey: 'lessons.module4.foodChoices.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module4.stats.foodWaste.value',
            labelKey: 'lessons.module4.stats.foodWaste.label',
            sourceKey: 'lessons.module4.stats.foodWaste.source',
          },
          {
            valueKey: 'lessons.module4.stats.packaging.value',
            labelKey: 'lessons.module4.stats.packaging.label',
            sourceKey: 'lessons.module4.stats.packaging.source',
          },
          {
            valueKey: 'lessons.module4.stats.ecoLabel.value',
            labelKey: 'lessons.module4.stats.ecoLabel.label',
            sourceKey: 'lessons.module4.stats.ecoLabel.source',
          },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        titleKey: 'lessons.module4.labels.title',
        bodyKey: 'lessons.module4.labels.body',
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module4.caseStudy.title',
        locationKey: 'lessons.module4.caseStudy.location',
        bodyKey: 'lessons.module4.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module4.tips.title',
        items: [
          { textKey: 'lessons.module4.tips.item1' },
          { textKey: 'lessons.module4.tips.item2' },
          { textKey: 'lessons.module4.tips.item3' },
          { textKey: 'lessons.module4.tips.item4' },
          { textKey: 'lessons.module4.tips.item5' },
          { textKey: 'lessons.module4.tips.item6' },
        ],
      },
    ],
  },

  // ─── Module 5: Circular Economy Basics ──────────────────────────────────────
  {
    moduleId: 'circular-economy',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module5.intro.title',
        bodyKey: 'lessons.module5.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module5.principles.title',
        bodyKey: 'lessons.module5.principles.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module5.business.title',
        bodyKey: 'lessons.module5.business.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module5.stats.materialUse.value',
            labelKey: 'lessons.module5.stats.materialUse.label',
            sourceKey: 'lessons.module5.stats.materialUse.source',
          },
          {
            valueKey: 'lessons.module5.stats.circularJobs.value',
            labelKey: 'lessons.module5.stats.circularJobs.label',
            sourceKey: 'lessons.module5.stats.circularJobs.source',
          },
          {
            valueKey: 'lessons.module5.stats.eWaste.value',
            labelKey: 'lessons.module5.stats.eWaste.label',
            sourceKey: 'lessons.module5.stats.eWaste.source',
          },
        ],
      },
      {
        type: 'callout',
        variant: 'eu',
        titleKey: 'lessons.module5.euPolicy.title',
        bodyKey: 'lessons.module5.euPolicy.body',
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module5.caseStudy.title',
        locationKey: 'lessons.module5.caseStudy.location',
        bodyKey: 'lessons.module5.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module5.tips.title',
        items: [
          { textKey: 'lessons.module5.tips.item1' },
          { textKey: 'lessons.module5.tips.item2' },
          { textKey: 'lessons.module5.tips.item3' },
          { textKey: 'lessons.module5.tips.item4' },
          { textKey: 'lessons.module5.tips.item5' },
          { textKey: 'lessons.module5.tips.item6' },
        ],
      },
    ],
  },

  // ─── Module 6: Fast & Slow Fashion ──────────────────────────────────────────
  {
    moduleId: 'fast-slow-fashion',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module6.intro.title',
        bodyKey: 'lessons.module6.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module6.fastFashion.title',
        bodyKey: 'lessons.module6.fastFashion.body',
      },
      {
        type: 'callout',
        variant: 'warning',
        titleKey: 'lessons.module6.socialCost.title',
        bodyKey: 'lessons.module6.socialCost.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module6.stats.waterUse.value',
            labelKey: 'lessons.module6.stats.waterUse.label',
            sourceKey: 'lessons.module6.stats.waterUse.source',
          },
          {
            valueKey: 'lessons.module6.stats.textileWaste.value',
            labelKey: 'lessons.module6.stats.textileWaste.label',
            sourceKey: 'lessons.module6.stats.textileWaste.source',
          },
          {
            valueKey: 'lessons.module6.stats.microplastics.value',
            labelKey: 'lessons.module6.stats.microplastics.label',
            sourceKey: 'lessons.module6.stats.microplastics.source',
          },
        ],
      },
      {
        type: 'text',
        titleKey: 'lessons.module6.slowFashion.title',
        bodyKey: 'lessons.module6.slowFashion.body',
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module6.caseStudy.title',
        locationKey: 'lessons.module6.caseStudy.location',
        bodyKey: 'lessons.module6.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module6.tips.title',
        items: [
          { textKey: 'lessons.module6.tips.item1' },
          { textKey: 'lessons.module6.tips.item2' },
          { textKey: 'lessons.module6.tips.item3' },
          { textKey: 'lessons.module6.tips.item4' },
          { textKey: 'lessons.module6.tips.item5' },
          { textKey: 'lessons.module6.tips.item6' },
        ],
      },
    ],
  },

  // ─── Module 7: Green Consumption & Greenwashing ─────────────────────────────
  {
    moduleId: 'green-consumption',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module7.intro.title',
        bodyKey: 'lessons.module7.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module7.greenwashing.title',
        bodyKey: 'lessons.module7.greenwashing.body',
      },
      {
        type: 'callout',
        variant: 'warning',
        titleKey: 'lessons.module7.tactics.title',
        bodyKey: 'lessons.module7.tactics.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module7.certifications.title',
        bodyKey: 'lessons.module7.certifications.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module7.stats.consumerDemand.value',
            labelKey: 'lessons.module7.stats.consumerDemand.label',
            sourceKey: 'lessons.module7.stats.consumerDemand.source',
          },
          {
            valueKey: 'lessons.module7.stats.greenClaims.value',
            labelKey: 'lessons.module7.stats.greenClaims.label',
            sourceKey: 'lessons.module7.stats.greenClaims.source',
          },
          {
            valueKey: 'lessons.module7.stats.ecolabelProducts.value',
            labelKey: 'lessons.module7.stats.ecolabelProducts.label',
            sourceKey: 'lessons.module7.stats.ecolabelProducts.source',
          },
        ],
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module7.caseStudy.title',
        locationKey: 'lessons.module7.caseStudy.location',
        bodyKey: 'lessons.module7.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module7.tips.title',
        items: [
          { textKey: 'lessons.module7.tips.item1' },
          { textKey: 'lessons.module7.tips.item2' },
          { textKey: 'lessons.module7.tips.item3' },
          { textKey: 'lessons.module7.tips.item4' },
          { textKey: 'lessons.module7.tips.item5' },
          { textKey: 'lessons.module7.tips.item6' },
        ],
      },
    ],
  },

  // ─── Module 8: Energy Efficiency & Ecological Footprint ─────────────────────
  {
    moduleId: 'energy-efficiency',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module8.intro.title',
        bodyKey: 'lessons.module8.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module8.footprint.title',
        bodyKey: 'lessons.module8.footprint.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module8.homeEnergy.title',
        bodyKey: 'lessons.module8.homeEnergy.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module8.stats.householdShare.value',
            labelKey: 'lessons.module8.stats.householdShare.label',
            sourceKey: 'lessons.module8.stats.householdShare.source',
          },
          {
            valueKey: 'lessons.module8.stats.renewables.value',
            labelKey: 'lessons.module8.stats.renewables.label',
            sourceKey: 'lessons.module8.stats.renewables.source',
          },
          {
            valueKey: 'lessons.module8.stats.ledSavings.value',
            labelKey: 'lessons.module8.stats.ledSavings.label',
            sourceKey: 'lessons.module8.stats.ledSavings.source',
          },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        titleKey: 'lessons.module8.audit.title',
        bodyKey: 'lessons.module8.audit.body',
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module8.caseStudy.title',
        locationKey: 'lessons.module8.caseStudy.location',
        bodyKey: 'lessons.module8.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module8.tips.title',
        items: [
          { textKey: 'lessons.module8.tips.item1' },
          { textKey: 'lessons.module8.tips.item2' },
          { textKey: 'lessons.module8.tips.item3' },
          { textKey: 'lessons.module8.tips.item4' },
          { textKey: 'lessons.module8.tips.item5' },
          { textKey: 'lessons.module8.tips.item6' },
        ],
      },
    ],
  },

  // ─── Module 9: Community Action for Sustainability ──────────────────────────
  {
    moduleId: 'community-action',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module9.intro.title',
        bodyKey: 'lessons.module9.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module9.forms.title',
        bodyKey: 'lessons.module9.forms.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module9.organizing.title',
        bodyKey: 'lessons.module9.organizing.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module9.stats.energyCoops.value',
            labelKey: 'lessons.module9.stats.energyCoops.label',
            sourceKey: 'lessons.module9.stats.energyCoops.source',
          },
          {
            valueKey: 'lessons.module9.stats.urbanGardens.value',
            labelKey: 'lessons.module9.stats.urbanGardens.label',
            sourceKey: 'lessons.module9.stats.urbanGardens.source',
          },
          {
            valueKey: 'lessons.module9.stats.volunteers.value',
            labelKey: 'lessons.module9.stats.volunteers.label',
            sourceKey: 'lessons.module9.stats.volunteers.source',
          },
        ],
      },
      {
        type: 'callout',
        variant: 'eu',
        titleKey: 'lessons.module9.euSupport.title',
        bodyKey: 'lessons.module9.euSupport.body',
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module9.caseStudy.title',
        locationKey: 'lessons.module9.caseStudy.location',
        bodyKey: 'lessons.module9.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module9.tips.title',
        items: [
          { textKey: 'lessons.module9.tips.item1' },
          { textKey: 'lessons.module9.tips.item2' },
          { textKey: 'lessons.module9.tips.item3' },
          { textKey: 'lessons.module9.tips.item4' },
          { textKey: 'lessons.module9.tips.item5' },
          { textKey: 'lessons.module9.tips.item6' },
        ],
      },
    ],
  },

  // ─── Module 10: Eco-Anxiety & Emotional Resilience ──────────────────────────
  {
    moduleId: 'eco-anxiety',
    sections: [
      {
        type: 'introduction',
        titleKey: 'lessons.module10.intro.title',
        bodyKey: 'lessons.module10.intro.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module10.science.title',
        bodyKey: 'lessons.module10.science.body',
      },
      {
        type: 'callout',
        variant: 'info',
        titleKey: 'lessons.module10.constructive.title',
        bodyKey: 'lessons.module10.constructive.body',
      },
      {
        type: 'text',
        titleKey: 'lessons.module10.coping.title',
        bodyKey: 'lessons.module10.coping.body',
      },
      {
        type: 'statistic',
        figures: [
          {
            valueKey: 'lessons.module10.stats.youthWorry.value',
            labelKey: 'lessons.module10.stats.youthWorry.label',
            sourceKey: 'lessons.module10.stats.youthWorry.source',
          },
          {
            valueKey: 'lessons.module10.stats.adultAnxiety.value',
            labelKey: 'lessons.module10.stats.adultAnxiety.label',
            sourceKey: 'lessons.module10.stats.adultAnxiety.source',
          },
          {
            valueKey: 'lessons.module10.stats.actionBenefit.value',
            labelKey: 'lessons.module10.stats.actionBenefit.label',
            sourceKey: 'lessons.module10.stats.actionBenefit.source',
          },
        ],
      },
      {
        type: 'case-study',
        titleKey: 'lessons.module10.caseStudy.title',
        locationKey: 'lessons.module10.caseStudy.location',
        bodyKey: 'lessons.module10.caseStudy.body',
      },
      {
        type: 'tip-list',
        titleKey: 'lessons.module10.tips.title',
        items: [
          { textKey: 'lessons.module10.tips.item1' },
          { textKey: 'lessons.module10.tips.item2' },
          { textKey: 'lessons.module10.tips.item3' },
          { textKey: 'lessons.module10.tips.item4' },
          { textKey: 'lessons.module10.tips.item5' },
          { textKey: 'lessons.module10.tips.item6' },
        ],
      },
    ],
  },
];

export function getLessonByModuleId(moduleId: string): Lesson | undefined {
  return lessons.find((l) => l.moduleId === moduleId);
}

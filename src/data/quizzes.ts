import type { QuizData } from '@/types';

export const quizzes: QuizData[] = [
  // ─── Module 1: Intro to 5R (MCQ - "Which R fits best?") ────────────────────
  {
    moduleId: 'intro-5r',
    type: 'mcq',
    passingScore: 60,
    mcq: [
      {
        id: 'm1-q1',
        questionKey: 'quizzes.module1.q1.question',
        options: [
          { key: 'quizzes.module1.q1.options.refuse', value: 'refuse' },
          { key: 'quizzes.module1.q1.options.reduce', value: 'reduce' },
          { key: 'quizzes.module1.q1.options.reuse', value: 'reuse' },
          { key: 'quizzes.module1.q1.options.repurpose', value: 'repurpose' },
          { key: 'quizzes.module1.q1.options.recycle', value: 'recycle' },
        ],
        correctAnswer: 'refuse',
        feedbackKey: 'quizzes.module1.q1.feedback',
      },
      {
        id: 'm1-q2',
        questionKey: 'quizzes.module1.q2.question',
        options: [
          { key: 'quizzes.module1.q2.options.refuse', value: 'refuse' },
          { key: 'quizzes.module1.q2.options.reduce', value: 'reduce' },
          { key: 'quizzes.module1.q2.options.reuse', value: 'reuse' },
          { key: 'quizzes.module1.q2.options.repurpose', value: 'repurpose' },
          { key: 'quizzes.module1.q2.options.recycle', value: 'recycle' },
        ],
        correctAnswer: 'reduce',
        feedbackKey: 'quizzes.module1.q2.feedback',
      },
      {
        id: 'm1-q3',
        questionKey: 'quizzes.module1.q3.question',
        options: [
          { key: 'quizzes.module1.q3.options.refuse', value: 'refuse' },
          { key: 'quizzes.module1.q3.options.reduce', value: 'reduce' },
          { key: 'quizzes.module1.q3.options.reuse', value: 'reuse' },
          { key: 'quizzes.module1.q3.options.repurpose', value: 'repurpose' },
          { key: 'quizzes.module1.q3.options.recycle', value: 'recycle' },
        ],
        correctAnswer: 'repurpose',
        feedbackKey: 'quizzes.module1.q3.feedback',
      },
      {
        id: 'm1-q4',
        questionKey: 'quizzes.module1.q4.question',
        options: [
          { key: 'quizzes.module1.q4.options.refuse', value: 'refuse' },
          { key: 'quizzes.module1.q4.options.reduce', value: 'reduce' },
          { key: 'quizzes.module1.q4.options.reuse', value: 'reuse' },
          { key: 'quizzes.module1.q4.options.repurpose', value: 'repurpose' },
          { key: 'quizzes.module1.q4.options.recycle', value: 'recycle' },
        ],
        correctAnswer: 'reuse',
        feedbackKey: 'quizzes.module1.q4.feedback',
      },
      {
        id: 'm1-q5',
        questionKey: 'quizzes.module1.q5.question',
        options: [
          { key: 'quizzes.module1.q5.options.refuse', value: 'refuse' },
          { key: 'quizzes.module1.q5.options.reduce', value: 'reduce' },
          { key: 'quizzes.module1.q5.options.reuse', value: 'reuse' },
          { key: 'quizzes.module1.q5.options.repurpose', value: 'repurpose' },
          { key: 'quizzes.module1.q5.options.recycle', value: 'recycle' },
        ],
        correctAnswer: 'reduce',
        feedbackKey: 'quizzes.module1.q5.feedback',
      },
      {
        id: 'm1-q6',
        questionKey: 'quizzes.module1.q6.question',
        options: [
          { key: 'quizzes.module1.q6.options.refuse', value: 'refuse' },
          { key: 'quizzes.module1.q6.options.reduce', value: 'reduce' },
          { key: 'quizzes.module1.q6.options.reuse', value: 'reuse' },
          { key: 'quizzes.module1.q6.options.repurpose', value: 'repurpose' },
          { key: 'quizzes.module1.q6.options.recycle', value: 'recycle' },
        ],
        correctAnswer: 'repurpose',
        feedbackKey: 'quizzes.module1.q6.feedback',
      },
      {
        id: 'm1-q7',
        questionKey: 'quizzes.module1.q7.question',
        options: [
          { key: 'quizzes.module1.q7.options.refuse', value: 'refuse' },
          { key: 'quizzes.module1.q7.options.reduce', value: 'reduce' },
          { key: 'quizzes.module1.q7.options.reuse', value: 'reuse' },
          { key: 'quizzes.module1.q7.options.repurpose', value: 'repurpose' },
          { key: 'quizzes.module1.q7.options.recycle', value: 'recycle' },
        ],
        correctAnswer: 'recycle',
        feedbackKey: 'quizzes.module1.q7.feedback',
      },
      {
        id: 'm1-q8',
        questionKey: 'quizzes.module1.q8.question',
        options: [
          { key: 'quizzes.module1.q8.options.refuse', value: 'refuse' },
          { key: 'quizzes.module1.q8.options.reduce', value: 'reduce' },
          { key: 'quizzes.module1.q8.options.reuse', value: 'reuse' },
          { key: 'quizzes.module1.q8.options.repurpose', value: 'repurpose' },
          { key: 'quizzes.module1.q8.options.recycle', value: 'recycle' },
        ],
        correctAnswer: 'reuse',
        feedbackKey: 'quizzes.module1.q8.feedback',
      },
    ],
  },

  // ─── Module 2: Waste Segregation (Drag-and-Drop) ───────────────────────────
  {
    moduleId: 'waste-zero-waste',
    type: 'dragdrop',
    passingScore: 60,
    dragdrop: {
      categories: [
        { id: 'bio', labelKey: 'quizzes.module2.categories.bio', color: '#059669' },
        { id: 'plastics-metals', labelKey: 'quizzes.module2.categories.plasticsMetal', color: '#FDD835' },
        { id: 'glass', labelKey: 'quizzes.module2.categories.glass', color: '#26A69A' },
        { id: 'paper', labelKey: 'quizzes.module2.categories.paper', color: '#42A5F5' },
        { id: 'mixed', labelKey: 'quizzes.module2.categories.mixed', color: '#9E9E9E' },
        { id: 'special', labelKey: 'quizzes.module2.categories.special', color: '#EF5350' },
      ],
      items: [
        { id: 'm2-i1', labelKey: 'quizzes.module2.items.bananaPeel', correctCategory: 'bio' },
        { id: 'm2-i2', labelKey: 'quizzes.module2.items.coffeeGroundsFilter', correctCategory: 'bio' },
        { id: 'm2-i3', labelKey: 'quizzes.module2.items.plasticPetBottle', correctCategory: 'plastics-metals' },
        { id: 'm2-i4', labelKey: 'quizzes.module2.items.aluminiumCan', correctCategory: 'plastics-metals' },
        { id: 'm2-i5', labelKey: 'quizzes.module2.items.glassJar', correctCategory: 'glass' },
        { id: 'm2-i6', labelKey: 'quizzes.module2.items.newspaperCardboard', correctCategory: 'paper' },
        { id: 'm2-i7', labelKey: 'quizzes.module2.items.thermalReceipt', correctCategory: 'mixed' },
        { id: 'm2-i8', labelKey: 'quizzes.module2.items.greasyPizzaBox', correctCategory: 'mixed' },
        { id: 'm2-i9', labelKey: 'quizzes.module2.items.usedTissue', correctCategory: 'mixed' },
        { id: 'm2-i10', labelKey: 'quizzes.module2.items.aaBattery', correctCategory: 'special' },
        { id: 'm2-i11', labelKey: 'quizzes.module2.items.lightBulb', correctCategory: 'special' },
        { id: 'm2-i12', labelKey: 'quizzes.module2.items.yogurtCup', correctCategory: 'plastics-metals' },
      ],
    },
  },

  // ─── Module 3: Composting (Drag-and-Drop) ──────────────────────────────────
  {
    moduleId: 'composting',
    type: 'dragdrop',
    passingScore: 60,
    dragdrop: {
      categories: [
        { id: 'greens', labelKey: 'quizzes.module3.categories.greens', color: '#059669' },
        { id: 'browns', labelKey: 'quizzes.module3.categories.browns', color: '#795548' },
        { id: 'forbidden', labelKey: 'quizzes.module3.categories.forbidden', color: '#EF5350' },
      ],
      items: [
        { id: 'm3-i1', labelKey: 'quizzes.module3.items.fruitVegPeels', correctCategory: 'greens' },
        { id: 'm3-i2', labelKey: 'quizzes.module3.items.coffeeGrounds', correctCategory: 'greens' },
        { id: 'm3-i3', labelKey: 'quizzes.module3.items.teaBags', correctCategory: 'greens' },
        { id: 'm3-i4', labelKey: 'quizzes.module3.items.freshGrassClippings', correctCategory: 'greens' },
        { id: 'm3-i5', labelKey: 'quizzes.module3.items.healthyPlantTrimmings', correctCategory: 'greens' },
        { id: 'm3-i6', labelKey: 'quizzes.module3.items.dryLeaves', correctCategory: 'browns' },
        { id: 'm3-i7', labelKey: 'quizzes.module3.items.shreddedCardboard', correctCategory: 'browns' },
        { id: 'm3-i8', labelKey: 'quizzes.module3.items.uncoatedPaper', correctCategory: 'browns' },
        { id: 'm3-i9', labelKey: 'quizzes.module3.items.untreatedSawdust', correctCategory: 'browns' },
        { id: 'm3-i10', labelKey: 'quizzes.module3.items.smallDryTwigs', correctCategory: 'browns' },
        { id: 'm3-i11', labelKey: 'quizzes.module3.items.meatFish', correctCategory: 'forbidden' },
        { id: 'm3-i12', labelKey: 'quizzes.module3.items.fatsOils', correctCategory: 'forbidden' },
        { id: 'm3-i13', labelKey: 'quizzes.module3.items.dairy', correctCategory: 'forbidden' },
        { id: 'm3-i14', labelKey: 'quizzes.module3.items.petWaste', correctCategory: 'forbidden' },
        { id: 'm3-i15', labelKey: 'quizzes.module3.items.plasticGlassMetal', correctCategory: 'forbidden' },
      ],
    },
  },

  // ─── Module 4: Sustainable Shopping (A/B Comparison) ───────────────────────
  {
    moduleId: 'sustainable-shopping',
    type: 'ab-comparison',
    passingScore: 60,
    ab: [
      {
        id: 'm4-q1',
        optionAKey: 'quizzes.module4.q1.optionA',
        optionBKey: 'quizzes.module4.q1.optionB',
        correctAnswer: 'B',
        feedbackKey: 'quizzes.module4.q1.feedback',
      },
      {
        id: 'm4-q2',
        optionAKey: 'quizzes.module4.q2.optionA',
        optionBKey: 'quizzes.module4.q2.optionB',
        correctAnswer: 'B',
        feedbackKey: 'quizzes.module4.q2.feedback',
      },
      {
        id: 'm4-q3',
        optionAKey: 'quizzes.module4.q3.optionA',
        optionBKey: 'quizzes.module4.q3.optionB',
        correctAnswer: 'B',
        feedbackKey: 'quizzes.module4.q3.feedback',
      },
      {
        id: 'm4-q4',
        optionAKey: 'quizzes.module4.q4.optionA',
        optionBKey: 'quizzes.module4.q4.optionB',
        correctAnswer: 'B',
        feedbackKey: 'quizzes.module4.q4.feedback',
      },
      {
        id: 'm4-q5',
        optionAKey: 'quizzes.module4.q5.optionA',
        optionBKey: 'quizzes.module4.q5.optionB',
        correctAnswer: 'B',
        feedbackKey: 'quizzes.module4.q5.feedback',
      },
      {
        id: 'm4-q6',
        optionAKey: 'quizzes.module4.q6.optionA',
        optionBKey: 'quizzes.module4.q6.optionB',
        correctAnswer: 'B',
        feedbackKey: 'quizzes.module4.q6.feedback',
      },
    ],
  },

  // ─── Module 5: Circular Economy (MCQ - "Linear or Circular?") ──────────────
  {
    moduleId: 'circular-economy',
    type: 'mcq',
    passingScore: 60,
    mcq: [
      {
        id: 'm5-q1',
        questionKey: 'quizzes.module5.q1.question',
        options: [
          { key: 'quizzes.module5.q1.options.linear', value: 'linear' },
          { key: 'quizzes.module5.q1.options.circular', value: 'circular' },
        ],
        correctAnswer: 'linear',
        feedbackKey: 'quizzes.module5.q1.feedback',
      },
      {
        id: 'm5-q2',
        questionKey: 'quizzes.module5.q2.question',
        options: [
          { key: 'quizzes.module5.q2.options.linear', value: 'linear' },
          { key: 'quizzes.module5.q2.options.circular', value: 'circular' },
        ],
        correctAnswer: 'circular',
        feedbackKey: 'quizzes.module5.q2.feedback',
      },
      {
        id: 'm5-q3',
        questionKey: 'quizzes.module5.q3.question',
        options: [
          { key: 'quizzes.module5.q3.options.linear', value: 'linear' },
          { key: 'quizzes.module5.q3.options.circular', value: 'circular' },
        ],
        correctAnswer: 'circular',
        feedbackKey: 'quizzes.module5.q3.feedback',
      },
      {
        id: 'm5-q4',
        questionKey: 'quizzes.module5.q4.question',
        options: [
          { key: 'quizzes.module5.q4.options.linear', value: 'linear' },
          { key: 'quizzes.module5.q4.options.circular', value: 'circular' },
        ],
        correctAnswer: 'linear',
        feedbackKey: 'quizzes.module5.q4.feedback',
      },
      {
        id: 'm5-q5',
        questionKey: 'quizzes.module5.q5.question',
        options: [
          { key: 'quizzes.module5.q5.options.linear', value: 'linear' },
          { key: 'quizzes.module5.q5.options.circular', value: 'circular' },
        ],
        correctAnswer: 'circular',
        feedbackKey: 'quizzes.module5.q5.feedback',
      },
      {
        id: 'm5-q6',
        questionKey: 'quizzes.module5.q6.question',
        options: [
          { key: 'quizzes.module5.q6.options.linear', value: 'linear' },
          { key: 'quizzes.module5.q6.options.circular', value: 'circular' },
        ],
        correctAnswer: 'circular',
        feedbackKey: 'quizzes.module5.q6.feedback',
      },
      {
        id: 'm5-q7',
        questionKey: 'quizzes.module5.q7.question',
        options: [
          { key: 'quizzes.module5.q7.options.linear', value: 'linear' },
          { key: 'quizzes.module5.q7.options.circular', value: 'circular' },
        ],
        correctAnswer: 'linear',
        feedbackKey: 'quizzes.module5.q7.feedback',
      },
    ],
  },

  // ─── Module 6: Fast/Slow Fashion (External) ───────────────────────────────
  {
    moduleId: 'fast-slow-fashion',
    type: 'external',
    passingScore: 0,
    externalUrl: 'https://globalgoalscentre.itch.io/threads',
    externalTitle: 'quizzes.module6.externalTitle',
  },

  // ─── Module 7: Green Consumption (MCQ - Eco-label matching) ────────────────
  {
    moduleId: 'green-consumption',
    type: 'mcq',
    passingScore: 60,
    mcq: [
      {
        id: 'm7-q1',
        questionKey: 'quizzes.module7.q1.question',
        options: [
          { key: 'quizzes.module7.q1.options.fsc', value: 'fsc' },
          { key: 'quizzes.module7.q1.options.gots', value: 'gots' },
          { key: 'quizzes.module7.q1.options.euEcolabel', value: 'eu-ecolabel' },
          { key: 'quizzes.module7.q1.options.fairtrade', value: 'fairtrade' },
          { key: 'quizzes.module7.q1.options.msc', value: 'msc' },
          { key: 'quizzes.module7.q1.options.rainforestAlliance', value: 'rainforest-alliance' },
        ],
        correctAnswer: 'fsc',
        feedbackKey: 'quizzes.module7.q1.feedback',
      },
      {
        id: 'm7-q2',
        questionKey: 'quizzes.module7.q2.question',
        options: [
          { key: 'quizzes.module7.q2.options.fsc', value: 'fsc' },
          { key: 'quizzes.module7.q2.options.gots', value: 'gots' },
          { key: 'quizzes.module7.q2.options.euEcolabel', value: 'eu-ecolabel' },
          { key: 'quizzes.module7.q2.options.fairtrade', value: 'fairtrade' },
          { key: 'quizzes.module7.q2.options.msc', value: 'msc' },
          { key: 'quizzes.module7.q2.options.rainforestAlliance', value: 'rainforest-alliance' },
        ],
        correctAnswer: 'gots',
        feedbackKey: 'quizzes.module7.q2.feedback',
      },
      {
        id: 'm7-q3',
        questionKey: 'quizzes.module7.q3.question',
        options: [
          { key: 'quizzes.module7.q3.options.fsc', value: 'fsc' },
          { key: 'quizzes.module7.q3.options.gots', value: 'gots' },
          { key: 'quizzes.module7.q3.options.euEcolabel', value: 'eu-ecolabel' },
          { key: 'quizzes.module7.q3.options.fairtrade', value: 'fairtrade' },
          { key: 'quizzes.module7.q3.options.msc', value: 'msc' },
          { key: 'quizzes.module7.q3.options.rainforestAlliance', value: 'rainforest-alliance' },
        ],
        correctAnswer: 'eu-ecolabel',
        feedbackKey: 'quizzes.module7.q3.feedback',
      },
      {
        id: 'm7-q4',
        questionKey: 'quizzes.module7.q4.question',
        options: [
          { key: 'quizzes.module7.q4.options.fsc', value: 'fsc' },
          { key: 'quizzes.module7.q4.options.gots', value: 'gots' },
          { key: 'quizzes.module7.q4.options.euEcolabel', value: 'eu-ecolabel' },
          { key: 'quizzes.module7.q4.options.fairtrade', value: 'fairtrade' },
          { key: 'quizzes.module7.q4.options.msc', value: 'msc' },
          { key: 'quizzes.module7.q4.options.rainforestAlliance', value: 'rainforest-alliance' },
        ],
        correctAnswer: 'fairtrade',
        feedbackKey: 'quizzes.module7.q4.feedback',
      },
      {
        id: 'm7-q5',
        questionKey: 'quizzes.module7.q5.question',
        options: [
          { key: 'quizzes.module7.q5.options.fsc', value: 'fsc' },
          { key: 'quizzes.module7.q5.options.gots', value: 'gots' },
          { key: 'quizzes.module7.q5.options.euEcolabel', value: 'eu-ecolabel' },
          { key: 'quizzes.module7.q5.options.fairtrade', value: 'fairtrade' },
          { key: 'quizzes.module7.q5.options.msc', value: 'msc' },
          { key: 'quizzes.module7.q5.options.rainforestAlliance', value: 'rainforest-alliance' },
        ],
        correctAnswer: 'msc',
        feedbackKey: 'quizzes.module7.q5.feedback',
      },
      {
        id: 'm7-q6',
        questionKey: 'quizzes.module7.q6.question',
        options: [
          { key: 'quizzes.module7.q6.options.fsc', value: 'fsc' },
          { key: 'quizzes.module7.q6.options.gots', value: 'gots' },
          { key: 'quizzes.module7.q6.options.euEcolabel', value: 'eu-ecolabel' },
          { key: 'quizzes.module7.q6.options.fairtrade', value: 'fairtrade' },
          { key: 'quizzes.module7.q6.options.msc', value: 'msc' },
          { key: 'quizzes.module7.q6.options.rainforestAlliance', value: 'rainforest-alliance' },
        ],
        correctAnswer: 'rainforest-alliance',
        feedbackKey: 'quizzes.module7.q6.feedback',
      },
    ],
  },

  // ─── Module 8: Energy Efficiency (External) ────────────────────────────────
  {
    moduleId: 'energy-efficiency',
    type: 'external',
    passingScore: 0,
    externalUrl: 'https://www.footprintcalculator.org/home/en',
    externalTitle: 'quizzes.module8.externalTitle',
  },

  // ─── Module 9: Community Action (Scenario) ─────────────────────────────────
  {
    moduleId: 'community-action',
    type: 'scenario',
    passingScore: 60,
    scenarios: [
      {
        id: 'm9-s1',
        scenarioKey: 'quizzes.module9.s1.scenario',
        options: [
          {
            key: 'quizzes.module9.s1.options.report',
            isOptimal: true,
            feedbackKey: 'quizzes.module9.s1.feedback.report',
          },
          {
            key: 'quizzes.module9.s1.options.compost',
            isOptimal: false,
            feedbackKey: 'quizzes.module9.s1.feedback.compost',
          },
          {
            key: 'quizzes.module9.s1.options.ignore',
            isOptimal: false,
            feedbackKey: 'quizzes.module9.s1.feedback.ignore',
          },
        ],
      },
      {
        id: 'm9-s2',
        scenarioKey: 'quizzes.module9.s2.scenario',
        options: [
          {
            key: 'quizzes.module9.s2.options.checkPoints',
            isOptimal: true,
            feedbackKey: 'quizzes.module9.s2.feedback.checkPoints',
          },
          {
            key: 'quizzes.module9.s2.options.store',
            isOptimal: false,
            feedbackKey: 'quizzes.module9.s2.feedback.store',
          },
          {
            key: 'quizzes.module9.s2.options.throwMixed',
            isOptimal: false,
            feedbackKey: 'quizzes.module9.s2.feedback.throwMixed',
          },
        ],
      },
      {
        id: 'm9-s3',
        scenarioKey: 'quizzes.module9.s3.scenario',
        options: [
          {
            key: 'quizzes.module9.s3.options.shareGuide',
            isOptimal: true,
            feedbackKey: 'quizzes.module9.s3.feedback.shareGuide',
          },
          {
            key: 'quizzes.module9.s3.options.leadByExample',
            isOptimal: false,
            feedbackKey: 'quizzes.module9.s3.feedback.leadByExample',
          },
          {
            key: 'quizzes.module9.s3.options.argue',
            isOptimal: false,
            feedbackKey: 'quizzes.module9.s3.feedback.argue',
          },
        ],
      },
    ],
  },

  // ─── Module 10: Eco-Anxiety (Guided Form - "From Worry to Action") ─────────
  {
    moduleId: 'eco-anxiety',
    type: 'guided-form',
    passingScore: 0,
    guidedForm: [
      {
        id: 'm10-step1',
        titleKey: 'quizzes.module10.step1.title',
        type: 'checkbox',
        options: [
          { key: 'climate-news', labelKey: 'quizzes.module10.step1.options.climateNews' },
          { key: 'droughts-floods', labelKey: 'quizzes.module10.step1.options.droughtsFloods' },
          { key: 'doing-too-little', labelKey: 'quizzes.module10.step1.options.doingTooLittle' },
          { key: 'family-conflicts', labelKey: 'quizzes.module10.step1.options.familyConflicts' },
          { key: 'info-overload', labelKey: 'quizzes.module10.step1.options.infoOverload' },
        ],
      },
      {
        id: 'm10-step2',
        titleKey: 'quizzes.module10.step2.title',
        type: 'checkbox',
        options: [
          { key: 'helplessness', labelKey: 'quizzes.module10.step2.options.helplessness' },
          { key: 'sadness', labelKey: 'quizzes.module10.step2.options.sadness' },
          { key: 'anger', labelKey: 'quizzes.module10.step2.options.anger' },
          { key: 'tension', labelKey: 'quizzes.module10.step2.options.tension' },
          { key: 'fear', labelKey: 'quizzes.module10.step2.options.fear' },
          { key: 'overwhelm', labelKey: 'quizzes.module10.step2.options.overwhelm' },
          { key: 'guilt', labelKey: 'quizzes.module10.step2.options.guilt' },
        ],
      },
      {
        id: 'm10-step3',
        titleKey: 'quizzes.module10.step3.title',
        type: 'checkbox',
        options: [
          { key: 'limit-news', labelKey: 'quizzes.module10.step3.options.limitNews' },
          { key: 'digital-break', labelKey: 'quizzes.module10.step3.options.digitalBreak' },
          { key: 'micro-action', labelKey: 'quizzes.module10.step3.options.microAction' },
          { key: 'local-initiative', labelKey: 'quizzes.module10.step3.options.localInitiative' },
          { key: 'control-list', labelKey: 'quizzes.module10.step3.options.controlList' },
        ],
      },
      {
        id: 'm10-step4',
        titleKey: 'quizzes.module10.step4.title',
        type: 'radio',
        options: [
          { key: 'no-doomscrolling', labelKey: 'quizzes.module10.step4.options.noDoomscrolling' },
          { key: 'contact-initiative', labelKey: 'quizzes.module10.step4.options.contactInitiative' },
          { key: 'five-r-habit', labelKey: 'quizzes.module10.step4.options.fiveRHabit' },
          { key: 'control-boundaries', labelKey: 'quizzes.module10.step4.options.controlBoundaries' },
        ],
      },
      {
        id: 'm10-step5',
        titleKey: 'quizzes.module10.step5.title',
        type: 'scale',
        options: [
          { key: '1', labelKey: 'quizzes.module10.step5.options.scale1' },
          { key: '2', labelKey: 'quizzes.module10.step5.options.scale2' },
          { key: '3', labelKey: 'quizzes.module10.step5.options.scale3' },
          { key: '4', labelKey: 'quizzes.module10.step5.options.scale4' },
          { key: '5', labelKey: 'quizzes.module10.step5.options.scale5' },
        ],
      },
    ],
  },
];

export function getQuizByModuleId(moduleId: string): QuizData | undefined {
  return quizzes.find((q) => q.moduleId === moduleId);
}

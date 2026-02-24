# Module Content Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add rich educational articles (800-1200 words each) to modules 1-3 in all 3 languages (EN/PL/SK), replacing the current superficial Learning Objectives + Key Concepts with a full structured lesson.

**Architecture:** New `LessonSection` discriminated union type → `src/data/lessons.ts` with structural data → `<LessonContent>` renderer component → translation keys in `messages/*.json` → integrated into existing `learn-tab.tsx`. Data sources: EU (Eurostat/EEA), global (UNEP/IPCC), practical (PL/SK case studies).

**Tech Stack:** Next.js 16, TypeScript, next-intl v4 (`useTranslations()`), Tailwind CSS v4, Framer Motion, Lucide icons

**Palette:** #064E3B (primary), #043927 (dark), #0D9488 (teal), #0F766E (teal-hover), #059669 (emerald), #FAF8F0 (cream), #1A1A2E (text), #D97706/#FBBF24/#F59E0B (amber accents)

**Verification:** `npx next build` (TypeScript + production build) + preview server visual check. No unit test framework exists.

---

## Task 1: Add LessonSection types

**Files:**
- Modify: `src/types/index.ts` (append at end)

**Step 1: Add types**

Append to `src/types/index.ts`:

```typescript
// ─── Lesson Content Types ──────────────────────────────────────────────────

export type LessonSectionType =
  | 'introduction'
  | 'text'
  | 'callout'
  | 'statistic'
  | 'case-study'
  | 'tip-list';

export type CalloutVariant = 'info' | 'warning' | 'tip' | 'eu';

export interface LessonIntroduction {
  type: 'introduction';
  titleKey: string;
  bodyKey: string;
}

export interface LessonText {
  type: 'text';
  titleKey: string;
  bodyKey: string;
}

export interface LessonCallout {
  type: 'callout';
  variant: CalloutVariant;
  titleKey: string;
  bodyKey: string;
}

export interface StatisticFigure {
  valueKey: string;
  labelKey: string;
  sourceKey?: string;
}

export interface LessonStatistic {
  type: 'statistic';
  figures: StatisticFigure[];
}

export interface LessonCaseStudy {
  type: 'case-study';
  titleKey: string;
  locationKey: string;
  bodyKey: string;
}

export interface LessonTipList {
  type: 'tip-list';
  titleKey: string;
  items: { textKey: string }[];
}

export type LessonSection =
  | LessonIntroduction
  | LessonText
  | LessonCallout
  | LessonStatistic
  | LessonCaseStudy
  | LessonTipList;

export interface Lesson {
  moduleId: string;
  sections: LessonSection[];
}
```

**Step 2: Verify build**

Run: `npx next build`
Expected: Build passes, no TypeScript errors.

**Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add LessonSection types for structured educational content"
```

---

## Task 2: Create lessons.ts data file (modules 1-3)

**Files:**
- Create: `src/data/lessons.ts`

**Step 1: Create structural data**

Create `src/data/lessons.ts` with lesson structures for modules 1, 2, 3. Each module has 5-7 sections referencing translation keys like `lessons.module1.intro.title`. Only the STRUCTURE lives here — all display text is in JSON translations.

Key pattern: `lessons.module{N}.{sectionId}.{field}`

Module 1 sections: intro, whatIs5r, hierarchy, stats, caseStudy, tips
Module 2 sections: intro, wasteOrigins, environmental, stats, zeroWaste, caseStudy, tips
Module 3 sections: intro, science, systems, stats, whatToCompost, caseStudy, tips

**Step 2: Verify build**

Run: `npx next build`
Expected: Build passes. No runtime usage yet.

**Step 3: Commit**

```bash
git add src/data/lessons.ts
git commit -m "feat: add lesson structure data for modules 1-3"
```

---

## Task 3: Add English lesson translations

**Files:**
- Modify: `messages/en.json`

**Step 1: Add `lessons` section to en.json**

Add a top-level `"lessons"` key with nested content for modules 1-3. Each module has 800-1200 words of educational content covering:

- Module 1: Sustainability concept (Brundtland 1987), 5R hierarchy with examples, EU waste stats (Eurostat: 505 kg/capita/year, 49.6% recycling rate EU27), case study (Kraków zero-waste shops), 6 practical tips
- Module 2: Waste origins (production→disposal), landfill problems (methane, leachate), EU waste data (225M tonnes municipal waste/year), zero waste philosophy, case study (Ljubljana — first EU zero-waste capital), 6 tips
- Module 3: Composting science (C:N ratio, aerobic decomposition), system types, what can/cannot be composted, EU bio-waste stats (34% of municipal waste is organic), case study (community composting Vienna/Milan), apartment tips

Data sources to reference: Eurostat 2023 waste statistics, EEA reports, UNEP Food Waste Index 2024, European Commission Circular Economy Action Plan.

**Step 2: Verify build**

Run: `npx next build`
Expected: Build passes.

**Step 3: Commit**

```bash
git add messages/en.json
git commit -m "feat: add English lesson content for modules 1-3 (800-1200 words each)"
```

---

## Task 4: Add Polish lesson translations

**Files:**
- Modify: `messages/pl.json`

**Step 1: Add `lessons` section to pl.json**

Translate all Module 1-3 lesson content to Polish. Use natural Polish, not machine-translation style. Adapt case studies for Polish context where relevant (e.g., keep Kraków case study, add Polish recycling rate context: Poland recycles ~39%).

**Step 2: Verify build**

Run: `npx next build`
Expected: Build passes.

**Step 3: Commit**

```bash
git add messages/pl.json
git commit -m "feat: add Polish lesson content for modules 1-3"
```

---

## Task 5: Add Slovak lesson translations

**Files:**
- Modify: `messages/sk.json`

**Step 1: Add `lessons` section to sk.json**

Translate all Module 1-3 lesson content to Slovak. Use natural Slovak. Add Slovak context where relevant (Slovakia recycling rate ~49%).

**Step 2: Verify build**

Run: `npx next build`
Expected: Build passes.

**Step 3: Commit**

```bash
git add messages/sk.json
git commit -m "feat: add Slovak lesson content for modules 1-3"
```

---

## Task 6: Build LessonContent component

**Files:**
- Create: `src/components/modules/lesson-content.tsx`

**Step 1: Create component**

Build `<LessonContent>` React component that:
- Takes `sections: LessonSection[]` prop
- Uses `useTranslations()` from next-intl (no namespace)
- Renders each section type with distinct visual treatment:
  - `introduction`: Teal left-border card, italic lead text, BookOpen icon
  - `text`: H3 heading + paragraph, standard editorial spacing
  - `callout`: Colored rounded box (info=teal, warning=amber, tip=emerald, eu=blue with EU flag icon), icon varies by variant (Info, AlertTriangle, Lightbulb, Flag)
  - `statistic`: 2-3 column grid of cards with large value text, small label, optional source footnote
  - `case-study`: Card with MapPin icon, location badge, descriptive text, border-left accent
  - `tip-list`: Numbered list with Leaf icons, emerald accents
- Uses `'use client'` directive
- Uses Botanical Editorial palette colors
- Separators between sections

**Step 2: Verify build**

Run: `npx next build`
Expected: Build passes.

**Step 3: Commit**

```bash
git add src/components/modules/lesson-content.tsx
git commit -m "feat: add LessonContent component with 6 section renderers"
```

---

## Task 7: Integrate into learn-tab.tsx

**Files:**
- Modify: `src/components/modules/learn-tab.tsx`

**Step 1: Replace hardcoded content with LessonContent**

Changes to `learn-tab.tsx`:
1. Add imports: `import { useTranslations } from 'next-intl'`, `import { LessonContent } from './lesson-content'`, `import { getLessonByModuleId } from '@/data/lessons'`
2. Inside component: `const t = useTranslations()`, `const lesson = getLessonByModuleId(module.id)`
3. Replace hardcoded `learningObjectives` Record with `t()` calls from `lessons.module{N}.objectives.*` keys — OR keep as-is for now, lesson content replaces Key Concepts section
4. Remove `keyConcepts` Record — replaced by full lesson content
5. Insert `{lesson && <LessonContent sections={lesson.sections} />}` between Learning Objectives and Video Content sections
6. Keep `learningObjectives` hardcoded for now (migrate to i18n in a later task) — focus on adding the lesson body

Render order after change:
1. Learning Objectives (existing, keep as-is)
2. Separator
3. **NEW: `<LessonContent sections={lesson.sections} />`**
4. Separator
5. Video Content (existing)
6. External Resources (existing)
7. Key Concepts → **REMOVED** (replaced by lesson content)
8. Mark as Read (existing)

**Step 2: Verify build**

Run: `npx next build`
Expected: Build passes.

**Step 3: Commit**

```bash
git add src/components/modules/learn-tab.tsx
git commit -m "feat: integrate LessonContent into learn-tab, remove hardcoded keyConcepts"
```

---

## Task 8: Visual verification in preview

**Step 1: Start preview server**

Use `preview_start` with name `dev`.

**Step 2: Check Module 1 in English**

Navigate to `/en/modules/intro-5r`, verify:
- Learning Objectives still show
- Full lesson article renders with all section types
- Introduction has teal left-border
- Statistics cards show EU data with large numbers
- Case study has map pin and location
- Tips list has leaf icons
- No console errors

**Step 3: Check Module 1 in Polish**

Navigate to `/pl/modules/intro-5r`, verify Polish lesson text renders correctly.

**Step 4: Check Module 1 in Slovak**

Navigate to `/sk/modules/intro-5r`, verify Slovak lesson text.

**Step 5: Check Module 2 and 3**

Navigate to `/en/modules/waste-zero-waste` and `/en/modules/composting`, verify lesson content renders.

**Step 6: Check modules 4-10 (no lesson yet)**

Navigate to `/en/modules/sustainable-shopping`, verify it still renders without crashing (no lesson data = no LessonContent rendered).

**Step 7: Final build verification**

Run: `npx next build`
Expected: Clean build, no warnings related to lessons.

**Step 8: Commit any fixes**

If visual issues found, fix and commit.

---

## Future Tasks (Not In This Plan)

- Task 9-14: Add lesson content for modules 4-10
- Task 15: Migrate `learningObjectives` from hardcoded to i18n
- Task 16: Migrate `reflectionPrompts` and `finalChallenges` to i18n
- Task 17: Migrate `linkTitleFallbacks` and `videoTitleFallbacks` to i18n
- Task 18: Delete deprecated `src/lib/quiz-text.ts`

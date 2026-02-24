# Module Content Expansion Design

**Date:** 2026-02-24
**Status:** Approved
**Scope:** Modules 1-3 (pilot), then 4-10

## Problem

Current modules are superficial. The Learn tab shows only:
- 4 bullet-point learning objectives (hardcoded English)
- Optional YouTube video (only modules 1, 3, 8, 10 have videos)
- 1-2 sentence "Key Concepts" (hardcoded English)
- Optional external links (only modules 2, 6, 8)

No actual educational content — no articles, no data, no case studies, no practical tips.

## Solution: Structured Lesson Data + LessonContent Component

### Architecture

**Approach C: Structured data file + rendering component**

- `src/data/lessons.ts` — TypeScript file defining lesson structure per module
- `src/components/modules/lesson-content.tsx` — Renders lesson sections
- `messages/*.json` — Translation keys for all text content (EN/PL/SK)
- `src/types/index.ts` — New LessonSection type definitions

### Section Types

```typescript
type LessonSection =
  | { type: 'introduction'; titleKey: string; bodyKey: string }
  | { type: 'text'; titleKey: string; bodyKey: string }
  | { type: 'callout'; variant: 'info' | 'warning' | 'tip' | 'eu'; titleKey: string; bodyKey: string }
  | { type: 'statistic'; figures: { valueKey: string; labelKey: string; sourceKey?: string }[] }
  | { type: 'case-study'; titleKey: string; locationKey: string; bodyKey: string }
  | { type: 'tip-list'; titleKey: string; items: { textKey: string }[] }
```

### Visual Design per Section Type

- **introduction**: Large text with teal left border accent, italic lead paragraph
- **text**: H3 heading + body paragraphs, standard editorial style
- **callout**: Colored box — info=#0D9488, warning=#F59E0B, tip=#064E3B, eu=#2563EB
- **statistic**: Grid of 2-3 cards with large numbers + labels + source attribution
- **case-study**: Card with map pin icon, location badge, descriptive text
- **tip-list**: Numbered/bulleted list with leaf icons, practical actions

### Content Scope per Module

Each module gets 800-1200 words (EN), 5-7 sections:
1. Introduction (context, why this matters)
2. Core concept explanation (text section)
3. EU/global statistics (statistic section)
4. Deeper dive or nuance (text + callout)
5. Real-world case study (European focus)
6. Practical tips (tip-list)

### Data Sources

- EU data: Eurostat, EEA, European Commission reports
- Global: UNEP, IPCC, World Bank
- Practical: Case studies from Poland, Slovakia, Europe
- Framework: GreenComp (JRC) alignment

### Content Plan: Modules 1-3

**Module 1 — Introduction to Sustainability & the 5R Principles**
- History of sustainability concept (Brundtland 1987)
- The 5R hierarchy explained with examples
- EU waste statistics (Eurostat 2023)
- Case study: Zero waste initiatives in Poland
- Practical 5R tips for daily life

**Module 2 — Understanding Waste & the Zero Waste Mindset**
- Where waste comes from: production to disposal
- Environmental impact of landfills vs recycling
- EU waste generation data (505 kg/capita)
- Zero waste philosophy and the 5 principles
- Case study: European zero waste city/initiative
- Home waste reduction tips

**Module 3 — Composting for Households & Communities**
- Science of composting (decomposition, microorganisms)
- Types of composting systems (bin, tumbler, vermicomposting)
- What can and cannot be composted
- Organic waste statistics in EU
- Case study: Community composting program
- Apartment-friendly composting tips

### learn-tab.tsx Changes

Current hardcoded data (`learningObjectives`, `keyConcepts`, `linkTitleFallbacks`) migrated to i18n. New render order:
1. Learning Objectives (from translations)
2. **NEW: `<LessonContent>` with full article**
3. Video Content (unchanged)
4. External Resources (unchanged)
5. Mark as Read (unchanged)

### Reflect-tab & Resources-tab

No changes in this iteration.

### i18n Strategy

Translation keys follow pattern: `lessons.module{N}.{section}.{field}`
Example: `lessons.module1.intro.title`, `lessons.module1.stats.waste.value`

All content in 3 languages: EN, PL, SK.

## Implementation Order

1. Add LessonSection types to `src/types/`
2. Create `src/data/lessons.ts` with module 1-3 structures
3. Add EN/PL/SK translations for lesson content
4. Build `<LessonContent>` component
5. Integrate into learn-tab.tsx
6. Migrate hardcoded learn-tab data to i18n
7. Build, test, verify in preview
8. Repeat for modules 4-10

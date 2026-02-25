import type { GreenCompArea } from '@/types';

export interface GreenCompCompetence {
  id: string;
  titleKey: string;
}

export interface GreenCompAreaData {
  id: GreenCompArea;
  titleKey: string;
  descriptionKey: string;
  color: string;
  icon: string;
  competences: GreenCompCompetence[];
}

export const greenCompAreas: GreenCompAreaData[] = [
  {
    id: 'embodying-values',
    titleKey: 'greencomp.areas.embodyingValues.title',
    descriptionKey: 'greencomp.areas.embodyingValues.description',
    color: '#064E3B',
    icon: '\u{1F331}',
    competences: [
      { id: 'valuing-sustainability', titleKey: 'greencomp.competences.valuingSustainability' },
      { id: 'supporting-fairness', titleKey: 'greencomp.competences.supportingFairness' },
      { id: 'promoting-nature', titleKey: 'greencomp.competences.promotingNature' },
    ],
  },
  {
    id: 'embracing-complexity',
    titleKey: 'greencomp.areas.embracingComplexity.title',
    descriptionKey: 'greencomp.areas.embracingComplexity.description',
    color: '#0D9488',
    icon: '\u{1F504}',
    competences: [
      { id: 'systems-thinking', titleKey: 'greencomp.competences.systemsThinking' },
      { id: 'critical-thinking', titleKey: 'greencomp.competences.criticalThinking' },
      { id: 'problem-framing', titleKey: 'greencomp.competences.problemFraming' },
    ],
  },
  {
    id: 'envisioning-futures',
    titleKey: 'greencomp.areas.envisioningFutures.title',
    descriptionKey: 'greencomp.areas.envisioningFutures.description',
    color: '#F59E0B',
    icon: '\u{1F52E}',
    competences: [
      { id: 'futures-literacy', titleKey: 'greencomp.competences.futuresLiteracy' },
      { id: 'adaptability', titleKey: 'greencomp.competences.adaptability' },
      { id: 'exploratory-thinking', titleKey: 'greencomp.competences.exploratoryThinking' },
    ],
  },
  {
    id: 'acting-for-sustainability',
    titleKey: 'greencomp.areas.actingForSustainability.title',
    descriptionKey: 'greencomp.areas.actingForSustainability.description',
    color: '#043927',
    icon: '\u{270A}',
    competences: [
      { id: 'political-agency', titleKey: 'greencomp.competences.politicalAgency' },
      { id: 'collective-action', titleKey: 'greencomp.competences.collectiveAction' },
      { id: 'individual-initiative', titleKey: 'greencomp.competences.individualInitiative' },
    ],
  },
];

export type QuizType = 'mcq' | 'dragdrop' | 'ab-comparison' | 'scenario' | 'guided-form' | 'external';

export type GreenCompArea =
  | 'embodying-values'
  | 'embracing-complexity'
  | 'envisioning-futures'
  | 'acting-for-sustainability';

export interface Module {
  id: string;
  number: number;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  estimatedMinutes: number;
  greenCompAreas: GreenCompArea[];
  greenCompCompetences: string[];
  videos: VideoResource[];
  externalLinks: ExternalLink[];
  quizType: QuizType;
}

export interface VideoResource {
  id: string;
  titleKey: string;
  url: string;
  embedUrl: string;
  type: 'youtube' | 'youtube-short' | 'facebook' | 'external';
}

export interface ExternalLink {
  titleKey: string;
  url: string;
  type: 'app' | 'game' | 'calculator' | 'presentation';
}

export interface MCQQuestion {
  id: string;
  questionKey: string;
  options: { key: string; value: string }[];
  correctAnswer: string;
  feedbackKey: string;
}

export interface DragDropItem {
  id: string;
  labelKey: string;
  correctCategory: string;
}

export interface DragDropCategory {
  id: string;
  labelKey: string;
  color: string;
}

export interface DragDropQuiz {
  items: DragDropItem[];
  categories: DragDropCategory[];
}

export interface ABQuestion {
  id: string;
  optionAKey: string;
  optionBKey: string;
  correctAnswer: 'A' | 'B';
  feedbackKey: string;
}

export interface ScenarioQuestion {
  id: string;
  scenarioKey: string;
  options: { key: string; isOptimal: boolean; feedbackKey: string }[];
}

export interface GuidedFormStep {
  id: string;
  titleKey: string;
  type: 'checkbox' | 'radio' | 'textarea' | 'scale';
  options?: { key: string; labelKey: string }[];
}

export interface QuizData {
  moduleId: string;
  type: QuizType;
  passingScore: number; // 0-100 percentage
  mcq?: MCQQuestion[];
  dragdrop?: DragDropQuiz;
  ab?: ABQuestion[];
  scenarios?: ScenarioQuestion[];
  guidedForm?: GuidedFormStep[];
  externalUrl?: string;
  externalTitle?: string;
}

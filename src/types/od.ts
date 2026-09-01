export type EmotionType = 
  | 'Frustration' 
  | 'Exhaustion' 
  | 'Disengagement' 
  | 'Ambiguity' 
  | 'Cultural Erosion' 
  | 'Satisfaction' 
  | 'Constructive Suggestion';

export type IntensityLevel = 'Low' | 'Moderate' | 'High' | 'Severe';

export type FeedbackSource = 
  | 'Slack / Teams Message' 
  | 'Quarterly Pulse Survey' 
  | '1-on-1 Notes' 
  | 'Glassdoor / Public Review' 
  | 'All-Hands Q&A' 
  | 'Exit Interview';

export type Department = 
  | 'Engineering' 
  | 'Product & Design' 
  | 'Sales & Marketing' 
  | 'Customer Support' 
  | 'Operations & HR' 
  | 'Cross-functional';

export interface FeedbackItem {
  id: string;
  text: string;
  source: FeedbackSource;
  department: Department;
  sentimentValence: number; // -1.0 (very negative) to +1.0 (very positive)
  intensity: IntensityLevel;
  primaryEmotion: EmotionType;
  dominantTheme: string;
  odFrameworkMapping: {
    mckinsey7s: 'Strategy' | 'Structure' | 'Systems' | 'Shared Values' | 'Style' | 'Staff' | 'Skills';
    burkeLitwin: 'Mission/Strategy' | 'Leadership' | 'Culture' | 'Structure' | 'Management Practices' | 'Systems' | 'Work Unit Climate' | 'Motivation' | 'Individual Needs';
  };
  timestamp?: string;
  extractedKeywords: string[];
}

export interface ThemeCluster {
  id: string;
  name: string;
  category: string;
  signalCount: number;
  avgValence: number;
  intensityLevel: IntensityLevel;
  keywords: string[];
  sampleQuotes: string[];
  primaryFramework: string;
}

export interface McKinsey7SDiagnostic {
  dimension: 'Strategy' | 'Structure' | 'Systems' | 'Shared Values' | 'Style' | 'Staff' | 'Skills';
  healthScore: number; // 0 - 100
  status: 'Critical Friction' | 'Needs Attention' | 'Stable' | 'Healthy';
  summary: string;
  signalsCount: number;
  dominantGaps: string[];
  evidenceQuotes: string[];
}

export interface BurkeLitwinDiagnostic {
  factor: 'Mission/Strategy' | 'Leadership' | 'Culture' | 'Structure' | 'Management Practices' | 'Systems' | 'Work Unit Climate' | 'Motivation' | 'Individual Needs';
  layer: 'Transformational' | 'Transactional';
  healthScore: number; // 0 - 100
  status: 'Critical Friction' | 'Needs Attention' | 'Stable' | 'Healthy';
  summary: string;
  signalsCount: number;
  identifiedIssue: string;
}

export type FrictionArchetype = 
  | 'Archetype A: Information Asymmetry & Silos'
  | 'Archetype B: Feedback Latency & Recognition Gap'
  | 'Archetype C: Decision Paralysis & Process Friction'
  | 'Archetype D: Cross-Functional Misalignment'
  | 'Archetype E: Tool Proliferation & Fatigue';

export interface WorkflowNode {
  id: string;
  stepNumber: number;
  type: 'trigger' | 'action' | 'filter' | 'router' | 'notification' | 'storage';
  title: string;
  tool: string;
  toolCategory: 'forms' | 'database' | 'automation' | 'communication' | 'bi_analytics' | 'project_management';
  description: string;
  configDetails: string;
  iconName: string;
}

export interface NoCodeStrategy {
  id: string;
  frictionPointId: string;
  title: string;
  archetype: FrictionArchetype;
  summary: string;
  targetTools: {
    name: string;
    role: string;
    badgeColor: string;
  }[];
  implementationComplexity: 'Low (1-2 days)' | 'Medium (3-5 days)' | 'High (1-2 weeks)';
  timeline: string;
  estimatedImpact: string;
  expectedMetricGains: {
    metric: string;
    targetValue: string;
    baselineValue: string;
    direction: 'decrease' | 'increase';
  }[];
  workflowNodes: WorkflowNode[];
  stepByStepPlaybook: {
    stepNumber: number;
    title: string;
    action: string;
    tool: string;
    configurationTip: string;
    samplePayload?: string;
  }[];
  raciMatrix: {
    responsible: string;
    accountable: string;
    consulted: string;
    informed: string;
  };
  changeManagementGuide: string[];
}

export interface FrictionPoint {
  id: string;
  title: string;
  archetype: FrictionArchetype;
  severity: 'Critical' | 'Elevated' | 'Moderate' | 'Low';
  rootCause: string;
  odContext: string;
  affectedDepartments: Department[];
  signalsCount: number;
  evidenceQuotes: string[];
  frameworkAttribution: {
    mckinsey: string;
    burkeLitwin: string;
  };
  strategyId: string;
}

export interface ODAnalysisResult {
  id: string;
  title: string;
  generatedAt: string;
  datasetType: string;
  totalSignals: number;
  overallSentimentScore: number; // -1 to +1
  sentimentDistribution: {
    positive: number;
    neutral: number;
    frustration: number;
    exhaustion: number;
    disengagement: number;
  };
  executiveSummary: string;
  dominantThemes: ThemeCluster[];
  mckinsey7s: McKinsey7SDiagnostic[];
  burkeLitwin: BurkeLitwinDiagnostic[];
  frictionPoints: FrictionPoint[];
  strategies: NoCodeStrategy[];
  rawFeedbackItems: FeedbackItem[];
}

export interface SimulationIntervention {
  id: string;
  name: string;
  strategyId: string;
  active: boolean;
  intensityPercent: number; // 0 - 100
}

export interface SimulationResult {
  baselineSentimentValence: number;
  projectedSentimentValence: number;
  projectedHandoffLatencyReductionHours: number;
  projectedMeetingOverheadReductionHoursWeekly: number;
  projectedRetentionRiskMitigationPercent: number;
  projectedTeamAlignmentScore: number;
  activeInterventionsCount: number;
  causalInsights: string[];
}

export interface DatasetPreset {
  id: string;
  name: string;
  industry: string;
  headcount: string;
  description: string;
  feedbackItems: FeedbackItem[];
}

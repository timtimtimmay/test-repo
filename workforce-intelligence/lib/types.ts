// AI Capability Level
export type CapabilityLevel = 'conservative' | 'moderate' | 'bold';

// Confidence Level
export type ConfidenceLevel = 'high' | 'medium' | 'low';

// Task Classification
export type TaskClassification = 'automate' | 'augment' | 'retain';

// Individual Task within a job
export interface Task {
  id: string;
  name: string;
  description: string;
  classification: TaskClassification;
  automationPotential: number; // 0-100
  reasoning: string;
  aiCapabilities: string[];
  humanAdvantages?: string[];
}

// Skill with implications
export interface SkillImplication {
  id: string;
  skillName: string;
  currentRelevance: 'increasing' | 'stable' | 'decreasing';
  futureOutlook: string;
  rationale: string;
  developmentPriority: 'high' | 'medium' | 'low';
  adjacentSkills: string[];
}

// Taxonomy Resolution (O*NET alignment)
export interface TaxonomyResolution {
  inputTitle: string;
  resolvedTitle: string;
  onetCode: string;
  confidence: ConfidenceLevel;
  alternativeTitles: string[];
  matchReasoning: string;
}

// Automation Exposure Summary
export interface AutomationExposure {
  automatePercentage: number;
  augmentPercentage: number;
  retainPercentage: number;
  overallExposureScore: number; // 0-100
  exposureCategory: 'low' | 'moderate' | 'high' | 'very-high';
  summary: string;
}

// Complete Job Analysis Result
export interface JobAnalysis {
  id: string;
  jobTitle: string;
  taxonomyResolution: TaxonomyResolution;
  tasks: Task[];
  automationExposure: AutomationExposure;
  skillImplications: SkillImplication[];
  methodology: MethodologyNote[];
  capabilityLevel: CapabilityLevel;
  analysisDate: string;
}

// Methodology Note for transparency
export interface MethodologyNote {
  step: string;
  title: string;
  description: string;
  dataSource?: string;
  limitations?: string;
}

// Search Result for autocomplete
export interface SearchResult {
  id: string;
  title: string;
  category?: string;
  matchScore?: number;
}

// API Request/Response types
export interface AnalyzeRequest {
  jobTitle: string;
  capabilityLevel: CapabilityLevel;
}

export interface AnalyzeResponse {
  success: boolean;
  data?: JobAnalysis;
  error?: string;
}

// UI State types
export interface SearchState {
  query: string;
  isLoading: boolean;
  results: SearchResult[];
  selectedResult: SearchResult | null;
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  result: JobAnalysis | null;
  capabilityLevel: CapabilityLevel;
}

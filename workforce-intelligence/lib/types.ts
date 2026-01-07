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

// Query Log Entry for analytics and caching decisions
export interface QueryLogEntry {
  id: string;
  timestamp: string;
  jobTitle: string;
  onetCode: string | null;
  matchedTitle: string | null;
  matchConfidence: ConfidenceLevel | null;
  capabilityLevel: CapabilityLevel;
  responseTimeMs: number;
  taskCount: number;
  error: string | null;
}

// Streaming Response Types
export type StreamEventType =
  | 'taxonomy'        // O*NET match resolved (immediate)
  | 'tasks_pending'   // Task list before classification
  | 'classification'  // All tasks classified
  | 'complete'        // Analysis finished
  | 'error';          // Error occurred

export interface StreamEvent {
  type: StreamEventType;
  data: unknown;
  timestamp: number;
  progress: number; // 0-100
}

export interface TaxonomyStreamData {
  inputTitle: string;
  resolvedTitle: string;
  onetCode: string;
  confidence: ConfidenceLevel;
  alternativeTitles: string[];
  taskCount: number;
}

export interface TasksPendingStreamData {
  taskCount: number;
  tasks: Array<{
    id: string;
    description: string;
  }>;
}

export interface ClassificationStreamData {
  tasks: Task[];
  automationExposure: AutomationExposure;
  skillImplications: SkillImplication[];
}

// Streaming state for frontend
export interface StreamingAnalysisState {
  status: 'idle' | 'connecting' | 'streaming' | 'complete' | 'error';
  progress: number;
  taxonomy: TaxonomyResolution | null;
  pendingTasks: TasksPendingStreamData | null;
  tasks: Task[];
  automationExposure: AutomationExposure | null;
  skillImplications: SkillImplication[];
  error: string | null;
  capabilityLevel: CapabilityLevel;
  analysisDate: string | null;
}

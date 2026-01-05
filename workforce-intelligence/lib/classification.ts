/**
 * Task Classification using Claude API and ILO Criteria
 */

import Anthropic from '@anthropic-ai/sdk';
import { CapabilityLevel } from '@/lib/types';
import { OnetTask } from '@/lib/onet';
import iloCriteria from '@/data/ilo-criteria.json';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Configuration constants
const DEFAULT_TASK_LIMIT = 25;

interface ParsedTask {
  task: string;
  classification: 'automate' | 'augment' | 'retain';
  automationPotential: number;
  reasoning: string;
  aiCapabilities?: string[];
  humanAdvantages?: string[];
  dimensionScores?: Record<string, string>;
}

interface ParsedSkill {
  skillName: string;
  currentRelevance: 'increasing' | 'stable' | 'decreasing';
  futureOutlook: string;
  rationale: string;
  developmentPriority: 'high' | 'medium' | 'low';
  adjacentSkills: string[];
  relatedTaskNumbers: number[];
}

export interface SkillInferenceResult {
  skillName: string;
  currentRelevance: 'increasing' | 'stable' | 'decreasing';
  futureOutlook: string;
  rationale: string;
  developmentPriority: 'high' | 'medium' | 'low';
  adjacentSkills: string[];
  relatedTasks: string[]; // Task IDs that drive this skill implication
}

export interface ClassifiedTask {
  id: string;
  name: string;
  description: string;
  classification: 'automate' | 'augment' | 'retain';
  automationPotential: number;
  reasoning: string;
  aiCapabilities?: string[];
  humanAdvantages?: string[];
  dimensionScores?: Record<string, string>;
}

export interface ClassificationResult {
  tasks: ClassifiedTask[];
  skills: SkillInferenceResult[];
  summary: {
    automatePercentage: number;
    augmentPercentage: number;
    retainPercentage: number;
    overallExposureScore: number;
    exposureCategory: 'low' | 'moderate' | 'high' | 'very-high';
  };
}

/**
 * Build the task classification prompt
 */
function buildClassificationPrompt(
  tasks: OnetTask[],
  occupationTitle: string,
  capabilityLevel: CapabilityLevel
): string {
  const criteriaLevel = iloCriteria.capabilityLevels.levels[capabilityLevel];

  return `You are a workforce analyst specializing in AI automation exposure assessment. Your task is to classify job tasks based on their automation potential using a research-grounded framework from the International Labour Organization (ILO).

## CLASSIFICATION FRAMEWORK

You must classify each task into one of three categories:

### AUTOMATE (${criteriaLevel.scoreAdjustments.automate})
${iloCriteria.classificationFramework.categories.automate.definition}

Characteristics:
${iloCriteria.classificationFramework.categories.automate.characteristics.map(c => `- ${c}`).join('\n')}

### AUGMENT (${criteriaLevel.scoreAdjustments.augment})
${iloCriteria.classificationFramework.categories.augment.definition}

Characteristics:
${iloCriteria.classificationFramework.categories.augment.characteristics.map(c => `- ${c}`).join('\n')}

### RETAIN (${criteriaLevel.scoreAdjustments.retain})
${iloCriteria.classificationFramework.categories.retain.definition}

Characteristics:
${iloCriteria.classificationFramework.categories.retain.characteristics.map(c => `- ${c}`).join('\n')}

## ASSESSMENT DIMENSIONS

Evaluate each task across these six dimensions:

${iloCriteria.assessmentDimensions.dimensions.map(d => `
**${d.dimension}**: ${d.description}
- High automation: ${d.spectrum.highAutomation}
- Low automation: ${d.spectrum.lowAutomation}
Scoring: ${JSON.stringify(d.scoringGuidance)}
`).join('\n')}

## CAPABILITY LEVEL: ${capabilityLevel.toUpperCase()}

${criteriaLevel.description}

Assumptions:
- AI Capability Growth: ${criteriaLevel.assumptions.aiCapabilityGrowth}
- Reliability Threshold: ${criteriaLevel.assumptions.reliabilityThreshold}
- Adoption Barriers: ${criteriaLevel.assumptions.adoptionBarriers}
- Human Oversight: ${criteriaLevel.assumptions.humanOversight}

## SCORING METHODOLOGY

1. Start with baseline score of 50
2. Apply dimension adjustments (+/- based on scoring guidance)
3. Calculate composite automation potential score (0-100)
4. Classify based on capability level thresholds above
5. Provide clear reasoning connecting task characteristics to classification

## OCCUPATION TO ANALYZE

**Job Title:** ${occupationTitle}

**Tasks to Classify:**

${tasks.map((t, i) => `${i + 1}. ${t.task}`).join('\n')}

## SKILLS INFERENCE

After classifying all tasks, derive skill implications following the ILO framework guidance:

### Declining Skills (from AUTOMATE tasks)
- Identify 2-3 skills that will decline in value
- These should be directly tied to tasks you classified as AUTOMATE
- Focus on skills where AI can fully replace human execution
- Development priority: LOW (redirect energy elsewhere)

### Evolving Skills (from AUGMENT tasks)
- Identify 2-4 skills that must evolve from execution to oversight
- These should connect to AUGMENT-classified tasks
- Describe how the skill shifts from "doing" to "directing/validating"
- Development priority: HIGH (critical transition)

### Differentiating Skills (from RETAIN tasks)
- Identify 2-3 skills that increase in relative value
- These should connect to RETAIN-classified tasks
- Explain why these skills become competitive differentiators
- Development priority: HIGH (invest for differentiation)

CRITICAL: Connect each skill implication to specific task numbers you classified. Do not provide generic advice.

## OUTPUT FORMAT

Return ONLY a valid JSON object with this exact structure:

{
  "tasks": [
    {
      "taskNumber": 1,
      "task": "exact task text from input",
      "classification": "automate" | "augment" | "retain",
      "automationPotential": 85,
      "reasoning": "Detailed explanation of why this classification was chosen, referencing specific dimensions",
      "aiCapabilities": ["capability 1", "capability 2"],
      "humanAdvantages": ["advantage 1", "advantage 2"],
      "dimensionScores": {
        "taskStructure": "+40 (highly structured, follows clear rules)",
        "cognitivePhysical": "+30 (pure cognitive work)",
        "routineNovel": "+30 (routine, repeated regularly)",
        "judgmentRequirement": "+10 (some interpretation needed)",
        "interpersonalIntensity": "+10 (minimal interaction)",
        "stakesAccountability": "-10 (medium stakes)"
      }
    }
  ],
  "skills": [
    {
      "skillName": "Descriptive skill name",
      "currentRelevance": "increasing" | "stable" | "decreasing",
      "futureOutlook": "2-3 sentence description of how this skill will evolve in the AI era",
      "rationale": "Explanation connecting this skill implication to specific classified tasks by number",
      "developmentPriority": "high" | "medium" | "low",
      "adjacentSkills": ["related skill 1", "related skill 2"],
      "relatedTaskNumbers": [1, 5, 8]
    }
  ]
}

CRITICAL REQUIREMENTS:
- Return ONLY the JSON object, no additional text
- Include all ${tasks.length} tasks in the output
- Include 6-8 skill implications (mix of declining, evolving, differentiating)
- Automation potential must be 0-100
- Classification must be exactly "automate", "augment", or "retain"
- Reasoning must reference specific dimensions and be 2-3 sentences minimum
- DimensionScores must show your thinking for all 6 dimensions
- Each skill must reference specific task numbers that drive the implication
- currentRelevance must be exactly "increasing", "stable", or "decreasing"
- developmentPriority must be exactly "high", "medium", or "low"`;
}

/**
 * Parse skills from Claude's response
 */
function parseSkillsResponse(
  parsed: { skills?: ParsedSkill[] },
  classifiedTasks: ClassifiedTask[]
): SkillInferenceResult[] {
  if (!parsed.skills || !Array.isArray(parsed.skills)) {
    console.warn('No skills found in response, returning empty array');
    return [];
  }

  return parsed.skills.map((s) => ({
    skillName: s.skillName || 'Unnamed skill',
    currentRelevance: s.currentRelevance || 'stable',
    futureOutlook: s.futureOutlook || 'No outlook provided',
    rationale: s.rationale || 'No rationale provided',
    developmentPriority: s.developmentPriority || 'medium',
    adjacentSkills: s.adjacentSkills || [],
    relatedTasks: (s.relatedTaskNumbers || [])
      .filter((n) => n > 0 && n <= classifiedTasks.length)
      .map((n) => classifiedTasks[n - 1].id),
  }));
}

/**
 * Parse and validate Claude's response
 */
function parseClassificationResponse(
  responseText: string,
  originalTasks: OnetTask[]
): { tasks: ClassifiedTask[]; skills: SkillInferenceResult[] } {
  try {
    // Extract JSON from response (in case Claude adds any wrapper text)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!parsed.tasks || !Array.isArray(parsed.tasks)) {
      throw new Error('Invalid response structure: missing tasks array');
    }

    const classifiedTasks = parsed.tasks.map((t: ParsedTask, index: number) => {
      const originalTask = originalTasks[index];

      return {
        id: originalTask.id,
        name: `Task ${index + 1}`,
        description: t.task || originalTask.task,
        classification: t.classification,
        automationPotential: Math.min(100, Math.max(0, t.automationPotential || 0)),
        reasoning: t.reasoning || 'No reasoning provided',
        aiCapabilities: t.aiCapabilities || [],
        humanAdvantages: t.humanAdvantages || [],
        dimensionScores: t.dimensionScores || {},
      };
    });

    const skills = parseSkillsResponse(parsed, classifiedTasks);

    return { tasks: classifiedTasks, skills };
  } catch (error) {
    console.error('Error parsing classification response:', error);
    console.error('Response text:', responseText);
    throw new Error(`Failed to parse classification response: ${error}`);
  }
}

/**
 * Calculate summary statistics from classified tasks
 */
function calculateSummary(tasks: ClassifiedTask[]): ClassificationResult['summary'] {
  const total = tasks.length;
  if (total === 0) {
    return {
      automatePercentage: 0,
      augmentPercentage: 0,
      retainPercentage: 0,
      overallExposureScore: 0,
      exposureCategory: 'low',
    };
  }

  const counts = tasks.reduce(
    (acc, task) => {
      acc[task.classification]++;
      acc.totalScore += task.automationPotential;
      return acc;
    },
    { automate: 0, augment: 0, retain: 0, totalScore: 0 }
  );

  const automatePercentage = Math.round((counts.automate / total) * 100);
  const augmentPercentage = Math.round((counts.augment / total) * 100);
  const retainPercentage = Math.round((counts.retain / total) * 100);
  const overallExposureScore = Math.round(counts.totalScore / total);

  let exposureCategory: 'low' | 'moderate' | 'high' | 'very-high';
  if (overallExposureScore < 30) {
    exposureCategory = 'low';
  } else if (overallExposureScore < 50) {
    exposureCategory = 'moderate';
  } else if (overallExposureScore < 70) {
    exposureCategory = 'high';
  } else {
    exposureCategory = 'very-high';
  }

  return {
    automatePercentage,
    augmentPercentage,
    retainPercentage,
    overallExposureScore,
    exposureCategory,
  };
}

/**
 * Classify tasks using Claude API
 */
export async function classifyTasks(
  tasks: OnetTask[],
  occupationTitle: string,
  capabilityLevel: CapabilityLevel = 'moderate'
): Promise<ClassificationResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
  }

  if (tasks.length === 0) {
    return {
      tasks: [],
      skills: [],
      summary: {
        automatePercentage: 0,
        augmentPercentage: 0,
        retainPercentage: 0,
        overallExposureScore: 0,
        exposureCategory: 'low',
      },
    };
  }

  // Limit tasks to configured maximum for cost control
  const tasksToClassify = tasks.slice(0, DEFAULT_TASK_LIMIT);

  const prompt = buildClassificationPrompt(tasksToClassify, occupationTitle, capabilityLevel);

  const response = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
    max_tokens: 12000, // Increased to handle 25 tasks + skills
    temperature: 0.3, // Lower temperature for more consistent classification
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

  // Check for potential truncation
  if (response.stop_reason === 'max_tokens') {
    console.warn('Response may be truncated due to max_tokens limit');
  }

  const { tasks: classifiedTasks, skills } = parseClassificationResponse(responseText, tasksToClassify);
  const summary = calculateSummary(classifiedTasks);

  return {
    tasks: classifiedTasks,
    skills,
    summary,
  };
}

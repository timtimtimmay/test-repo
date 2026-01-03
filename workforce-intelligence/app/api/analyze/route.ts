import { NextRequest, NextResponse } from 'next/server';
import { AnalyzeRequest, AnalyzeResponse, JobAnalysis, CapabilityLevel } from '@/lib/types';
import { findBestMatch, getTasks } from '@/lib/onet';
import { classifyTasks } from '@/lib/classification';

export async function POST(request: NextRequest): Promise<NextResponse<AnalyzeResponse>> {
  try {
    const body: AnalyzeRequest = await request.json();

    // Validate request
    if (!body.jobTitle || typeof body.jobTitle !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Job title is required' },
        { status: 400 }
      );
    }

    const validLevels: CapabilityLevel[] = ['conservative', 'moderate', 'bold'];
    if (!validLevels.includes(body.capabilityLevel)) {
      return NextResponse.json(
        { success: false, error: 'Invalid capability level' },
        { status: 400 }
      );
    }

    // Step 1: Find O*NET occupation match
    const match = findBestMatch(body.jobTitle);

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          error: `No O*NET occupation found matching "${body.jobTitle}". Please try a different job title or be more specific.`,
        },
        { status: 404 }
      );
    }

    const { occupation, confidence, matchType } = match;

    // Step 2: Get tasks for this occupation
    const onetTasks = getTasks(occupation.code);

    if (onetTasks.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Found occupation "${occupation.title}" but no task data available.`,
        },
        { status: 404 }
      );
    }

    // Step 3: Classify tasks using Claude API
    const classification = await classifyTasks(
      onetTasks,
      occupation.title,
      body.capabilityLevel
    );

    // Step 4: Build response
    const analysis: JobAnalysis = {
      id: `analysis-${Date.now()}`,
      jobTitle: body.jobTitle,
      taxonomyResolution: {
        inputTitle: body.jobTitle,
        resolvedTitle: occupation.title,
        onetCode: occupation.code,
        confidence: confidence,
        alternativeTitles: occupation.alternateTitles.slice(0, 5),
        matchReasoning: `Matched to O*NET occupation "${occupation.title}" (${occupation.code}). ${
          matchType === 'exact'
            ? 'Exact match found in O*NET taxonomy.'
            : matchType === 'primary'
            ? 'Matched to primary O*NET occupation title.'
            : 'Matched via alternate job title in O*NET database.'
        } Confidence: ${confidence}.`,
      },
      tasks: classification.tasks.map(task => ({
        id: task.id,
        name: task.name,
        description: task.description,
        classification: task.classification,
        automationPotential: task.automationPotential,
        reasoning: task.reasoning,
        aiCapabilities: task.aiCapabilities,
        humanAdvantages: task.humanAdvantages,
      })),
      automationExposure: {
        automatePercentage: classification.summary.automatePercentage,
        augmentPercentage: classification.summary.augmentPercentage,
        retainPercentage: classification.summary.retainPercentage,
        overallExposureScore: classification.summary.overallExposureScore,
        exposureCategory: classification.summary.exposureCategory,
        summary: `This role has ${classification.summary.exposureCategory} automation exposure. ${
          classification.summary.automatePercentage > 50
            ? 'A majority of tasks can be automated with current or near-term AI capabilities.'
            : classification.summary.retainPercentage > 50
            ? 'Most tasks remain primarily human due to physical, interpersonal, or judgment requirements.'
            : 'This role will be significantly transformed through AI augmentation, with humans and AI working in collaboration.'
        }`,
      },
      skillImplications: [
        {
          id: 'skill-placeholder',
          skillName: 'Skills analysis coming soon',
          currentRelevance: 'stable',
          futureOutlook: 'Skills inference will be added in the next iteration',
          rationale:
            'For this prototype, we are focusing on task classification. Skills inference based on task shifts will be implemented next.',
          developmentPriority: 'medium',
          adjacentSkills: [],
        },
      ],
      methodology: [
        {
          step: '1',
          title: 'Taxonomy Resolution',
          description: `Matched input "${body.jobTitle}" to O*NET occupation using fuzzy search across 57,521 job titles.`,
          dataSource: 'O*NET 30.1 Database (December 2025)',
          limitations: 'O*NET is US-centric; international job titles may not have exact matches',
        },
        {
          step: '2',
          title: 'Task Decomposition',
          description: `Retrieved ${onetTasks.length} task statements from O*NET database. Analyzed first 15 tasks for classification.`,
          dataSource: 'O*NET Task Statements',
          limitations: 'Tasks are derived from US labor market data; may not reflect all organizational contexts',
        },
        {
          step: '3',
          title: 'Automation Classification',
          description: `Applied ILO-based 6-dimensional assessment framework using ${body.capabilityLevel} AI capability assumptions.`,
          dataSource: 'ILO Working Paper 140 (2025) - Generative AI and Jobs',
          limitations: 'Classification reflects technical potential, not organizational readiness or adoption timeline',
        },
      ],
      capabilityLevel: body.capabilityLevel,
      analysisDate: new Date().toISOString().split('T')[0],
    };

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Analysis API error:', error);

    // Handle specific error types
    if (error instanceof Error && error.message.includes('ANTHROPIC_API_KEY')) {
      return NextResponse.json(
        {
          success: false,
          error:
            'API key not configured. Please set ANTHROPIC_API_KEY in your environment variables.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for health check
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'ok',
    message: 'Workforce Task Intelligence API',
    version: '1.0.0',
    endpoints: {
      POST: '/api/analyze - Analyze a job title for automation exposure',
    },
    note: 'This API is stubbed for Claude API integration. See route.ts for implementation details.',
  });
}

/**
 * Streaming Analysis API
 *
 * Returns Server-Sent Events (SSE) for progressive UI updates:
 * 1. taxonomy - O*NET match (immediate, ~100ms)
 * 2. tasks_pending - Task list before classification
 * 3. classification - All tasks classified with exposure stats
 * 4. complete - Analysis finished
 */

import { NextRequest } from 'next/server';
import { CapabilityLevel, StreamEvent } from '@/lib/types';
import { findBestMatch, getTasks } from '@/lib/onet';
import { classifyTasks } from '@/lib/classification';
import { queryLogger } from '@/lib/query-logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  const startTime = Date.now();

  let jobTitle = 'unknown';
  let capabilityLevel: CapabilityLevel = 'moderate';

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: StreamEvent) => {
        const data = `data: ${JSON.stringify(event)}\n\n`;
        controller.enqueue(encoder.encode(data));
      };

      try {
        // Parse request
        const body = await request.json();
        jobTitle = body.jobTitle || 'unknown';
        capabilityLevel = body.capabilityLevel || 'moderate';

        // Validate
        if (!body.jobTitle || typeof body.jobTitle !== 'string') {
          sendEvent({
            type: 'error',
            data: { message: 'Job title is required' },
            timestamp: Date.now(),
            progress: 0,
          });
          controller.close();
          return;
        }

        // Stage 1: Taxonomy Resolution (immediate)
        const match = findBestMatch(body.jobTitle);

        if (!match) {
          sendEvent({
            type: 'error',
            data: { message: `No O*NET occupation found matching "${body.jobTitle}"` },
            timestamp: Date.now(),
            progress: 0,
          });
          controller.close();
          return;
        }

        const { occupation, confidence, matchedTitle } = match;

        // Send taxonomy immediately
        sendEvent({
          type: 'taxonomy',
          data: {
            inputTitle: body.jobTitle,
            resolvedTitle: occupation.title,
            onetCode: occupation.code,
            confidence,
            alternativeTitles: occupation.alternateTitles.slice(0, 5),
            matchReasoning: `Matched to ${occupation.title} via "${matchedTitle}"`,
          },
          timestamp: Date.now(),
          progress: 10,
        });

        // Stage 2: Get tasks (immediate)
        const onetTasks = getTasks(occupation.code);

        if (onetTasks.length === 0) {
          sendEvent({
            type: 'error',
            data: { message: `No task data available for "${occupation.title}"` },
            timestamp: Date.now(),
            progress: 10,
          });
          controller.close();
          return;
        }

        // Send pending tasks
        const tasksToAnalyze = onetTasks.slice(0, 25);
        sendEvent({
          type: 'tasks_pending',
          data: {
            taskCount: tasksToAnalyze.length,
            tasks: tasksToAnalyze.map((t, i) => ({
              id: `task-${i + 1}`,
              description: t.task,
            })),
          },
          timestamp: Date.now(),
          progress: 15,
        });

        // Stage 3: Classification (slow - this is where we wait)
        const classification = await classifyTasks(
          onetTasks,
          occupation.title,
          body.capabilityLevel
        );

        // Send classification results
        sendEvent({
          type: 'classification',
          data: {
            tasks: classification.tasks,
            automationExposure: {
              automatePercentage: classification.summary.automatePercentage,
              augmentPercentage: classification.summary.augmentPercentage,
              retainPercentage: classification.summary.retainPercentage,
              overallExposureScore: classification.summary.overallExposureScore,
              exposureCategory: classification.summary.exposureCategory,
              summary: `This role has ${classification.summary.exposureCategory} automation exposure.`,
            },
            skillImplications: classification.skills.map((skill, index) => ({
              id: `skill-${index + 1}`,
              skillName: skill.skillName,
              currentRelevance: skill.currentRelevance,
              futureOutlook: skill.futureOutlook,
              rationale: skill.rationale,
              developmentPriority: skill.developmentPriority,
              adjacentSkills: skill.adjacentSkills,
            })),
          },
          timestamp: Date.now(),
          progress: 95,
        });

        // Log successful query
        queryLogger.logSuccess(
          body.jobTitle,
          occupation.code,
          matchedTitle,
          confidence,
          body.capabilityLevel,
          Date.now() - startTime,
          classification.tasks.length
        );

        // Send complete
        sendEvent({
          type: 'complete',
          data: {
            analysisDate: new Date().toISOString().split('T')[0],
            totalTimeMs: Date.now() - startTime,
          },
          timestamp: Date.now(),
          progress: 100,
        });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

        // Log error
        queryLogger.logError(
          jobTitle,
          capabilityLevel,
          Date.now() - startTime,
          errorMessage
        );

        sendEvent({
          type: 'error',
          data: { message: errorMessage },
          timestamp: Date.now(),
          progress: 0,
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

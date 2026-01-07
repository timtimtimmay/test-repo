/**
 * React Hook for Streaming Analysis
 *
 * Consumes Server-Sent Events (SSE) from /api/analyze/stream
 * and provides progressive state updates for the UI.
 */

import { useState, useCallback, useRef } from 'react';
import {
  CapabilityLevel,
  StreamingAnalysisState,
  TaxonomyResolution,
  Task,
  AutomationExposure,
  SkillImplication,
  StreamEvent,
} from '@/lib/types';

const initialState: StreamingAnalysisState = {
  status: 'idle',
  progress: 0,
  taxonomy: null,
  pendingTasks: null,
  tasks: [],
  automationExposure: null,
  skillImplications: [],
  error: null,
  capabilityLevel: 'moderate',
  analysisDate: null,
};

interface UseStreamingAnalysisReturn {
  state: StreamingAnalysisState;
  analyze: (jobTitle: string, capabilityLevel: CapabilityLevel) => void;
  cancel: () => void;
  reset: () => void;
}

export function useStreamingAnalysis(): UseStreamingAnalysisReturn {
  const [state, setState] = useState<StreamingAnalysisState>(initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setState(initialState);
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setState(prev => ({
      ...prev,
      status: 'idle',
      error: 'Analysis cancelled',
    }));
  }, []);

  const analyze = useCallback(
    async (jobTitle: string, capabilityLevel: CapabilityLevel) => {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      // Reset state and start
      setState({
        ...initialState,
        status: 'connecting',
        capabilityLevel,
      });

      try {
        const response = await fetch('/api/analyze/stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jobTitle, capabilityLevel }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        if (!response.body) {
          throw new Error('No response body');
        }

        setState(prev => ({ ...prev, status: 'streaming' }));

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          // Process complete SSE events
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || ''; // Keep incomplete event in buffer

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6);
              try {
                const event: StreamEvent = JSON.parse(jsonStr);
                processEvent(event, setState);
              } catch (e) {
                console.error('Failed to parse SSE event:', e, jsonStr);
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          // Request was cancelled, don't update state
          return;
        }

        console.error('Streaming error:', error);
        setState(prev => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    },
    []
  );

  return { state, analyze, cancel, reset };
}

/**
 * Process incoming SSE events and update state
 */
function processEvent(
  event: StreamEvent,
  setState: React.Dispatch<React.SetStateAction<StreamingAnalysisState>>
) {
  switch (event.type) {
    case 'taxonomy': {
      const data = event.data as {
        inputTitle: string;
        resolvedTitle: string;
        onetCode: string;
        confidence: 'high' | 'medium' | 'low';
        alternativeTitles: string[];
        matchReasoning: string;
      };
      setState(prev => ({
        ...prev,
        progress: event.progress,
        taxonomy: {
          inputTitle: data.inputTitle,
          resolvedTitle: data.resolvedTitle,
          onetCode: data.onetCode,
          confidence: data.confidence,
          alternativeTitles: data.alternativeTitles,
          matchReasoning: data.matchReasoning,
        } as TaxonomyResolution,
      }));
      break;
    }

    case 'tasks_pending': {
      const data = event.data as {
        taskCount: number;
        tasks: Array<{ id: string; description: string }>;
      };
      setState(prev => ({
        ...prev,
        progress: event.progress,
        pendingTasks: data,
      }));
      break;
    }

    case 'classification': {
      const data = event.data as {
        tasks: Task[];
        automationExposure: AutomationExposure;
        skillImplications: SkillImplication[];
      };
      setState(prev => ({
        ...prev,
        progress: event.progress,
        tasks: data.tasks,
        automationExposure: data.automationExposure,
        skillImplications: data.skillImplications,
        pendingTasks: null, // Clear pending tasks once classified
      }));
      break;
    }

    case 'complete': {
      const data = event.data as {
        analysisDate: string;
        totalTimeMs: number;
      };
      setState(prev => ({
        ...prev,
        status: 'complete',
        progress: 100,
        analysisDate: data.analysisDate,
      }));
      break;
    }

    case 'error': {
      const data = event.data as { message: string };
      setState(prev => ({
        ...prev,
        status: 'error',
        error: data.message,
      }));
      break;
    }
  }
}

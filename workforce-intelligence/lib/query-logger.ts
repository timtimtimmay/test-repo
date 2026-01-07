/**
 * Query Logger for Analytics and Caching Decisions
 *
 * Logs all API queries to stdout, captured by Vercel Logs.
 * Use Vercel Dashboard → Logs → Filter "QUERY_LOG" to analyze.
 *
 * When ready for caching (Option 4), export logs and aggregate
 * by onetCode to identify top 50-100 occupations for pre-computation.
 */

import { QueryLogEntry, CapabilityLevel, ConfidenceLevel } from './types';

interface LogInput {
  jobTitle: string;
  onetCode: string | null;
  matchedTitle: string | null;
  matchConfidence: ConfidenceLevel | null;
  capabilityLevel: CapabilityLevel;
  responseTimeMs: number;
  taskCount: number;
  error: string | null;
}

class QueryLogger {
  /**
   * Log a query to stdout (captured by Vercel)
   */
  log(input: LogInput): QueryLogEntry {
    const entry: QueryLogEntry = {
      id: `query-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ...input,
    };

    // Log as structured JSON for easy filtering in Vercel
    console.log(
      JSON.stringify({
        type: 'QUERY_LOG',
        ...entry,
      })
    );

    return entry;
  }

  /**
   * Log a successful query
   */
  logSuccess(
    jobTitle: string,
    onetCode: string,
    matchedTitle: string,
    matchConfidence: ConfidenceLevel,
    capabilityLevel: CapabilityLevel,
    responseTimeMs: number,
    taskCount: number
  ): QueryLogEntry {
    return this.log({
      jobTitle,
      onetCode,
      matchedTitle,
      matchConfidence,
      capabilityLevel,
      responseTimeMs,
      taskCount,
      error: null,
    });
  }

  /**
   * Log a failed query
   */
  logError(
    jobTitle: string,
    capabilityLevel: CapabilityLevel,
    responseTimeMs: number,
    error: string
  ): QueryLogEntry {
    return this.log({
      jobTitle,
      onetCode: null,
      matchedTitle: null,
      matchConfidence: null,
      capabilityLevel,
      responseTimeMs,
      taskCount: 0,
      error,
    });
  }
}

// Singleton instance
export const queryLogger = new QueryLogger();

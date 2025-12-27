'use client';

import { JobAnalysis } from '@/lib/types';
import TaxonomyResolution from './TaxonomyResolution';
import TaskBreakdown from './TaskBreakdown';
import AutomationExposure from './AutomationExposure';
import SkillsImplications from './SkillsImplications';

interface ResultsPanelProps {
  analysis: JobAnalysis;
}

export default function ResultsPanel({ analysis }: ResultsPanelProps) {
  return (
    <div className="space-y-4">
      {/* Analysis Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {analysis.jobTitle}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Analysis Date: {new Date(analysis.analysisDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Capability Level:</span>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              analysis.capabilityLevel === 'conservative'
                ? 'bg-blue-100 text-blue-800'
                : analysis.capabilityLevel === 'moderate'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {analysis.capabilityLevel.charAt(0).toUpperCase() + analysis.capabilityLevel.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Analysis Steps */}
      <TaxonomyResolution data={analysis.taxonomyResolution} />
      <TaskBreakdown tasks={analysis.tasks} />
      <AutomationExposure data={analysis.automationExposure} />
      <SkillsImplications skills={analysis.skillImplications} />
    </div>
  );
}

// Loading state component
export function ResultsPanelSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-48" />
      </div>

      {/* Section Skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-5 w-5 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded w-48" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Error state component
interface ResultsPanelErrorProps {
  error: string;
  onRetry?: () => void;
}

export function ResultsPanelError({ error, onRetry }: ResultsPanelErrorProps) {
  return (
    <div className="bg-white border border-red-200 rounded-lg p-6 sm:p-8 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Failed</h3>
      <p className="text-sm text-gray-600 mb-4">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { JobAnalysis, TaskClassification } from '@/lib/types';
import TaxonomyInline from './TaxonomyInline';
import TaskBreakdown from './TaskBreakdown';
import AutomationExposureHero from './AutomationExposureHero';
import SkillsImplications from './SkillsImplications';
import TransformationRoadmap from './TransformationRoadmap';

interface ResultsPanelProps {
  analysis: JobAnalysis;
}

export type ClassificationFilter = TaskClassification | 'all';
type ViewMode = 'roadmap' | 'detailed';

export default function ResultsPanel({ analysis }: ResultsPanelProps) {
  const [selectedFilter, setSelectedFilter] = useState<ClassificationFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('roadmap');

  // Count tasks by classification
  const taskCounts = {
    all: analysis.tasks.length,
    automate: analysis.tasks.filter(t => t.classification === 'automate').length,
    augment: analysis.tasks.filter(t => t.classification === 'augment').length,
    retain: analysis.tasks.filter(t => t.classification === 'retain').length,
  };

  // Filter tasks based on selection
  const filteredTasks = selectedFilter === 'all'
    ? analysis.tasks
    : analysis.tasks.filter(t => t.classification === selectedFilter);

  const handleFilterChange = (filter: ClassificationFilter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="space-y-6">
      {/* Analysis Header with View Toggle */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Job Title, Capability Level, and View Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* View Toggle */}
              <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('roadmap')}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'roadmap'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Executive Roadmap
                </button>
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'detailed'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Detailed Analysis
                </button>
              </div>

              {/* Capability Level */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Capability:</span>
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

          {/* Condensed Taxonomy Resolution */}
          <TaxonomyInline data={analysis.taxonomyResolution} />
        </div>
      </div>

      {/* Conditional Content Based on View Mode */}
      {viewMode === 'roadmap' ? (
        /* Executive Roadmap View */
        <TransformationRoadmap
          jobTitle={analysis.jobTitle}
          tasks={analysis.tasks}
          skills={analysis.skillImplications}
          automatePercentage={analysis.automationExposure.automatePercentage}
          augmentPercentage={analysis.automationExposure.augmentPercentage}
          retainPercentage={analysis.automationExposure.retainPercentage}
        />
      ) : (
        /* Detailed Analysis View */
        <>
          {/* Hero: Automation Exposure with Interactive Chart */}
          <AutomationExposureHero
            data={analysis.automationExposure}
            taskCounts={taskCounts}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />

          {/* Task Breakdown with Filter Tabs */}
          <TaskBreakdown
            tasks={filteredTasks}
            allTasks={analysis.tasks}
            taskCounts={taskCounts}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />

          {/* Skills Implications */}
          <SkillsImplications skills={analysis.skillImplications} />
        </>
      )}
    </div>
  );
}

// Loading state component
export function ResultsPanelSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-48" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-64" />
        </div>
        <div className="h-10 bg-gray-100 rounded w-full" />
      </div>

      {/* Roadmap Skeleton */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-200 h-24" />
        <div className="p-6 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-gray-200">
              <div className="h-16 bg-gray-100 rounded-t-xl" />
              <div className="p-5 bg-gray-50">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-8 bg-gray-200 rounded-lg w-24" />
                  ))}
                </div>
                <div className="h-24 bg-gray-100 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
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

'use client';

import { useState } from 'react';
import { JobAnalysis, TaskClassification } from '@/lib/types';
import TaxonomyInline from './TaxonomyInline';
import TaskBreakdown from './TaskBreakdown';
import AutomationExposureHero from './AutomationExposureHero';
import SkillsImplications from './SkillsImplications';

interface ResultsPanelProps {
  analysis: JobAnalysis;
}

export type ClassificationFilter = TaskClassification | 'all';

export default function ResultsPanel({ analysis }: ResultsPanelProps) {
  const [selectedFilter, setSelectedFilter] = useState<ClassificationFilter>('all');

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

  // Group skills by category based on currentRelevance
  const decliningSkills = analysis.skillImplications.filter(s => s.currentRelevance === 'decreasing');
  const evolvingSkills = analysis.skillImplications.filter(s => s.currentRelevance === 'stable');
  const differentiatingSkills = analysis.skillImplications.filter(s => s.currentRelevance === 'increasing');

  return (
    <div className="space-y-6">
      {/* Executive Summary - Top of page */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-5 text-white">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{analysis.jobTitle}</h2>
            <p className="text-slate-200 leading-relaxed">
              {analysis.automationExposure.automatePercentage}% of tasks can be fully automated, freeing capacity for higher-value work.
              The majority ({analysis.automationExposure.augmentPercentage}%) will transform into human-AI collaboration — this is where
              training investment should focus. {analysis.automationExposure.retainPercentage}% of tasks remain uniquely human and represent
              the role&apos;s future competitive advantage.
            </p>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-300">Capability:</span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  analysis.capabilityLevel === 'conservative'
                    ? 'bg-blue-400/20 text-blue-200'
                    : analysis.capabilityLevel === 'moderate'
                    ? 'bg-purple-400/20 text-purple-200'
                    : 'bg-amber-400/20 text-amber-200'
                }`}>
                  {analysis.capabilityLevel.charAt(0).toUpperCase() + analysis.capabilityLevel.slice(1)}
                </span>
              </div>
              <span className="text-sm text-slate-400">
                {new Date(analysis.analysisDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Condensed Taxonomy Resolution */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <TaxonomyInline data={analysis.taxonomyResolution} />
      </div>

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

      {/* Skills Investment Priority */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Skills Investment Priority
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Deprioritize */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <h4 className="font-medium text-gray-700">Deprioritize</h4>
              <span className="text-xs text-gray-500 ml-auto">Budget: ↓</span>
            </div>
            <ul className="space-y-2">
              {decliningSkills.length > 0 ? (
                decliningSkills.map((skill) => (
                  <li key={skill.id} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{skill.skillName}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400 italic">No declining skills identified</li>
              )}
            </ul>
          </div>

          {/* Evolve - Train Now */}
          <div className="bg-purple-50 rounded-xl p-4 ring-2 ring-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <h4 className="font-medium text-purple-900">Evolve (Train Now)</h4>
              <span className="text-xs text-purple-600 ml-auto font-medium">Budget: ↑↑↑</span>
            </div>
            <ul className="space-y-2">
              {evolvingSkills.length > 0 ? (
                evolvingSkills.map((skill) => (
                  <li key={skill.id} className="text-sm text-purple-800 flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{skill.skillName}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="text-sm text-purple-800 flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>AI tool proficiency</span>
                  </li>
                  <li className="text-sm text-purple-800 flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Prompt engineering</span>
                  </li>
                  <li className="text-sm text-purple-800 flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Human-AI workflow design</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Double Down */}
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h4 className="font-medium text-emerald-900">Double Down</h4>
              <span className="text-xs text-emerald-600 ml-auto">Budget: ↑↑</span>
            </div>
            <ul className="space-y-2">
              {differentiatingSkills.length > 0 ? (
                differentiatingSkills.map((skill) => (
                  <li key={skill.id} className="text-sm text-emerald-800 flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>{skill.skillName}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400 italic">See retain tasks above</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Skills Implications */}
      <SkillsImplications skills={analysis.skillImplications} />
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

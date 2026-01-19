'use client';

import { useState } from 'react';
import { StreamingAnalysisState } from '@/lib/types';
import TaxonomyInline from './TaxonomyInline';
import TaskBreakdown from './TaskBreakdown';
import AutomationExposureHero from './AutomationExposureHero';
import SkillsImplications from './SkillsImplications';
import { ClassificationFilter } from './ResultsPanel';

interface StreamingResultsPanelProps {
  state: StreamingAnalysisState;
  onCancel: () => void;
}

export default function StreamingResultsPanel({ state, onCancel }: StreamingResultsPanelProps) {
  const [selectedFilter, setSelectedFilter] = useState<ClassificationFilter>('all');

  const handleFilterChange = (filter: ClassificationFilter) => {
    setSelectedFilter(filter);
  };

  // Calculate task counts from streaming state
  const taskCounts = {
    all: state.tasks.length,
    automate: state.tasks.filter(t => t.classification === 'automate').length,
    augment: state.tasks.filter(t => t.classification === 'augment').length,
    retain: state.tasks.filter(t => t.classification === 'retain').length,
  };

  // Filter tasks based on selection
  const filteredTasks = selectedFilter === 'all'
    ? state.tasks
    : state.tasks.filter(t => t.classification === selectedFilter);

  // Group skills by category
  const decliningSkills = state.skillImplications.filter(s => s.currentRelevance === 'decreasing');
  const evolvingSkills = state.skillImplications.filter(s => s.currentRelevance === 'stable');
  const differentiatingSkills = state.skillImplications.filter(s => s.currentRelevance === 'increasing');

  const isStreaming = state.status === 'streaming' || state.status === 'connecting';
  const hasClassification = state.tasks.length > 0 && state.automationExposure !== null;

  return (
    <div className="space-y-6">
      {/* Progress Bar - Always visible during streaming */}
      {isStreaming && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-amber-600 border-t-transparent rounded-full" />
              <span className="text-sm font-medium text-gray-700">
                {state.progress < 15
                  ? 'Resolving job taxonomy...'
                  : state.progress < 20
                  ? 'Retrieving task data...'
                  : state.progress < 95
                  ? 'Classifying tasks with AI...'
                  : 'Finalizing analysis...'}
              </span>
            </div>
            <button
              onClick={onCancel}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Cancel
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-amber-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${state.progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">{state.progress}% complete</span>
            <span className="text-xs text-gray-500">
              {state.progress < 95
                ? `Classifying ${state.pendingTasks?.taskCount || state.tasks.length || 25} tasks against 6 dimensions...`
                : 'Finalizing results...'}
            </span>
          </div>
        </div>
      )}

      {/* Error State */}
      {state.status === 'error' && (
        <div className="bg-white border border-red-200 rounded-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Failed</h3>
          <p className="text-sm text-gray-600">{state.error}</p>
        </div>
      )}

      {/* Taxonomy - Shows immediately when available */}
      {state.taxonomy && (
        <>
          {/* Executive Summary - Shows once we have classification */}
          {hasClassification && (
            <div className="rounded-xl p-5 text-white" style={{ backgroundColor: '#1a2332' }}>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{state.taxonomy.inputTitle}</h2>
                  <p className="text-slate-200 leading-relaxed">
                    {state.automationExposure!.automatePercentage}% of tasks can be fully automated, freeing capacity for higher-value work.
                    The majority ({state.automationExposure!.augmentPercentage}%) will transform into human-AI collaboration — this is where
                    training investment should focus. {state.automationExposure!.retainPercentage}% of tasks remain uniquely human and represent
                    the role&apos;s future competitive advantage.
                  </p>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-300">Capability:</span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        state.capabilityLevel === 'conservative'
                          ? 'bg-blue-400/20 text-blue-200'
                          : state.capabilityLevel === 'moderate'
                          ? 'bg-purple-400/20 text-purple-200'
                          : 'bg-amber-400/20 text-amber-200'
                      }`}>
                        {state.capabilityLevel.charAt(0).toUpperCase() + state.capabilityLevel.slice(1)}
                      </span>
                    </div>
                    {state.analysisDate && (
                      <span className="text-sm text-slate-400">
                        {new Date(state.analysisDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Taxonomy Resolution */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <TaxonomyInline data={state.taxonomy} />
          </div>
        </>
      )}

      {/* Pending Tasks - Shows while waiting for classification */}
      {state.pendingTasks && !hasClassification && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Task Analysis
            </h3>
            <span className="text-sm text-gray-500">
              ({state.pendingTasks.taskCount} tasks to classify)
            </span>
          </div>
          <div className="space-y-2">
            {state.pendingTasks.tasks.map((task, index) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg animate-pulse"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-400">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 truncate">{task.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-20 h-6 bg-gray-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-slate-500 border-t-transparent rounded-full" />
              Classifying {state.pendingTasks?.taskCount || 25} tasks against 6 dimensions...
            </span>
          </div>
        </div>
      )}

      {/* Full Results - Shows once classification is complete */}
      {hasClassification && (
        <>
          {/* Automation Exposure Hero */}
          <AutomationExposureHero
            data={state.automationExposure!}
            taskCounts={taskCounts}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />

          {/* Task Breakdown */}
          <TaskBreakdown
            tasks={filteredTasks}
            allTasks={state.tasks}
            taskCounts={taskCounts}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />

          {/* Skills Investment Priority */}
          {state.skillImplications.length > 0 && (
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
                    <span className="text-xs text-gray-500 ml-auto">Budget: down</span>
                  </div>
                  <ul className="space-y-2">
                    {decliningSkills.length > 0 ? (
                      decliningSkills.map((skill) => (
                        <li key={skill.id} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-gray-400 mt-1">-</span>
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
                    <span className="text-xs text-purple-600 ml-auto font-medium">Budget: up 3x</span>
                  </div>
                  <ul className="space-y-2">
                    {evolvingSkills.length > 0 ? (
                      evolvingSkills.map((skill) => (
                        <li key={skill.id} className="text-sm text-purple-800 flex items-start gap-2">
                          <span className="text-purple-400 mt-1">-</span>
                          <span>{skill.skillName}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="text-sm text-purple-800 flex items-start gap-2">
                          <span className="text-purple-400 mt-1">-</span>
                          <span>AI tool proficiency</span>
                        </li>
                        <li className="text-sm text-purple-800 flex items-start gap-2">
                          <span className="text-purple-400 mt-1">-</span>
                          <span>Prompt engineering</span>
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
                    <span className="text-xs text-emerald-600 ml-auto">Budget: up 2x</span>
                  </div>
                  <ul className="space-y-2">
                    {differentiatingSkills.length > 0 ? (
                      differentiatingSkills.map((skill) => (
                        <li key={skill.id} className="text-sm text-emerald-800 flex items-start gap-2">
                          <span className="text-emerald-400 mt-1">-</span>
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
          )}

          {/* Detailed Skills Implications */}
          {state.skillImplications.length > 0 && (
            <SkillsImplications skills={state.skillImplications} />
          )}
        </>
      )}
    </div>
  );
}

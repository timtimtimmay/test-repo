'use client';

import { useState, useCallback } from 'react';
import { JobAnalysis, CapabilityLevel, SearchResult } from '@/lib/types';
import SearchInput from '@/components/SearchInput';
import ResultsPanel, { ResultsPanelSkeleton, ResultsPanelError } from '@/components/ResultsPanel';
import searchIndex from '@/data/onet-search-index.json';

interface OnetSearchItem {
  title: string;
  code: string;
  isPrimary: boolean;
  primaryTitle: string;
}

export default function HomePage() {
  const [selectedJob, setSelectedJob] = useState<SearchResult | null>(null);
  const [capabilityLevel, setCapabilityLevel] = useState<CapabilityLevel>('moderate');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);

  // Search data from O*NET index - transform to SearchResult format
  const searchData: SearchResult[] = (searchIndex as OnetSearchItem[]).map((item) => ({
    id: item.code,
    title: item.title,
    category: item.isPrimary ? 'Primary' : item.primaryTitle,
  }));

  // Handle job selection - call real API
  const handleSelectJob = useCallback(async (result: SearchResult) => {
    setSelectedJob(result);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle: result.title,
          capabilityLevel: capabilityLevel,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysis(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [capabilityLevel]);

  // Re-analyze when capability level changes
  const handleCapabilityChange = useCallback((level: CapabilityLevel) => {
    setCapabilityLevel(level);
    if (selectedJob) {
      // Re-run analysis with new capability level
      handleSelectJob(selectedJob);
    }
  }, [selectedJob, handleSelectJob]);

  // Retry handler
  const handleRetry = useCallback(() => {
    if (selectedJob) {
      handleSelectJob(selectedJob);
    }
  }, [selectedJob, handleSelectJob]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Workforce Task Intelligence
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Analyze any job role to understand automation exposure, task-level AI capabilities,
          and strategic skill development priorities.
        </p>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <SearchInput
              searchData={searchData}
              onSelect={handleSelectJob}
              placeholder="Search for a job title (e.g., Financial Analyst, Software Developer)"
              disabled={isLoading}
            />
            <p className="mt-2 text-xs text-gray-500">
              Search across 57,521 job titles from O*NET database (e.g., Financial Analyst, Software Developer, Registered Nurse, Electrician)
            </p>
          </div>

          {/* Capability Level Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Capability Assumption
            </label>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500">Conservative</span>
                <span className="text-xs text-gray-500">Moderate</span>
                <span className="text-xs text-gray-500">Bold</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                value={capabilityLevel === 'conservative' ? 0 : capabilityLevel === 'moderate' ? 1 : 2}
                onChange={(e) => {
                  const levels: CapabilityLevel[] = ['conservative', 'moderate', 'bold'];
                  handleCapabilityChange(levels[parseInt(e.target.value)]);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
              />
              <div className="mt-3 text-center">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  capabilityLevel === 'conservative'
                    ? 'bg-blue-100 text-blue-800'
                    : capabilityLevel === 'moderate'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {capabilityLevel.charAt(0).toUpperCase() + capabilityLevel.slice(1)}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500 text-center">
                {capabilityLevel === 'conservative' && 'Assumes slower AI capability advancement'}
                {capabilityLevel === 'moderate' && 'Assumes current trajectory continues'}
                {capabilityLevel === 'bold' && 'Assumes rapid AI capability advancement'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Area */}
      {!selectedJob && !isLoading && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <svg className="h-8 w-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Search for a Job Title
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Enter a job title above to see a detailed analysis of automation exposure,
            task breakdown, and skill implications.
          </p>
        </div>
      )}

      {isLoading && <ResultsPanelSkeleton />}

      {error && <ResultsPanelError error={error} onRetry={handleRetry} />}

      {analysis && !isLoading && !error && (
        <ResultsPanel analysis={analysis} />
      )}

      {/* Methodology Callout */}
      <div className="mt-8 bg-slate-50 rounded-xl border border-slate-200 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">
              About This Analysis
            </h3>
            <p className="text-sm text-slate-600">
              This tool analyzes workforce automation exposure using O*NET occupational data
              and ILO-based classification frameworks. Analysis is powered by Claude AI and takes
              60-90 seconds per job title. For the complete methodology, visit the{' '}
              <a href="/methodology" className="text-slate-800 font-medium hover:underline">
                Methodology page
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

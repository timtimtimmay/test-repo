'use client';

import { TaxonomyResolution as TaxonomyResolutionType } from '@/lib/types';
import ExpandableSection from './ExpandableSection';
import ConfidenceIndicator from './ConfidenceIndicator';

interface TaxonomyResolutionProps {
  data: TaxonomyResolutionType;
}

export default function TaxonomyResolution({ data }: TaxonomyResolutionProps) {
  return (
    <ExpandableSection
      title="1. Taxonomy Resolution"
      defaultExpanded={true}
      badge={<ConfidenceIndicator level={data.confidence} size="sm" />}
      icon={
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      }
      methodologyNote={{
        title: 'Taxonomy Resolution',
        description: 'Job title mapped to O*NET Standard Occupational Classification for consistent task decomposition.',
        dataSource: 'O*NET Database v28.0',
        limitations: 'O*NET task lists may lag behind rapidly evolving job requirements',
      }}
    >
      <div className="space-y-4">
        {/* Input to Resolved mapping */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Input Title
            </label>
            <p className="mt-1 text-lg font-medium text-gray-900">{data.inputTitle}</p>
          </div>
          <div className="hidden sm:flex items-center text-gray-400">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              O*NET Classification
            </label>
            <p className="mt-1 text-lg font-medium text-gray-900">{data.resolvedTitle}</p>
            <p className="text-sm text-gray-500">Code: {data.onetCode}</p>
          </div>
        </div>

        {/* Match Reasoning */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-slate-800 mb-2">Match Reasoning</h4>
          <p className="text-sm text-slate-600">{data.matchReasoning}</p>
        </div>

        {/* Alternative Titles */}
        {data.alternativeTitles.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Related Titles</h4>
            <div className="flex flex-wrap gap-2">
              {data.alternativeTitles.map((title, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
}

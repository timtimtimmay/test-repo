'use client';

import { useState } from 'react';
import { TaxonomyResolution } from '@/lib/types';
import ConfidenceIndicator from './ConfidenceIndicator';

interface TaxonomyInlineProps {
  data: TaxonomyResolution;
}

export default function TaxonomyInline({ data }: TaxonomyInlineProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t border-gray-100 pt-4">
      {/* Condensed single-line view */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 text-sm">
          <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="text-gray-500">Mapped to:</span>
          <span className="font-medium text-gray-900">{data.resolvedTitle}</span>
          <span className="text-gray-400">({data.onetCode})</span>
        </div>

        <div className="flex items-center gap-2">
          <ConfidenceIndicator level={data.confidence} size="sm" />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 transition-colors"
          >
            {isExpanded ? 'Hide' : 'Details'}
            <svg
              className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable details */}
      {isExpanded && (
        <div className="mt-4 pl-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {/* Match Reasoning */}
          <div className="bg-slate-50 rounded-lg p-3">
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Match Reasoning</h4>
            <p className="text-sm text-slate-700">{data.matchReasoning}</p>
          </div>

          {/* Alternative Titles */}
          {data.alternativeTitles.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Related Titles</h4>
              <div className="flex flex-wrap gap-1.5">
                {data.alternativeTitles.map((title, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Data Source Note */}
          <p className="text-xs text-gray-400">
            Source: O*NET Database 30.1 (December 2025)
          </p>
        </div>
      )}
    </div>
  );
}

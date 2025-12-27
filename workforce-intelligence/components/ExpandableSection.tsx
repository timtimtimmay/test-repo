'use client';

import { useState, ReactNode } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  methodologyNote?: {
    title: string;
    description: string;
    dataSource?: string;
    limitations?: string;
  };
}

export default function ExpandableSection({
  title,
  children,
  defaultExpanded = false,
  icon,
  badge,
  methodologyNote,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gray-500">{icon}</span>}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
          {badge}
        </div>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            {children}
          </div>

          {/* Methodology Note Toggle */}
          {methodologyNote && (
            <div className="border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowMethodology(!showMethodology)}
                className="w-full flex items-center gap-2 px-4 py-2 sm:px-6 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{showMethodology ? 'Hide' : 'Show'} methodology notes</span>
              </button>

              {showMethodology && (
                <div className="px-4 py-3 sm:px-6 bg-slate-50 text-sm">
                  <h4 className="font-medium text-slate-800 mb-1">{methodologyNote.title}</h4>
                  <p className="text-slate-600 mb-2">{methodologyNote.description}</p>
                  {methodologyNote.dataSource && (
                    <p className="text-xs text-slate-500">
                      <span className="font-medium">Data Source:</span> {methodologyNote.dataSource}
                    </p>
                  )}
                  {methodologyNote.limitations && (
                    <p className="text-xs text-slate-500 mt-1">
                      <span className="font-medium">Limitations:</span> {methodologyNote.limitations}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { AutomationExposure } from '@/lib/types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ClassificationFilter } from './ResultsPanel';

interface AutomationExposureHeroProps {
  data: AutomationExposure;
  taskCounts: {
    all: number;
    automate: number;
    augment: number;
    retain: number;
  };
  selectedFilter: ClassificationFilter;
  onFilterChange: (filter: ClassificationFilter) => void;
}

const COLORS = {
  automate: '#3B82F6', // blue-500
  augment: '#8B5CF6', // purple-500
  retain: '#10B981', // emerald-500
};

const SELECTED_COLORS = {
  automate: '#1D4ED8', // blue-700
  augment: '#6D28D9', // purple-700
  retain: '#047857', // emerald-700
};

export default function AutomationExposureHero({
  data,
  taskCounts,
  selectedFilter,
  onFilterChange,
}: AutomationExposureHeroProps) {
  const chartData = [
    {
      name: 'Automate',
      value: data.automatePercentage,
      filter: 'automate' as const,
      taskCount: taskCounts.automate,
    },
    {
      name: 'Augment',
      value: data.augmentPercentage,
      filter: 'augment' as const,
      taskCount: taskCounts.augment,
    },
    {
      name: 'Retain',
      value: data.retainPercentage,
      filter: 'retain' as const,
      taskCount: taskCounts.retain,
    },
  ];

  const handlePieClick = (filter: ClassificationFilter) => {
    if (selectedFilter === filter) {
      onFilterChange('all');
    } else {
      onFilterChange(filter);
    }
  };

  const getColor = (filter: 'automate' | 'augment' | 'retain') => {
    if (selectedFilter === filter) {
      return SELECTED_COLORS[filter];
    }
    return COLORS[filter];
  };

  const getOpacity = (filter: 'automate' | 'augment' | 'retain') => {
    if (selectedFilter === 'all') return 1;
    return selectedFilter === filter ? 1 : 0.3;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Automation Exposure</h3>
          <p className="text-sm text-gray-500">Click a category to explore tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Pie Chart */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={selectedFilter === 'all' ? 100 : 95}
                  paddingAngle={3}
                  dataKey="value"
                  onClick={(_, index) => handlePieClick(chartData[index].filter)}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.filter}`}
                      fill={getColor(entry.filter)}
                      stroke="white"
                      strokeWidth={selectedFilter === entry.filter ? 3 : 2}
                      style={{
                        opacity: getOpacity(entry.filter),
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        transform: selectedFilter === entry.filter ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend - Clickable */}
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {chartData.map((entry) => (
              <button
                key={entry.filter}
                onClick={() => handlePieClick(entry.filter)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedFilter === entry.filter
                    ? 'bg-gray-100 ring-2 ring-offset-1'
                    : 'hover:bg-gray-50'
                }`}
                style={{
                  // @ts-expect-error - ringColor is valid CSS
                  '--tw-ring-color': selectedFilter === entry.filter ? COLORS[entry.filter] : undefined,
                }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[entry.filter] }}
                />
                <span className={selectedFilter === entry.filter ? 'font-medium' : 'text-gray-600'}>
                  {entry.name}
                </span>
                <span className="text-gray-400">({entry.value}%)</span>
              </button>
            ))}
          </div>

          {selectedFilter !== 'all' && (
            <button
              onClick={() => onFilterChange('all')}
              className="mt-3 text-sm text-slate-600 hover:text-slate-800 underline underline-offset-2"
            >
              Show all tasks
            </button>
          )}
        </div>

        {/* Stats and Summary */}
        <div className="space-y-5">
          {/* Overall Exposure Score - Prominent */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Overall Exposure Score</span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                data.exposureCategory === 'high' || data.exposureCategory === 'very-high'
                  ? 'bg-red-100 text-red-700'
                  : data.exposureCategory === 'moderate'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {data.exposureCategory.charAt(0).toUpperCase() + data.exposureCategory.slice(1)} Exposure
              </span>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-4xl font-bold text-slate-900">{data.overallExposureScore}</span>
              <span className="text-lg text-slate-400 mb-1">/100</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  data.overallExposureScore >= 70
                    ? 'bg-gradient-to-r from-red-400 to-red-500'
                    : data.overallExposureScore >= 50
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                    : 'bg-gradient-to-r from-green-400 to-green-500'
                }`}
                style={{ width: `${data.overallExposureScore}%` }}
              />
            </div>
          </div>

          {/* Clickable Category Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handlePieClick('automate')}
              className={`text-center p-4 rounded-xl transition-all ${
                selectedFilter === 'automate'
                  ? 'bg-blue-100 ring-2 ring-blue-500 ring-offset-2'
                  : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <div className="text-2xl font-bold text-blue-700">{data.automatePercentage}%</div>
              <div className="text-xs font-medium text-blue-600 uppercase mt-1">Automate</div>
              <div className="text-xs text-blue-500 mt-0.5">{taskCounts.automate} tasks</div>
            </button>

            <button
              onClick={() => handlePieClick('augment')}
              className={`text-center p-4 rounded-xl transition-all ${
                selectedFilter === 'augment'
                  ? 'bg-purple-100 ring-2 ring-purple-500 ring-offset-2'
                  : 'bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <div className="text-2xl font-bold text-purple-700">{data.augmentPercentage}%</div>
              <div className="text-xs font-medium text-purple-600 uppercase mt-1">Augment</div>
              <div className="text-xs text-purple-500 mt-0.5">{taskCounts.augment} tasks</div>
            </button>

            <button
              onClick={() => handlePieClick('retain')}
              className={`text-center p-4 rounded-xl transition-all ${
                selectedFilter === 'retain'
                  ? 'bg-emerald-100 ring-2 ring-emerald-500 ring-offset-2'
                  : 'bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <div className="text-2xl font-bold text-emerald-700">{data.retainPercentage}%</div>
              <div className="text-xs font-medium text-emerald-600 uppercase mt-1">Retain</div>
              <div className="text-xs text-emerald-500 mt-0.5">{taskCounts.retain} tasks</div>
            </button>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Summary</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

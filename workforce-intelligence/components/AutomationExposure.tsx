'use client';

import { AutomationExposure as AutomationExposureType } from '@/lib/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ExpandableSection from './ExpandableSection';
import { ExposureBadge } from './ConfidenceIndicator';

interface AutomationExposureProps {
  data: AutomationExposureType;
}

const COLORS = {
  automate: '#3B82F6', // blue-500
  augment: '#8B5CF6', // purple-500
  retain: '#10B981', // emerald-500
};

export default function AutomationExposure({ data }: AutomationExposureProps) {
  const chartData = [
    { name: 'Automate', value: data.automatePercentage, color: COLORS.automate },
    { name: 'Augment', value: data.augmentPercentage, color: COLORS.augment },
    { name: 'Retain', value: data.retainPercentage, color: COLORS.retain },
  ];

  return (
    <ExpandableSection
      title="3. Automation Exposure"
      defaultExpanded={true}
      badge={<ExposureBadge level={data.exposureCategory} size="sm" />}
      icon={
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      }
      methodologyNote={{
        title: 'AI Capability Matching',
        description: 'Each task evaluated against current AI capabilities using standardized rubric.',
        dataSource: 'Internal capability framework based on published AI benchmarks',
        limitations: 'AI capabilities evolving rapidly; assessments reflect current state',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="flex items-center justify-center">
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm text-gray-700">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats and Summary */}
        <div className="space-y-4">
          {/* Overall Exposure Score */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Overall Exposure Score</span>
              <span className="text-2xl font-bold text-slate-900">{data.overallExposureScore}/100</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  data.overallExposureScore >= 70
                    ? 'bg-red-500'
                    : data.overallExposureScore >= 50
                    ? 'bg-amber-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${data.overallExposureScore}%` }}
              />
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{data.automatePercentage}%</div>
              <div className="text-xs font-medium text-blue-600 uppercase">Automate</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">{data.augmentPercentage}%</div>
              <div className="text-xs font-medium text-purple-600 uppercase">Augment</div>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-700">{data.retainPercentage}%</div>
              <div className="text-xs font-medium text-emerald-600 uppercase">Retain</div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Summary</h4>
            <p className="text-sm text-gray-600">{data.summary}</p>
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
}

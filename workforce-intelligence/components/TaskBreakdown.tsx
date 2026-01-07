'use client';

import { Task } from '@/lib/types';
import { ClassificationBadge } from './ConfidenceIndicator';
import { ClassificationFilter } from './ResultsPanel';

interface TaskBreakdownProps {
  tasks: Task[];
  allTasks: Task[];
  taskCounts: {
    all: number;
    automate: number;
    augment: number;
    retain: number;
  };
  selectedFilter: ClassificationFilter;
  onFilterChange: (filter: ClassificationFilter) => void;
}

const FILTER_CONFIG = {
  all: {
    label: 'All Tasks',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    activeRing: 'ring-gray-400',
  },
  automate: {
    label: 'Automate',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    activeRing: 'ring-blue-500',
  },
  augment: {
    label: 'Augment',
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    activeRing: 'ring-purple-500',
  },
  retain: {
    label: 'Retain',
    color: 'emerald',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    activeRing: 'ring-emerald-500',
  },
};

export default function TaskBreakdown({
  tasks,
  taskCounts,
  selectedFilter,
  onFilterChange,
}: TaskBreakdownProps) {
  const filterConfig = FILTER_CONFIG[selectedFilter];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header with Filter Tabs */}
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Task Breakdown</h3>
              <p className="text-sm text-gray-500">
                {selectedFilter === 'all'
                  ? `${taskCounts.all} tasks analyzed`
                  : `Showing ${tasks.length} ${filterConfig.label.toLowerCase()} tasks`}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {(Object.keys(FILTER_CONFIG) as ClassificationFilter[]).map((filter) => {
            const config = FILTER_CONFIG[filter];
            const count = taskCounts[filter];
            const isActive = selectedFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? `${config.bgColor} ${config.textColor} ring-2 ${config.activeRing} ring-offset-1`
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter !== 'all' && (
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      filter === 'automate'
                        ? 'bg-blue-500'
                        : filter === 'augment'
                        ? 'bg-purple-500'
                        : 'bg-emerald-500'
                    }`}
                  />
                )}
                <span>{config.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-xs ${
                  isActive ? 'bg-white/50' : 'bg-gray-100'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div className="p-4">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>No tasks in this category</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                isFiltered={selectedFilter !== 'all'}
              />
            ))}
          </div>
        )}
      </div>

      {/* Methodology Note */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Methodology:</span> Tasks sourced from O*NET Database and classified using ILO-based framework.
          Task weighting estimated based on typical role requirements.
        </p>
      </div>
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  index: number;
  isFiltered: boolean;
}

function TaskCard({ task, index, isFiltered }: TaskCardProps) {
  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all ${
        isFiltered ? 'animate-in fade-in slide-in-from-top-2 duration-300' : ''
      }`}
      style={{ animationDelay: isFiltered ? `${index * 50}ms` : '0ms' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <h4 className="font-medium text-gray-900">{task.name}</h4>
          <ClassificationBadge classification={task.classification} size="sm" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Automation Potential:</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  task.automationPotential >= 70
                    ? 'bg-blue-500'
                    : task.automationPotential >= 40
                    ? 'bg-purple-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${task.automationPotential}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{task.automationPotential}%</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>

      {/* Reasoning */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          Classification Reasoning
        </h5>
        <p className="text-sm text-gray-700">{task.reasoning}</p>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* AI Capabilities */}
        {task.aiCapabilities && task.aiCapabilities.length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              AI Capabilities
            </h5>
            <div className="flex flex-wrap gap-1">
              {task.aiCapabilities.map((capability, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Human Advantages */}
        {task.humanAdvantages && task.humanAdvantages.length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Human Advantages
            </h5>
            <div className="flex flex-wrap gap-1">
              {task.humanAdvantages.map((advantage, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-700"
                >
                  {advantage}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

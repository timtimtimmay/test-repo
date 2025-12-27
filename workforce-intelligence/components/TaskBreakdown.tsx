'use client';

import { Task } from '@/lib/types';
import ExpandableSection from './ExpandableSection';
import { ClassificationBadge } from './ConfidenceIndicator';

interface TaskBreakdownProps {
  tasks: Task[];
}

export default function TaskBreakdown({ tasks }: TaskBreakdownProps) {
  return (
    <ExpandableSection
      title="2. Task Breakdown"
      defaultExpanded={true}
      icon={
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      }
      badge={
        <span className="text-xs text-gray-500 ml-2">
          {tasks.length} tasks analyzed
        </span>
      }
      methodologyNote={{
        title: 'Task Decomposition',
        description: 'Role broken into constituent tasks using O*NET task statements and industry research.',
        dataSource: 'O*NET Task Statements, BLS Occupational Outlook',
        limitations: 'Task weighting is estimated based on typical role, may vary by organization',
      }}
    >
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </ExpandableSection>
  );
}

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
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
                className={`h-full rounded-full ${
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
        <div>
          <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            AI Capabilities
          </h5>
          <div className="flex flex-wrap gap-1">
            {task.aiCapabilities.map((capability, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
              >
                {capability}
              </span>
            ))}
          </div>
        </div>

        {/* Human Advantages */}
        {task.humanAdvantages && task.humanAdvantages.length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Human Advantages
            </h5>
            <div className="flex flex-wrap gap-1">
              {task.humanAdvantages.map((advantage, index) => (
                <span
                  key={index}
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

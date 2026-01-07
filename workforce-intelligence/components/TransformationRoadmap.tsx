'use client';

import { Task, SkillImplication } from '@/lib/types';

interface TransformationRoadmapProps {
  jobTitle: string;
  tasks: Task[];
  skills: SkillImplication[];
  automatePercentage: number;
  augmentPercentage: number;
  retainPercentage: number;
}

export default function TransformationRoadmap({
  jobTitle,
  tasks,
  skills,
  automatePercentage,
  augmentPercentage,
  retainPercentage,
}: TransformationRoadmapProps) {
  // Group tasks by classification
  const automateTasks = tasks.filter(t => t.classification === 'automate');
  const augmentTasks = tasks.filter(t => t.classification === 'augment');
  const retainTasks = tasks.filter(t => t.classification === 'retain');

  // Group skills by category based on currentRelevance: 'increasing' | 'stable' | 'decreasing'
  const decliningSkills = skills.filter(s => s.currentRelevance === 'decreasing');
  const evolvingSkills = skills.filter(s => s.currentRelevance === 'stable');
  const differentiatingSkills = skills.filter(s => s.currentRelevance === 'increasing');

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-lg">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Transformation Roadmap</h2>
            <p className="text-slate-300 text-sm">{jobTitle}</p>
          </div>
        </div>

        {/* Timeline Header */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white" />
            <span className="text-sm font-medium text-white">NOW</span>
          </div>
          <div className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-white/60 via-white/40 to-white/60" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/60" />
            <span className="text-sm font-medium text-slate-300">6-12 MONTHS</span>
          </div>
          <div className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-white/40 via-white/30 to-white/40" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/40" />
            <span className="text-sm font-medium text-slate-400">12-24 MONTHS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* AUTOMATE Section */}
        <RoadmapSection
          title="Automate"
          subtitle="AI handles completely"
          percentage={automatePercentage}
          tasks={automateTasks}
          color="blue"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          timelineDescription="These tasks transition to full automation with minimal human oversight"
          actions={[
            `Redeploy ${Math.round(automateTasks.length * 0.5)}-${automateTasks.length} hrs/week to higher-value work`,
            'Identify AI tools that can handle these tasks today',
            'Establish quality checks for automated outputs',
          ]}
        />

        {/* AUGMENT Section - The Big Shift */}
        <RoadmapSection
          title="Augment"
          subtitle="Human-AI collaboration"
          percentage={augmentPercentage}
          tasks={augmentTasks}
          color="purple"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          highlight={true}
          timelineDescription="The biggest transformation area — tasks evolve from manual to AI-assisted to AI-partnered"
          phaseInfo={{
            phase1: 'AI as Assistant — AI drafts, human creates',
            phase2: 'AI as Partner — AI generates, human refines & validates',
          }}
          actions={[
            'Train team on AI collaboration tools and prompt engineering',
            'Redesign workflows for human-AI handoffs',
            'Define quality standards for AI-assisted outputs',
            'Create feedback loops to improve AI performance',
          ]}
        />

        {/* RETAIN Section */}
        <RoadmapSection
          title="Retain"
          subtitle="Uniquely human — competitive advantage"
          percentage={retainPercentage}
          tasks={retainTasks}
          color="emerald"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
          timelineDescription="These tasks INCREASE in value as AI handles routine work — double down here"
          actions={[
            'Elevate these capabilities in job descriptions & performance reviews',
            'Hire for EQ + judgment, not just technical skills',
            'Create development programs focused on these differentiators',
            'Protect time for these activities as AI frees up capacity',
          ]}
        />

        {/* Skills Investment Priority */}
        <div className="mt-8 pt-6 border-t border-gray-200">
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

        {/* Executive Summary Footer */}
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-slate-200 rounded-lg">
              <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">Executive Summary</h4>
              <p className="text-sm text-slate-600">
                {automatePercentage}% of tasks can be fully automated, freeing capacity for higher-value work.
                The majority ({augmentPercentage}%) will transform into human-AI collaboration — this is where
                training investment should focus. {retainPercentage}% of tasks remain uniquely human and represent
                the role&apos;s future competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Roadmap Section Component
interface RoadmapSectionProps {
  title: string;
  subtitle: string;
  percentage: number;
  tasks: Task[];
  color: 'blue' | 'purple' | 'emerald';
  icon: React.ReactNode;
  highlight?: boolean;
  timelineDescription: string;
  phaseInfo?: {
    phase1: string;
    phase2: string;
  };
  actions: string[];
}

function RoadmapSection({
  title,
  subtitle,
  percentage,
  tasks,
  color,
  icon,
  highlight,
  timelineDescription,
  phaseInfo,
  actions,
}: RoadmapSectionProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      headerBg: 'bg-blue-100',
      text: 'text-blue-900',
      subtext: 'text-blue-700',
      icon: 'text-blue-600',
      badge: 'bg-blue-500',
      actionBg: 'bg-blue-50',
      actionText: 'text-blue-800',
      taskBg: 'bg-blue-50/50',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      headerBg: 'bg-purple-100',
      text: 'text-purple-900',
      subtext: 'text-purple-700',
      icon: 'text-purple-600',
      badge: 'bg-purple-500',
      actionBg: 'bg-purple-50',
      actionText: 'text-purple-800',
      taskBg: 'bg-purple-50/50',
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      headerBg: 'bg-emerald-100',
      text: 'text-emerald-900',
      subtext: 'text-emerald-700',
      icon: 'text-emerald-600',
      badge: 'bg-emerald-500',
      actionBg: 'bg-emerald-50',
      actionText: 'text-emerald-800',
      taskBg: 'bg-emerald-50/50',
    },
  };

  const classes = colorClasses[color];

  return (
    <div className={`rounded-xl border-2 ${classes.border} ${highlight ? 'ring-2 ring-purple-300 ring-offset-2' : ''}`}>
      {/* Section Header */}
      <div className={`${classes.headerBg} px-5 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-white/60 ${classes.icon}`}>
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-lg font-bold ${classes.text}`}>{title}</h3>
              {highlight && (
                <span className="px-2 py-0.5 text-xs font-medium bg-purple-600 text-white rounded-full">
                  THE BIG SHIFT
                </span>
              )}
            </div>
            <p className={`text-sm ${classes.subtext}`}>{subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${classes.text}`}>{percentage}%</div>
          <div className={`text-xs ${classes.subtext}`}>of tasks</div>
        </div>
      </div>

      {/* Section Body */}
      <div className={`${classes.bg} p-5`}>
        {/* Timeline Description */}
        <p className={`text-sm ${classes.subtext} mb-4`}>
          {timelineDescription}
        </p>

        {/* Phase Info (for Augment) */}
        {phaseInfo && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
              <div className="text-xs font-medium text-purple-500 uppercase tracking-wide mb-1">Phase 1</div>
              <div className="text-sm text-purple-800">{phaseInfo.phase1}</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
              <div className="text-xs font-medium text-purple-500 uppercase tracking-wide mb-1">Phase 2</div>
              <div className="text-sm text-purple-800">{phaseInfo.phase2}</div>
            </div>
          </div>
        )}

        {/* Tasks */}
        <div className="mb-4">
          <h4 className={`text-xs font-semibold uppercase tracking-wide ${classes.subtext} mb-2`}>
            Tasks ({tasks.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {tasks.slice(0, 8).map((task) => (
              <span
                key={task.id}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm ${classes.taskBg} ${classes.text} border ${classes.border}`}
              >
                {task.name}
              </span>
            ))}
            {tasks.length > 8 && (
              <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm ${classes.subtext}`}>
                +{tasks.length - 8} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={`${classes.actionBg} rounded-lg p-4 border ${classes.border}`}>
          <h4 className={`text-xs font-semibold uppercase tracking-wide ${classes.subtext} mb-2 flex items-center gap-1`}>
            <span>💡</span> Recommended Actions
          </h4>
          <ul className="space-y-2">
            {actions.map((action, index) => (
              <li key={index} className={`text-sm ${classes.actionText} flex items-start gap-2`}>
                <span className={`${classes.subtext} mt-0.5`}>→</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

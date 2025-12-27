'use client';

import { SkillImplication } from '@/lib/types';
import ExpandableSection from './ExpandableSection';
import { PriorityBadge, RelevanceIndicator } from './ConfidenceIndicator';

interface SkillsImplicationsProps {
  skills: SkillImplication[];
}

export default function SkillsImplications({ skills }: SkillsImplicationsProps) {
  return (
    <ExpandableSection
      title="4. Skills Implications"
      defaultExpanded={true}
      icon={
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      }
      badge={
        <span className="text-xs text-gray-500 ml-2">
          {skills.length} skills analyzed
        </span>
      }
      methodologyNote={{
        title: 'Exposure Calculation',
        description: 'Weighted aggregation of task-level automation potential into overall exposure score.',
        dataSource: 'Proprietary weighting methodology',
        limitations: 'Does not account for industry-specific adoption barriers',
      }}
    >
      <div className="space-y-4">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </ExpandableSection>
  );
}

interface SkillCardProps {
  skill: SkillImplication;
}

function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <h4 className="font-medium text-gray-900">{skill.skillName}</h4>
          <RelevanceIndicator trend={skill.currentRelevance} size="sm" />
        </div>
        <PriorityBadge priority={skill.developmentPriority} size="sm" />
      </div>

      {/* Rationale - Emphasized */}
      <div className="bg-slate-50 rounded-lg p-4 mb-3 border-l-4 border-slate-400">
        <h5 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
          Why This Matters
        </h5>
        <p className="text-sm text-slate-700 font-medium">{skill.rationale}</p>
      </div>

      {/* Future Outlook */}
      <div className="mb-3">
        <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          Future Outlook
        </h5>
        <p className="text-sm text-gray-600">{skill.futureOutlook}</p>
      </div>

      {/* Adjacent Skills */}
      {skill.adjacentSkills.length > 0 && (
        <div>
          <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Adjacent Skills to Develop
          </h5>
          <div className="flex flex-wrap gap-1">
            {skill.adjacentSkills.map((adjacentSkill, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {adjacentSkill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

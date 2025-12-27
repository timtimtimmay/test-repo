import { ConfidenceLevel } from '@/lib/types';

interface ConfidenceIndicatorProps {
  level: ConfidenceLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const levelConfig = {
  high: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    dot: 'bg-green-500',
    label: 'High Confidence',
  },
  medium: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
    label: 'Medium Confidence',
  },
  low: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    dot: 'bg-red-500',
    label: 'Low Confidence',
  },
};

const sizeConfig = {
  sm: {
    badge: 'px-2 py-0.5 text-xs',
    dot: 'h-1.5 w-1.5',
  },
  md: {
    badge: 'px-2.5 py-1 text-xs',
    dot: 'h-2 w-2',
  },
  lg: {
    badge: 'px-3 py-1.5 text-sm',
    dot: 'h-2.5 w-2.5',
  },
};

export default function ConfidenceIndicator({
  level,
  showLabel = true,
  size = 'md',
}: ConfidenceIndicatorProps) {
  const config = levelConfig[level];
  const sizeStyles = sizeConfig[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${sizeStyles.badge}`}
    >
      <span className={`rounded-full ${config.dot} ${sizeStyles.dot}`} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

// Variant for classification badges
interface ClassificationBadgeProps {
  classification: 'automate' | 'augment' | 'retain';
  size?: 'sm' | 'md' | 'lg';
}

const classificationConfig = {
  automate: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'Automate',
  },
  augment: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    label: 'Augment',
  },
  retain: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    label: 'Retain',
  },
};

export function ClassificationBadge({ classification, size = 'md' }: ClassificationBadgeProps) {
  const config = classificationConfig[classification];
  const sizeStyles = sizeConfig[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.text} ${sizeStyles.badge}`}
    >
      {config.label}
    </span>
  );
}

// Exposure level badge
interface ExposureBadgeProps {
  level: 'low' | 'moderate' | 'high' | 'very-high';
  size?: 'sm' | 'md' | 'lg';
}

const exposureConfig = {
  low: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Low Exposure',
  },
  moderate: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    label: 'Moderate Exposure',
  },
  high: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    label: 'High Exposure',
  },
  'very-high': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Very High Exposure',
  },
};

export function ExposureBadge({ level, size = 'md' }: ExposureBadgeProps) {
  const config = exposureConfig[level];
  const sizeStyles = sizeConfig[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.text} ${sizeStyles.badge}`}
    >
      {config.label}
    </span>
  );
}

// Priority badge for skills
interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
  size?: 'sm' | 'md' | 'lg';
}

const priorityConfig = {
  high: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    label: 'High Priority',
  },
  medium: {
    bg: 'bg-sky-100',
    text: 'text-sky-800',
    label: 'Medium Priority',
  },
  low: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: 'Low Priority',
  },
};

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  const sizeStyles = sizeConfig[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.text} ${sizeStyles.badge}`}
    >
      {config.label}
    </span>
  );
}

// Relevance indicator
interface RelevanceIndicatorProps {
  trend: 'increasing' | 'stable' | 'decreasing';
  size?: 'sm' | 'md' | 'lg';
}

const relevanceConfig = {
  increasing: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: '↑',
    label: 'Increasing',
  },
  stable: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    icon: '→',
    label: 'Stable',
  },
  decreasing: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    icon: '↓',
    label: 'Decreasing',
  },
};

export function RelevanceIndicator({ trend, size = 'md' }: RelevanceIndicatorProps) {
  const config = relevanceConfig[trend];
  const sizeStyles = sizeConfig[size];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${config.bg} ${config.text} ${sizeStyles.badge}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}

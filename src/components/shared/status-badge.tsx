import { CheckCircle2, Clock, AlertCircle, Inbox, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

/** Complaint resolution status codes */
export type ComplaintStatus = 'received' | 'in_progress' | 'resolved' | 'rejected' | 'unknown';

const STATUS_CONFIG: Record<
  ComplaintStatus,
  {
    labelMr: string;
    labelEn: string;
    icon: LucideIcon;
    bgClass: string;
    textClass: string;
    borderClass: string;
  }
> = {
  received: {
    labelMr: 'प्राप्त',
    labelEn: 'Received',
    icon: Inbox,
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
    borderClass: 'border-blue-200',
  },
  in_progress: {
    labelMr: 'प्रगतीपथावर',
    labelEn: 'In Progress',
    icon: Clock,
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-200',
  },
  resolved: {
    labelMr: 'निकाली',
    labelEn: 'Resolved',
    icon: CheckCircle2,
    bgClass: 'bg-green-50',
    textClass: 'text-green-700',
    borderClass: 'border-green-200',
  },
  rejected: {
    labelMr: 'नाकारले',
    labelEn: 'Rejected',
    icon: AlertCircle,
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
    borderClass: 'border-red-200',
  },
  unknown: {
    labelMr: 'अज्ञात',
    labelEn: 'Unknown',
    icon: AlertCircle,
    bgClass: 'bg-gray-50',
    textClass: 'text-gray-600',
    borderClass: 'border-gray-200',
  },
};

interface StatusBadgeProps {
  status: ComplaintStatus;
  /** Show both Marathi and English labels */
  showBothLanguages?: boolean;
  /** Use pill variant (default) or inline text-only variant */
  variant?: 'pill' | 'inline';
  className?: string;
}

/**
 * StatusBadge — renders complaint resolution status as icon + Marathi text.
 *
 * Spec requirement: "Status must render as icon + Marathi text (Received/In Progress/Resolved),
 * not just a color dot" — csmc-adaptation-instructions.md §3
 * Accessibility: color is NEVER the only indicator — icon + text always paired (REQ-PER-03 / WCAG 1.4.1).
 */
export function StatusBadge({
  status,
  showBothLanguages = false,
  variant = 'pill',
  className,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown;
  const Icon = config.icon;

  if (variant === 'inline') {
    return (
      <span
        className={cn('inline-flex items-center gap-1 text-sm font-medium', config.textClass, className)}
        role="status"
        aria-label={`${config.labelMr} (${config.labelEn})`}
      >
        <Icon size={14} aria-hidden />
        <span>{config.labelMr}</span>
        {showBothLanguages && (
          <span className="ml-1 font-normal opacity-70">({config.labelEn})</span>
        )}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium',
        config.bgClass,
        config.textClass,
        config.borderClass,
        className
      )}
      role="status"
      aria-label={`${config.labelMr} — ${config.labelEn}`}
    >
      <Icon size={14} aria-hidden />
      <span>{config.labelMr}</span>
      {showBothLanguages && (
        <span className="font-normal opacity-70">({config.labelEn})</span>
      )}
    </span>
  );
}

/** Utility to map numeric/string API status codes to StatusBadge's type */
export function resolveStatus(raw: string | number | null | undefined): ComplaintStatus {
  if (raw === null || raw === undefined) return 'unknown';
  const s = String(raw).toLowerCase().trim();
  if (['received', '0', 'open', 'new'].includes(s)) return 'received';
  if (['in_progress', '1', 'processing', 'assigned', 'pending'].includes(s)) return 'in_progress';
  if (['resolved', '2', 'closed', 'done', 'complete'].includes(s)) return 'resolved';
  if (['rejected', '3', 'invalid', 'cancelled'].includes(s)) return 'rejected';
  return 'unknown';
}

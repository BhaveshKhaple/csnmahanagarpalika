'use client';

import React from 'react';
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  User,
  LucideIcon
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

type StatusKey = 'submitted' | 'assigned' | 'in_progress' | 'resolved' | 'closed' | 'rejected';

interface StatusConfig {
  label: { mr: string; en: string };
  color: string;
  icon: LucideIcon;
  description: { mr: string; en: string };
}

export const statusConfig: Record<StatusKey, StatusConfig> = {
  submitted: {
    label: { mr: 'नोंदवली', en: 'Submitted' },
    color: 'bg-blue-100 text-blue-600',
    icon: FileText,
    description: { mr: 'तुमची तक्रार नोंदवली गेली आहे', en: 'Your complaint has been submitted' }
  },
  assigned: {
    label: { mr: 'विभागाकडे पाठवली', en: 'Assigned' },
    color: 'bg-purple-100 text-purple-600',
    icon: User,
    description: { mr: 'संबंधित विभागाकडे पाठवली', en: 'Assigned to concerned department' }
  },
  in_progress: {
    label: { mr: 'कार्यरत', en: 'In Progress' },
    color: 'bg-orange-100 text-orange-600',
    icon: Clock,
    description: { mr: 'कामाला सुरुवात झाली आहे', en: 'Work is in progress' }
  },
  resolved: {
    label: { mr: 'निराकरण झाले', en: 'Resolved' },
    color: 'bg-green-100 text-green-600',
    icon: CheckCircle,
    description: { mr: 'तक्रारीचे निराकरण झाले आहे', en: 'Complaint has been resolved' }
  },
  closed: {
    label: { mr: 'बंद', en: 'Closed' },
    color: 'bg-gray-100 text-gray-600',
    icon: CheckCircle,
    description: { mr: 'तक्रार बंद केली', en: 'Complaint closed' }
  },
  rejected: {
    label: { mr: 'नाकारली', en: 'Rejected' },
    color: 'bg-red-100 text-red-600',
    icon: AlertCircle,
    description: { mr: 'तक्रार नाकारली गेली', en: 'Complaint was rejected' }
  }
};

interface StatusBadgeProps {
  status: StatusKey;
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({ status, showIcon = true, className = '' }: StatusBadgeProps) {
  const { locale } = useTranslation();
  const config = statusConfig[status];

  if (!config) return null;
  const StatusIcon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.color} ${className}`}>
      {showIcon && <StatusIcon size={16} />}
      <span className="font-semibold text-sm">
        {locale === 'mr' ? config.label.mr : config.label.en}
      </span>
    </div>
  );
}

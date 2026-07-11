import Image from 'next/image';
import Link from 'next/link';
import { FileText, ExternalLink, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface Announcement {
  id: string;
  titleMr: string;
  titleEn?: string;
  date: string; // ISO 8601 or DD-MM-YYYY
  href: string;
  /** PDF | LINK | IMAGE | DOC */
  docType?: 'PDF' | 'LINK' | 'IMAGE' | 'DOC';
  isExternal?: boolean;
  /** ISO date string — if within 7 days, shows "नवीन" badge */
  publishedAt?: string;
}

interface AnnouncementListProps {
  announcements: Announcement[];
  /** Max items to show (default 5, per spec homepage limit) */
  maxItems?: number;
  /** Link to view all announcements */
  viewAllHref?: string;
  className?: string;
}

const DOC_TYPE_LABELS: Record<NonNullable<Announcement['docType']>, string> = {
  PDF: 'PDF',
  LINK: 'दुवा',
  IMAGE: 'प्रतिमा',
  DOC: 'दस्तऐवज',
};

function isNew(publishedAt?: string): boolean {
  if (!publishedAt) return false;
  const published = new Date(publishedAt);
  const now = new Date();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return now.getTime() - published.getTime() < sevenDays;
}

function formatDate(dateStr: string): string {
  // Handle DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return dateStr;
  try {
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  } catch {
    return dateStr;
  }
}

/**
 * AnnouncementList — scannable list of announcements.
 *
 * - Max 5 on homepage (spec §5.1). Pass maxItems to override.
 * - Each item: date + title + doc-type icon. Never image-only (spec §REQ-CON-05).
 * - "नवीन" badge (green) replaces blinking GIF for items < 7 days old (spec §5.1).
 * - "View all" link instead of dumping everything (spec §5.1).
 * - External links marked with icon (spec §5.2).
 *
 * Uses @container for responsive item layout (horizontal on wide, stacked on narrow).
 */
export function AnnouncementList({
  announcements,
  maxItems = 5,
  viewAllHref,
  className,
}: AnnouncementListProps) {
  const visible = announcements.slice(0, maxItems);

  return (
    <div className={cn('space-y-1', className)}>
      <ul role="list" className="divide-y divide-gray-100">
        {visible.map((item) => {
          const showNew = isNew(item.publishedAt);
          const isExt = item.isExternal ?? false;

          const itemContent = (
            <>
              {/* Doc type icon */}
              <span className="mt-0.5 shrink-0 rounded-md bg-gray-100 p-1.5 group-hover:bg-orange-100 transition-colors">
                <FileText size={14} className="text-gray-500 group-hover:text-orange-600" aria-hidden />
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-orange-700 transition-colors leading-snug">
                    {item.titleMr}
                  </p>
                  {showNew && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      नवीन
                    </span>
                  )}
                  {item.docType && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      {DOC_TYPE_LABELS[item.docType]}
                    </span>
                  )}
                  {isExt && (
                    <ExternalLink size={12} className="text-gray-400 shrink-0" aria-label="बाह्य संकेतस्थळ उघडेल" />
                  )}
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar size={10} aria-hidden />
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </div>
              </div>
            </>
          );

          const linkClass = 'group flex items-start gap-3 py-3 px-2 rounded-lg hover:bg-orange-50 transition-colors';
          const ariaLabel = `${item.titleMr}${showNew ? ' — नवीन' : ''}${isExt ? ' (बाह्य संकेतस्थळ)' : ''}`;

          return (
            <li key={item.id} className="@container">
              {isExt ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={ariaLabel}>
                  {itemContent}
                </a>
              ) : (
                <Link href={item.href} className={linkClass} aria-label={ariaLabel}>
                  {itemContent}
                </Link>
              )}
            </li>
          );

        })}
      </ul>

      {viewAllHref && announcements.length > maxItems && (
        <div className="pt-2 text-center">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 hover:underline"
          >
            सर्व घोषणा पाहा
            <span className="text-xs text-gray-400">({announcements.length - maxItems} अधिक)</span>
          </Link>
        </div>
      )}
    </div>
  );
}

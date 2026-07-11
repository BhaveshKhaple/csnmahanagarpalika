import Image from 'next/image';
import Link from 'next/link';
import { Lock, ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ServiceCardProps {
  /** Marathi label — primary, larger text */
  titleMr: string;
  /** English label — secondary, smaller text */
  titleEn: string;
  /** lucide-react icon component */
  icon: LucideIcon;
  /** Route href */
  href: string;
  /** Whether this service requires a citizen login */
  requiresLogin?: boolean;
  /** Tailwind bg color class for the icon container */
  bgColor?: string;
  /** Tailwind text color class for the icon */
  iconColor?: string;
  /** Optional description shown in larger/list layouts */
  description?: string;
  className?: string;
}

/**
 * ServiceCard — reusable card for displaying a single citizen service.
 *
 * Uses CSS container queries (@container) so the card adapts its own
 * internal layout based on the column width it occupies, not the
 * viewport width. This lets a 2-col mobile grid and a 6-col desktop
 * grid both get the right layout from one component.
 *
 * Spec refs:
 * - csmc-website-redesign-spec.md §5.1 (homepage cards)
 * - csmc-adaptation-instructions.md §2 (ServiceCard spec)
 * - REQ-PER-08 (container queries on ServiceCard)
 */
export function ServiceCard({
  titleMr,
  titleEn,
  icon: Icon,
  href,
  requiresLogin = false,
  bgColor = 'bg-orange-50',
  iconColor = 'text-orange-600',
  description,
  className,
}: ServiceCardProps) {
  return (
    // @container wrapper — child elements respond to THIS container's width
    <div className={cn('@container', className)}>
      <Link
        href={href}
        aria-label={`${titleMr} — ${titleEn}${requiresLogin ? ' (लॉगिन आवश्यक)' : ''}`}
        className="group block h-full"
      >
        <div
          className={cn(
            'h-full rounded-xl border-2 border-transparent bg-white shadow-sm',
            'transition-all duration-300',
            'hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5',
            // Compact layout (narrow columns — mobile 2-col, desktop 6-col)
            'flex flex-col items-center gap-2 p-4',
            // Wide layout at ≥120px container width — add description, horizontal layout
            '@[120px]:flex-row @[120px]:items-center @[120px]:gap-3 @[120px]:p-4',
            // Revert to vertical at ≥220px (card is wide enough to be vertical again)
            '@[220px]:flex-col @[220px]:items-center @[220px]:p-5'
          )}
        >
          {/* Icon container */}
          <div
            className={cn(
              'relative shrink-0 rounded-xl flex items-center justify-center',
              'w-12 h-12 @[220px]:w-14 @[220px]:h-14',
              bgColor,
              'group-hover:scale-110 transition-transform duration-300'
            )}
          >
            <Icon
              className={iconColor}
              size={24}
              aria-hidden
            />
            {requiresLogin && (
              <span
                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500"
                aria-label="लॉगिन आवश्यक"
              >
                <Lock size={8} className="text-white" aria-hidden />
              </span>
            )}
          </div>

          {/* Text */}
          <div className="min-w-0 text-center @[120px]:text-left @[220px]:text-center">
            <p className="text-sm font-semibold leading-snug text-gray-900 group-hover:text-orange-600 transition-colors">
              {titleMr}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">{titleEn}</p>
            {description && (
              <p className="mt-1 hidden text-xs text-gray-500 @[220px]:block line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* Arrow — only visible at wider container sizes */}
          <ArrowRight
            size={14}
            className="hidden shrink-0 text-gray-300 transition-colors group-hover:text-orange-400 @[220px]:block ml-auto"
            aria-hidden
          />
        </div>
      </Link>
    </div>
  );
}

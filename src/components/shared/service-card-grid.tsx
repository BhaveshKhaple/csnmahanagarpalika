import { ServiceCard, type ServiceCardProps } from './service-card';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface ServiceCardGridProps {
  /** List of service cards to display. First 6 shown as primary. */
  services: ServiceCardProps[];
  /** Href for "All Services" link. Shown when services.length > 6 or always. */
  viewAllHref?: string;
  className?: string;
}

/**
 * ServiceCardGrid — responsive grid of ServiceCard components.
 *
 * Layout:
 * - Mobile (2 columns): compact icon+label stacked cards
 * - Tablet (3 columns): slightly larger
 * - Desktop (6 columns): all 6 primary cards in a single row
 *
 * Container queries on each ServiceCard handle internal card layout.
 * This grid component handles only the outer grid structure.
 *
 * Spec: 4-6 large tappable cards above the fold, icon + Marathi label + English subtitle
 * — csmc-website-redesign-spec.md §5.1
 * — csmc-adaptation-instructions.md §2
 *
 * DOM requirement: This component must render ABOVE any leadership/officials section.
 */
export function ServiceCardGrid({ services, viewAllHref, className }: ServiceCardGridProps) {
  const primary = services.slice(0, 6);

  return (
    <div className={cn('space-y-3', className)}>
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        role="list"
        aria-label="नागरी सेवा"
      >
        {primary.map((service) => (
          <li key={service.titleMr} role="listitem">
            <ServiceCard {...service} className="h-full" />
          </li>
        ))}
      </ul>

      {viewAllHref && (
        <div className="text-center pt-1">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-50 px-5 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100 hover:border-orange-400 transition-all min-h-[44px]"
          >
            सर्व सेवा पाहा
            <span className="text-xs text-orange-400">All Services →</span>
          </Link>
        </div>
      )}
    </div>
  );
}

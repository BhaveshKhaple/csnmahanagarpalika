import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTE_LABELS } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

interface BreadcrumbItem {
  labelMr: string;
  labelEn: string;
  href?: string;
}

interface BreadcrumbProps {
  /** Explicit items override. If omitted, items are auto-derived from `pathname`. */
  items?: BreadcrumbItem[];
  /** Current pathname — used to auto-derive items when `items` prop is omitted. */
  pathname?: string;
  className?: string;
}

/**
 * Derives breadcrumb items from a pathname by splitting on `/` and
 * looking up each segment in ROUTE_LABELS.
 *
 * e.g. `/about/mission` → [Home, About CSMC, Vision & Mission]
 */
function deriveItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [
    { labelMr: 'मुख्यपृष्ठ', labelEn: 'Home', href: '/' },
  ];

  let accumulated = '';
  for (const seg of segments) {
    accumulated += `/${seg}`;
    const label = ROUTE_LABELS[accumulated];
    items.push({
      labelMr: label?.mr ?? seg,
      labelEn: label?.en ?? seg,
      // All but the last segment get a href
      href: accumulated,
    });
  }

  // The last item is the current page — remove its href
  if (items.length > 1) {
    items[items.length - 1] = {
      ...items[items.length - 1],
      href: undefined,
    };
  }

  return items;
}

/**
 * Breadcrumb — renders on every (public) page except the homepage.
 *
 * Spec: "Breadcrumbs on every page except homepage (e.g., मुख्यपृष्ठ > नागरी सेवा > मालमत्ता कर)"
 * — csmc-website-redesign-spec.md §6
 * — csmc-adaptation-instructions.md §4
 *
 * Implements structured data (JSON-LD BreadcrumbList) for SEO.
 * Labels come from ROUTE_LABELS in routes.ts — never hardcoded here.
 */
export function Breadcrumb({ items, pathname, className }: BreadcrumbProps) {
  const resolved = items ?? (pathname ? deriveItems(pathname) : []);

  if (resolved.length <= 1) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: resolved.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.labelMr,
      ...(item.href ? { item: `https://chhsambhajinagarmc.org${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb navigation"
        className={cn('py-2 px-0', className)}
      >
        <ol
          role="list"
          className="flex flex-wrap items-center gap-1 text-sm text-gray-500"
        >
          {resolved.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === resolved.length - 1;

            return (
              <li key={`${item.href ?? 'current'}-${index}`} className="flex items-center gap-1">
                {/* Separator */}
                {!isFirst && (
                  <ChevronRight size={12} className="text-gray-300 shrink-0" aria-hidden />
                )}

                {isLast ? (
                  // Current page — not a link
                  <span
                    aria-current="page"
                    className="font-medium text-gray-900 truncate max-w-[180px]"
                    title={item.labelMr}
                  >
                    {isFirst && (
                      <Home size={12} className="inline mr-1 text-gray-400" aria-hidden />
                    )}
                    {item.labelMr}
                  </span>
                ) : (
                  <Link
                    href={item.href!}
                    className="flex items-center gap-1 hover:text-orange-600 hover:underline transition-colors truncate max-w-[140px]"
                    title={item.labelMr}
                  >
                    {isFirst && (
                      <Home size={12} className="shrink-0 text-gray-400" aria-hidden />
                    )}
                    <span>{item.labelMr}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

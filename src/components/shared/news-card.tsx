import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface NewsCardProps {
  id: string;
  titleMr: string;
  titleEn?: string;
  /** Image URL — required (spec: never image-only, but image IS required alongside text) */
  imageSrc: string;
  /** Marathi alt text — required, never empty for content images (REQ-CON-03) */
  imageAlt: string;
  date: string;
  href: string;
  /** Optional short excerpt in Marathi */
  excerpt?: string;
  className?: string;
}

function formatDate(dateStr: string): string {
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return dateStr;
  try {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

/**
 * NewsCard — image + headline + date card for news/updates sections.
 *
 * Spec requirements:
 * - "image + headline text + date (never image-only)" — spec §5.1
 * - Lazy-load images with low-res blur placeholder — spec §5.1 / REQ-PER-06
 * - All images need real Marathi alt text — REQ-CON-03
 * - next/image used for responsive srcsets — REQ-PER-05
 *
 * Uses @container so the card adapts its own layout (vertical stack vs
 * horizontal image+text) based on column width, not viewport.
 */
export function NewsCard({
  titleMr,
  titleEn,
  imageSrc,
  imageAlt,
  date,
  href,
  excerpt,
  className,
}: NewsCardProps) {
  return (
    <div className={cn('@container', className)}>
      <Link
        href={href}
        className="group block h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
      >
        {/* Vertical layout (default — narrow columns) */}
        <div className="flex flex-col @[280px]:flex-row h-full">
          {/* Image */}
          <div
            className={cn(
              'relative shrink-0 overflow-hidden bg-gray-100',
              // Vertical: full-width image at 55vw aspect
              'w-full aspect-[16/9]',
              // Horizontal at ≥280px container width: fixed sidebar image
              '@[280px]:w-32 @[280px]:aspect-auto @[280px]:h-auto'
            )}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-between gap-2 p-4 min-w-0">
            <div>
              <p className="text-sm font-semibold leading-snug text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-3">
                {titleMr}
              </p>
              {titleEn && (
                <p className="mt-0.5 text-xs text-gray-400 line-clamp-1">{titleEn}</p>
              )}
              {excerpt && (
                <p className="mt-2 text-xs text-gray-500 line-clamp-2 hidden @[280px]:block">
                  {excerpt}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar size={10} aria-hidden />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

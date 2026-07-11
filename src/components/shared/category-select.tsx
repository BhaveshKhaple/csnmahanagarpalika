'use client';

import { Droplet, MapPin, Trash2, Lightbulb, HelpCircle, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export type ComplaintCategory =
  | 'water'
  | 'road'
  | 'sanitation'
  | 'streetlight'
  | 'other';

const CATEGORIES: Record<
  ComplaintCategory,
  { labelMr: string; labelEn: string; icon: LucideIcon; color: string; bg: string }
> = {
  water: {
    labelMr: 'पाणी',
    labelEn: 'Water',
    icon: Droplet,
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  },
  road: {
    labelMr: 'रस्ता',
    labelEn: 'Road',
    icon: MapPin,
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
  },
  sanitation: {
    labelMr: 'स्वच्छता',
    labelEn: 'Sanitation',
    icon: Trash2,
    color: 'text-green-600',
    bg: 'bg-green-50 border-green-200 hover:bg-green-100',
  },
  streetlight: {
    labelMr: 'दिवाबत्ती',
    labelEn: 'Streetlight',
    icon: Lightbulb,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
  },
  other: {
    labelMr: 'इतर',
    labelEn: 'Other',
    icon: HelpCircle,
    color: 'text-gray-600',
    bg: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
  },
};

interface CategorySelectProps {
  value: ComplaintCategory | null;
  onChange: (value: ComplaintCategory) => void;
  /** Error message in Marathi */
  error?: string;
  className?: string;
}

/**
 * CategorySelect — icon-based complaint category picker.
 *
 * Spec: "Category selection uses icons (water/road/sanitation/streetlight/other)"
 * — csmc-adaptation-instructions.md §3
 *
 * Uses radio-group semantics for keyboard navigation and screen reader support.
 * Min 44x44px touch targets (REQ-PER-03).
 */
export function CategorySelect({ value, onChange, error, className }: CategorySelectProps) {
  return (
    <fieldset className={cn('space-y-2', className)}>
      <legend className="text-sm font-medium text-gray-900">
        तक्रारीचा प्रकार निवडा{' '}
        <span className="text-xs font-normal text-gray-400">(Select Category)</span>
        <span className="text-red-500 ml-1" aria-hidden>*</span>
      </legend>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2" role="radiogroup" aria-required="true">
        {(Object.entries(CATEGORIES) as [ComplaintCategory, typeof CATEGORIES[ComplaintCategory]][]).map(
          ([key, cat]) => {
            const Icon = cat.icon;
            const isSelected = value === key;

            return (
              <label
                key={key}
                className={cn(
                  'flex min-h-[44px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-3 text-center transition-all duration-200 select-none',
                  isSelected
                    ? `border-current ${cat.color} ${cat.bg.split(' ')[0]} ring-2 ring-current ring-offset-1`
                    : `border-gray-200 ${cat.bg}`,
                )}
              >
                <input
                  type="radio"
                  name="complaint-category"
                  value={key}
                  checked={isSelected}
                  onChange={() => onChange(key)}
                  className="sr-only"
                  aria-label={`${cat.labelMr} — ${cat.labelEn}`}
                />
                <Icon
                  size={20}
                  className={cn('transition-colors', isSelected ? cat.color : 'text-gray-400')}
                  aria-hidden
                />
                <div>
                  <p className={cn('text-xs font-semibold leading-tight', isSelected ? cat.color : 'text-gray-700')}>
                    {cat.labelMr}
                  </p>
                  <p className={cn('text-[10px] leading-tight', isSelected ? `${cat.color} opacity-70` : 'text-gray-400')}>
                    {cat.labelEn}
                  </p>
                </div>
              </label>
            );
          }
        )}
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-600 flex items-center gap-1 mt-1">
          <span aria-hidden>⚠</span> {error}
        </p>
      )}
    </fieldset>
  );
}

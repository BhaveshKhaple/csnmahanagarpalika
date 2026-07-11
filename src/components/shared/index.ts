/**
 * Barrel export for all shared components.
 * Import from '@/components/shared' instead of individual files.
 *
 * Phase 2 — CSMC Citizen Portal Redesign
 */
export { ServiceCard } from './service-card';
export type { ServiceCardProps } from './service-card';

export { ServiceCardGrid } from './service-card-grid';

export { AnnouncementList } from './announcement-list';
export type { Announcement } from './announcement-list';

export { NewsCard } from './news-card';
export type { NewsCardProps } from './news-card';

export { Breadcrumb } from './breadcrumb';

export { StatusBadge, resolveStatus } from './status-badge';
export type { ComplaintStatus } from './status-badge';

export { CategorySelect } from './category-select';
export type { ComplaintCategory } from './category-select';

export { ConfirmationReceipt } from './confirmation-receipt';

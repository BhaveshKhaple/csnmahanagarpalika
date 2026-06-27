import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const adminModules = [
  { label: 'डॅशबोर्ड', href: ROUTES.ADMIN.DASHBOARD, description: 'KPI, alerts, operational overview' },
  { label: 'वापरकर्ते', href: ROUTES.ADMIN.USERS, description: 'Role based access and approvals' },
  { label: 'विभाग', href: ROUTES.ADMIN.DEPARTMENTS, description: 'Workload, ownership, service mapping' },
  { label: 'Analytics', href: ROUTES.ADMIN.ANALYTICS, description: 'Collections, complaints, performance' },
  { label: 'अहवाल', href: ROUTES.ADMIN.REPORTS, description: 'Monthly and audit-ready reports' },
  { label: 'Audit Logs', href: ROUTES.ADMIN.AUDIT_LOGS, description: 'Trace all critical actions' },
  { label: 'GIS Map', href: ROUTES.ADMIN.GIS_MAP, description: 'Spatial complaint and asset view' },
  { label: 'सेटिंग्ज', href: ROUTES.ADMIN.SETTINGS, description: 'Portal configuration and policies' },
];

export default function AdminHomePage() {
  return (
    <PageShell
      eyebrow="Admin Portal"
      title="प्रशासक नियंत्रण केंद्र"
      description="सिस्टीम, विभाग, analytics, audit आणि GIS साठी केंद्रिय प्रवेश."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {adminModules.map((module) => (
          <Link
            key={module.label}
            href={module.href}
            className="rounded-3xl border border-gray-200 bg-gray-50 p-5 hover:bg-primary-50 transition"
          >
            <div className="text-xl font-semibold text-gray-900 mb-2">{module.label}</div>
            <div className="text-sm text-gray-600 leading-6">{module.description}</div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
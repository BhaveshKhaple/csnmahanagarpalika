import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const stats = [
  { label: 'Active Users', value: '1,248' },
  { label: 'Open Complaints', value: '86' },
  { label: 'Collections Today', value: '₹4.8L' },
  { label: 'Pending Approvals', value: '19' },
];

const modules = [
  { label: 'वापरकर्ते', href: ROUTES.ADMIN.USERS },
  { label: 'विभाग', href: ROUTES.ADMIN.DEPARTMENTS },
  { label: 'Analytics', href: ROUTES.ADMIN.ANALYTICS },
  { label: 'GIS Map', href: ROUTES.ADMIN.GIS_MAP },
];

const alerts = [
  '2 विभागांमध्ये SLA breach risk detected',
  'Water bill collections are 8% above target',
  '12 complaints require escalation review',
  'New audit logs available for download',
];

export default function AdminDashboardPage() {
  return (
    <PageShell
      eyebrow="Admin Dashboard"
      title="प्रशासकीय डॅशबोर्ड"
      description="ऑपरेशनल आरोग्य, collection, complaint queue आणि governance signals एका ठिकाणी."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-slate-950 p-5 text-white">
              <p className="text-sm text-white/60 mb-2">{stat.label}</p>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-6">
          <section className="rounded-3xl border border-gray-200 bg-white p-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">मुख्य मॉड्यूल</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modules.map((module) => (
                <Link key={module.label} href={module.href} className="rounded-2xl bg-gray-50 p-4 hover:bg-primary-50 transition">
                  <div className="font-semibold text-gray-900">{module.label}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-primary-50 p-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">कार्यसूचना</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert} className="rounded-2xl bg-white p-4 text-gray-700">
                  {alert}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const stats = [
  { label: 'Assigned Cases', value: '27' },
  { label: 'Due Today', value: '8' },
  { label: 'Resolved This Week', value: '41' },
  { label: 'Escalations', value: '3' },
];

const tasks = [
  'Inspect ward 7 drainage complaint',
  'Review trade license renewal request',
  'Approve birth certificate document set',
  'Update water bill payment status',
];

export default function OfficerDashboardPage() {
  return (
    <PageShell eyebrow="Officer Dashboard" title="अधिकारी डॅशबोर्ड" description="कार्यवाटप, प्रलंबित केस आणि विभागीय workflow.">
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-primary-50 p-5">
              <p className="text-sm font-medium text-primary-700 mb-2">{stat.label}</p>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-6">
          <section className="rounded-3xl border border-gray-200 bg-white p-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">आजची कामे</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task} className="rounded-2xl bg-gray-50 p-4 text-gray-700">
                  {task}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-slate-950 p-5 text-white">
            <h2 className="text-2xl font-bold mb-4">Workflow Shortcuts</h2>
            <div className="space-y-3">
              <Link href={ROUTES.OFFICER.TASKS} className="block rounded-2xl bg-white/10 px-4 py-3">
                Open Task Queue
              </Link>
              <Link href={ROUTES.OFFICER.COMPLAINTS} className="block rounded-2xl bg-white/10 px-4 py-3">
                Complaint Review
              </Link>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
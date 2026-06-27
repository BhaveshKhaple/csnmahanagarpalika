import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const officerModules = [
  { label: 'डॅशबोर्ड', href: ROUTES.OFFICER.DASHBOARD, description: 'Task queue and service backlog' },
  { label: 'कार्ये', href: ROUTES.OFFICER.TASKS, description: 'Assignments and due actions' },
  { label: 'तक्रारी', href: ROUTES.OFFICER.COMPLAINTS, description: 'Complaint handling workflow' },
];

export default function OfficerHomePage() {
  return (
    <PageShell
      eyebrow="Officer Portal"
      title="अधिकारी कार्य केंद्र"
      description="दैनिक कार्य, तक्रारी आणि विभागीय action items साठी जलद प्रवेश."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {officerModules.map((module) => (
          <Link key={module.label} href={module.href} className="rounded-3xl border border-gray-200 bg-gray-50 p-5 hover:bg-primary-50 transition">
            <div className="text-xl font-semibold text-gray-900 mb-2">{module.label}</div>
            <div className="text-sm text-gray-600 leading-6">{module.description}</div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
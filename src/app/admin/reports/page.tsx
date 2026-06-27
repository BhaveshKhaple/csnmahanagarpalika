import PageShell from '@/components/pages/page-shell';

const reports = [
  'Monthly Collection Report',
  'Complaint SLA Report',
  'Department Performance Report',
  'Audit Summary Report',
];

export default function AdminReportsPage() {
  return (
    <PageShell eyebrow="Reports" title="अहवाल केंद्र" description="डाउनलोड करण्यायोग्य आणि प्रिंट-रेडी अहवाल.">
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report} className="rounded-2xl bg-gray-50 px-4 py-4 text-gray-800">
            {report}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
import PageShell from '@/components/pages/page-shell';

const logs = [
  'Admin updated GIS layer settings',
  'Officer escalated 3 complaints',
  'Finance role approved payment batch',
];

export default function AuditLogsPage() {
  return (
    <PageShell eyebrow="Audit Logs" title="ऑडिट ट्रेल" description="महत्त्वाच्या क्रियांचे पारदर्शक रेकॉर्ड.">
      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log} className="rounded-2xl border border-gray-200 bg-white p-4 text-gray-700">
            {log}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
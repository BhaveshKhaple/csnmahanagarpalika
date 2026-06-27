import PageShell from '@/components/pages/page-shell';

const metrics = [
  { label: 'Tax Collection', value: '78%' },
  { label: 'Water Bill Recovery', value: '84%' },
  { label: 'Complaint Resolution', value: '91%' },
  { label: 'Portal Adoption', value: '62%' },
];

export default function AdminAnalyticsPage() {
  return (
    <PageShell eyebrow="Analytics" title="प्रदर्शन विश्लेषण" description="सेवा, collection आणि resolution trends.">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl bg-slate-950 p-5 text-white">
            <div className="text-sm text-white/60 mb-2">{metric.label}</div>
            <div className="text-3xl font-bold">{metric.value}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
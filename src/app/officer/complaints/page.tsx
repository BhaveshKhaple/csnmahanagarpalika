import PageShell from '@/components/pages/page-shell';

const complaints = [
  { id: 'COM-1021', title: 'Street light outage', status: 'Assigned', priority: 'High' },
  { id: 'COM-1022', title: 'Water leakage', status: 'In Progress', priority: 'Medium' },
  { id: 'COM-1023', title: 'Road pothole', status: 'Escalated', priority: 'High' },
];

export default function OfficerComplaintsPage() {
  return (
    <PageShell eyebrow="Complaints" title="तक्रार हाताळणी" description="स्वीकृती, नियुक्ती, प्रगती आणि निराकरणाचा workflow.">
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-gray-900">{complaint.id}</div>
                <div className="text-sm text-gray-600">{complaint.title}</div>
              </div>
              <div className="text-sm font-medium text-primary-700">{complaint.status}</div>
            </div>
            <div className="mt-3 text-sm text-gray-500">Priority: {complaint.priority}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
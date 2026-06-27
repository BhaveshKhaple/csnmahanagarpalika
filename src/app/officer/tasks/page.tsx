import PageShell from '@/components/pages/page-shell';

const tasks = [
  { title: 'Drainage inspection', due: 'Today 4:00 PM' },
  { title: 'License renewal verification', due: 'Today 6:00 PM' },
  { title: 'Ward sanitation follow-up', due: 'Tomorrow 10:00 AM' },
];

export default function OfficerTasksPage() {
  return (
    <PageShell eyebrow="Tasks" title="कार्य व्यवस्थापन" description="अधिकाऱ्यांसाठी चालू आणि आगामी कामांची यादी.">
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.title} className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
            <div className="font-medium text-gray-900">{task.title}</div>
            <div className="text-sm text-gray-600">{task.due}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
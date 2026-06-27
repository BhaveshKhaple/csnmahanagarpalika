import PageShell from '@/components/pages/page-shell';

const departments = [
  { name: 'Revenue', load: 'High', owner: 'Finance Team' },
  { name: 'Water', load: 'Medium', owner: 'Operations Team' },
  { name: 'Engineering', load: 'High', owner: 'Infra Team' },
];

export default function AdminDepartmentsPage() {
  return (
    <PageShell eyebrow="Departments" title="विभाग व्यवस्थापन" description="विभागीय workload, ownership आणि routing.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div key={dept.name} className="rounded-3xl bg-white border border-gray-200 p-5">
            <div className="text-xl font-semibold text-gray-900">{dept.name}</div>
            <div className="text-sm text-gray-600 mt-2">Load: {dept.load}</div>
            <div className="text-sm text-gray-600">Owner: {dept.owner}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
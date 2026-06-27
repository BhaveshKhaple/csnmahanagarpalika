import PageShell from '@/components/pages/page-shell';

const users = [
  { name: 'A. Sharma', role: 'Administrator', status: 'Active' },
  { name: 'V. Patil', role: 'Department Head', status: 'Pending Review' },
  { name: 'S. Khan', role: 'Officer', status: 'Active' },
];

export default function AdminUsersPage() {
  return (
    <PageShell eyebrow="Users" title="वापरकर्ता व्यवस्थापन" description="भूमिका, प्रवेश आणि मंजुरी स्थितीचा आढावा.">
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.name} className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
            <div>
              <div className="font-semibold text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-600">{user.role}</div>
            </div>
            <div className="text-sm font-medium text-primary-700">{user.status}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
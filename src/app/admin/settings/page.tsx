import PageShell from '@/components/pages/page-shell';

const settings = ['Language support', 'Notification templates', 'Role permissions', 'Security policies'];

export default function AdminSettingsPage() {
  return (
    <PageShell eyebrow="Settings" title="सेटिंग्ज" description="पोर्टल कॉन्फिगरेशन आणि शासन धोरणे.">
      <div className="space-y-3">
        {settings.map((setting) => (
          <div key={setting} className="rounded-2xl bg-gray-50 px-4 py-4 text-gray-800">
            {setting}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
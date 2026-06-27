import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const notifications = [
  {
    title: 'मालमत्ता कर सवलत अंतिम आठवडा',
    detail: '25 जूनपूर्वी पेमेंट केल्यास सवलतीचा लाभ घ्या.',
    status: 'Important',
  },
  {
    title: 'पाणीपुरवठा वेळापत्रक अपडेट',
    detail: 'वार्ड 4 आणि 7 मध्ये उद्या सकाळी देखभाल कामे.',
    status: 'Info',
  },
  {
    title: 'नवीन तक्रार स्थिती उपलब्ध',
    detail: 'आपली ड्रेनेज तक्रार विभागाकडे नियुक्त झाली आहे.',
    status: 'Action required',
  },
  {
    title: 'नवीन शहर सूचना आणि निविदा',
    detail: 'अद्ययावत notices आणि tenders पृष्ठावर पहा.',
    status: 'Update',
  },
];

export default function CitizenNotificationsPage() {
  return (
    <PageShell
      eyebrow="Notifications"
      title="सूचना केंद्र"
      description="सेवा, बिल, तक्रार आणि शहर घोषणांबद्दल रिअल-टाइम स्टाईल सूचना."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8 items-start">
        <div className="space-y-4">
          {notifications.map((item) => (
            <article key={item.title} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                  {item.status}
                </span>
              </div>
              <p className="text-gray-600 leading-7">{item.detail}</p>
            </article>
          ))}
        </div>

        <section className="rounded-3xl bg-slate-950 p-6 text-white space-y-4">
          <h2 className="text-2xl font-bold">Quick actions</h2>
          <Link href={ROUTES.AI_ASSISTANT} className="block rounded-2xl bg-white/10 px-4 py-3 hover:bg-white/15 transition">
            AI Assistant उघडा
          </Link>
          <Link href={ROUTES.CITIZEN.DASHBOARD} className="block rounded-2xl bg-white/10 px-4 py-3 hover:bg-white/15 transition">
            नागरिक डॅशबोर्ड
          </Link>
          <Link href={ROUTES.NEWS} className="block rounded-2xl bg-white/10 px-4 py-3 hover:bg-white/15 transition">
            सूचना आणि निविदा
          </Link>
        </section>
      </div>
    </PageShell>
  );
}
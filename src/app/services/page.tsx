import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const serviceGroups = [
  {
    title: 'कुटुंब आणि मालमत्ता',
    items: [
      { label: 'मालमत्ता कर', href: ROUTES.CITIZEN.PROPERTY_TAX },
      { label: 'पाणीपट्टी', href: ROUTES.CITIZEN.WATER_BILLS },
    ],
  },
  {
    title: 'प्रमाणपत्रे आणि परवाने',
    items: [
      { label: 'जन्म प्रमाणपत्र', href: ROUTES.CITIZEN.CERTIFICATES.BIRTH },
      { label: 'मृत्यू प्रमाणपत्र', href: ROUTES.CITIZEN.CERTIFICATES.DEATH },
      { label: 'विवाह प्रमाणपत्र', href: ROUTES.CITIZEN.CERTIFICATES.MARRIAGE },
      { label: 'व्यापार परवाना', href: ROUTES.CITIZEN.LICENSES.TRADE },
    ],
  },
  {
    title: 'तक्रार आणि ट्रॅकिंग',
    items: [
      { label: 'नवीन तक्रार', href: ROUTES.CITIZEN.COMPLAINTS.NEW },
      { label: 'तक्रार स्थिती', href: ROUTES.CITIZEN.COMPLAINTS.TRACK },
    ],
  },
];

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="सेवा"
      title="नागरिकांसाठी मुख्य ऑनलाइन सेवा"
      description="महत्त्वाच्या सेवा प्रकारांना स्पष्ट गटांमध्ये विभागून, आवश्यक अर्ज किंवा पेमेंट प्रवाहाकडे जलद प्रवेश."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {serviceGroups.map((group) => (
          <div key={group.title} className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{group.title}</h2>
            <div className="space-y-3">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-2xl bg-white px-4 py-3 text-gray-800 hover:bg-primary-50 hover:text-primary-900 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
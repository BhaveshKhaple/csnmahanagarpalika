import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const hubs = [
  {
    title: 'डॅशबोर्ड',
    description: 'एकत्रित सेवा सारांश, जलद कृती आणि ताजे अपडेट्स.',
    links: [{ label: 'नागरिक डॅशबोर्ड', href: ROUTES.CITIZEN.DASHBOARD }],
  },
  {
    title: 'मालमत्ता आणि बिलिंग',
    description: 'कर आणि उपयुक्तता बिलांसाठी थेट प्रवेश.',
    links: [
      { label: 'मालमत्ता कर', href: ROUTES.CITIZEN.PROPERTY_TAX },
      { label: 'पाणीपट्टी', href: ROUTES.CITIZEN.WATER_BILLS },
    ],
  },
  {
    title: 'तक्रार आणि सहाय्य',
    description: 'तक्रार नोंदवा किंवा विद्यमान स्थिती तपासा.',
    links: [
      { label: 'नवीन तक्रार', href: ROUTES.CITIZEN.COMPLAINTS.NEW },
      { label: 'तक्रार स्थिती', href: ROUTES.CITIZEN.COMPLAINTS.TRACK },
    ],
  },
  {
    title: 'प्रमाणपत्रे आणि परवाने',
    description: 'जन्म, मृत्यू, विवाह आणि परवाना सेवांसाठी एकत्रित प्रवेश.',
    links: [
      { label: 'प्रमाणपत्रे', href: ROUTES.CITIZEN.CERTIFICATES.BASE },
      { label: 'परवाने', href: ROUTES.CITIZEN.LICENSES.BASE },
    ],
  },
  {
    title: 'सुरक्षित कागदपत्रे',
    description: 'महत्त्वाची कागदपत्रे जतन आणि शेअर करण्यासाठी.',
    links: [{ label: 'डिजिटल लॉकर', href: ROUTES.CITIZEN.DIGITAL_LOCKER }],
  },
];

export default function CitizenHubPage() {
  return (
    <PageShell
      eyebrow="Citizen Portal"
      title="नागरिक सेवा केंद्र"
      description="मालमत्ता कर, पाणीपट्टी, तक्रारी, प्रमाणपत्रे, परवाने आणि डिजिटल लॉकर यांचा एकत्रित मार्ग."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hubs.map((hub) => (
          <div key={hub.title} className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{hub.title}</h2>
            <p className="text-gray-600 mb-4">{hub.description}</p>
            <div className="space-y-3">
              {hub.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-2xl bg-white px-4 py-3 font-medium text-gray-800 hover:bg-primary-50 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
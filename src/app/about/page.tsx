import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const milestones = [
  'नागरी सेवा डिजिटल स्वरूपात उपलब्ध करून देणे',
  'तक्रार, पेमेंट आणि अर्ज प्रक्रिया एकत्रित करणे',
  'पारदर्शक माहिती आणि जलद प्रतिसाद देणे',
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="आमच्याबद्दल"
      title="महानगरपालिकेचा डिजिटल परिचय"
      description="नागरिकांना सेवा, माहिती आणि सहाय्य एकाच ठिकाणी देणाऱ्या आधुनिक नगरसेवा अनुभवाचा आढावा."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <div>
          <p className="text-gray-700 leading-7 mb-6">
            छत्रपती संभाजीनगरसाठी तयार केलेले हे पोर्टल नगरसेवा, तक्रार व्यवस्थापन, माहिती प्रकाशन
            आणि नागरिक सहाय्य यांना एका सुसंगत डिजिटल प्रवाहात आणते.
          </p>
          <div className="space-y-4">
            {milestones.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                <span className="mt-1 h-3 w-3 rounded-full bg-primary-600" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-primary-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">जलद दुवे</h2>
          <div className="space-y-3">
            <Link href={ROUTES.SERVICES} className="block rounded-2xl bg-white px-4 py-3 font-medium text-gray-800">
              सेवा पहा
            </Link>
            <Link href={ROUTES.CONTACT} className="block rounded-2xl bg-white px-4 py-3 font-medium text-gray-800">
              संपर्क माहिती
            </Link>
            <Link href={ROUTES.FAQ} className="block rounded-2xl bg-white px-4 py-3 font-medium text-gray-800">
              वारंवार विचारले जाणारे प्रश्न
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
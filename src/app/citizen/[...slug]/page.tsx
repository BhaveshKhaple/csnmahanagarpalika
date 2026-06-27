import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const routeMap: Record<string, { title: string; description: string; bullets: string[] }> = {
  certificates: {
    title: 'प्रमाणपत्रे',
    description: 'जन्म, मृत्यू आणि विवाह प्रमाणपत्रांसाठी एकत्रित केंद्र.',
    bullets: ['जन्म प्रमाणपत्र', 'मृत्यू प्रमाणपत्र', 'विवाह प्रमाणपत्र'],
  },
  'property-tax': {
    title: 'मालमत्ता कर',
    description: 'कर तपासणी, पेमेंट आणि पावती डाउनलोड करण्याचा प्रवाह.',
    bullets: ['मागील पेमेंट इतिहास', 'ऑनलाइन पेमेंट पर्याय', 'पावती डाउनलोड'],
  },
  'water-bills': {
    title: 'पाणीपट्टी शुल्क',
    description: 'बिल पाहणे, रक्कम भरणे आणि व्यवहार स्थिती तपासणे.',
    bullets: ['बिल सारांश', 'पेमेंट इतिहास', 'सूचना/रिमाइंडर'],
  },
  complaints: {
    title: 'तक्रारी',
    description: 'तक्रार नोंदणी, प्राधान्य आणि ट्रॅकिंगसाठी मुख्य केंद्र.',
    bullets: ['नवीन तक्रार', 'तक्रार स्थिती', 'संवाद इतिहास'],
  },
  'complaints/new': {
    title: 'नवीन तक्रार',
    description: 'समस्या कॅटेगरी निवडून तक्रार नोंदवण्याचा प्रारंभिक प्रवाह.',
    bullets: ['कॅटेगरी निवड', 'स्थान आणि फोटो', 'प्राथमिक ट्रायेज'],
  },
  'complaints/track': {
    title: 'तक्रार स्थिती',
    description: 'तक्रार क्रमांकाद्वारे सद्यस्थिती आणि अपडेट्स पाहण्याचे पृष्ठ.',
    bullets: ['स्टेटस टाइमलाइन', 'असेसमेंट अपडेट्स', 'समाधान नोंद'],
  },
  licenses: {
    title: 'परवाने',
    description: 'व्यापार आणि बांधकाम परवान्यांसाठी प्रवेश केंद्र.',
    bullets: ['व्यापार परवाना', 'बांधकाम परवाना', 'नूतनीकरण मार्गदर्शन'],
  },
  'certificates/birth': {
    title: 'जन्म प्रमाणपत्र',
    description: 'जन्म नोंदणी आणि प्रमाणपत्र विनंती प्रवाह.',
    bullets: ['अर्ज फॉर्म', 'कागदपत्र यादी', 'डाउनलोड'],
  },
  'certificates/death': {
    title: 'मृत्यू प्रमाणपत्र',
    description: 'मृत्यू नोंदणी व प्रमाणपत्र प्रक्रिया.',
    bullets: ['अर्ज सादरीकरण', 'समर्थन दस्तऐवज', 'स्थिती तपासणी'],
  },
  'certificates/marriage': {
    title: 'विवाह प्रमाणपत्र',
    description: 'विवाह नोंदणी आणि प्रमाणपत्रासाठीची मूलभूत पायरी.',
    bullets: ['नोंदणी फॉर्म', 'दस्तऐवज अपलोड', 'सूचना केंद्र'],
  },
  'licenses/trade': {
    title: 'व्यापार परवाना',
    description: 'व्यापार परवाना अर्ज आणि नूतनीकरणासाठीचे पृष्ठ.',
    bullets: ['अर्ज तपशील', 'परवाना वैधता', 'नूतनीकरण सूचना'],
  },
  'licenses/building': {
    title: 'बांधकाम परवाना',
    description: 'बांधकाम परवानगी आणि मंजुरी टप्पे.',
    bullets: ['प्लॅन तपशील', 'मंजुरी टप्पे', 'डाउनलोड/नोंदी'],
  },
  'digital-locker': {
    title: 'डिजिटल लॉकर',
    description: 'महत्त्वाची कागदपत्रे सुरक्षितपणे संग्रहित करण्याची सेवा.',
    bullets: ['फाइल संग्रह', 'सेवांशी जोडणी', 'सुरक्षित प्रवेश'],
  },
};

export default function CitizenRoutePage({ params }: { params: { slug?: string[] } }) {
  const routeKey = (params.slug ?? []).join('/');
  const page = routeMap[routeKey] ?? {
    title: 'नागरिक सेवा',
    description: 'मागणी केलेल्या नागरिक सेवेसाठी माहिती पृष्ठ.',
    bullets: ['सेवा सविस्तर माहिती', 'अर्ज मार्गदर्शक', 'स्थिती ट्रॅकिंग'],
  };

  return (
    <PageShell
      eyebrow="Citizen Service"
      title={page.title}
      description={page.description}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        <div className="space-y-4">
          {page.bullets.map((bullet) => (
            <div key={bullet} className="rounded-2xl bg-gray-50 p-4 text-gray-700">
              {bullet}
            </div>
          ))}
        </div>
        <div className="rounded-3xl bg-primary-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">जलद नेव्हिगेशन</h2>
          <div className="space-y-3">
            <Link href={ROUTES.HOME} className="block rounded-2xl bg-white px-4 py-3 font-medium text-gray-800">
              मुख्यपृष्ठ
            </Link>
            <Link href={ROUTES.CITIZEN.COMPLAINTS.TRACK} className="block rounded-2xl bg-white px-4 py-3 font-medium text-gray-800">
              तक्रार स्थिती
            </Link>
            <Link href={ROUTES.SERVICES} className="block rounded-2xl bg-white px-4 py-3 font-medium text-gray-800">
              सेवा सूची
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const notices = [
  {
    title: 'मालमत्ता कर सवलत योजना 2026',
    detail: 'कर भरण्यासाठी मर्यादित कालावधीची सवलत आणि डिजिटल पावती सुविधा.',
    date: '25 जून 2026',
  },
  {
    title: 'पाणीपुरवठा विभाग सूचना',
    detail: 'देखभाल कामांमुळे काही भागांमध्ये वेळापत्रक बदल लागू.',
    date: '24 जून 2026',
  },
  {
    title: 'सफाई मोहिमेचे वेळापत्रक',
    detail: 'प्रभागांनुसार कचरा संकलन आणि स्वच्छता कर्मचाऱ्यांची यादी.',
    date: '23 जून 2026',
  },
];

const tenders = [
  {
    title: 'स्मार्ट लाईट देखभाल निविदा',
    detail: 'शहरातील स्मार्ट स्ट्रीट लाइट्ससाठी वार्षिक देखभाल निविदा.',
    closing: '10 जुलै 2026',
  },
  {
    title: 'ड्रेनेज दुरुस्ती प्रकल्प',
    detail: 'प्रमुख नाल्यांच्या दुरुस्ती आणि अद्यतनासाठी निविदा.',
    closing: '15 जुलै 2026',
  },
  {
    title: 'डिजिटल सेवा कंत्राट',
    detail: 'नागरिक पोर्टलसाठी तांत्रिक समर्थन आणि विस्तार सेवा.',
    closing: '20 जुलै 2026',
  },
];

export default function NewsPage() {
  return (
    <PageShell
      eyebrow="News & Notices"
      title="सूचना आणि निविदा"
      description="महत्त्वाच्या घोषणा, निविदा आणि चालू शहरविषयक अद्यतने एका ठिकाणी."
    >
      <div className="space-y-10">
        <section>
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">नवीन सूचना</h2>
            <Link href={ROUTES.HOME} className="text-sm font-medium text-primary-700 hover:text-primary-800">
              मुख्यपृष्ठावर परत जा
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <article key={notice.title} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-sm text-gray-500 mb-3">{notice.date}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{notice.title}</h3>
                <p className="text-gray-600 leading-7">{notice.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">सक्रिय निविदा</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tenders.map((tender) => (
              <article key={tender.title} className="rounded-3xl bg-slate-950 p-5 text-white shadow-lg">
                <div className="text-sm text-white/60 mb-3">अंतिम तारीख: {tender.closing}</div>
                <h3 className="text-lg font-semibold mb-3">{tender.title}</h3>
                <p className="text-white/75 leading-7">{tender.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
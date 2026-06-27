import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const prompts = [
  'तक्रार नोंदवण्यासाठी काय लागते?',
  'कराची पावती डाउनलोड कशी करावी?',
  'जन्म प्रमाणपत्राची स्थिती कशी तपासू?',
];

const responses = [
  {
    question: 'तक्रार नोंदवण्यासाठी काय लागते?',
    answer: 'समस्या, स्थान, संपर्क क्रमांक आणि शक्य असल्यास फोटो/व्हिडिओ अपलोड करा.',
  },
  {
    question: 'कराची पावती डाउनलोड कशी करावी?',
    answer: 'मालमत्ता कर पानावर जा, तुमचा क्रमांक टाका आणि पेमेंट पूर्ण झाल्यावर पावती घ्या.',
  },
  {
    question: 'जन्म प्रमाणपत्राची स्थिती कशी तपासू?',
    answer: 'प्रमाणपत्र विभागातून अर्ज क्रमांक वापरून स्थिती पाहता येते.',
  },
];

export default function AssistantPage() {
  return (
    <PageShell
      eyebrow="AI Assistant"
      title="नगर सहाय्यक"
      description="सेवा, तक्रार, कर आणि प्रक्रियेबद्दल त्वरित मार्गदर्शन."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
        <section className="rounded-3xl bg-slate-950 p-6 text-white space-y-5">
          <div>
            <p className="text-sm text-white/60 mb-2">Smart Assistant</p>
            <h2 className="text-3xl font-bold mb-3">तुमच्या प्रश्नांची झटपट उत्तरे</h2>
            <p className="text-white/75 leading-7">
              येथे text आणि voice assistant अनुभवासाठी UI फ्रेमवर्क आहे. पुढील टप्प्यात OpenAI/LangChain
              जोडता येईल.
            </p>
          </div>

          <div className="space-y-3">
            {prompts.map((prompt) => (
              <div key={prompt} className="rounded-2xl bg-white/10 px-4 py-3 text-white/90">
                {prompt}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">माझ्या मागील संभाषण</h2>
            <div className="space-y-4">
              {responses.map((item) => (
                <div key={item.question} className="rounded-2xl bg-gray-50 p-4">
                  <div className="font-semibold text-gray-900 mb-2">Q. {item.question}</div>
                  <p className="text-gray-600 leading-7">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-primary-50 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Next actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link href={ROUTES.CITIZEN.NOTIFICATIONS} className="btn-primary inline-flex">
                सूचना पहा
              </Link>
              <Link href={ROUTES.CITIZEN.COMPLAINTS.NEW} className="btn-outline inline-flex">
                तक्रार नोंदवा
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
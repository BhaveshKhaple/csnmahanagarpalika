import PageShell from '@/components/pages/page-shell';

const faqs = [
  {
    question: 'ऑनलाइन सेवा वापरण्यासाठी खाते आवश्यक आहे का?',
    answer: 'काही सेवा थेट उपलब्ध आहेत, तर पेमेंट आणि ट्रॅकिंगसाठी खाते-आधारित प्रवाह पुढे जोडता येईल.',
  },
  {
    question: 'तक्रारीची स्थिती कशी तपासू?',
    answer: 'तक्रार क्रमांक वापरून स्थिती पानावरून प्रगती आणि प्रतिसाद पाहता येईल.',
  },
  {
    question: 'प्रमाणपत्रासाठी कोणती कागदपत्रे लागतात?',
    answer: 'प्रकारानुसार कागदपत्रे बदलतात; प्रत्येक सेवेच्या पानावर आवश्यक यादी दाखवता येईल.',
  },
];

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="FAQ"
      title="वारंवार विचारले जाणारे प्रश्न"
      description="नागरिकांना पटकन उत्तर मिळावे म्हणून मूलभूत माहिती आणि प्रक्रिया स्पष्ट केली आहे."
    >
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-2xl border border-gray-200 bg-white p-5 open:bg-gray-50">
            <summary className="cursor-pointer list-none text-lg font-semibold text-gray-900">
              {faq.question}
            </summary>
            <p className="mt-3 text-gray-600 leading-7">{faq.answer}</p>
          </details>
        ))}
      </div>
    </PageShell>
  );
}
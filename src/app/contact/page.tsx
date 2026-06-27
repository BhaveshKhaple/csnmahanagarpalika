import PageShell from '@/components/pages/page-shell';

const contactItems = [
  { label: 'मुख्य कार्यालय', value: 'मुख्य इमारत, टाऊन हॉल, छत्रपती संभाजीनगर' },
  { label: 'फोन', value: '+91 12345 67890' },
  { label: 'ईमेल', value: 'info@chhsambhajinagarmc.org' },
  { label: 'कामकाजाची वेळ', value: 'सोमवार ते शनिवार, सकाळी 10 ते सायंकाळी 6' },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="संपर्क"
      title="संपर्क आणि सहाय्य"
      description="नागरिक चौकशी, कार्यालयीन संपर्क आणि कामकाजाची माहिती एकाच जागी."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {contactItems.map((item) => (
            <div key={item.label} className="rounded-2xl bg-gray-50 p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 mb-1">
                {item.label}
              </div>
              <div className="text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl bg-slate-950 p-6 text-white">
          <h2 className="text-2xl font-bold mb-3">त्वरित संदेश</h2>
          <p className="text-white/75 leading-7">
            नागरिकांना अर्ज, तक्रार किंवा माहितीच्या विनंतीसाठी येथे संपर्क करता येईल. पुढील टप्प्यात
            आपण फॉर्म-आधारित संपर्क प्रवाह जोडू शकतो.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
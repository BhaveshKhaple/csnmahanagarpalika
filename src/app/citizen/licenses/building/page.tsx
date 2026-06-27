import PageShell from '@/components/pages/page-shell';

const processSteps = [
  {
    number: '01',
    title: 'प्रकल्प माहिती द्या',
    description: 'प्रकल्पाचे नाव, प्लॉट क्रमांक आणि मूलभूत तपशील नोंदवा.',
  },
  {
    number: '02',
    title: 'दस्तऐवज तपासा',
    description: 'प्लॅन, मंजुरी टप्पा आणि तांत्रिक माहिती पडताळून घ्या.',
  },
  {
    number: '03',
    title: 'अर्ज पाठवा',
    description: 'अंतिम अर्ज सबमिट करा, अभिप्राय पहा आणि मंजुरी मागोवा घ्या.',
  },
];

export default function BuildingLicensePage() {
  return (
    <PageShell
      eyebrow="Building License"
      title="बांधकाम परवाना"
      description="प्लॅन, अर्ज आणि मंजुरी टप्पे यासाठी मार्गदर्शक प्रवाह."
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-950 p-5 text-white">
            <h2 className="text-2xl font-bold mb-4">3-स्टेप प्रक्रिया</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {processSteps.map((step) => (
                <div key={step.number} className="rounded-2xl bg-white/10 p-4">
                  <div className="text-sm font-bold tracking-[0.3em] text-white/70 mb-3">{step.number}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm leading-6 text-white/75">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <form className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-gray-700">प्रकल्पाचे नाव</span>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">प्लॉट क्रमांक</span>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">मंजुरी टप्पा</span>
              <select className="w-full rounded-xl border border-gray-300 px-4 py-3">
                <option>नवीन</option>
                <option>दुरुस्ती</option>
                <option>नूतनीकरण</option>
              </select>
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-gray-700">प्रकल्प माहिती</span>
              <textarea className="w-full rounded-xl border border-gray-300 px-4 py-3" rows={5} />
            </label>
          </div>
          <button type="button" className="btn-primary">अर्ज सबमिट करा</button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-primary-50 p-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">मंजुरी टप्पे</h2>
            <div className="space-y-2 text-gray-700">
              <div>• अर्ज प्राप्त</div>
              <div>• तांत्रिक तपासणी</div>
              <div>• अभिप्राय / दुरुस्ती</div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-5 text-white">
            <h3 className="text-lg font-bold mb-3">अंतिम निष्पत्ती</h3>
            <p className="text-white/75 leading-7">
              मंजुरी मिळाल्यानंतर डाउनलोड करण्यायोग्य परवाना, नोटिफिकेशन आणि पुढील अनुपालन सूचना येथे उपलब्ध होतील.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
import PageShell from '@/components/pages/page-shell';

const lockers = ['ओळखपत्र', 'प्रमाणपत्रे', 'परवाने', 'पावत्या', 'अर्ज प्रती'];

export default function DigitalLockerPage() {
  return (
    <PageShell
      eyebrow="Digital Locker"
      title="डिजिटल लॉकर"
      description="महत्त्वाची कागदपत्रे अपलोड, वर्गीकरण आणि सुरक्षित प्रवेशासाठी."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 items-start">
        <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5">
          <h2 className="text-2xl font-bold text-gray-900">कागदपत्र अपलोड</h2>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-gray-700">दस्तऐवज निवडा</span>
            <input type="file" className="w-full rounded-xl border border-dashed border-gray-300 px-4 py-3" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-gray-700">वर्ग</span>
            <select className="w-full rounded-xl border border-gray-300 px-4 py-3">
              {lockers.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-gray-700">टीप</span>
            <textarea className="w-full rounded-xl border border-gray-300 px-4 py-3" rows={4} />
          </label>
          <button type="button" className="btn-primary">अपलोड करा</button>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-primary-50 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-3">सुरक्षित संग्रह</h3>
            <div className="grid grid-cols-2 gap-3">
              {lockers.map((item) => (
                <div key={item} className="rounded-2xl bg-white px-4 py-3 text-center text-gray-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-5 text-white">
            <h3 className="text-lg font-bold mb-3">काय मिळेल</h3>
            <div className="space-y-2 text-white/80">
              <div>• श्रेणीबद्ध संग्रह</div>
              <div>• जलद शोध</div>
              <div>• शेअर करण्यायोग्य प्रत</div>
              <div>• सुरक्षित प्रवेश नियंत्रण</div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
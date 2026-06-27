import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const categories = ['रस्ते', 'पाणी', 'कचरा', 'पथदिवे', 'ड्रेनेज', 'सार्वजनिक आरोग्य', 'इतर'];

export default function ComplaintsPage() {
  return (
    <PageShell
      eyebrow="Complaints"
      title="तक्रार सेवा केंद्र"
      description="नवीन तक्रार नोंदवा, स्थिती पहा आणि पूर्ण निराकरण होईपर्यंत प्रवास ट्रॅक करा."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 items-start">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">तक्रार श्रेणी</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((category) => (
                <div key={category} className="rounded-2xl bg-gray-50 px-4 py-3 text-center text-gray-700">
                  {category}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-primary-50 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-3">प्रक्रिया</h3>
            <div className="space-y-2 text-gray-700">
              <div>1. तक्रार तयार करा</div>
              <div>2. स्थान आणि फोटो जोडा</div>
              <div>3. विभागाकडे पाठवा</div>
              <div>4. स्थिती ट्रॅक करा</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link href={ROUTES.CITIZEN.COMPLAINTS.NEW} className="block rounded-2xl bg-slate-950 px-5 py-4 text-white font-medium text-center">
            नवीन तक्रार नोंदवा
          </Link>
          <Link href={ROUTES.CITIZEN.COMPLAINTS.TRACK} className="block rounded-2xl bg-primary-600 px-5 py-4 text-white font-medium text-center">
            तक्रार स्थिती तपासा
          </Link>
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 text-gray-700 leading-7">
            तक्रारीसाठी स्थान, फोटो किंवा व्हिडिओ आणि संपर्क तपशील जोडल्यास प्राथमिक प्रक्रिया वेगवान होते.
          </div>
        </div>
      </div>
    </PageShell>
  );
}
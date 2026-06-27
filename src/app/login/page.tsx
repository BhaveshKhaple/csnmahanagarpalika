import Link from 'next/link';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const roleLinks = [
  { label: 'नागरिक डॅशबोर्ड', href: ROUTES.CITIZEN.DASHBOARD, note: 'सेवा, बिल, तक्रार' },
  { label: 'अधिकारी डॅशबोर्ड', href: ROUTES.OFFICER.DASHBOARD, note: 'कार्य, तक्रारी, मंजुरी' },
  { label: 'प्रशासक डॅशबोर्ड', href: ROUTES.ADMIN.DASHBOARD, note: 'सेटिंग्ज, analytics, audit' },
];

export default function LoginPage() {
  return (
    <PageShell
      eyebrow="Login"
      title="वापरकर्ता प्रवेश"
      description="नागरिक, अधिकारी आणि प्रशासकीय वापरासाठी वेगळ्या भूमिकांवर आधारित प्रवेश तयार करण्याची जागा."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-gray-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">भूमिका आधारित प्रवेश</h2>
          <p className="text-gray-600 leading-7 mb-6">
            येथे पुढील टप्प्यात साइन-इन फॉर्म, OTP लॉगिन, आणि प्रशासकीय प्रवेश प्रवाह जोडता येतील.
          </p>
          <div className="space-y-3">
            <Link href="/" className="btn-primary inline-flex">
              मुख्यपृष्ठावर परत जा
            </Link>
            <div className="text-sm text-gray-500">थेट भूमिकेनुसार dashboard पहाण्यासाठी खालील दुवे वापरा.</div>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-950 p-6 text-white">
          <h2 className="text-2xl font-bold mb-3">गोपनीयता आणि सुरक्षा</h2>
          <p className="text-white/75 leading-7">
            प्रमाणित साइन-इन, बहु-घटक प्रमाणीकरण आणि भूमिका-आधारित अधिकार यासाठी हे पृष्ठ फ्रेमवर्क आहे.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {roleLinks.map((role) => (
          <Link
            key={role.label}
            href={role.href}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm hover:bg-primary-50 transition"
          >
            <div className="text-sm font-semibold tracking-[0.2em] text-primary-700 uppercase mb-2">
              {role.note}
            </div>
            <div className="text-lg font-semibold text-gray-900">{role.label}</div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
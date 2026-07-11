'use client';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { ShieldAlert, Phone, Info, Award } from 'lucide-react';

export default function PublicAboutEmergencyPlanPage() {
  const { t, locale } = useTranslation();

  const emergencyContacts = [
    { nameMr: 'आपत्कालीन नियंत्रण कक्ष (CSMC)', nameEn: 'Disaster Control Room (CSMC)', number: '0240-2333537' },
    { nameMr: 'अग्निशमन दल कक्ष', nameEn: 'Fire Station Desk', number: '101' },
    { nameMr: 'रुग्णवाहिका सेवा', nameEn: 'Ambulance Helpline', number: '108' },
    { nameMr: 'पोलीस नियंत्रण कक्ष', nameEn: 'Police Control Room', number: '100' },
  ];

  return (
    <PageShell
      eyebrow={t('home.about.tag')}
      title={locale === 'mr' ? 'आपत्कालीन योजना व मदत' : 'Emergency Plan & Support'}
      description={locale === 'mr' ? 'शहरातील आपत्ती व्यवस्थापन मार्गदर्शक तत्त्वे आणि त्वरित संपर्क डेस्क.' : 'City disaster management guidelines and immediate contact desk.'}
    >
      <div className="space-y-8">
        {/* Urgent warning */}
        <div className="rounded-2xl bg-red-50 border border-red-150 p-5 flex items-start gap-4">
          <div className="rounded-xl bg-red-100 p-3 text-red-600 shrink-0">
            <ShieldAlert size={28} aria-hidden />
          </div>
          <div>
            <h2 className="text-base font-bold text-red-950 mb-1">
              {locale === 'mr' ? 'अति-महत्त्वाचा इशारा!' : 'Immediate Warning Contact'}
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {locale === 'mr'
                ? 'पूर परिस्थिती, आग दुर्घटना किंवा नैसर्गिक आपत्तीच्या प्रसंगी तात्काळ खालील नियंत्रण कक्षाला संपर्क साधा.'
                : 'In case of flood alerts, fire accidents, or other natural disasters, immediately contact the control room.'}
            </p>
          </div>
        </div>

        {/* Contacts Grid */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="h-4 w-1 bg-red-600 rounded" />
            {locale === 'mr' ? 'आपत्कालीन संपर्क' : 'Emergency Helplines'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.number}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-center justify-between hover:border-red-300 transition-all group"
              >
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-800 text-sm">
                    {locale === 'mr' ? contact.nameMr : contact.nameEn}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">Helpline: {contact.number}</p>
                </div>
                <a
                  href={`tel:${contact.number}`}
                  className="rounded-lg bg-red-50 text-red-700 font-bold text-sm px-4 py-2 hover:bg-red-600 hover:text-white transition-all shrink-0 min-h-[40px] flex items-center justify-center gap-1.5"
                  aria-label={`Call: ${contact.number}`}
                >
                  <Phone size={14} aria-hidden />
                  {contact.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Action guidelines */}
        <div className="pt-6 border-t space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <span className="h-4 w-1 bg-gray-600 rounded" />
            {locale === 'mr' ? 'आपत्ती काळात काय करावे?' : 'Disaster Response Protocol'}
          </h3>
          <div className="space-y-3">
            {[
              {
                titleMr: 'शांतता राखा',
                titleEn: 'Keep Calm',
                descMr: 'घाबरू नका, प्रशासनाकडून येणाऱ्या अधिकृत सूचनांचे पालन करा.',
                descEn: 'Do not panic, follow official announcements from CSMC.',
              },
              {
                titleMr: 'असुरक्षित जागा टाळा',
                titleEn: 'Avoid Hazards',
                descMr: 'कमकुवत इमारती किंवा पाण्याचा प्रवाह असलेल्या नाल्यांजवळ थांबू नका.',
                descEn: 'Stay clear of dilapidated buildings or flooded channels.',
              },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-3 rounded-lg bg-gray-50 p-4">
                <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">
                    {locale === 'mr' ? step.titleMr : step.titleEn}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">
                    {locale === 'mr' ? step.descMr : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

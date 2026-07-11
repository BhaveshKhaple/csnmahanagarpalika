'use client';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { User, Phone, Mail } from 'lucide-react';

export default function PublicAboutOfficialsPage() {
  const { t, locale } = useTranslation();

  const leadership = [
    {
      nameMr: 'श्री. दिलीपजी चौधरी',
      nameEn: 'Shri. Dilip Chaudhari',
      roleMr: 'आयुक्त व प्रशासक',
      roleEn: 'Commissioner & Administrator',
      deptMr: 'मुख्य प्रशासकीय कार्यालय',
      deptEn: 'Main Administrative Office',
      phone: '0240-2333535',
      email: 'commissioner@chhsambhajinagarmc.org',
    },
    {
      nameMr: 'श्रीमती. अंजली देवरे',
      nameEn: 'Smt. Anjali Deore',
      roleMr: 'अतिरिक्त आयुक्त',
      roleEn: 'Additional Commissioner',
      deptMr: 'शहर विकास व महसूल',
      deptEn: 'Town Development & Revenue',
      phone: '0240-2333536',
      email: 'addlcomm@chhsambhajinagarmc.org',
    },
  ];

  return (
    <PageShell
      eyebrow={t('home.about.tag')}
      title={locale === 'mr' ? 'महानगरपालिका पदाधिकारी' : 'Elected Officials'}
      description={t('home.officials.description')}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership.map((leader) => (
            <div
              key={leader.phone}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col justify-between gap-4 hover:border-orange-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-orange-50 p-4 text-orange-600 shrink-0">
                  <User size={32} aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 leading-snug">
                    {locale === 'mr' ? leader.nameMr : leader.nameEn}
                  </h3>
                  <p className="text-xs font-bold text-orange-600 mt-1 uppercase tracking-wide">
                    {locale === 'mr' ? leader.roleMr : leader.roleEn}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {locale === 'mr' ? leader.deptMr : leader.deptEn}
                  </p>
                </div>
              </div>

              {/* Contact info */}
              <div className="border-t pt-3.5 space-y-2 text-xs text-gray-600">
                <a
                  href={`tel:${leader.phone}`}
                  className="flex items-center gap-2 hover:text-orange-600 transition-colors min-h-[28px]"
                  aria-label={`Call: ${leader.phone}`}
                >
                  <Phone size={14} className="text-gray-400 shrink-0" aria-hidden />
                  <span>{leader.phone}</span>
                </a>
                <a
                  href={`mailto:${leader.email}`}
                  className="flex items-center gap-2 hover:text-orange-600 transition-colors min-h-[28px]"
                  aria-label={`Email: ${leader.email}`}
                >
                  <Mail size={14} className="text-gray-400 shrink-0" aria-hidden />
                  <span className="truncate">{leader.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note block */}
        <div className="rounded-xl bg-gray-50 border border-gray-150 p-4 text-center">
          <p className="text-xs text-gray-500">
            {locale === 'mr'
              ? 'प्रभाग समिती कार्यालये आणि वॉर्ड अधिकाऱ्यांची सविस्तर संपर्क सूची मुख्य संपर्क पानावर उपलब्ध आहे.'
              : 'Detailed contact directory for ward offices and officials is available on the main Contact page.'}
          </p>
        </div>
      </div>
    </PageShell>
  );
}

'use client';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { Compass, Target, ShieldCheck } from 'lucide-react';

export default function PublicAboutMissionPage() {
  const { t, locale } = useTranslation();

  const values = [
    {
      titleMr: 'पारदर्शकता',
      titleEn: 'Transparency',
      descMr: 'सर्व प्रक्रिया आणि आर्थिक माहिती जनतेसाठी खुली असणे.',
      descEn: 'Keeping all administrative processes and updates open to citizens.',
      icon: ShieldCheck,
    },
    {
      titleMr: 'नागरिक-केंद्रित',
      titleEn: 'Citizen-Centricity',
      descMr: 'नागरिकांच्या गरजेला आणि सुविधेला प्रथम प्राधान्य देणे.',
      descEn: 'Prioritizing citizen convenience and service delivery timelines.',
      icon: Target,
    },
  ];

  return (
    <PageShell
      eyebrow={t('home.about.tag')}
      title={locale === 'mr' ? 'महानगरपालिका दृष्टी व ध्येय' : 'Vision & Mission'}
      description={locale === 'mr' ? 'CSMC ची शहराच्या शाश्वत विकासाची उद्दिष्टे.' : 'CSMC goals for sustainable city growth.'}
    >
      <div className="space-y-8">
        {/* Vision card */}
        <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 p-6 flex flex-col md:flex-row items-start gap-4">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600 shrink-0">
            <Compass size={28} aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-bold text-orange-950 mb-2">
              {locale === 'mr' ? 'दृष्टी (Vision)' : 'Our Vision'}
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {locale === 'mr'
                ? 'छत्रपती संभाजीनगरला एक जागतिक दर्जाचे, सांस्कृतिकदृष्ट्या समृद्ध आणि तांत्रिकदृष्ट्या प्रगत स्मार्ट शहर म्हणून विकसित करणे, जेथे प्रत्येक नागरिकाला दर्जेदार सोयी-सुविधा उपलब्ध असतील.'
                : 'To develop Chhatrapati Sambhajinagar into a world-class, culturally rich, and technologically advanced Smart City, providing high-quality civic amenities to every citizen.'}
            </p>
          </div>
        </div>

        {/* Mission card */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-6 flex flex-col md:flex-row items-start gap-4">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600 shrink-0">
            <Target size={28} aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-950 mb-2">
              {locale === 'mr' ? 'ध्येय (Mission)' : 'Our Mission'}
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {locale === 'mr'
                ? 'पारदर्शक कारभार, अत्याधुनिक कचरा व्यवस्थापन, मुबलक पाणी पुरवठा आणि जलद ऑनलाइन सेवांच्या माध्यमातून नागरिकांचे राहणीमान उंचावणे.'
                : 'To elevate quality of life through transparent administration, modern waste management, abundant clean water supply, and prompt online services.'}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="pt-6 border-t">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {locale === 'mr' ? 'आमची मूल्ये' : 'Our Core Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.titleEn} className="rounded-xl border border-gray-150 p-5 bg-white shadow-sm flex items-start gap-3.5">
                  <div className="rounded-lg bg-green-50 p-2 text-green-600 shrink-0 mt-0.5">
                    <Icon size={18} aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">
                      {locale === 'mr' ? val.titleMr : val.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {locale === 'mr' ? val.descMr : val.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

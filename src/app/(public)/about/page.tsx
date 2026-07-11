'use client';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { ROUTES } from '@/lib/constants/routes';
import Link from 'next/link';
import { Landmark, ArrowRight, BookOpen, ShieldAlert, Award, FileText } from 'lucide-react';

export default function PublicAboutRootPage() {
  const { t, locale } = useTranslation();

  const subNavigation = [
    {
      titleMr: 'दृष्टी व ध्येय',
      titleEn: 'Vision & Mission',
      descMr: 'महानगरपालिकेचे भविष्यातील उद्दिष्ट व नागरिकांच्या विकासाची दृष्टी.',
      descEn: 'Future goals and service objectives of the municipal corporation.',
      icon: BookOpen,
      href: ROUTES.PUBLIC.ABOUT.MISSION,
    },
    {
      titleMr: 'निवडून आलेले प्रतिनिधी',
      titleEn: 'Elected Officials',
      descMr: 'महापौर, आयुक्त, नगरसेवक व सर्व विभागातील पदाधिकाऱ्यांची यादी.',
      descEn: 'Detailed contact list of Mayor, Commissioner, and department heads.',
      icon: Award,
      href: ROUTES.PUBLIC.ABOUT.OFFICIALS,
    },
    {
      titleMr: 'आपत्कालीन योजना',
      titleEn: 'Emergency Plan',
      descMr: 'आपत्ती निवारण मार्गदर्शक तत्त्वे व मदतीचे आपत्कालीन संपर्क क्रमांक.',
      descEn: 'Disaster management guidelines and immediate contact details.',
      icon: ShieldAlert,
      href: ROUTES.PUBLIC.ABOUT.EMERGENCY_PLAN,
    },
    {
      titleMr: 'नेहमी विचारले जाणारे प्रश्न',
      titleEn: 'FAQs',
      descMr: 'नागरिकांच्या सेवा, कर भरणा आणि तांत्रिक बाबींवरील सामान्य शंका.',
      descEn: 'Commonly asked questions regarding tax, certificates, and portal help.',
      icon: FileText,
      href: ROUTES.PUBLIC.ABOUT.FAQS,
    },
  ];

  return (
    <PageShell
      eyebrow={t('home.about.tag')}
      title={t('home.about.title')}
      description={t('home.about.subtitle')}
    >
      <div className="space-y-10">
        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center">
          <div className="aspect-square bg-orange-100 rounded-2xl flex items-center justify-center p-6 border border-orange-200">
            <Landmark className="text-orange-700 w-full h-full max-w-[120px]" aria-hidden />
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {t('home.about.desc_p1')}
            </p>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {t('home.about.desc_p2')}
            </p>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="pt-6 border-t">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="h-4 w-1 bg-orange-600 rounded" />
            {locale === 'mr' ? 'अधिक माहिती दालन' : 'Information Directory'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-orange-300 hover:shadow-md transition-all"
                  aria-label={`${locale === 'mr' ? item.titleMr : item.titleEn}`}
                >
                  <div className="rounded-lg bg-orange-50 p-2.5 text-orange-600 group-hover:bg-orange-100 transition-colors shrink-0 mt-0.5">
                    <Icon size={20} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                      {locale === 'mr' ? item.titleMr : item.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-normal">
                      {locale === 'mr' ? item.descMr : item.descEn}
                    </p>
                    <span className="text-[10px] font-bold text-orange-600 group-hover:underline mt-2 inline-flex items-center gap-0.5">
                      {locale === 'mr' ? 'पाहा' : 'View'} <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

'use client';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function PublicAboutFaqsPage() {
  const { t, locale } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      qMr: 'तक्रार नोंदवण्यासाठी लॉगिन करणे आवश्यक आहे का?',
      qEn: 'Do I need to login to file a complaint?',
      aMr: 'नाही. आपण नवीन अतिथी नोंदणी पर्याय वापरून लॉगिन न करताही (अतिथी म्हणून) थेट तक्रार नोंदवू शकता. तक्रार नोंदवल्यानंतर मिळणारा तक्रार क्रमांक वापरून आपण प्रगतीचा मागोवा घेऊ शकता.',
      aEn: 'No. You can file a complaint as a guest without logging in. You will receive a unique complaint ID to track the status later.',
    },
    {
      qMr: 'मालमत्ता कर पावती कशी डाउनलोड करावी?',
      qEn: 'How to download property tax receipt?',
      aMr: 'मालमत्ता कर भरण्यासाठी किंवा पावती डाउनलोड करण्यासाठी आपल्याला नागरी डॅशबोर्डमध्ये लॉगिन करणे आवश्यक आहे. तिथे आपण आपला मालमत्ता क्रमांक टाकून जुन्या पावत्या डाउनलोड करू शकता.',
      aEn: 'To download a property tax receipt, please login to your citizen account, navigate to the Property Tax section, and enter your property number to download history receipts.',
    },
    {
      qMr: 'प्रमाणपत्र सेवा ऑनलाइन मिळण्यासाठी काय करावे?',
      qEn: 'How to get certificates online?',
      aMr: 'जन्म, मृत्यू किंवा विवाह नोंदणी प्रमाणपत्र मिळवण्यासाठी आपल्याकडे वैध नागरिक लॉगिन खाते असावे लागते. अर्ज प्रक्रिया, शुल्काचा भरणा आणि डिजिटल प्रत डाउनलोड नागरिक डॅशबोर्डमध्येच केली जाऊ शकते.',
      aEn: 'To apply for birth, death, or marriage certificates online, login to the citizen portal and use the Certificate Services module to apply and download copies.',
    },
  ];

  return (
    <PageShell
      eyebrow={t('home.about.tag')}
      title={locale === 'mr' ? 'नेहमी विचारले जाणारे प्रश्न' : 'Frequently Asked Questions'}
      description={locale === 'mr' ? 'नागरी सेवा, तक्रारी आणि कर संबंधित सामान्य शंकांचे निरसन.' : 'Resolving common queries regarding citizen services, complaints, and taxes.'}
    >
      <div className="space-y-4" role="tablist" aria-label="Frequently Asked Questions List">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          const qText = locale === 'mr' ? faq.qMr : faq.qEn;
          const aText = locale === 'mr' ? faq.aMr : faq.aEn;

          return (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-gray-900 hover:bg-orange-50/50 transition-colors min-h-[44px] gap-4"
                aria-expanded={isOpen}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <span className="flex items-center gap-2.5 text-sm md:text-base leading-snug">
                  <HelpCircle size={18} className="text-orange-600 shrink-0" aria-hidden />
                  {qText}
                </span>
                <ChevronDown className={cn('h-4.5 w-4.5 text-gray-400 shrink-0 transition-transform duration-200', isOpen ? 'rotate-180' : '')} />
              </button>

              {isOpen && (
                <div
                  className="border-t border-gray-150 bg-gray-50/50 px-5 py-4 text-sm text-gray-700 leading-relaxed animate-fade-in"
                  role="region"
                >
                  {aText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

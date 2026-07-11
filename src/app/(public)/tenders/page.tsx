'use client';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import React, { useState } from 'react';
import { FileText, Calendar, Filter, Search, Download } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Tender {
  id: string;
  titleMr: string;
  titleEn: string;
  category: 'road' | 'water' | 'building' | 'it';
  categoryLabelMr: string;
  categoryLabelEn: string;
  publishedDate: string;
  closingDate: string;
  documentSize: string;
}

const mockTenders: Tender[] = [
  {
    id: 'CSMC/2026/TND-409',
    titleMr: 'छत्रपती संभाजीनगर मुख्य रस्त्यांच्या डांबरीकरण व दुरुस्तीचे काम (टप्पा २)',
    titleEn: 'Asphalting and Repair of Main Roads in Chhatrapati Sambhajinagar (Phase 2)',
    category: 'road',
    categoryLabelMr: 'रस्ते बांधणी',
    categoryLabelEn: 'Roads & Infrastructure',
    publishedDate: '10-07-2026',
    closingDate: '25-07-2026',
    documentSize: '1.8 MB (PDF)',
  },
  {
    id: 'CSMC/2026/TND-410',
    titleMr: 'वॉर्ड क्र. १५ ते २० मधील नवीन पाणी पुरवठा पाईपलाईन टाकणे व दुरुस्ती',
    titleEn: 'Laying and Repair of New Water Supply Pipelines in Ward No 15 to 20',
    category: 'water',
    categoryLabelMr: 'पाणी पुरवठा',
    categoryLabelEn: 'Water Works',
    publishedDate: '08-07-2026',
    closingDate: '30-07-2026',
    documentSize: '2.4 MB (PDF)',
  },
  {
    id: 'CSMC/2026/TND-411',
    titleMr: 'स्मार्ट सिटी नियंत्रण कक्षाच्या आयटी सॉफ्टवेअर आणि हार्डवेअर देखभाल करार',
    titleEn: 'IT Software and Hardware Maintenance Contract for Smart City Control Room',
    category: 'it',
    categoryLabelMr: 'आयटी व संगणक',
    categoryLabelEn: 'IT Services',
    publishedDate: '05-07-2026',
    closingDate: '20-07-2026',
    documentSize: '950 KB (PDF)',
  },
];

export default function PublicTendersPage() {
  const { t, locale } = useTranslation();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'road' | 'water' | 'it'>('all');

  const filteredTenders = mockTenders.filter((tender) => {
    const matchesSearch =
      tender.titleMr.toLowerCase().includes(search.toLowerCase()) ||
      tender.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      tender.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || tender.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageShell
      eyebrow={t('nav.tenders')}
      title={locale === 'mr' ? 'निविदा व नोकरभरती सूचना' : 'Tenders & Recruitments'}
      description={locale === 'mr' ? 'महानगरपालिकेच्या सुरू असलेल्या अधिकृत निविदा आणि व्यावसायिक करार पत्रके.' : 'Corporation ongoing official tenders, contracts, and proposals.'}
    >
      <div className="space-y-6">
        {/* Filters and search box */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-150">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={locale === 'mr' ? 'निविदा नाव किंवा क्रमांक शोधा...' : 'Search by title or ID...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[40px]"
            />
          </div>

          {/* Filter options */}
          <div className="flex items-center gap-2 overflow-x-auto shrink-0 select-none">
            <Filter size={16} className="text-gray-400 hidden sm:block shrink-0" />
            {['all', 'road', 'water', 'it'].map((cat) => {
              const isActive = filter === cat;
              const label =
                cat === 'all'
                  ? locale === 'mr' ? 'सर्व' : 'All'
                  : cat === 'road'
                  ? locale === 'mr' ? 'रस्ते' : 'Roads'
                  : cat === 'water'
                  ? locale === 'mr' ? 'पाणी' : 'Water'
                  : locale === 'mr' ? 'आयटी' : 'IT';

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat as any)}
                  className={cn(
                    'rounded-lg text-xs font-semibold px-3.5 py-2 border transition-all min-h-[36px]',
                    isActive
                      ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tenders list */}
        <div className="divide-y divide-gray-150" role="list">
          {filteredTenders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-gray-400 font-medium">
                {locale === 'mr' ? 'कोणत्याही निविदा सापडल्या नाहीत.' : 'No matching tenders found.'}
              </p>
            </div>
          ) : (
            filteredTenders.map((tender) => (
              <div
                key={tender.id}
                className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                role="listitem"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 rounded px-2 py-0.5 border border-gray-200 select-all">
                      {tender.id}
                    </span>
                    <span className="text-[10px] font-bold text-orange-700 bg-orange-50 rounded px-2 py-0.5 uppercase tracking-wide">
                      {locale === 'mr' ? tender.categoryLabelMr : tender.categoryLabelEn}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug group-hover:text-orange-600 transition-colors">
                    {locale === 'mr' ? tender.titleMr : tender.titleEn}
                  </h3>

                  {/* Dates */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} aria-hidden />
                      <span>{locale === 'mr' ? 'प्रसिद्धी दिनांक' : 'Published'}: {tender.publishedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} aria-hidden />
                      <span className="text-red-500 font-medium">
                        {locale === 'mr' ? 'अंतिम मुदत' : 'Closing'}: {tender.closingDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Download doc action */}
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 hover:border-orange-400 bg-white hover:bg-orange-50/50 px-4 py-2.5 text-xs font-bold text-gray-700 hover:text-orange-700 transition flex items-center justify-center gap-2 shrink-0 min-h-[44px] shadow-sm"
                  aria-label={`Download Tender PDF: ${tender.id}`}
                >
                  <Download size={14} aria-hidden />
                  <span>{tender.documentSize}</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </PageShell>
  );
}

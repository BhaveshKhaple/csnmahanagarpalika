'use client';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { FileText, Download, ShieldCheck, Landmark, Globe } from 'lucide-react';

interface DocumentEntry {
  titleMr: string;
  titleEn: string;
  category: 'rti' | 'rts' | 'census' | 'reports';
  size: string;
}

export default function PublicDocumentsPage() {
  const { t, locale } = useTranslation();

  const documents: DocumentEntry[] = [
    {
      titleMr: 'माहितीचा अधिकार (RTI) मार्गदर्शक नियमावली व अर्जाचा नमुना',
      titleEn: 'Right to Information (RTI) Guidelines and Application Format',
      category: 'rti',
      size: '1.2 MB (PDF)',
    },
    {
      titleMr: 'लोकसेवा हक्क अधिनियम (RTS) नागरिक सनद व सेवा हमी यादी',
      titleEn: 'Right to Services (RTS) Citizen Charter and Timelines',
      category: 'rts',
      size: '980 KB (PDF)',
    },
    {
      titleMr: 'छत्रपती संभाजीनगर जनगणना अहवाल व लोकसंख्या आकडेवारी',
      titleEn: 'Chhatrapati Sambhajinagar Census Report and Demographics',
      category: 'census',
      size: '3.4 MB (PDF)',
    },
    {
      titleMr: 'महानगरपालिका प्रभाग रचना आणि प्रभाग समिती कार्यालयांची यादी',
      titleEn: 'Municipal Ward Structures and Committee Office List',
      category: 'reports',
      size: '1.5 MB (PDF)',
    },
  ];

  return (
    <PageShell
      eyebrow={t('nav.documents')}
      title={locale === 'mr' ? 'कागदपत्रे व माहिती दालन' : 'Documents & Info Centre'}
      description={locale === 'mr' ? 'आरटीआय, नागरिक सनद आणि महानगरपालिकेचे अधिकृत प्रकाशन दस्तऐवज.' : 'RTI documents, RTS citizen charter, and official publications.'}
    >
      <div className="space-y-8">
        {/* Key Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-orange-50 border border-orange-100 p-4 flex gap-3">
            <ShieldCheck className="text-orange-600 shrink-0 mt-0.5" size={20} aria-hidden />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{locale === 'mr' ? 'RTI माहिती (माहिती अधिकार)' : 'Right to Information'}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal">
                {locale === 'mr' ? 'नागरिक कोणत्याही सरकारी विभागातील माहिती अधिकारांतर्गत मागवू शकतात.' : 'Citizens can request info from government departments under RTI act.'}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3">
            <Landmark className="text-blue-600 shrink-0 mt-0.5" size={20} aria-hidden />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{locale === 'mr' ? 'RTS (सेवा हक्क अधिनियम)' : 'Right to Services'}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal">
                {locale === 'mr' ? 'ठराविक वेळेत नागरी सेवा मिळण्याचा हमी हक्क.' : 'Assurance of receiving key citizen services within a fixed timeline.'}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-green-50 border border-green-100 p-4 flex gap-3">
            <Globe className="text-green-600 shrink-0 mt-0.5" size={20} aria-hidden />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{locale === 'mr' ? 'विकास योजना (DP Plan)' : 'Development Plan'}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal">
                {locale === 'mr' ? 'शहराच्या भविष्यातील विकास आराखड्याचे नकाशे व नियोजन.' : 'Future master plan mappings and urban development structures.'}
              </p>
            </div>
          </div>
        </div>

        {/* Document list */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="h-4 w-1 bg-orange-600 rounded" />
            {locale === 'mr' ? 'डाउनलोडसाठी अधिकृत दस्तऐवज' : 'Downloadable Documents'}
          </h3>

          <div className="divide-y divide-gray-100" role="list">
            {documents.map((doc) => (
              <div
                key={doc.titleEn}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                role="listitem"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-2 group-hover:bg-orange-100 transition-colors">
                    <FileText size={18} className="text-gray-500 group-hover:text-orange-600" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm group-hover:text-orange-700 transition-colors leading-snug">
                      {locale === 'mr' ? doc.titleMr : doc.titleEn}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">{doc.category}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-lg border border-gray-300 hover:border-orange-400 bg-white hover:bg-orange-50/50 px-4 py-2 text-xs font-bold text-gray-700 hover:text-orange-700 transition flex items-center justify-center gap-2 shrink-0 min-h-[40px] shadow-sm"
                  aria-label={`Download Document: ${locale === 'mr' ? doc.titleMr : doc.titleEn}`}
                >
                  <Download size={14} aria-hidden />
                  <span>{doc.size}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

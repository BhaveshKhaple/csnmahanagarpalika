'use client';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { ROUTES } from '@/lib/constants/routes';
import { ServiceCardGrid } from '@/components/shared';
import {
  Home,
  Droplet,
  FileText,
  Search,
  Baby,
  Heart,
  Users,
  Building,
  AlertCircle,
  Calculator,
  Download,
  CreditCard,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export default function PublicServicesHubPage() {
  const { t, locale } = useTranslation();

  const servicesList = [
    {
      titleMr: 'मालमत्ता कर भरा',
      titleEn: 'Pay Property Tax',
      icon: Home,
      href: ROUTES.CITIZEN.PROPERTY_TAX,
      requiresLogin: true,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      description: t('home.services.tax_desc'),
    },
    {
      titleMr: 'पाणीपट्टी भरा',
      titleEn: 'Pay Water Bill',
      icon: Droplet,
      href: ROUTES.CITIZEN.WATER_BILLS,
      requiresLogin: true,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: t('home.services.water_desc'),
    },
    {
      titleMr: 'तक्रार नोंदवा',
      titleEn: 'File a Complaint',
      icon: FileText,
      href: ROUTES.PUBLIC.COMPLAINTS.NEW,
      requiresLogin: false,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      description: t('home.services.complaint_desc'),
    },
    {
      titleMr: 'तक्रार स्थिती तपासा',
      titleEn: 'Track Complaint',
      icon: Search,
      href: ROUTES.PUBLIC.COMPLAINTS.TRACK,
      requiresLogin: false,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      description: t('home.services.track_desc'),
    },
    {
      titleMr: 'दाखला मिळवा',
      titleEn: 'Get Certificate',
      icon: Baby,
      href: ROUTES.CITIZEN.CERTIFICATES.BASE,
      requiresLogin: true,
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      description: t('home.services.certificates_desc'),
    },
    {
      titleMr: 'व्यापार परवाना',
      titleEn: 'Trade License',
      icon: Building,
      href: ROUTES.CITIZEN.LICENSES.TRADE,
      requiresLogin: true,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      description: 'नवीन किंवा नूतनीकरण व्यापार परवाना अर्ज',
    },
  ];

  const helperServices = [
    {
      titleMr: 'मृत्यू दाखला',
      titleEn: 'Death Certificate',
      icon: Heart,
      href: ROUTES.CITIZEN.CERTIFICATES.DEATH,
      requiresLogin: true,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      description: 'मृत्यू नोंद आणि दाखला अर्ज',
    },
    {
      titleMr: 'विवाह नोंदणी',
      titleEn: 'Marriage Registration',
      icon: Users,
      href: ROUTES.CITIZEN.CERTIFICATES.MARRIAGE,
      requiresLogin: true,
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      description: 'विवाह नोंदणी प्रमाणपत्र अर्ज व सहाय्य',
    },
    {
      titleMr: 'कर गणना',
      titleEn: 'Tax Calculator',
      icon: Calculator,
      href: ROUTES.PUBLIC.SERVICES.CALCULATOR,
      requiresLogin: false,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      description: 'मालमत्ता कराचा अंदाज गणना तक्ता',
    },
  ];

  return (
    <PageShell
      eyebrow={t('nav.services')}
      title={t('home.services.title')}
      description={t('home.services.description')}
    >
      <div className="space-y-10">
        {/* Main Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
            <span className="h-4 w-1 bg-orange-600 rounded" />
            {locale === 'mr' ? 'मुख्य डिजिटल सेवा' : 'Primary Digital Services'}
          </h2>
          <ServiceCardGrid services={servicesList} />
        </div>

        {/* Secondary Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
            <span className="h-4 w-1 bg-blue-600 rounded" />
            {locale === 'mr' ? 'दाखले आणि इतर सेवा' : 'Certificates & Utility Services'}
          </h2>
          <ServiceCardGrid services={helperServices} />
        </div>

        {/* Help box */}
        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900 text-sm">{t('home.services.legend')}</h3>
              <p className="text-xs text-amber-700 mt-1">
                {locale === 'mr' 
                  ? 'काही सेवा सुरक्षिततेसाठी लॉगिन मागतात. आपण आपले नवीन खाते मोफत उघडू शकता.' 
                  : 'Certain services require citizen portal credentials for security. You can register for free.'}
              </p>
            </div>
          </div>
          <Link
            href={ROUTES.LOGIN}
            className="rounded-lg bg-amber-600 text-white font-bold text-sm px-4 py-2 hover:bg-amber-700 shadow shrink-0 min-h-[40px] flex items-center justify-center"
          >
            {t('common.login')}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

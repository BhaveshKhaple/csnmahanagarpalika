import { ServiceCardGrid, type ServiceCardProps } from '@/components/shared';
import Link from 'next/link';
import {
  Home,
  Droplet,
  FileText,
  Search,
  Baby,
  AlertCircle,
  Heart,
  Users,
  Building,
  Download,
  Calculator,
  CreditCard,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

/**
 * Homepage service cards — 6 primary cards matching spec.
 *
 * Complaint + track cards point to PUBLIC routes (no login).
 * Tax + water point to CITIZEN routes (lock icon shown).
 *
 * Strings are bilingual for Phase 4 i18n extraction.
 */
const primaryServices: ServiceCardProps[] = [
  {
    titleMr: 'मालमत्ता कर भरा',
    titleEn: 'Pay Property Tax',
    icon: Home,
    href: ROUTES.CITIZEN.PROPERTY_TAX,
    requiresLogin: true,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    description: 'ऑनलाइन कर भरणा आणि पावती',
  },
  {
    titleMr: 'पाणीपट्टी भरा',
    titleEn: 'Pay Water Bill',
    icon: Droplet,
    href: ROUTES.CITIZEN.WATER_BILLS,
    requiresLogin: true,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    description: 'बिल तपासणी आणि पेमेंट',
  },
  {
    titleMr: 'तक्रार नोंदवा',
    titleEn: 'File a Complaint',
    icon: FileText,
    href: ROUTES.PUBLIC.COMPLAINTS.NEW,
    requiresLogin: false,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    description: 'लॉगिनशिवाय तक्रार नोंदवा',
  },
  {
    titleMr: 'तक्रार स्थिती तपासा',
    titleEn: 'Track Complaint',
    icon: Search,
    href: ROUTES.PUBLIC.COMPLAINTS.TRACK,
    requiresLogin: false,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    description: 'क्रमांकावरून स्थिती तपासा',
  },
  {
    titleMr: 'दाखला मिळवा',
    titleEn: 'Get Certificate',
    icon: Baby,
    href: ROUTES.CITIZEN.CERTIFICATES.BASE,
    requiresLogin: true,
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    description: 'जन्म, मृत्यू, विवाह दाखले',
  },
  {
    titleMr: 'सर्व सेवा',
    titleEn: 'All Services',
    icon: AlertCircle,
    href: ROUTES.PUBLIC.SERVICES.BASE,
    requiresLogin: false,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    description: 'संपूर्ण सेवा सूची पाहा',
  },
];

const quickLinks = [
  { titleMr: 'डाउनलोड', titleEn: 'Downloads', icon: Download, href: ROUTES.PUBLIC.DOCUMENTS },
  { titleMr: 'कर गणना', titleEn: 'Tax Calculator', icon: Calculator, href: ROUTES.PUBLIC.SERVICES.CALCULATOR },
  { titleMr: 'पेमेंट इतिहास', titleEn: 'Payment History', icon: CreditCard, href: ROUTES.CITIZEN.PAYMENTS },
  { titleMr: 'मदत केंद्र', titleEn: 'Help Centre', icon: AlertCircle, href: ROUTES.PUBLIC.ABOUT.FAQS },
] as const;

export default function OnlineServicesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="services-heading">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            डिजिटल सेवा
          </span>
          <h2
            id="services-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1"
          >
            नागरी सेवा
          </h2>
          <p className="text-sm text-gray-400 mb-3">Citizen Services</p>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            घरबसल्या सर्व सेवा मिळवा. सोपं, वेगवान आणि सुरक्षित.
          </p>
        </div>

        {/* ServiceCardGrid — Phase 2 shared component */}
        <ServiceCardGrid
          services={primaryServices}
          viewAllHref={ROUTES.PUBLIC.SERVICES.BASE}
          className="mb-10"
        />

        {/* Quick links bar */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.titleMr}
                  href={item.href}
                  className="flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 transition group min-h-[44px]"
                >
                  <Icon
                    className="group-hover:scale-110 transition-transform shrink-0"
                    size={24}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight">{item.titleMr}</p>
                    <p className="text-xs text-white/80">{item.titleEn}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Login indicator note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 चिन्हांकित सेवांसाठी नागरिक खाते आवश्यक आहे — Lock icon = requires login
        </p>
      </div>
    </section>
  );
}

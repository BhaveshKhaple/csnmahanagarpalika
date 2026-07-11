import { Card, CardBody } from '@/components/ui/card';
import Link from 'next/link';
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
  ArrowRight,
  Lock,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

/**
 * Service card data — 6 primary cards above the fold, 2 secondary below.
 *
 * `requiresLogin: true` cards link into the (citizen) group and show a
 * lock icon so users know they'll need an account. Guest-accessible
 * cards link into (public)/complaints/* — these are wired in Phase 6
 * but we register the correct target URLs now so Phase 3 nav can pick them up.
 *
 * Labels carry both Marathi (title) and English (subtitle) so Phase 4
 * i18n extraction has a 1:1 mapping to pull from.
 */
const primaryServices = [
  {
    titleMr: 'मालमत्ता कर भरा',
    titleEn: 'Pay Property Tax',
    icon: Home,
    href: ROUTES.CITIZEN.PROPERTY_TAX,
    requiresLogin: true,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    hoverBorder: 'hover:border-orange-300',
  },
  {
    titleMr: 'पाणीपट्टी भरा',
    titleEn: 'Pay Water Bill',
    icon: Droplet,
    href: ROUTES.CITIZEN.WATER_BILLS,
    requiresLogin: true,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    hoverBorder: 'hover:border-blue-300',
  },
  {
    titleMr: 'तक्रार नोंदवा',
    titleEn: 'File a Complaint',
    icon: FileText,
    // Public route — no login needed (Phase 6 will wire the actual page)
    href: ROUTES.PUBLIC.COMPLAINTS.NEW,
    requiresLogin: false,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    hoverBorder: 'hover:border-green-300',
  },
  {
    titleMr: 'तक्रार स्थिती तपासा',
    titleEn: 'Track Complaint',
    icon: Search,
    // Public route — no login needed (Phase 6 will wire the actual page)
    href: ROUTES.PUBLIC.COMPLAINTS.TRACK,
    requiresLogin: false,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    hoverBorder: 'hover:border-purple-300',
  },
  {
    titleMr: 'दाखला मिळवा',
    titleEn: 'Get Certificate',
    icon: Baby,
    href: ROUTES.CITIZEN.CERTIFICATES.BASE,
    requiresLogin: true,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    hoverBorder: 'hover:border-pink-300',
  },
  {
    titleMr: 'सर्व सेवा',
    titleEn: 'All Services',
    icon: AlertCircle,
    href: ROUTES.PUBLIC.SERVICES.BASE,
    requiresLogin: false,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    hoverBorder: 'hover:border-amber-300',
  },
] as const;

const secondaryServices = [
  {
    titleMr: 'मृत्यू दाखला',
    titleEn: 'Death Certificate',
    icon: Heart,
    href: ROUTES.CITIZEN.CERTIFICATES.DEATH,
    requiresLogin: true,
  },
  {
    titleMr: 'विवाह नोंदणी',
    titleEn: 'Marriage Registration',
    icon: Users,
    href: ROUTES.CITIZEN.CERTIFICATES.MARRIAGE,
    requiresLogin: true,
  },
  {
    titleMr: 'व्यापार परवाना',
    titleEn: 'Trade License',
    icon: Building,
    href: ROUTES.CITIZEN.LICENSES.TRADE,
    requiresLogin: true,
  },
] as const;

const quickLinks = [
  {
    titleMr: 'डाउनलोड',
    titleEn: 'Downloads',
    icon: Download,
    href: ROUTES.PUBLIC.DOCUMENTS,
  },
  {
    titleMr: 'कर गणना',
    titleEn: 'Tax Calculator',
    icon: Calculator,
    href: ROUTES.PUBLIC.SERVICES.CALCULATOR,
  },
  {
    titleMr: 'पेमेंट इतिहास',
    titleEn: 'Payment History',
    icon: CreditCard,
    href: ROUTES.CITIZEN.PAYMENTS,
  },
  {
    titleMr: 'मदत केंद्र',
    titleEn: 'Help Centre',
    icon: AlertCircle,
    href: ROUTES.PUBLIC.ABOUT.FAQS,
  },
] as const;

export default function OnlineServicesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="services-heading">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            डिजिटल सेवा
          </span>
          <h2
            id="services-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
          >
            नागरी सेवा
          </h2>
          <p className="text-sm text-gray-400 mb-3">Citizen Services</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            घरबसल्या सर्व सेवा मिळवा. सोपं, वेगवान आणि सुरक्षित.
          </p>
        </div>

        {/* Primary 6-card grid (matches spec's homepage cards) */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6"
          role="list"
          aria-label="मुख्य नागरी सेवा"
        >
          {primaryServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.titleMr}
                href={service.href}
                className="group"
                role="listitem"
                aria-label={`${service.titleMr} — ${service.titleEn}${service.requiresLogin ? ' (लॉगिन आवश्यक)' : ''}`}
              >
                <Card
                  hover
                  className={`h-full transition-all duration-300 hover:shadow-xl border-2 border-transparent ${service.hoverBorder}`}
                >
                  <CardBody className="text-center p-4 lg:p-5 flex flex-col items-center gap-3">
                    <div
                      className={`w-14 h-14 ${service.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative`}
                    >
                      <Icon className={service.iconColor} size={28} strokeWidth={2} aria-hidden="true" />
                      {service.requiresLogin && (
                        <span className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-0.5">
                          <Lock size={8} className="text-white" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-orange-600 transition-colors">
                        {service.titleMr}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{service.titleEn}</p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Secondary services row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {secondaryServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.titleMr}
                href={service.href}
                className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 hover:border-orange-300 hover:bg-orange-50/50 transition-all group"
                aria-label={`${service.titleMr} — ${service.titleEn} (लॉगिन आवश्यक)`}
              >
                <Icon size={20} className="text-gray-500 group-hover:text-orange-600 transition-colors shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-orange-700 transition-colors">
                    {service.titleMr}
                  </p>
                  <p className="text-xs text-gray-400">{service.titleEn}</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-gray-400 group-hover:text-orange-500 transition-colors shrink-0" aria-hidden="true" />
              </Link>
            );
          })}
        </div>

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
                    aria-hidden="true"
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

        {/* Login note */}
        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          <Lock size={10} aria-hidden="true" />
          <span>🔒 चिन्हांकित सेवांसाठी लॉगिन आवश्यक आहे — Lock icon = requires login</span>
        </p>
      </div>
    </section>
  );
}

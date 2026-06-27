import Link from 'next/link';
import {
  Apple,
  BookOpen,
  CircleHelp,
  ListChecks,
  Newspaper,
  Phone,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

import { Card, CardBody } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants/routes';

const apps = [
  {
    name: 'Smart Citizen App',
    description: 'सेवा, तक्रार आणि स्थिती ट्रॅकिंगसाठी मोबाइल प्रवेश.',
    href: 'https://play.google.com',
    Icon: Smartphone,
  },
  {
    name: 'Citizen Companion iOS',
    description: 'iPhone वर जलद सेवा आणि सूचना.',
    href: 'https://apps.apple.com',
    Icon: Apple,
  },
];

const links = [
  { label: 'वारंवार विचारले जाणारे प्रश्न', href: ROUTES.FAQ, Icon: CircleHelp },
  { label: 'RTI माहिती', href: ROUTES.RTI, Icon: BookOpen },
  { label: 'डिजिटल लॉकर', href: ROUTES.CITIZEN.DIGITAL_LOCKER, Icon: ShieldCheck },
  { label: 'सूचना केंद्र', href: ROUTES.NEWS, Icon: Newspaper },
  { label: 'संपर्क करा', href: ROUTES.CONTACT, Icon: Phone },
  { label: 'सेवा सूची', href: ROUTES.SERVICES, Icon: ListChecks },
];

export default function ResourcesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8">
          <Card className="border border-gray-100">
            <CardBody className="h-full">
              <p className="text-sm font-semibold tracking-[0.25em] text-primary-700 uppercase mb-3">
                Mobile Apps
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">मोबाइलवरून जलद सेवा प्रवेश</h2>
              <p className="text-gray-600 mb-6">
                नागरिकांसाठी डेस्कटॉप आणि मोबाईल दोन्हीवर सहज काम करणारे पर्यायी अॅप्स आणि सहाय्यक लिंक.
              </p>
              <div className="space-y-4">
                {apps.map((app) => (
                  <a
                    key={app.name}
                    href={app.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 hover:border-primary-200 hover:shadow-sm transition"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                      <app.Icon size={22} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{app.name}</div>
                      <div className="text-sm text-gray-600">{app.description}</div>
                    </div>
                  </a>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-100">
            <CardBody>
              <p className="text-sm font-semibold tracking-[0.25em] text-primary-700 uppercase mb-3">
                Helpful Links
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">उपयुक्त दुवे आणि सहाय्य</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-primary-200 hover:bg-primary-50 transition"
                  >
                    <div className="mb-3 text-primary-700">
                      <link.Icon size={22} />
                    </div>
                    <div className="font-semibold text-gray-900">{link.label}</div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
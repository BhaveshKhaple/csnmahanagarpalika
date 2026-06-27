import Link from 'next/link';
import { BellRing, BadgeCheck, Compass, FileText } from 'lucide-react';

import { Card, CardBody } from '@/components/ui/card';

const steps = [
  {
    number: '01',
    title: 'सेवा निवडा',
    description: 'ऑनलाइन सेवांमधून योग्य नागरिक सेवा निवडा आणि आवश्यक माहिती पाहा.',
    Icon: Compass,
  },
  {
    number: '02',
    title: 'माहिती सादर करा',
    description: 'अर्ज फॉर्म भरा, कागदपत्रे जोडा आणि एकाच ठिकाणी सर्व तपशील पाठवा.',
    Icon: FileText,
  },
  {
    number: '03',
    title: 'प्रक्रिया ट्रॅक करा',
    description: 'तक्रार किंवा अर्जाची सद्यस्थिती त्वरित तपासा आणि सूचना मिळवा.',
    Icon: BellRing,
  },
  {
    number: '04',
    title: 'सेवा पूर्ण करा',
    description: 'मान्यताप्राप्त सेवा, प्रमाणपत्र किंवा पावती डाउनलोड करून प्रक्रिया पूर्ण करा.',
    Icon: BadgeCheck,
  },
];

export default function FeatureProcessSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold tracking-[0.25em] text-primary-700 uppercase mb-3">
            Feature Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            नागरिकांसाठी सोपा सेवा-प्रवाह
          </h2>
          <p className="text-lg text-gray-600">
            काही स्पष्ट टप्प्यांमध्ये अर्ज, तक्रार आणि सेवा-स्थिती पूर्णपणे ट्रॅक करा.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Card key={step.number} hover className="h-full border border-gray-100">
              <CardBody className="h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-700">
                    <step.Icon size={22} />
                  </div>
                  <span className="text-sm font-bold tracking-[0.3em] text-primary-600">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 flex-grow">{step.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/citizen/complaints/new" className="btn-primary w-full sm:w-auto text-center">
            सेवा सुरू करा
          </Link>
          <Link href="/citizen/complaints/track" className="btn-outline w-full sm:w-auto text-center">
            स्थिती तपासा
          </Link>
        </div>
      </div>
    </section>
  );
}
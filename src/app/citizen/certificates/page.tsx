import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/card';
import { FileText, Baby, Heart, Users, Clock, CheckCircle } from 'lucide-react';

const certificates = [
  { 
    id: 'birth',
    label: 'जन्म प्रमाणपत्र', 
    icon: Baby,
    color: 'bg-blue-100 text-blue-600',
    href: '/citizen/certificates/birth',
    description: 'नवजात बाळाचे जन्म प्रमाणपत्र मिळवा',
    documents: ['हॉस्पिटल प्रमाणपत्र', 'पालकांचा आधार', 'पत्ता पुरावा'],
    fee: '₹100',
    time: '7 दिवस'
  },
  { 
    id: 'death',
    label: 'मृत्यू प्रमाणपत्र', 
    icon: Users,
    color: 'bg-gray-100 text-gray-600',
    href: '/citizen/certificates/death',
    description: 'मृत व्यक्तीचे प्रमाणपत्र मिळवा',
    documents: ['मृत्यू प्रमाणपत्र', 'ओळखपत्र', 'पत्ता पुरावा'],
    fee: '₹100',
    time: '7 दिवस'
  },
  { 
    id: 'marriage',
    label: 'विवाह प्रमाणपत्र', 
    icon: Heart,
    color: 'bg-pink-100 text-pink-600',
    href: '/citizen/certificates/marriage',
    description: 'विवाह नोंदणी प्रमाणपत्र मिळवा',
    documents: ['वर-वधू फोटो', 'आधार कार्ड', 'विवाह पुरावा', 'साक्षीदार ID'],
    fee: '₹200',
    time: '15 दिवस'
  },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">प्रमाणपत्र सेवा</h1>
              <p className="text-gray-600">जन्म, मृत्यू आणि विवाह प्रमाणपत्रांसाठी ऑनलाइन अर्ज करा</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardBody>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-2">प्रमाणपत्र सेवांबद्दल:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>सर्व प्रमाणपत्रे ऑनलाइन अर्ज करता येतात</li>
                  <li>दस्तऐवज स्पष्ट आणि वैध असणे आवश्यक</li>
                  <li>अर्ज स्थिती SMS आणि Email द्वारे मिळेल</li>
                  <li>प्रमाणपत्र डिजिटल आणि भौतिक स्वरूपात उपलब्ध</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {certificates.map((cert) => {
            const Icon = cert.icon;
            return (
              <Link key={cert.id} href={cert.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardBody className="p-6">
                    <div className={`w-16 h-16 rounded-xl ${cert.color} flex items-center justify-center mb-4`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.label}</h3>
                    <p className="text-sm text-gray-600 mb-4">{cert.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-gray-600">प्रक्रिया काळ: {cert.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">💰</span>
                        <span className="text-gray-600">शुल्क: {cert.fee}</span>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-xs font-semibold text-gray-700 mb-2">आवश्यक कागदपत्रे:</p>
                      <ul className="space-y-1">
                        {cert.documents.map((doc, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <span className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                        अर्ज करा →
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Help Section */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-bold text-gray-900 mb-4">मदत आवश्यक आहे?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 mb-2">📞 हेल्पलाइन</p>
                <p className="text-gray-600">0240-2331234 (सकाळी 10 - संध्याकाळी 6)</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">📧 ईमेल</p>
                <p className="text-gray-600">certificates@csmc.gov.in</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">📍 कार्यालय</p>
                <p className="text-gray-600">नागरी केंद्र, छत्रपती संभाजीनगर</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">⏰ कार्यालय वेळ</p>
                <p className="text-gray-600">सोमवार - शुक्रवार (10:00 AM - 5:30 PM)</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
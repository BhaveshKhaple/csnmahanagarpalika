import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/card';
import { Store, Building2, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const licenses = [
  { 
    id: 'trade',
    label: 'व्यापार परवाना', 
    icon: Store,
    color: 'bg-green-100 text-green-600',
    href: '/citizen/licenses/trade',
    description: 'नवीन व्यवसाय सुरू करण्यासाठी परवाना मिळवा',
    types: ['किरकोळ दुकान', 'रेस्टॉरंट', 'सेवा', 'कारखाना'],
    documents: ['मालक फोटो', 'आधार कार्ड', 'पॅन कार्ड', 'पत्ता पुरावा', 'जागा पुरावा'],
    fee: '₹500-2000',
    time: '15 दिवस',
    validity: '1 वर्ष'
  },
  { 
    id: 'building',
    label: 'बांधकाम परवाना', 
    icon: Building2,
    color: 'bg-orange-100 text-orange-600',
    href: '/citizen/licenses/building',
    description: 'नवीन बांधकाम किंवा पुनर्बांधणीसाठी परवाना',
    types: ['नवीन बांधकाम', 'विस्तार', 'पुनर्बांधणी', 'दुरुस्ती'],
    documents: ['मालकी हक्क', 'नकाशा', 'आर्किटेक्ट प्रमाणपत्र', 'NOC', 'संरचनात्मक स्थिरता'],
    fee: '₹2000-10000',
    time: '30 दिवस',
    validity: 'कामपूर्ती पर्यंत'
  },
];

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Store className="text-green-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">परवाना सेवा</h1>
              <p className="text-gray-600">व्यापार आणि बांधकाम परवान्यांसाठी ऑनलाइन अर्ज करा</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="mb-8 bg-amber-50 border-amber-200">
          <CardBody>
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm text-amber-900">
                <p className="font-semibold mb-2">परवाना नियम:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>परवाना मिळविण्यापूर्वी व्यवसाय/बांधकाम सुरू करू नका</li>
                  <li>सर्व आवश्यक कागदपत्रे तयार ठेवा</li>
                  <li>साइट तपासणी अनिवार्य आहे</li>
                  <li>परवाना नियमित नूतनीकरण करा</li>
                  <li>नियम व शर्तींचे पालन करणे आवश्यक</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* License Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {licenses.map((license) => {
            const Icon = license.icon;
            return (
              <Link key={license.id} href={license.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardBody className="p-6">
                    <div className={`w-16 h-16 rounded-xl ${license.color} flex items-center justify-center mb-4`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{license.label}</h3>
                    <p className="text-sm text-gray-600 mb-4">{license.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-gray-600">प्रक्रिया काळ: {license.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">💰</span>
                        <span className="text-gray-600">शुल्क: {license.fee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">⏳</span>
                        <span className="text-gray-600">वैधता: {license.validity}</span>
                      </div>
                    </div>

                    <div className="border-t pt-3 mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">परवान्याचे प्रकार:</p>
                      <div className="flex flex-wrap gap-2">
                        {license.types.map((type, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-xs font-semibold text-gray-700 mb-2">आवश्यक कागदपत्रे:</p>
                      <ul className="space-y-1">
                        {license.documents.slice(0, 3).map((doc, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                        {license.documents.length > 3 && (
                          <li className="text-xs text-gray-500 italic">
                            +{license.documents.length - 3} अधिक...
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <span className="text-sm font-semibold text-green-600 hover:text-green-700">
                        अर्ज करा →
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-bold text-gray-900 mb-1">परवाना नूतनीकरण</h3>
              <p className="text-sm text-gray-600">सध्याच्या परवान्याचे नूतनीकरण करा</p>
            </CardBody>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-bold text-gray-900 mb-1">स्थिती तपासा</h3>
              <p className="text-sm text-gray-600">अर्जाची सद्यस्थिती पाहा</p>
            </CardBody>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">📥</div>
              <h3 className="font-bold text-gray-900 mb-1">परवाना डाउनलोड</h3>
              <p className="text-sm text-gray-600">मंजूर परवाना डाउनलोड करा</p>
            </CardBody>
          </Card>
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
                <p className="text-gray-600">licenses@csmc.gov.in</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">📍 परवाना विभाग</p>
                <p className="text-gray-600">तळमजला, नागरी केंद्र, छत्रपती संभाजीनगर</p>
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
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
  CreditCard 
} from 'lucide-react';

const services = [
  { 
    title: 'आपला मालमत्ता कर भरा', 
    icon: Home, 
    href: '/citizen/property-tax',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  },
  { 
    title: 'आपले पाणीपट्टी शुल्क भरा', 
    icon: Droplet, 
    href: '/citizen/water-bills',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  { 
    title: 'आपली तक्रार नोंदवा', 
    icon: FileText, 
    href: '/citizen/complaints/new',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  { 
    title: 'तक्रारीची सद्यस्थिती तपासा', 
    icon: Search, 
    href: '/citizen/complaints/track',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  { 
    title: 'जन्म प्रमाणपत्र', 
    icon: Baby, 
    href: '/citizen/certificates/birth',
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600'
  },
  { 
    title: 'मृत्यू प्रमाणपत्र', 
    icon: Heart, 
    href: '/citizen/certificates/death',
    color: 'from-gray-500 to-slate-600',
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-600'
  },
  { 
    title: 'विवाह नोंदणी', 
    icon: Users, 
    href: '/citizen/certificates/marriage',
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600'
  },
  { 
    title: 'व्यापार परवाना', 
    icon: Building, 
    href: '/citizen/licenses/trade',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600'
  },
];

export default function OnlineServicesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            डिजिटल सेवा
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ऑनलाइन सेवा
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            घरबसल्या सर्व सेवा मिळवा. सोपं, वेगवान आणि सुरक्षित.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link key={index} href={service.href} className="group">
                <Card hover className="h-full transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-orange-200">
                  <CardBody className="text-center p-6">
                    <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`${service.iconColor}`} size={32} strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-base group-hover:text-orange-600 transition-colors">
                      {service.title}
                    </h3>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-orange-600 text-sm font-medium">→ सुरू करा</span>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Links Bar */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/downloads" className="flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 transition group">
              <Download className="group-hover:scale-110 transition-transform" size={24} />
              <div>
                <div className="font-semibold">डाउनलोड केंद्र</div>
                <div className="text-sm text-white/80">फॉर्म आणि दस्तऐवज</div>
              </div>
            </Link>
            
            <Link href="/calculator" className="flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 transition group">
              <Calculator className="group-hover:scale-110 transition-transform" size={24} />
              <div>
                <div className="font-semibold">कॅल्क्युलेटर</div>
                <div className="text-sm text-white/80">कर गणना</div>
              </div>
            </Link>
            
            <Link href="/payments" className="flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 transition group">
              <CreditCard className="group-hover:scale-110 transition-transform" size={24} />
              <div>
                <div className="font-semibold">पेमेंट हिस्ट्री</div>
                <div className="text-sm text-white/80">संपूर्ण रेकॉर्ड</div>
              </div>
            </Link>
            
            <Link href="/help" className="flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 transition group">
              <AlertCircle className="group-hover:scale-110 transition-transform" size={24} />
              <div>
                <div className="font-semibold">मदत केंद्र</div>
                <div className="text-sm text-white/80">24/7 सहाय्य</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

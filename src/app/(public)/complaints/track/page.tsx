'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  MapPin, 
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  MessageSquare,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { StatusBadge, statusConfig } from '@/components/shared/status-badge';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { Breadcrumb } from '@/components/shared/breadcrumb';

export default function PublicTrackComplaintPage() {
  const { locale } = useTranslation();
  const [complaintNumber, setComplaintNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [complaintData, setComplaintData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const texts = {
    title: locale === 'mr' ? 'तक्रार ट्रॅक करा' : 'Track Complaint',
    subtitle: locale === 'mr' ? 'तुमच्या तक्रारीची सद्यस्थिती तपासा' : 'Check the current status of your complaint',
    searchTitle: locale === 'mr' ? 'तक्रार शोधा' : 'Search Complaint',
    complaintId: locale === 'mr' ? 'तक्रार क्रमांक' : 'Complaint Number',
    mobile: locale === 'mr' ? 'मोबाइल क्रमांक' : 'Mobile Number',
    search: locale === 'mr' ? 'शोधा' : 'Search',
    hint: locale === 'mr' 
      ? 'तुमचा तक्रार क्रमांक तुम्हाला SMS आणि Email मधून मिळाला असेल. तक्रार नोंदवताना दिलेला मोबाइल नंबर प्रविष्ट करा.' 
      : 'You must have received the complaint number via SMS and Email. Enter the mobile number used while filing the complaint.',
    alertReq: locale === 'mr' ? 'कृपया तक्रार क्रमांक आणि मोबाइल नंबर प्रविष्ट करा' : 'Please enter complaint number and mobile number'
  };

  const handleSearch = () => {
    if (!complaintNumber || !mobileNumber) {
      alert(texts.alertReq);
      return;
    }

    setLoading(true);
    // Simulate API call to the new secure tracking endpoint
    setTimeout(() => {
      setComplaintData({
        complaintNumber: complaintNumber,
        category: 'रस्ते',
        categoryIcon: '🛣️',
        title: 'मुख्य रस्त्यावर मोठा खड्डा',
        description: 'शिवाजी चौक जवळ मुख्य रस्त्यावर एक मोठा खड्डा आहे जो अपघातास कारणीभूत ठरू शकतो. कृपया त्वरित दुरुस्ती करावी.',
        location: 'शिवाजी चौक जवळ, सेक्टर-७, छत्रपती संभाजीनगर',
        latitude: '19.8762',
        longitude: '75.3433',
        // Masked PII for public tracking
        citizenName: 'र*** श***',
        citizenPhone: '******' + mobileNumber.slice(-4),
        submittedDate: '15 जून 2026',
        status: 'in_progress',
        assignedTo: 'रस्ते दुरुस्ती विभाग',
        assignedOfficer: 'श्री संजय पाटील',
        priority: 'उच्च',
        estimatedResolution: '25 जून 2026',
        images: [
          'https://via.placeholder.com/300x200?text=Photo+1',
        ],
        timeline: [
          {
            status: 'submitted',
            date: '15 जून 2026, 10:30 AM',
            description: 'तक्रार ऑनलाइन नोंदवली',
            by: 'Citizen'
          },
          {
            status: 'assigned',
            date: '15 जून 2026, 02:45 PM',
            description: 'रस्ते दुरुस्ती विभागाकडे पाठवली',
            by: 'System'
          },
          {
            status: 'in_progress',
            date: '16 जून 2026, 09:15 AM',
            description: 'साइट तपासणी पूर्ण. दुरुस्तीचे काम सुरू',
            by: 'श्री संजय पाटील'
          },
        ],
        updates: [
          {
            date: '16 जून 2026',
            message: 'साइट व्हिजिट पूर्ण झाली. दुरुस्तीसाठी मटेरियल ऑर्डर केले आहे.',
            by: 'श्री संजय पाटील'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  const currentStatus = complaintData ? statusConfig[complaintData.status as keyof typeof statusConfig] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <Breadcrumb />
        </div>
      </div>
      
      <div className="container-custom max-w-5xl py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Search className="text-green-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{texts.title}</h1>
              <p className="text-gray-600">{texts.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Search size={20} />
              {texts.searchTitle}
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {texts.complaintId}
                </label>
                <input
                  type="text"
                  value={complaintNumber}
                  onChange={(e) => setComplaintNumber(e.target.value)}
                  placeholder="उदा: CMP/2026/45678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {texts.mobile}
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  loading={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Search size={18} className="mr-2" />
                  {texts.search}
                </Button>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{texts.hint}</span>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Results */}
        {complaintData && (
          <>
            <Card className="mb-6">
              <CardBody>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{texts.complaintId}</p>
                    <p className="text-2xl font-bold text-gray-900">{complaintData.complaintNumber}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {currentStatus && (
                      <StatusBadge status={complaintData.status} className="px-6 py-3 text-lg" />
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <FileText size={20} />
                      {locale === 'mr' ? 'तक्रारीचे तपशील' : 'Complaint Details'}
                    </h2>
                  </CardHeader>
                  <CardBody className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{complaintData.categoryIcon}</span>
                        <span className="font-medium text-gray-600">{complaintData.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{complaintData.title}</h3>
                      <p className="text-gray-700">{complaintData.description}</p>
                    </div>

                    <div className="flex items-start gap-2 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="text-gray-600 flex-shrink-0 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-gray-900">{complaintData.location}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          📍 {complaintData.latitude}, {complaintData.longitude}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Clock size={20} />
                      {locale === 'mr' ? 'तक्रारीचा इतिहास' : 'Complaint Timeline'}
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-6">
                      {complaintData.timeline.map((item: any, index: number) => {
                        const statusInfo = statusConfig[item.status as keyof typeof statusConfig];
                        if (!statusInfo) return null;
                        const StatusIcon = statusInfo.icon;
                        return (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full ${statusInfo.color} flex items-center justify-center flex-shrink-0`}>
                                <StatusIcon size={20} />
                              </div>
                              {index !== complaintData.timeline.length - 1 && (
                                <div className="w-0.5 flex-1 bg-gray-300 mt-2"></div>
                              )}
                            </div>
                            <div className="flex-1 pb-6">
                              <p className="font-semibold text-gray-900">
                                {typeof statusInfo.label === 'string' ? statusInfo.label : (statusInfo.label as any)[locale] || (statusInfo.label as any)['mr']}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span>{item.date}</span>
                                <span>•</span>
                                <span>{item.by}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-bold flex items-center gap-2">
                      <User size={18} />
                      {locale === 'mr' ? 'विभाग माहिती' : 'Department Info'}
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">{locale === 'mr' ? 'विभाग' : 'Department'}</p>
                      <p className="font-semibold text-gray-900">{complaintData.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{locale === 'mr' ? 'अधिकारी' : 'Officer'}</p>
                      <p className="font-semibold text-gray-900">{complaintData.assignedOfficer}</p>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="font-bold flex items-center gap-2">
                      <Calendar size={18} />
                      {locale === 'mr' ? 'तारखा' : 'Dates'}
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">{locale === 'mr' ? 'नोंदवण्याची तारीख' : 'Submitted Date'}</p>
                      <p className="font-semibold text-gray-900">{complaintData.submittedDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{locale === 'mr' ? 'अपेक्षित निराकरण' : 'Estimated Resolution'}</p>
                      <p className="font-semibold text-green-600">{complaintData.estimatedResolution}</p>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="font-bold flex items-center gap-2">
                      <User size={18} />
                      {locale === 'mr' ? 'नागरिक माहिती' : 'Citizen Info'}
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">{locale === 'mr' ? 'नाव' : 'Name'}</p>
                      <p className="font-semibold text-gray-900">{complaintData.citizenName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{locale === 'mr' ? 'मोबाइल' : 'Mobile'}</p>
                      <p className="font-semibold text-gray-900">{complaintData.citizenPhone}</p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Link href="/complaints/new">
                <Button variant="outline" className="w-full">
                  {locale === 'mr' ? 'नवीन तक्रार नोंदवा' : 'File New Complaint'}
                </Button>
              </Link>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <MessageSquare size={18} className="mr-2" />
                {locale === 'mr' ? 'मदत केंद्र' : 'Help Center'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

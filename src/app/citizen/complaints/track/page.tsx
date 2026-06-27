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
  Star
} from 'lucide-react';
import Link from 'next/link';

const statusConfig: any = {
  submitted: {
    label: 'नोंदवली',
    color: 'bg-blue-100 text-blue-600',
    icon: FileText,
    description: 'तुमची तक्रार नोंदवली गेली आहे'
  },
  assigned: {
    label: 'विभागाकडे पाठवली',
    color: 'bg-purple-100 text-purple-600',
    icon: User,
    description: 'संबंधित विभागाकडे पाठवली'
  },
  in_progress: {
    label: 'कार्यरत',
    color: 'bg-orange-100 text-orange-600',
    icon: Clock,
    description: 'कामाला सुरुवात झाली आहे'
  },
  resolved: {
    label: 'निराकरण झाले',
    color: 'bg-green-100 text-green-600',
    icon: CheckCircle,
    description: 'तक्रारीचे निराकरण झाले आहे'
  },
  closed: {
    label: 'बंद',
    color: 'bg-gray-100 text-gray-600',
    icon: CheckCircle,
    description: 'तक्रार बंद केली'
  },
  rejected: {
    label: 'नाकारली',
    color: 'bg-red-100 text-red-600',
    icon: AlertCircle,
    description: 'तक्रार नाकारली गेली'
  }
};

export default function TrackComplaintPage() {
  const [complaintNumber, setComplaintNumber] = useState('');
  const [complaintData, setComplaintData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!complaintNumber) {
      alert('कृपया तक्रार क्रमांक प्रविष्ट करा');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setComplaintData({
        complaintNumber: complaintNumber || 'CMP/2026/45678',
        category: 'रस्ते',
        categoryIcon: '🛣️',
        title: 'मुख्य रस्त्यावर मोठा खड्डा',
        description: 'शिवाजी चौक जवळ मुख्य रस्त्यावर एक मोठा खड्डा आहे जो अपघातास कारणीभूत ठरू शकतो. कृपया त्वरित दुरुस्ती करावी.',
        location: 'शिवाजी चौक जवळ, सेक्टर-७, छत्रपती संभाजीनगर',
        latitude: '19.8762',
        longitude: '75.3433',
        citizenName: 'राजेश शर्मा',
        citizenPhone: '+91-9876543210',
        submittedDate: '15 जून 2026',
        status: 'in_progress',
        assignedTo: 'रस्ते दुरुस्ती विभाग',
        assignedOfficer: 'श्री संजय पाटील',
        priority: 'उच्च',
        estimatedResolution: '25 जून 2026',
        images: [
          'https://via.placeholder.com/300x200?text=Photo+1',
          'https://via.placeholder.com/300x200?text=Photo+2',
        ],
        timeline: [
          {
            status: 'submitted',
            date: '15 जून 2026, 10:30 AM',
            description: 'तक्रार ऑनलाइन नोंदवली',
            by: 'राजेश शर्मा'
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
          },
          {
            date: '15 जून 2026',
            message: 'तुमची तक्रार मिळाली. लवकरच कारवाई होईल.',
            by: 'System'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  const currentStatus = complaintData ? statusConfig[complaintData.status] : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Search className="text-green-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">तक्रार ट्रॅक करा</h1>
              <p className="text-gray-600">तुमच्या तक्रारीची सद्यस्थिती तपासा</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Search size={20} />
              तक्रार शोधा
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  तक्रार क्रमांक
                </label>
                <input
                  type="text"
                  value={complaintNumber}
                  onChange={(e) => setComplaintNumber(e.target.value)}
                  placeholder="उदा: CMP/2026/45678"
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
                  शोधा
                </Button>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>
                  तुमचा तक्रार क्रमांक तुम्हाला SMS आणि Email मधून मिळाला असेल. 
                  तक्रार नोंदवताना दिलेला मोबाइल नंबर किंवा ईमेल तपासा.
                </span>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Results */}
        {complaintData && (
          <>
            {/* Status Card */}
            <Card className="mb-6">
              <CardBody>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">तक्रार क्रमांक</p>
                    <p className="text-2xl font-bold text-gray-900">{complaintData.complaintNumber}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {currentStatus && (
                      <div className={`flex items-center gap-2 px-6 py-3 rounded-full ${currentStatus.color}`}>
                        <currentStatus.icon size={20} />
                        <span className="font-semibold">{currentStatus.label}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Complaint Details */}
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <FileText size={20} />
                      तक्रारीचे तपशील
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

                    {/* Images */}
                    {complaintData.images && complaintData.images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">संलग्न फोटो:</p>
                        <div className="grid grid-cols-2 gap-4">
                          {complaintData.images.map((img: string, index: number) => (
                            <div key={index} className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                📷
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Clock size={20} />
                      तक्रारीचा इतिहास
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-6">
                      {complaintData.timeline.map((item: any, index: number) => {
                        const statusInfo = statusConfig[item.status];
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
                              <p className="font-semibold text-gray-900">{statusInfo.label}</p>
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

              {/* Right Column - Info Cards */}
              <div className="space-y-6">
                {/* Assignment Info */}
                <Card>
                  <CardHeader>
                    <h3 className="font-bold flex items-center gap-2">
                      <User size={18} />
                      विभाग माहिती
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">विभाग</p>
                      <p className="font-semibold text-gray-900">{complaintData.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">अधिकारी</p>
                      <p className="font-semibold text-gray-900">{complaintData.assignedOfficer}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">प्राधान्यता</p>
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                        {complaintData.priority}
                      </span>
                    </div>
                  </CardBody>
                </Card>

                {/* Dates */}
                <Card>
                  <CardHeader>
                    <h3 className="font-bold flex items-center gap-2">
                      <Calendar size={18} />
                      तारखा
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">नोंदवण्याची तारीख</p>
                      <p className="font-semibold text-gray-900">{complaintData.submittedDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">अपेक्षित निराकरण</p>
                      <p className="font-semibold text-green-600">{complaintData.estimatedResolution}</p>
                    </div>
                  </CardBody>
                </Card>

                {/* Updates */}
                <Card>
                  <CardHeader>
                    <h3 className="font-bold flex items-center gap-2">
                      <MessageSquare size={18} />
                      अपडेट्स
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-4">
                    {complaintData.updates.map((update: any, index: number) => (
                      <div key={index} className="text-sm">
                        <p className="text-gray-900">{update.message}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{update.date}</span>
                          <span>•</span>
                          <span>{update.by}</span>
                        </div>
                      </div>
                    ))}
                  </CardBody>
                </Card>

                {/* Citizen Info */}
                <Card>
                  <CardHeader>
                    <h3 className="font-bold flex items-center gap-2">
                      <User size={18} />
                      नागरिक माहिती
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">नाव</p>
                      <p className="font-semibold text-gray-900">{complaintData.citizenName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">मोबाइल</p>
                      <p className="font-semibold text-gray-900">{complaintData.citizenPhone}</p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Link href="/citizen/complaints/new">
                <Button variant="outline" className="w-full">
                  नवीन तक्रार नोंदवा
                </Button>
              </Link>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <MessageSquare size={18} className="mr-2" />
                मदत केंद्र
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

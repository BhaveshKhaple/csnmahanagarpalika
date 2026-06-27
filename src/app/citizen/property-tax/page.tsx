'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Home, 
  Calendar, 
  CreditCard, 
  FileText, 
  Download,
  AlertCircle,
  CheckCircle,
  Receipt
} from 'lucide-react';

export default function PropertyTaxPage() {
  const [propertyNumber, setPropertyNumber] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults({
        propertyNumber: propertyNumber || 'CSMC/2024/12345',
        ownerName: 'राजेश शर्मा',
        address: 'प्लॉट नं. ५६, सेक्टर-७, छत्रपती संभाजीनगर',
        propertyType: 'निवासी',
        area: '1200 चौ.फूट',
        ward: '११५',
        zone: 'पूर्व',
        taxDetails: [
          { year: '2025-26', amount: 8500, dueDate: '31-03-2026', status: 'pending' },
          { year: '2024-25', amount: 8000, dueDate: '31-03-2025', status: 'paid', paidDate: '15-02-2025' },
          { year: '2023-24', amount: 7500, dueDate: '31-03-2024', status: 'paid', paidDate: '20-03-2024' },
        ]
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Home className="text-orange-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">मालमत्ता कर</h1>
              <p className="text-gray-600">आपल्या मालमत्तेचा कर पहा आणि भरा</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Search size={20} />
              मालमत्ता शोधा
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मालमत्ता क्रमांक
                </label>
                <input
                  type="text"
                  value={propertyNumber}
                  onChange={(e) => setPropertyNumber(e.target.value)}
                  placeholder="उदा: CSMC/2024/12345"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  loading={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700"
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
                  तुमचा मालमत्ता क्रमांक तुमच्या कर पावतीवर किंवा मागील बिलावर उपलब्ध आहे. 
                  क्रमांक माहित नसल्यास, कृपया महानगरपालिका कार्यालयात संपर्क साधा.
                </span>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Results Section */}
        {searchResults && (
          <>
            {/* Property Details */}
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Home size={20} />
                  मालमत्ता तपशील
                </h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">मालमत्ता क्रमांक</p>
                    <p className="font-semibold text-gray-900">{searchResults.propertyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">मालकाचे नाव</p>
                    <p className="font-semibold text-gray-900">{searchResults.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">मालमत्ता प्रकार</p>
                    <p className="font-semibold text-gray-900">{searchResults.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">क्षेत्रफळ</p>
                    <p className="font-semibold text-gray-900">{searchResults.area}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">प्रभाग</p>
                    <p className="font-semibold text-gray-900">{searchResults.ward}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">झोन</p>
                    <p className="font-semibold text-gray-900">{searchResults.zone}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">पत्ता</p>
                  <p className="font-medium text-gray-900">{searchResults.address}</p>
                </div>
              </CardBody>
            </Card>

            {/* Tax Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FileText size={20} />
                    कर तपशील
                  </h2>
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" />
                    सर्व पावत्या
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {searchResults.taxDetails.map((tax: any, index: number) => (
                    <div
                      key={index}
                      className={`p-6 rounded-lg border-2 ${
                        tax.status === 'pending'
                          ? 'border-orange-200 bg-orange-50'
                          : 'border-green-200 bg-green-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Calendar size={20} className={tax.status === 'pending' ? 'text-orange-600' : 'text-green-600'} />
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{tax.year}</h3>
                            <p className="text-sm text-gray-600">
                              {tax.status === 'pending' ? 'अदा करण्याची शेवटची तारीख' : 'भरलेली तारीख'}: {' '}
                              {tax.status === 'pending' ? tax.dueDate : tax.paidDate}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">₹{tax.amount.toLocaleString()}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {tax.status === 'pending' ? (
                              <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                                <AlertCircle size={14} />
                                थकित
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                                <CheckCircle size={14} />
                                भरलेले
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {tax.status === 'pending' ? (
                          <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                            <CreditCard size={18} className="mr-2" />
                            आता भरा
                          </Button>
                        ) : (
                          <Button variant="outline" className="flex-1">
                            <Receipt size={18} className="mr-2" />
                            पावती डाउनलोड करा
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 p-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-white/80 mb-1">एकूण थकबाकी</p>
                      <p className="text-3xl font-bold">₹8,500</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/80 mb-1">एकूण भरलेले</p>
                      <p className="text-3xl font-bold">₹15,500</p>
                    </div>
                    <div className="flex items-center">
                      <Button className="w-full bg-white text-orange-600 hover:bg-gray-100">
                        <CreditCard size={18} className="mr-2" />
                        सर्व थकबाकी भरा
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* Information Cards */}
        {!searchResults && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card hover>
              <CardBody className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-blue-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">ऑनलाइन भरणे</h3>
                <p className="text-sm text-gray-600">
                  घरबसल्या सुरक्षितपणे आपला मालमत्ता कर भरा
                </p>
              </CardBody>
            </Card>

            <Card hover>
              <CardBody className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">त्वरित पावती</h3>
                <p className="text-sm text-gray-600">
                  पेमेंट झाल्यावर लगेच डिजिटल पावती मिळवा
                </p>
              </CardBody>
            </Card>

            <Card hover>
              <CardBody className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="text-purple-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">संपूर्ण इतिहास</h3>
                <p className="text-sm text-gray-600">
                  मागील सर्व पेमेंट्सचा रेकॉर्ड पहा आणि डाउनलोड करा
                </p>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

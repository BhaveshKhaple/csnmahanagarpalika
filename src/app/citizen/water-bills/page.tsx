'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Droplet, 
  Calendar, 
  CreditCard, 
  TrendingUp,
  Download,
  AlertCircle,
  CheckCircle,
  Receipt,
  Activity
} from 'lucide-react';

export default function WaterBillsPage() {
  const [connectionNumber, setConnectionNumber] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setTimeout(() => {
      setSearchResults({
        connectionNumber: connectionNumber || 'WC/2024/67890',
        ownerName: 'सुनीता देशमुख',
        address: 'बिल्डिंग नं. २३, गंगा सोसायटी, छत्रपती संभाजीनगर',
        connectionType: 'घरगुती',
        meterNumber: 'MTR123456',
        ward: '११५',
        connectionDate: '15-01-2020',
        bills: [
          { 
            month: 'मे 2026',
            billNumber: 'WB/2026/0567',
            previousReading: 245,
            currentReading: 265,
            consumption: 20,
            amount: 420,
            dueDate: '30-06-2026',
            status: 'pending'
          },
          { 
            month: 'एप्रिल 2026',
            billNumber: 'WB/2026/0489',
            previousReading: 225,
            currentReading: 245,
            consumption: 20,
            amount: 420,
            dueDate: '31-05-2026',
            status: 'paid',
            paidDate: '25-05-2026'
          },
          { 
            month: 'मार्च 2026',
            billNumber: 'WB/2026/0412',
            previousReading: 200,
            currentReading: 225,
            consumption: 25,
            amount: 525,
            dueDate: '30-04-2026',
            status: 'paid',
            paidDate: '20-04-2026'
          },
        ],
        avgConsumption: 22
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
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Droplet className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">पाणीपट्टी</h1>
              <p className="text-gray-600">आपले पाणी बिल पहा आणि भरा</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Search size={20} />
              कनेक्शन शोधा
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  पाणी कनेक्शन क्रमांक
                </label>
                <input
                  type="text"
                  value={connectionNumber}
                  onChange={(e) => setConnectionNumber(e.target.value)}
                  placeholder="उदा: WC/2024/67890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  loading={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
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
                  तुमचा कनेक्शन क्रमांक तुमच्या पाणी बिलावर उपलब्ध आहे. 
                  क्रमांक माहित नसल्यास, कृपया पाणी पुरवठा विभागात संपर्क साधा.
                </span>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Results Section */}
        {searchResults && (
          <>
            {/* Connection Details & Usage Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Droplet size={20} />
                      कनेक्शन तपशील
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">कनेक्शन क्रमांक</p>
                        <p className="font-semibold text-gray-900">{searchResults.connectionNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">ग्राहकाचे नाव</p>
                        <p className="font-semibold text-gray-900">{searchResults.ownerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">कनेक्शन प्रकार</p>
                        <p className="font-semibold text-gray-900">{searchResults.connectionType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">मीटर क्रमांक</p>
                        <p className="font-semibold text-gray-900">{searchResults.meterNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">प्रभाग</p>
                        <p className="font-semibold text-gray-900">{searchResults.ward}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">कनेक्शन तारीख</p>
                        <p className="font-semibold text-gray-900">{searchResults.connectionDate}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">पत्ता</p>
                      <p className="font-medium text-gray-900">{searchResults.address}</p>
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Usage Card */}
              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                <CardBody className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Activity size={24} />
                      <h3 className="font-bold text-lg">सरासरी वापर</h3>
                    </div>
                    <div className="text-5xl font-bold mb-2">{searchResults.avgConsumption}</div>
                    <p className="text-blue-100">किलोलीटर / महिना</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp size={16} />
                      <span>मागील महिन्यापेक्षा 5% कमी</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Bills Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Receipt size={20} />
                    बिल तपशील
                  </h2>
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" />
                    सर्व बिले
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {searchResults.bills.map((bill: any, index: number) => (
                    <div
                      key={index}
                      className={`p-6 rounded-lg border-2 ${
                        bill.status === 'pending'
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-green-200 bg-green-50'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <Calendar size={20} className={bill.status === 'pending' ? 'text-blue-600' : 'text-green-600'} />
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{bill.month}</h3>
                            <p className="text-sm text-gray-600">बिल नं: {bill.billNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">₹{bill.amount}</p>
                          <div className="flex items-center gap-2 mt-1 justify-end">
                            {bill.status === 'pending' ? (
                              <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                                <AlertCircle size={14} />
                                अदा करण्याची तारीख: {bill.dueDate}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                                <CheckCircle size={14} />
                                {bill.paidDate} रोजी भरलेले
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Meter Reading Details */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-white rounded-lg">
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">मागील रीडिंग</p>
                          <p className="text-lg font-bold text-gray-900">{bill.previousReading} KL</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">सध्याची रीडिंग</p>
                          <p className="text-lg font-bold text-gray-900">{bill.currentReading} KL</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">वापर</p>
                          <p className="text-lg font-bold text-blue-600">{bill.consumption} KL</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {bill.status === 'pending' ? (
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-white/80 mb-1">एकूण थकबाकी</p>
                      <p className="text-3xl font-bold">₹420</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/80 mb-1">एकूण भरलेले</p>
                      <p className="text-3xl font-bold">₹945</p>
                    </div>
                    <div className="flex items-center">
                      <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
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
                  <Droplet className="text-blue-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">मासिक बिल</h3>
                <p className="text-sm text-gray-600">
                  दर महिन्याचे मीटर रीडिंग आणि बिल तपशील पहा
                </p>
              </CardBody>
            </Card>

            <Card hover>
              <CardBody className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="text-green-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">वापर ट्रॅकिंग</h3>
                <p className="text-sm text-gray-600">
                  आपला पाणी वापर ट्रॅक करा आणि बचत करा
                </p>
              </CardBody>
            </Card>

            <Card hover>
              <CardBody className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="text-purple-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">सोपे पेमेंट</h3>
                <p className="text-sm text-gray-600">
                  ऑनलाइन सुरक्षित पेमेंट करा आणि पावती मिळवा
                </p>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

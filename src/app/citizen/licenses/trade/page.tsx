'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Store, 
  User, 
  MapPin,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  FileText,
  Building2
} from 'lucide-react';
import Link from 'next/link';

export default function TradeLicensePage() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessCategory: '',
    ownerName: '',
    ownerAadhar: '',
    ownerPan: '',
    fatherName: '',
    mobileNumber: '',
    email: '',
    premisesAddress: '',
    ward: '',
    pincode: '',
    premisesType: '',
    area: '',
    employeeCount: '',
    investmentAmount: '',
    electricityConnection: '',
    hasFireSafety: '',
    gstNumber: '',
  });

  const [documents, setDocuments] = useState<{[key: string]: File | null}>({
    ownerPhoto: null,
    aadharCard: null,
    panCard: null,
    addressProof: null,
    premisesProof: null,
    noc: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');

  const businessTypes = [
    'किरकोळ दुकान (Retail Shop)',
    'थोक व्यापार (Wholesale)',
    'रेस्टॉरंट / हॉटेल',
    'कारखाना (Manufacturing)',
    'सेवा (Services)',
    'वैद्यकीय दुकान (Medical Store)',
    'ब्युटी पार्लर / सलून',
    'इलेक्ट्रॉनिक्स दुकान',
    'कपडे दुकान (Garments)',
    'किराणा दुकान (Grocery)',
    'इतर'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (documentType: string, file: File | null) => {
    setDocuments({
      ...documents,
      [documentType]: file
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.ownerName || !formData.premisesAddress) {
      alert('कृपया सर्व आवश्यक फील्ड भरा');
      return;
    }

    if (!documents.aadharCard || !documents.panCard) {
      alert('कृपया आवश्यक कागदपत्रे अपलोड करा');
      return;
    }

    setSubmitting(true);
    
    setTimeout(() => {
      const generatedNumber = `TL/2026/${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationNumber(generatedNumber);
      setSuccess(true);
      setSubmitting(false);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom max-w-2xl">
          <Card className="text-center">
            <CardBody className="py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                अर्ज यशस्वीरित्या सबमिट झाला!
              </h2>
              <p className="text-gray-600 mb-2">तुमचा अर्ज क्रमांक:</p>
              <p className="text-3xl font-bold text-green-600 mb-6">{applicationNumber}</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-bold text-gray-900 mb-3">पुढील प्रक्रिया:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>तुमचा अर्ज 5-7 कामकाजाच्या दिवसांत तपासला जाईल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>साइट तपासणी अधिकारी द्वारे केली जाईल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>सर्व काही योग्य असल्यास 15 दिवसांत परवाना मिळेल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>शुल्क: ₹500-2000 (व्यवसायाच्या प्रकारानुसार)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>परवाना वैधता: 1 वर्ष</span>
                  </li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => window.print()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download size={18} className="mr-2" />
                  अर्ज डाउनलोड करा
                </Button>
                <Link href="/citizen/licenses">
                  <Button variant="outline">
                    परत जा
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/citizen/licenses" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft size={20} />
            <span>परत</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Store className="text-green-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">व्यापार परवाना अर्ज</h1>
              <p className="text-gray-600">नवीन व्यवसाय सुरू करण्यासाठी परवाना मिळवा</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardBody>
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-2">महत्वाची माहिती:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>परवाना दरवर्षी नूतनीकरण करणे आवश्यक आहे</li>
                  <li>व्यवसाय सुरू करण्यापूर्वी परवाना मिळवणे अनिवार्य</li>
                  <li>सर्व नियम व शर्ती पाळणे आवश्यक</li>
                  <li>अग्निशमन NOC आणि स्वच्छता प्रमाणपत्र आवश्यक (काही व्यवसायांसाठी)</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>

        <form onSubmit={handleSubmit}>
          {/* Business Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Store size={20} />
                १. व्यवसायाची माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    व्यवसायाचे नाव *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="उदा: श्री गणेश किराणा स्टोअर"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    व्यवसायाचा प्रकार *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">निवडा</option>
                    {businessTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    व्यवसाय श्रेणी *
                  </label>
                  <select
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="small">लघु (Small)</option>
                    <option value="medium">मध्यम (Medium)</option>
                    <option value="large">मोठा (Large)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    कर्मचाऱ्यांची संख्या *
                  </label>
                  <input
                    type="number"
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    placeholder="उदा: 5"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    गुंतवणूक रक्कम (₹) *
                  </label>
                  <input
                    type="number"
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    placeholder="उदा: 500000"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST नंबर (असल्यास)
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    placeholder="27XXXXX1234X1ZX"
                    maxLength={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Owner Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} />
                २. मालकाची माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मालकाचे पूर्ण नाव *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    placeholder="उदा: राजेश कुमार शर्मा"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वडिलांचे नाव *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    placeholder="पूर्ण नाव"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    आधार क्रमांक *
                  </label>
                  <input
                    type="text"
                    name="ownerAadhar"
                    value={formData.ownerAadhar}
                    onChange={handleInputChange}
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पॅन कार्ड नंबर *
                  </label>
                  <input
                    type="text"
                    name="ownerPan"
                    value={formData.ownerPan}
                    onChange={handleInputChange}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मोबाइल नंबर *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="10 अंकी मोबाइल नंबर"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ईमेल आयडी *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Premises Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin size={20} />
                ३. जागेची माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  व्यवसायाचा पूर्ण पत्ता *
                </label>
                <textarea
                  name="premisesAddress"
                  value={formData.premisesAddress}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="दुकान/गाळा क्र., इमारत, रस्ता, क्षेत्र..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    प्रभाग (Ward) *
                  </label>
                  <input
                    type="text"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    placeholder="उदा: प्रभाग क्र. 25"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पिन कोड *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="431001"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    क्षेत्रफळ (चौ.फूट) *
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="उदा: 500"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    जागेचा प्रकार *
                  </label>
                  <select
                    name="premisesType"
                    value={formData.premisesType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="owned">स्वतःची</option>
                    <option value="rented">भाड्याने</option>
                    <option value="leased">लीज</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वीज कनेक्शन क्रमांक *
                  </label>
                  <input
                    type="text"
                    name="electricityConnection"
                    value={formData.electricityConnection}
                    onChange={handleInputChange}
                    placeholder="उदा: 1234567890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  अग्निशमन सुरक्षा सुविधा आहे का? *
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasFireSafety"
                      value="yes"
                      checked={formData.hasFireSafety === 'yes'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600"
                      required
                    />
                    <span>होय</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasFireSafety"
                      value="no"
                      checked={formData.hasFireSafety === 'no'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600"
                      required
                    />
                    <span>नाही</span>
                  </label>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Document Upload */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Upload size={20} />
                ४. कागदपत्रे अपलोड करा *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              {[
                { id: 'ownerPhoto', label: 'मालकाचा फोटो (पासपोर्ट साइज)', required: true },
                { id: 'aadharCard', label: 'आधार कार्ड', required: true },
                { id: 'panCard', label: 'पॅन कार्ड', required: true },
                { id: 'addressProof', label: 'पत्ता पुरावा (वीज बिल/पाणी बिल)', required: true },
                { id: 'premisesProof', label: 'जागा पुरावा (भाडे करार/मालकी पुरावा)', required: true },
                { id: 'noc', label: 'NOC (इमारत मालक/सोसायटी)', required: false },
              ].map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {doc.label} {doc.required && '*'}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0] || null)}
                      className="hidden"
                      id={doc.id}
                    />
                    <label
                      htmlFor={doc.id}
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                    >
                      <Upload size={16} />
                      {documents[doc.id] ? 'बदला' : 'अपलोड करा'}
                    </label>
                  </label>
                  {documents[doc.id] && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                      <CheckCircle size={16} />
                      {documents[doc.id]?.name}
                    </p>
                  )}
                </div>
              ))}

              <div className="p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-900 flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    सर्व कागदपत्रे स्पष्ट आणि वाचनीय स्वरूपात अपलोड करा. 
                    फक्त PDF, JPG, PNG फॉर्मॅट स्वीकारले जातील (प्रत्येकी 5MB पर्यंत).
                  </span>
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Declaration */}
          <Card className="mb-6">
            <CardBody>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" required />
                <span className="text-sm text-gray-700">
                  मी घोषित करतो की वर दिलेली सर्व माहिती माझ्या माहितीनुसार सत्य आहे. 
                  मी महानगरपालिकेचे सर्व नियम व शर्ती पाळण्यास तयार आहे. 
                  कोणतीही माहिती खोटी आढळल्यास माझा परवाना रद्द केला जाऊ शकतो याची मला जाणीव आहे.
                </span>
              </label>
            </CardBody>
          </Card>

          {/* Submit Button */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">अर्ज सबमिट करा</h3>
                  <p className="text-white/80 text-sm">
                    अर्ज सबमिट केल्यानंतर तुम्हाला पावती क्रमांक मिळेल
                  </p>
                </div>
                <Button
                  type="submit"
                  loading={submitting}
                  disabled={submitting}
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  {submitting ? 'सबमिट करत आहे...' : 'सबमिट करा'}
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </div>
    </div>
  );
}

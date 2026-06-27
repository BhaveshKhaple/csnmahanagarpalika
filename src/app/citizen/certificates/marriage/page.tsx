'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  User, 
  Calendar,
  MapPin,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Heart
} from 'lucide-react';
import Link from 'next/link';

export default function MarriageCertificatePage() {
  const [formData, setFormData] = useState({
    groomName: '',
    groomDob: '',
    groomFatherName: '',
    groomAddress: '',
    groomAadhar: '',
    brideName: '',
    brideDob: '',
    brideFatherName: '',
    brideAddress: '',
    brideAadhar: '',
    marriageDate: '',
    marriagePlace: '',
    marriageType: '',
    witness1Name: '',
    witness1Address: '',
    witness2Name: '',
    witness2Address: '',
    applicantName: '',
    applicantRelation: '',
    applicantPhone: '',
    applicantEmail: '',
  });

  const [documents, setDocuments] = useState<{[key: string]: File | null}>({
    groomPhoto: null,
    bridePhoto: null,
    groomAadhar: null,
    brideAadhar: null,
    marriageProof: null,
    witness1Id: null,
    witness2Id: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');

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
    
    if (!formData.groomName || !formData.brideName || !formData.marriageDate) {
      alert('कृपया सर्व आवश्यक फील्ड भरा');
      return;
    }

    if (!documents.marriageProof) {
      alert('कृपया विवाह पुरावा अपलोड करा');
      return;
    }

    setSubmitting(true);
    
    setTimeout(() => {
      const generatedNumber = `MARRIAGE/2026/${Math.floor(100000 + Math.random() * 900000)}`;
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
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-pink-600" size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                अर्ज यशस्वीरित्या सबमिट झाला!
              </h2>
              <p className="text-gray-600 mb-2">तुमचा अर्ज क्रमांक:</p>
              <p className="text-3xl font-bold text-pink-600 mb-6">{applicationNumber}</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-bold text-gray-900 mb-3">पुढील प्रक्रिया:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>तुमचा अर्ज 3-5 कामकाजाच्या दिवसांत तपासला जाईल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>वर-वधू उपस्थितीत सत्यापन केले जाईल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>कागदपत्रे योग्य असल्यास प्रमाणपत्र 15 दिवसांत जारी केले जाईल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>शुल्क: ₹200 (ऑनलाइन पेमेंट)</span>
                  </li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => window.print()}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Download size={18} className="mr-2" />
                  अर्ज डाउनलोड करा
                </Button>
                <Link href="/citizen/certificates">
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
          <Link href="/citizen/certificates" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-4">
            <ArrowLeft size={20} />
            <span>परत</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <Heart className="text-pink-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">विवाह नोंदणी प्रमाणपत्र अर्ज</h1>
              <p className="text-gray-600">विवाह प्रमाणपत्र मिळवा</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Groom Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} />
                १. वराची माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वराचे पूर्ण नाव *
                  </label>
                  <input
                    type="text"
                    name="groomName"
                    value={formData.groomName}
                    onChange={handleInputChange}
                    placeholder="उदा: राजेश कुमार शर्मा"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    जन्म तारीख *
                  </label>
                  <input
                    type="date"
                    name="groomDob"
                    value={formData.groomDob}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    आधार क्रमांक *
                  </label>
                  <input
                    type="text"
                    name="groomAadhar"
                    value={formData.groomAadhar}
                    onChange={handleInputChange}
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वडिलांचे नाव *
                  </label>
                  <input
                    type="text"
                    name="groomFatherName"
                    value={formData.groomFatherName}
                    onChange={handleInputChange}
                    placeholder="पूर्ण नाव"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    संपूर्ण पत्ता *
                  </label>
                  <textarea
                    name="groomAddress"
                    value={formData.groomAddress}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="घर क्र., रस्ता, क्षेत्र, शहर, पिन कोड"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Bride Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} />
                २. वधूची माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वधूचे पूर्ण नाव *
                  </label>
                  <input
                    type="text"
                    name="brideName"
                    value={formData.brideName}
                    onChange={handleInputChange}
                    placeholder="उदा: प्रिया सुनील देशमुख"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    जन्म तारीख *
                  </label>
                  <input
                    type="date"
                    name="brideDob"
                    value={formData.brideDob}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    आधार क्रमांक *
                  </label>
                  <input
                    type="text"
                    name="brideAadhar"
                    value={formData.brideAadhar}
                    onChange={handleInputChange}
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वडिलांचे नाव *
                  </label>
                  <input
                    type="text"
                    name="brideFatherName"
                    value={formData.brideFatherName}
                    onChange={handleInputChange}
                    placeholder="पूर्ण नाव"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    संपूर्ण पत्ता *
                  </label>
                  <textarea
                    name="brideAddress"
                    value={formData.brideAddress}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="घर क्र., रस्ता, क्षेत्र, शहर, पिन कोड"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Marriage Details */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar size={20} />
                ३. विवाहाची माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    विवाहाची तारीख *
                  </label>
                  <input
                    type="date"
                    name="marriageDate"
                    value={formData.marriageDate}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    विवाहाचा प्रकार *
                  </label>
                  <select
                    name="marriageType"
                    value={formData.marriageType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="hindu">हिंदू विवाह</option>
                    <option value="muslim">मुस्लिम विवाह</option>
                    <option value="christian">ख्रिश्चन विवाह</option>
                    <option value="special">विशेष विवाह अधिनियम</option>
                    <option value="other">इतर</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    विवाहाचे ठिकाण *
                  </label>
                  <input
                    type="text"
                    name="marriagePlace"
                    value={formData.marriagePlace}
                    onChange={handleInputChange}
                    placeholder="उदा: श्री गणेश मंदिर, छत्रपती संभाजीनगर"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Witness Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} />
                ४. साक्षीदारांची माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">साक्षीदार १</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      पूर्ण नाव *
                    </label>
                    <input
                      type="text"
                      name="witness1Name"
                      value={formData.witness1Name}
                      onChange={handleInputChange}
                      placeholder="साक्षीदाराचे नाव"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      पत्ता *
                    </label>
                    <input
                      type="text"
                      name="witness1Address"
                      value={formData.witness1Address}
                      onChange={handleInputChange}
                      placeholder="संपूर्ण पत्ता"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">साक्षीदार २</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      पूर्ण नाव *
                    </label>
                    <input
                      type="text"
                      name="witness2Name"
                      value={formData.witness2Name}
                      onChange={handleInputChange}
                      placeholder="साक्षीदाराचे नाव"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      पत्ता *
                    </label>
                    <input
                      type="text"
                      name="witness2Address"
                      value={formData.witness2Address}
                      onChange={handleInputChange}
                      placeholder="संपूर्ण पत्ता"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Document Upload */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Upload size={20} />
                ५. कागदपत्रे अपलोड करा *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              {[
                { id: 'groomPhoto', label: 'वराचा फोटो (पासपोर्ट साइज)', required: true },
                { id: 'bridePhoto', label: 'वधूचा फोटो (पासपोर्ट साइज)', required: true },
                { id: 'groomAadhar', label: 'वराचा आधार कार्ड', required: true },
                { id: 'brideAadhar', label: 'वधूचा आधार कार्ड', required: true },
                { id: 'marriageProof', label: 'विवाह पुरावा (निमंत्रणपत्र/फोटो/व्हिडिओ)', required: true },
                { id: 'witness1Id', label: 'साक्षीदार १ ओळखपत्र', required: true },
                { id: 'witness2Id', label: 'साक्षीदार २ ओळखपत्र', required: true },
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
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition"
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

          {/* Applicant Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} />
                ६. अर्जदाराची माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    अर्जदाराचे नाव *
                  </label>
                  <input
                    type="text"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    placeholder="पूर्ण नाव"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वर/वधूशी नाते *
                  </label>
                  <select
                    name="applicantRelation"
                    value={formData.applicantRelation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="groom">वर</option>
                    <option value="bride">वधू</option>
                    <option value="father">वडील</option>
                    <option value="mother">आई</option>
                    <option value="guardian">पालक</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मोबाइल नंबर *
                  </label>
                  <input
                    type="tel"
                    name="applicantPhone"
                    value={formData.applicantPhone}
                    onChange={handleInputChange}
                    placeholder="10 अंकी मोबाइल नंबर"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ईमेल आयडी *
                  </label>
                  <input
                    type="email"
                    name="applicantEmail"
                    value={formData.applicantEmail}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Declaration */}
          <Card className="mb-6">
            <CardBody>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" required />
                <span className="text-sm text-gray-700">
                  आम्ही घोषित करतो की वर दिलेली सर्व माहिती आमच्या माहितीनुसार सत्य आहे. 
                  विवाह स्वेच्छेने आणि कायदेशीररित्या झाला आहे. 
                  कोणतीही माहिती खोटी आढळल्यास त्यासाठी आम्ही जबाबदार राहू.
                </span>
              </label>
            </CardBody>
          </Card>

          {/* Submit Button */}
          <Card className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
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
                  className="bg-white text-pink-600 hover:bg-gray-100"
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

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
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function DeathCertificatePage() {
  const [formData, setFormData] = useState({
    deceasedName: '',
    deceasedGender: '',
    dateOfDeath: '',
    placeOfDeath: '',
    hospitalName: '',
    causeOfDeath: '',
    ageAtDeath: '',
    fatherName: '',
    spouseName: '',
    permanentAddress: '',
    ward: '',
    city: 'छत्रपती संभाजीनगर',
    state: 'महाराष्ट्र',
    pincode: '',
    applicantName: '',
    applicantRelation: '',
    applicantPhone: '',
    applicantEmail: '',
  });

  const [documents, setDocuments] = useState<{[key: string]: File | null}>({
    deathCertificate: null,
    applicantId: null,
    addressProof: null,
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
    
    if (!formData.deceasedName || !formData.dateOfDeath || !formData.placeOfDeath) {
      alert('कृपया सर्व आवश्यक फील्ड भरा');
      return;
    }

    if (!documents.deathCertificate) {
      alert('कृपया मृत्यू प्रमाणपत्र अपलोड करा');
      return;
    }

    setSubmitting(true);
    
    setTimeout(() => {
      const generatedNumber = `DEATH/2026/${Math.floor(100000 + Math.random() * 900000)}`;
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
                    <span>तुमचा अर्ज 2-3 कामकाजाच्या दिवसांत तपासला जाईल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>कागदपत्रे योग्य असल्यास प्रमाणपत्र 7 दिवसांत जारी केले जाईल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>तुम्हाला SMS आणि Email द्वारे अपडेट मिळेल</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>शुल्क: ₹100 (ऑनलाइन पेमेंट)</span>
                  </li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700"
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
          <Link href="/citizen/certificates" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft size={20} />
            <span>परत</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="text-gray-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">मृत्यू प्रमाणपत्र अर्ज</h1>
              <p className="text-gray-600">मृत व्यक्तीचे प्रमाणपत्र मिळवा</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Deceased Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} />
                १. मृत व्यक्तीची माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मृत व्यक्तीचे पूर्ण नाव *
                  </label>
                  <input
                    type="text"
                    name="deceasedName"
                    value={formData.deceasedName}
                    onChange={handleInputChange}
                    placeholder="उदा: रमेश कुमार पाटील"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    लिंग *
                  </label>
                  <select
                    name="deceasedGender"
                    value={formData.deceasedGender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="male">पुरुष</option>
                    <option value="female">स्त्री</option>
                    <option value="other">इतर</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मृत्यूची तारीख *
                  </label>
                  <input
                    type="date"
                    name="dateOfDeath"
                    value={formData.dateOfDeath}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मृत्यूच्या वेळी वय *
                  </label>
                  <input
                    type="number"
                    name="ageAtDeath"
                    value={formData.ageAtDeath}
                    onChange={handleInputChange}
                    placeholder="वर्षात"
                    min="0"
                    max="150"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मृत्यूचे ठिकाण *
                  </label>
                  <input
                    type="text"
                    name="placeOfDeath"
                    value={formData.placeOfDeath}
                    onChange={handleInputChange}
                    placeholder="उदा: घरी / हॉस्पिटल"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    हॉस्पिटल नाव (असल्यास)
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    placeholder="उदा: सरकारी रुग्णालय"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मृत्यूचे कारण *
                  </label>
                  <input
                    type="text"
                    name="causeOfDeath"
                    value={formData.causeOfDeath}
                    onChange={handleInputChange}
                    placeholder="उदा: नैसर्गिक / आजार / अपघात"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Family Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} />
                २. कौटुंबिक माहिती
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वडिलांचे नाव
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    placeholder="पूर्ण नाव"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पती/पत्नीचे नाव
                  </label>
                  <input
                    type="text"
                    name="spouseName"
                    value={formData.spouseName}
                    onChange={handleInputChange}
                    placeholder="पूर्ण नाव"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Address Information */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin size={20} />
                ३. पत्ता माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  शेवटचा कायमचा पत्ता *
                </label>
                <textarea
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="घर क्र., रस्ता, क्षेत्र..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
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
                { id: 'deathCertificate', label: 'हॉस्पिटल मृत्यू प्रमाणपत्र / पोस्ट-मॉर्टेम रिपोर्ट', required: true },
                { id: 'applicantId', label: 'अर्जदाराचा ओळखपत्र (आधार/पॅन)', required: true },
                { id: 'addressProof', label: 'पत्ता पुरावा', required: false },
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
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
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
                ५. अर्जदाराची माहिती *
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मृत व्यक्तीशी नाते *
                  </label>
                  <select
                    name="applicantRelation"
                    value={formData.applicantRelation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="son">मुलगा</option>
                    <option value="daughter">मुलगी</option>
                    <option value="spouse">पती/पत्नी</option>
                    <option value="father">वडील</option>
                    <option value="mother">आई</option>
                    <option value="brother">भाऊ</option>
                    <option value="sister">बहीण</option>
                    <option value="other">इतर</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  मी घोषित करतो की वर दिलेली सर्व माहिती माझ्या माहितीनुसार सत्य आहे. 
                  कोणतीही माहिती खोटी आढळल्यास त्यासाठी मी जबाबदार राहीन.
                </span>
              </label>
            </CardBody>
          </Card>

          {/* Submit Button */}
          <Card className="bg-gradient-to-r from-gray-600 to-gray-800 text-white">
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
                  className="bg-white text-gray-800 hover:bg-gray-100"
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

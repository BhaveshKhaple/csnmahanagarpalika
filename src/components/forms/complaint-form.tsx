'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Upload, 
  AlertCircle,
  X,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { CategorySelect } from '@/components/shared/category-select';
import { ConfirmationReceipt } from '@/components/shared/confirmation-receipt';

interface ComplaintFormProps {
  guestMode?: boolean;
}

export function ComplaintForm({ guestMode = false }: ComplaintFormProps) {
  const router = useRouter();
  const { locale, t } = useTranslation();
  
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    guestName: '',
    guestPhone: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [complaintNumber, setComplaintNumber] = useState('');

  const texts = {
    title: locale === 'mr' ? 'नवीन तक्रार नोंदवा' : 'File New Complaint',
    subtitle: locale === 'mr' ? 'आपली समस्या आमच्यासह शेअर करा, आम्ही लवकरात लवकर निराकरण करू' : 'Share your issue with us, we will resolve it as soon as possible',
    step1: locale === 'mr' ? '१. तक्रारीचा प्रकार निवडा *' : '1. Select Complaint Category *',
    step1Desc: locale === 'mr' ? 'तुमची तक्रार कोणत्या प्रकारची आहे?' : 'What type of complaint do you have?',
    step2: locale === 'mr' ? '२. तक्रारीचे तपशील *' : '2. Complaint Details *',
    complaintTitle: locale === 'mr' ? 'तक्रारीचे शीर्षक *' : 'Complaint Title *',
    complaintDesc: locale === 'mr' ? 'तक्रारीचे संपूर्ण वर्णन *' : 'Full Description *',
    step3: locale === 'mr' ? '३. स्थान माहिती *' : '3. Location Information *',
    address: locale === 'mr' ? 'पत्ता / लँडमार्क' : 'Address / Landmark',
    lat: locale === 'mr' ? 'अक्षांश (Latitude)' : 'Latitude',
    lng: locale === 'mr' ? 'रेखांश (Longitude)' : 'Longitude',
    getLocation: locale === 'mr' ? 'माझे वर्तमान स्थान वापरा' : 'Use My Current Location',
    gpsHint: locale === 'mr' ? 'GPS स्थान वापरल्याने आम्हाला तुमची समस्या अचूकपणे ओळखण्यात मदत होईल.' : 'Using GPS location will help us identify the issue accurately.',
    step4: locale === 'mr' ? '४. फोटो अपलोड करा (पर्यायी)' : '4. Upload Photos (Optional)',
    step4Desc: locale === 'mr' ? 'जास्तीत जास्त 5 फोटो (प्रत्येकी 5MB पर्यंत)' : 'Maximum 5 photos (up to 5MB each)',
    clickToUpload: locale === 'mr' ? 'फोटो अपलोड करण्यासाठी क्लिक करा' : 'Click to upload photos',
    dragHint: locale === 'mr' ? 'किंवा फोटो येथे ड्रॅग करा' : 'Or drag photos here',
    guestStep: locale === 'mr' ? '५. आपली माहिती *' : '5. Your Information *',
    name: locale === 'mr' ? 'पूर्ण नाव *' : 'Full Name *',
    phone: locale === 'mr' ? 'मोबाइल क्रमांक *' : 'Mobile Number *',
    submit: locale === 'mr' ? 'तक्रार सबमिट करा' : 'Submit Complaint',
    submitDesc: locale === 'mr' ? 'तुमची तक्रार 24 तासांच्या आत विभागाकडे पाठवली जाईल' : 'Your complaint will be forwarded within 24 hours',
    submitting: locale === 'mr' ? 'सबमिट करत आहे...' : 'Submitting...'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGetLocation = () => {
    setGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          });
          setGettingLocation(false);
        },
        (error) => {
          alert(locale === 'mr' ? 'स्थान मिळविण्यात अयशस्वी. कृपया मॅन्युअली पत्ता प्रविष्ट करा.' : 'Failed to get location. Please enter manually.');
          setGettingLocation(false);
        }
      );
    } else {
      alert(locale === 'mr' ? 'तुमचा ब्राउझर GPS स्थान समर्थित नाही.' : 'Your browser does not support GPS location.');
      setGettingLocation(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      alert(locale === 'mr' ? 'जास्तीत जास्त 5 फोटो अपलोड करू शकता' : 'You can upload a maximum of 5 photos');
      return;
    }

    setImages([...images, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.title || !formData.description) {
      alert(locale === 'mr' ? 'कृपया सर्व आवश्यक माहिती भरा' : 'Please fill all required fields');
      return;
    }
    
    if (guestMode && (!formData.guestName || !formData.guestPhone)) {
      alert(locale === 'mr' ? 'कृपया तुमचे नाव आणि मोबाइल क्रमांक द्या' : 'Please provide your name and mobile number');
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const generatedNumber = `CMP/2026/${Math.floor(10000 + Math.random() * 90000)}`;
      setComplaintNumber(generatedNumber);
      setSuccess(true);
      setSubmitting(false);
    }, 2000);
  };

  if (success) {
    return <ConfirmationReceipt complaintNumber={complaintNumber} guestMode={guestMode} />;
  }

  return (
    <div className="py-8">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FileText className="text-red-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{texts.title}</h1>
              <p className="text-gray-600">{texts.subtitle}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold">{texts.step1}</h2>
              <p className="text-sm text-gray-600 mt-1">{texts.step1Desc}</p>
            </CardHeader>
            <CardBody>
              <CategorySelect 
                selectedCategory={formData.category}
                onSelect={(cat) => setFormData({ ...formData, category: cat })}
              />
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold">{texts.step2}</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {texts.complaintTitle}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {texts.complaintDesc}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin size={20} />
                {texts.step3}
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {texts.address}
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.lat}
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.lng}
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGetLocation}
                loading={gettingLocation}
                variant="outline"
                className="w-full"
              >
                <MapPin size={18} className="mr-2" />
                {texts.getLocation}
              </Button>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900 flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{texts.gpsHint}</span>
                </p>
              </div>
            </CardBody>
          </Card>

          {guestMode && (
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-bold">{texts.guestStep}</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.name}
                  </label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.phone}
                  </label>
                  <input
                    type="tel"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </CardBody>
            </Card>
          )}

          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ImageIcon size={20} />
                {texts.step4}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{texts.step4Desc}</p>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group h-32 w-full">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length < 5 && (
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 hover:bg-orange-50 transition cursor-pointer">
                      <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                      <p className="text-gray-600 font-medium mb-2">{texts.clickToUpload}</p>
                      <p className="text-sm text-gray-500">{texts.dragHint}</p>
                      <p className="text-xs text-gray-400 mt-2">{5 - images.length} / 5</p>
                    </div>
                  </label>
                )}
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{texts.submit}</h3>
                  <p className="text-white/80 text-sm">
                    {texts.submitDesc}
                  </p>
                </div>
                <Button
                  type="submit"
                  loading={submitting}
                  disabled={submitting}
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  {submitting ? texts.submitting : texts.submit}
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </div>
    </div>
  );
}

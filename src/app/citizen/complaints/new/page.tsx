'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Upload, 
  Camera,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const complaintCategories = [
  { id: 'roads', label: 'रस्ते', icon: '🛣️', color: 'bg-orange-100 text-orange-600' },
  { id: 'water', label: 'पाणी', icon: '💧', color: 'bg-blue-100 text-blue-600' },
  { id: 'garbage', label: 'कचरा', icon: '🗑️', color: 'bg-green-100 text-green-600' },
  { id: 'drainage', label: 'ड्रेनेज', icon: '🚰', color: 'bg-purple-100 text-purple-600' },
  { id: 'street_lights', label: 'स्ट्रीट लाइट', icon: '💡', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'public_health', label: 'सार्वजनिक आरोग्य', icon: '🏥', color: 'bg-red-100 text-red-600' },
  { id: 'trees', label: 'झाडे', icon: '🌳', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'animals', label: 'प्राणी', icon: '🐕', color: 'bg-amber-100 text-amber-600' },
  { id: 'illegal_construction', label: 'बेकायदेशीर बांधकाम', icon: '🏗️', color: 'bg-rose-100 text-rose-600' },
  { id: 'noise', label: 'आवाज प्रदूषण', icon: '📢', color: 'bg-indigo-100 text-indigo-600' },
  { id: 'other', label: 'इतर', icon: '📋', color: 'bg-gray-100 text-gray-600' },
];

export default function NewComplaintPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [complaintNumber, setComplaintNumber] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setFormData({
      ...formData,
      category: categoryId
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
          alert('स्थान मिळविण्यात अयशस्वी. कृपया मॅन्युअली पत्ता प्रविष्ट करा.');
          setGettingLocation(false);
        }
      );
    } else {
      alert('तुमचा ब्राउझर GPS स्थान समर्थित नाही.');
      setGettingLocation(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      alert('जास्तीत जास्त 5 फोटो अपलोड करू शकता');
      return;
    }

    setImages([...images, ...files]);

    // Create previews
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
    
    if (!formData.category) {
      alert('कृपया तक्रारीचा प्रकार निवडा');
      return;
    }
    if (!formData.title) {
      alert('कृपया तक्रारीचे शीर्षक प्रविष्ट करा');
      return;
    }
    if (!formData.description) {
      alert('कृपया तक्रारीचे वर्णन प्रविष्ट करा');
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const generatedNumber = `CMP/2026/${Math.floor(10000 + Math.random() * 90000)}`;
      setComplaintNumber(generatedNumber);
      setSuccess(true);
      setSubmitting(false);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push(`/citizen/complaints/track`);
      }, 3000);
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
                तक्रार यशस्वीरित्या नोंदवली!
              </h2>
              <p className="text-gray-600 mb-2">तुमची तक्रार क्रमांक:</p>
              <p className="text-3xl font-bold text-orange-600 mb-6">{complaintNumber}</p>
              <p className="text-gray-600 mb-8">
                तुमची तक्रार संबंधित विभागाकडे पाठवण्यात आली आहे. 
                तुम्हाला SMS आणि Email द्वारे अपडेट मिळेल.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => router.push('/citizen/complaints/track')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  तक्रार ट्रॅक करा
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  नवीन तक्रार नोंदवा
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FileText className="text-red-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">नवीन तक्रार नोंदवा</h1>
              <p className="text-gray-600">आपली समस्या आमच्यासह शेअर करा, आम्ही लवकरात लवकर निराकरण करू</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Category Selection */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold">१. तक्रारीचा प्रकार निवडा *</h2>
              <p className="text-sm text-gray-600 mt-1">तुमची तक्रार कोणत्या प्रकारची आहे?</p>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {complaintCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategorySelect(category.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.category === category.id
                        ? 'border-orange-500 bg-orange-50 shadow-md scale-105'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow'
                    }`}
                  >
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{category.label}</div>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Complaint Details */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold">२. तक्रारीचे तपशील *</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  तक्रारीचे शीर्षक *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="उदा: रस्त्यावर मोठा खड्डा"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  तक्रारीचे संपूर्ण वर्णन *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="समस्येबद्दल तपशीलवार माहिती द्या..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </CardBody>
          </Card>

          {/* Location */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin size={20} />
                ३. स्थान माहिती *
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  पत्ता / लँडमार्क
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="उदा: शिवाजी चौक जवळ, सेक्टर-७"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    अक्षांश (Latitude)
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    placeholder="19.8762"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    रेखांश (Longitude)
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    placeholder="75.3433"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    readOnly
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
                माझे वर्तमान स्थान वापरा
              </Button>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900 flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    GPS स्थान वापरल्याने आम्हाला तुमची समस्या अचूकपणे ओळखण्यात मदत होईल.
                  </span>
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Image Upload */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ImageIcon size={20} />
                ४. फोटो अपलोड करा (पर्यायी)
              </h2>
              <p className="text-sm text-gray-600 mt-1">जास्तीत जास्त 5 फोटो (प्रत्येकी 5MB पर्यंत)</p>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
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

                {/* Upload Button */}
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
                      <p className="text-gray-600 font-medium mb-2">फोटो अपलोड करण्यासाठी क्लिक करा</p>
                      <p className="text-sm text-gray-500">किंवा फोटो येथे ड्रॅग करा</p>
                      <p className="text-xs text-gray-400 mt-2">{5 - images.length} फोटो अजून अपलोड करू शकता</p>
                    </div>
                  </label>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Submit Button */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">तक्रार सबमिट करा</h3>
                  <p className="text-white/80 text-sm">
                    तुमची तक्रार 24 तासांच्या आत विभागाकडे पाठवली जाईल
                  </p>
                </div>
                <Button
                  type="submit"
                  loading={submitting}
                  disabled={submitting}
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  {submitting ? 'सबमिट करत आहे...' : 'तक्रार सबमिट करा'}
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </div>
    </div>
  );
}

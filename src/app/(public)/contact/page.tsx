'use client';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { toast } from 'react-hot-toast';

export default function PublicContactPage() {
  const { t, locale } = useTranslation();
  
  // Feedback form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = locale === 'mr' ? 'नाव आवश्यक आहे' : 'Name is required';
    }
    if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = locale === 'mr' ? '१० अंकी वैध मोबाईल नंबर आवश्यक आहे' : 'Valid 10-digit mobile number is required';
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = locale === 'mr' ? 'वैध ईमेल पत्ता द्या' : 'Provide a valid email';
    }
    if (!message.trim()) {
      newErrors.message = locale === 'mr' ? 'संदेश आवश्यक आहे' : 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success(locale === 'mr' ? 'तुमचा संदेश यशस्वीरित्या पाठवला गेला!' : 'Message sent successfully!');
    
    // Clear
    setName('');
    setMobile('');
    setEmail('');
    setMessage('');
  };

  const contactDetails = [
    {
      labelMr: 'मुख्य कार्यालय पत्ता',
      labelEn: 'Head Office Address',
      valueMr: 'मुख्य इमारत, टाऊन हॉल, हेड पोस्ट ऑफिसच्या मागे, छत्रपती संभाजी नगर, ४३१००१',
      valueEn: 'Main Building, Town Hall, Behind Head Post Office, Chhatrapati Sambhaji Nagar, 431001',
      icon: MapPin,
    },
    {
      labelMr: 'संपर्क फोन',
      labelEn: 'Contact Phone',
      valueMr: '+91-1234567890 (प्रशासकीय चौकशी)',
      valueEn: '+91-1234567890 (General Inquiry)',
      icon: Phone,
    },
    {
      labelMr: 'ईमेल पत्ता',
      labelEn: 'Email Address',
      valueMr: 'info@chhsambhajinagarmc.org',
      valueEn: 'info@chhsambhajinagarmc.org',
      icon: Mail,
    },
    {
      labelMr: 'कार्यालयीन वेळ',
      labelEn: 'Office Hours',
      valueMr: 'सोमवार ते शनिवार, सकाळी १०.०० ते सायंकाळी ६.०० (शासकीय सुट्ट्या वगळून)',
      valueEn: 'Monday to Saturday, 10.00 AM to 6.00 PM (Closed on public holidays)',
      icon: Clock,
    },
  ];

  return (
    <PageShell
      eyebrow={t('nav.contact')}
      title={locale === 'mr' ? 'संपर्क माहिती व अभिप्राय' : 'Contact Us & Feedback'}
      description={locale === 'mr' ? 'महानगरपालिका मुख्यालयाची संपर्क माहिती आणि त्वरित अभिप्राय नोंदणी.' : 'Municipal HQ contact information and instant feedback channel.'}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
        
        {/* Left Column - Contact Details & Map */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.labelEn} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
                    <Icon size={14} aria-hidden />
                    <span>{locale === 'mr' ? detail.labelMr : detail.labelEn}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 leading-normal">
                    {locale === 'mr' ? detail.valueMr : detail.valueEn}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Static Map Embed */}
          <div className="rounded-2xl border border-gray-250 bg-gray-100 overflow-hidden shadow-sm aspect-video relative flex flex-col justify-end">
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
              {/* Static placeholder representing map */}
              <div className="text-center p-6 space-y-3">
                <MapPin size={48} className="text-orange-600 mx-auto animate-bounce-slow" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">छत्रपती संभाजीनगर महानगरपालिका मुख्यालय</h4>
                  <p className="text-xs text-gray-500 mt-1">टाऊन हॉल परिसर, छत्रपती संभाजीनगर</p>
                </div>
              </div>
            </div>
            {/* Map footer button */}
            <a
              href="https://maps.google.com/?q=Chhatrapati+Sambhajinagar+Municipal+Corporation"
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 bg-white/95 border-t border-gray-200 px-4 py-3 flex items-center justify-between hover:bg-white text-xs font-bold text-orange-600 shadow"
            >
              <span>{locale === 'mr' ? 'गूगल मॅपवर उघडा' : 'Open in Google Maps'}</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Right Column - Feedback Form */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {locale === 'mr' ? 'अभिप्राय किंवा प्रश्न पाठवा' : 'Send Feedback / Inquiry'}
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              {locale === 'mr' 
                ? 'आपले प्रश्न किंवा अभिप्राय थेट आमच्या कार्यालयाला पाठवण्यासाठी खालील अर्ज भरा.' 
                : 'Fill details below to share your suggestions, questions, or issues with our admin office.'}
            </p>

            {submitted ? (
              <div className="rounded-xl bg-green-50 border border-green-200 p-5 text-center space-y-3 my-6">
                <CheckCircle2 size={36} className="text-green-600 mx-auto" />
                <div>
                  <h4 className="font-bold text-green-900 text-sm">
                    {locale === 'mr' ? 'अभिप्राय प्राप्त झाला!' : 'Feedback Received!'}
                  </h4>
                  <p className="text-xs text-green-700 mt-1">
                    {locale === 'mr'
                      ? 'लवकरच संबंधित विभागाकडून आपल्याशी संपर्क केला जाईल.'
                      : 'We will review your message and contact you if needed.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-orange-600 underline min-h-[36px]"
                >
                  {locale === 'mr' ? 'दुसरा संदेश पाठवा' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                    <span>{locale === 'mr' ? 'संपूर्ण नाव' : 'Full Name'} <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(
                      "w-full rounded-lg border px-3.5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[40px]",
                      errors.name ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                    )}
                  />
                  {errors.name && <p role="alert" className="text-[10px] text-red-600 mt-0.5">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    {locale === 'mr' ? 'मोबाईल नंबर' : 'Mobile Number'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="10 digit number"
                    className={cn(
                      "w-full rounded-lg border px-3.5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[40px]",
                      errors.mobile ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                    )}
                  />
                  {errors.mobile && <p role="alert" className="text-[10px] text-red-600 mt-0.5">{errors.mobile}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    {locale === 'mr' ? 'ईमेल आयडी' : 'Email Address'} <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "w-full rounded-lg border px-3.5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[40px]",
                      errors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                    )}
                  />
                  {errors.email && <p role="alert" className="text-[10px] text-red-600 mt-0.5">{errors.email}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    {locale === 'mr' ? 'तुमचा संदेश' : 'Your Message'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(
                      "w-full rounded-lg border px-3.5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500",
                      errors.message ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                    )}
                  />
                  {errors.message && <p role="alert" className="text-[10px] text-red-600 mt-0.5">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-600 py-3 text-sm font-bold text-white hover:bg-orange-700 disabled:opacity-50 transition shadow min-h-[44px]"
                >
                  <Send size={14} aria-hidden />
                  <span>{loading ? t('common.loading') : (locale === 'mr' ? 'संदेश पाठवा' : 'Send Message')}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </PageShell>
  );
}
